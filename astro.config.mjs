// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { redirectMap } from './src/config/redirects.mjs';

// Railway injects env vars via process.env. For LOCAL builds, `astro.config` does
// not auto-load .env, so load it best-effort (Node 20.12+/22 built-in). Any error
// (no file, unsupported Node) is ignored — process.env still wins.
try {
  process.loadEnvFile?.();
} catch {
  // no .env present — fine
}

// Production domain for sitemap + canonical URLs. Falls back to the current
// Railway URL so a missing/empty SITE_URL never produces an invalid `site`.
const site = process.env.SITE_URL || 'https://sivananda-yoga-toronto-site.up.railway.app';

// https://astro.build/config
export default defineConfig({
  // Update SITE_URL to the production domain at launch.
  site,
  // 301 redirects from legacy WordPress paths (see src/config/redirects.mjs).
  redirects: redirectMap,
  vite: {
    plugins: [tailwindcss()],
    // Allow the Cloudflare tunnel hostname to reach the dev server (Vite blocks
    // unknown Host headers by default). Set via remote-dev.sh.
    server: {
      allowedHosts: process.env.REMOTE_DEV_HOST ? [process.env.REMOTE_DEV_HOST] : [],
    },
  },
  integrations: [
    sitemap({
      // Keep noindex/utility routes out of the sitemap.
      filter: (page) =>
        !page.includes('/theme-preview') && !/\/policies\//.test(page) && !page.endsWith('/404'),
    }),
  ],
});
