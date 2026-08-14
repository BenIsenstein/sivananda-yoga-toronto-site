// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginAstro from 'eslint-plugin-astro';

export default tseslint.config(
  {
    ignores: ['dist/', '.astro/', 'node_modules/', 'public/', '.agents/'],
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
