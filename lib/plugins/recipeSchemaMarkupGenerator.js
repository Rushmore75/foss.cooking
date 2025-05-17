import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { h } from 'hastscript';
import { fromString } from 'hast-util-from-string';
import { toText } from 'hast-util-to-text';
import { select, selectAll } from 'hast-util-select';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { visit, SKIP, EXIT } from 'unist-util-visit';

const myDirname = path.dirname(fileURLToPath(import.meta.url));
const recipeSchema = JSON.parse(
    fs.readFileSync(path.join(myDirname, 'recipe.schema.json'))
);

const getRecipeIngredients = (tree) => {
    const ingredientsListItems = selectAll('#ingredients ~ ul > li', tree);

    // Some recipes have sublists of ingredients for components of the dish.
    const sublists = selectAll('ul', ingredientsListItems);
    if (sublists.length > 0) {
	return sublists.reduce((ings, sublist) => [...ings, selectAll('li', sublist).map(toText)], []);
    } else {
	// Most recipes have one or more flat lists of ingredients.
	return ingredientsListItems.map(toText);
    }
};

const getRecipeInstructions = (tree) => {
    const directionsSections = selectAll('#directions ~ h3', tree);
    if (directionsSections.length > 0) {
	const initialDirections = [];
	// Some recipes have sections for different components or variations
	// (e.g. the Eggs recipe)
	// Also, it's possible that a section might not have its own heading (e.g. Omelet)
	const unlabeledSection = select('#directions + ul, #directions + ol, #directions + p');
	if (unlabeledSection) {
	    initialDirections.push({
		'@type': 'HowToSection',
		name: title,
		itemListElement: getRecipeInstructions(unlabeledSection),
	    });
	}
	return directionsSections.reduce((sects, heading) => {
	    const { id } = heading.properties;
	    const directions = selectAll(`#${id} + ol > li, #${id} + ul > li, #${id} + p`, tree).map(toText);
	    if (directions.length > 0) {
		return [...sects, {
		    '@type': 'HowToSection',
		    name: toText(heading),
		    itemListElement: directions
		}];
	    } else {
		return sects;
	    }
	}, initialDirections);
    } else if (select('#directions ~ ol, #directions ~ ul', tree)) {
	// Most recipes have their directions in an ordered or unordered list.
	return selectAll('#directions ~ ol > li, #directions ~ ul > li', tree).map(toText);
    } else {
	// A few recipes have their directions in paragraph form.
	return selectAll('#directions ~ p', tree).map(toText);
    }
}

export const recipeSchemaMarkupGenerator = () => (tree, file) => {
    const { author, date, tags, title } = file.data.astro.frontmatter;

    const authorFileName = `${author.toLowerCase().replaceAll(' ', '-')}.json`;
    let authorName;
    try {
	const authorJson = JSON.parse(
	    fs.readFileSync(
		path.join(myDirname, '..', '..', 'src', 'content', 'authors', authorFileName)
	    )
	);
	authorName = authorJson.name;
    } catch (e) {
	// fall back to file data author name if we can't read the JSON
	authorName = author;
    }

    let recipeData = {
	"@context": "https://schema.org",
	"@type": "Recipe",
	author: authorName,
	datePublished: date.toISOString().split('T')[0],
	name: title,
	keywords: tags,
    };

    let description = '';
    const imageElements = [];
    visit(tree, 'element', (el) => {
	if (el.children.length > 0 && el.children[0].tagName === 'img') {
	    imageElements.push(el.children[0]);
	    return SKIP;
	} else if (el.tagName === 'ul') {
	    visit(el.children, 'element', li => {
		const liText = toText(li);
		if (liText.includes('Servings')) {
		    const servingTextParts = liText.trim().split(':');
		    if (servingTextParts.length === 2) {
			recipeData.recipeYield = servingTextParts[1];
		    }
		}
		// TODO add prep/cook time.
		// Kind of a pain to convert free text to ISO 8601 durations.
	    });
	    return SKIP;
	} else if (el.tagName === 'h2') {
	    return EXIT;
	} else {
	    description += toText(el) + ' ';
	}
    });

    if (description) {
	recipeData.description = description.trim();
    }

    if (imageElements.length > 0) {
	recipeData.image = imageElements.map(img => {
	    return `https://foss.cooking${img.properties.src}`;
	});
    }

    const ingredients = getRecipeIngredients(tree);
    if (ingredients.length > 0) {
	recipeData.recipeIngredient = ingredients;
    } else {
	console.warn(`Could not parse ingredients list for ${title}`);
	return;
    }

    const recipeInstructions = getRecipeInstructions(tree);
    if (recipeInstructions.length > 0) {
	recipeData.recipeInstructions = recipeInstructions;
    } else {
	console.warn(`Could not parse directions list for ${title}`);
	return;
    }

    // validate
    const ajv = new Ajv();
    addFormats(ajv, ['date']);
    const validate = ajv.compile(recipeSchema);
    if (!validate(recipeData)) {
	console.warn(`Generated JSON-LD Recipe markup was invalid for ${title}\n`, validate.errors);
	return;
    }

    // add json+ld element to tree if validation succeeds
    const jsonLdNode = h('script', { type: 'application/json+ld' });
    fromString(jsonLdNode, JSON.stringify(recipeData));
    tree.children.push(jsonLdNode);
}
