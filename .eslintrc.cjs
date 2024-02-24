/** @type { import("eslint").Linter.Config } */
module.exports = {
	root: true,
	extends: ['@vnphanquang/eslint-config', 'plugin:svelte/recommended', 'prettier'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte']
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
	],
	globals: {
		App: 'readonly',
		__BUILD_TIMESTAMP__: 'readonly',
	},
};
