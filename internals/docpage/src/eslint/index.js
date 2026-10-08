import { globalIgnores } from 'eslint/config';

export const configs = /** @satisfies {import('eslint/config').ConfigObject[]} */ ([
	{
		rules: {
			'svelte/no-navigation-without-resolve': 'off',
			'import-x/no-duplicates': 'off',
		},
	},
	globalIgnores(['**/examples/*.{svelte,js,ts}']),
	{
		files: ['**/docs/**/doc.svelte'],
		rules: {
			'import-x/order': 'off',
			'@typescript-eslint/no-unused-vars': 'off',
		},
	},
]);
