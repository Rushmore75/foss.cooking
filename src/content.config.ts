import { glob } from "astro/loaders";
import { defineCollection, reference, z } from "astro:content";

// TODO might be cool to make all the recipes
// toml instead of md? It would enforce a stronger
// schema for page layout 🤷‍♂️

const recipe = defineCollection({
    loader: glob({pattern: "**/*.md", base: "./src/content/recipes"}),
    schema: z.object({
        title: z.string(),
        date: z.date(),
        tags: z.array(z.string()),
        author: reference("authors"),
    })
});

const authors = defineCollection({
    loader: glob({pattern: "**/*.json", base: "./src/content/authors"}),
    // the only enforced item is name
    schema: z.object({
        name: z.string(),
        website: z.any(),
        website_tor: z.any(),
        xmr: z.any(),
        btc: z.any(),
        eth: z.any(),
        email: z.any(),
        donate: z.any(),
    })
});

export const collections = { recipe, authors }
