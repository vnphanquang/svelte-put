/** @type {import('stylelint').Config} */
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier',
    'stylelint-config-html/svelte',
    'stylelint-config-clean-order',
  ],
  rules: {
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
    'function-no-unknown': [
      true,
      {
        ignoreFunctions: ['theme'],
      },
    ],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'apply', 'layer', 'config', 'screen', 'mixin', 'define-mixin'],
      },
    ],
    'value-keyword-case': [
      'lower',
      {
        ignoreFunctions: ['theme'],
      },
    ],
  },
  ignoreFiles: ['**/app.html', '**/*.template.html'],
};
