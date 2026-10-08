import { globalIgnores } from 'eslint/config';

export const configs = /** @satisfies {import('eslint/config').ConfigObject[]} */ ([
	{
		rules: {
			'svelte/no-navigation-without-resolve': 'off',
			'import-x/no-duplicates': 'off',
		},
	},
	globalIgnores(['**/examples/*.{svelte,js,ts}']),
]);
