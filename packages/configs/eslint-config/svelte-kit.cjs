// eslint-disable-next-line @typescript-eslint/no-var-requires
const base = require('./base.cjs');

module.exports = {
  ...base,
  plugins: ['svelte3', ...base.plugins],
  overrides: [
    { files: ['*.svelte'], processor: 'svelte3/svelte3' },
    {
      files: ['.eslintrc.cjs'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
  settings: {
    'svelte3/typescript': () => require('typescript'),
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
  },
};
