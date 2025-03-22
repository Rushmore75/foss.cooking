// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: "https://foss.cooking",
    // reidrects abc.xyz/ -> abc.xyz
    trailingSlash: 'never'
});
