import { defineConfig } from '@vnphanquang/eslint-config';

export default await defineConfig(
	{ svelte: true },
	{
		rules: {
			'svelte/no-navigation-without-resolve': 'off',
		},
	},
);
