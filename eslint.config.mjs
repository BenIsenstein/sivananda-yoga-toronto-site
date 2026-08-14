// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginAstro from 'eslint-plugin-astro';

export default tseslint.config(
  {
    // `cms-auth/` is a standalone Node OAuth broker with its own package.json
    // and runtime globals (Request/Response/fetch/process) — not part of the
    // static site build, so it is excluded from the site's lint/type toolchain.
    ignores: ['dist/', '.astro/', 'node_modules/', 'public/', '.agents/', 'cms-auth/'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    languageOptions: {
      globals: {
        // Astro-provided global namespace for JSX intrinsic element types.
        astroHTML: 'readonly',
      },
    },
  },
  {
    // Node-run config files may use Node globals (e.g. process.env).
    files: ['*.config.{js,mjs,cjs,ts}'],
    languageOptions: {
      globals: {
        process: 'readonly',
      },
    },
  }
);
