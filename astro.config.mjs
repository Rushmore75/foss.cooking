// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: "https://foss.cooking",

  // redirects abc.xyz/ -> abc.xyz
  trailingSlash: 'never',

  adapter: node({
    mode: 'standalone'
  })
});