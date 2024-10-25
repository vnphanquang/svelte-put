import vnphanquang from '@vnphanquang/eslint-config';
import jsdoc from 'eslint-plugin-jsdoc';
import svelte from 'eslint-plugin-svelte';
import tseslint from 'typescript-eslint';

const svelteConfig = [
	...svelte.configs['flat/recommended'],
	...svelte.configs['flat/prettier'],
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parserOptions: {
				parser: tseslint.parser,
			},
		},
	},
];

const jsdocConfig = [
	{
		files: ['packages/**/*.js'],
		...jsdoc.configs['flat/recommended-typescript-flavor'],
	},
	{
		files: ['**/*.js'],
		plugins: {
			jsdoc,
		},
		rules: {
			'jsdoc/require-returns-description': 'off',
			'jsdoc/require-param-description': 'off',
			'jsdoc/require-jsdoc': [
				'warn',
				{
					publicOnly: {
						ancestorsOnly: true,
					},
				},
			],
		},
	},
];

export default [
	...vnphanquang,
	...svelteConfig,
	...jsdocConfig,
	{
		ignores: [
			'**/build/',
			'**/.svelte-kit/',
			'**/dist/',
			'**/coverage/',
			'**/examples/**',
			'**/*.md.svelte',
			'**/types/',
			'**/pagefind/**',
		],
	},
];
