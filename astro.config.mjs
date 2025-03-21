// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: "https://demo.site",
    // reidrects abc.xyz/ -> abc.xyz
    trailingSlash: 'never'
});
