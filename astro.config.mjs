// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Update to the production domain at launch (used by sitemap + canonical URLs).
  site: 'https://sivananda-yoga-toronto-site.up.railway.app',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [sitemap()],
});
