module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
  ],
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  plugins: ['import', '@typescript-eslint'],
  rules: {
    // semi-colon override for typescript
    semi: 'off',
    '@typescript-eslint/semi': ['error'],

    // https://eslint.org/docs/rules/no-unused-vars#options
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
      },
    ],

    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/member-delimiter-style.md
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'semi',
        },
        singleline: {
          delimiter: 'semi',
        },
      },
    ],

    // https://eslint.org/docs/rules/object-curly-spacing
    'object-curly-spacing': ['error', 'always'],

    // https://eslint.org/docs/rules/object-curly-newline
    'object-curly-newline': 'off',
    // disable here due to conflict with prettier
    // 'object-curly-newline': [
    //   'error',
    //   {
    //     ObjectExpression: {
    //       minProperties: 3,
    //       consistent: true,
    //     },
    //     ObjectPattern: {
    //       minProperties: 3,
    //       consistent: true,
    //     },
    //     ImportDeclaration: {
    //       minProperties: 3,
    //     },
    //     ExportDeclaration: {
    //       minProperties: 3,
    //     },
    //   },
    // ],

    // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/prefer-default-export.md
    'import/prefer-default-export': 'off',

    // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'unknown',
        ],
        pathGroups: [
          {
            pattern: '$*/**',
            group: 'internal',
          },
        ],
        'newlines-between': 'always',
        pathGroupsExcludedImportTypes: [],
        alphabetize: {
          order: 'asc',
          caseInsensitive: false,
        },
        warnOnUnassignedImports: true,
      },
    ],
  },
};
