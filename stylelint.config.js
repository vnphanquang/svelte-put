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
				ignoreShorthands: ['grid-template', 'inset-block', 'inset-inline'],
			},
		],
		'at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: ['source'],
			},
		],
	},
	overrides: [
		{
			files: ['**/*.svelte'],
			rules: {
				'selector-pseudo-class-no-unknown': [
					true,
					{
						ignorePseudoClasses: ['global'],
					},
				],
			},
		},
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
		{
			files: ['internals/docpage/src/standalone/components/documentation/styles.css'],
			rules: {
				'at-rule-no-unknown': [
					true,
					{
						ignoreAtRules: ['utility', 'source'],
					},
				],
				'no-invalid-position-declaration': null,
			},
		},
	],
	ignoreFiles: ['**/app.html'],
};
