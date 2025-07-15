// @ts-check
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import { defineConfig } from 'astro/config';
import { recipeSchemaMarkupGenerator } from './lib/plugins';

// https://astro.build/config
export default defineConfig({
    markdown: {
        rehypePlugins: [
	    rehypeHeadingIds,
	    recipeSchemaMarkupGenerator,
	],
    },
    site: 'https://foss.cooking',
    // redirects abc.xyz/ -> abc.xyz
    trailingSlash: 'never'
});
