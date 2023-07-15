module.exports = {
  root: true,
  extends: ['@vnphanquang/eslint-config', 'plugin:svelte/recommended'],
  globals: {
    App: 'readonly',
    gtag: 'readonly',
  },
  overrides: [
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser',
      // Parse the `<script>` in `.svelte` as TypeScript by adding the following configuration.
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
    // ...
  ],
};
