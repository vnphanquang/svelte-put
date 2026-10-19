/** @type {import('prettier').Config} */
export default {
	semi: true,
	useTabs: true,
	singleQuote: true,
	trailingComma: 'all',
	printWidth: 100,
	plugins: ['prettier-plugin-embed', 'prettier-plugin-svelte', 'prettier-plugin-tailwindcss'],
	overrides: [
		{ files: '**/*.yaml', options: { proseWrap: 'always' } },
		{
			files: ['**/*.svelte', 'README.md'],
			options: /** @satisfies {import('prettier-plugin-embed').PrettierPluginEmbedOptions} */ ({
				embeddedMarkdownTags: ['markdown'],
				noEmbeddedMultiLineIndentation: ['markdown'],
			}),
		},
	],
};
