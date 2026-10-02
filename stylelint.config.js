/** @type {import('stylelint').Config} */
export default {
	extends: [
		'stylelint-config-standard',
		'stylelint-config-html/svelte',
		'stylelint-config-clean-order',
	],
	rules: {
		'import-notation': null,
		'declaration-block-no-redundant-longhand-properties': [
			true,
			{
				ignoreShorthands: ['grid-template'],
			},
		],
	},
	overrides: [
		{
			files: ['packages/**/*.css'],
			rules: {
				'at-rule-no-unknown': [
					true,
					{
						ignoreAtRules: ['theme'],
					},
				],
			},
		},
	],
	ignoreFiles: ['**/app.html'],
};
