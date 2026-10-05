export type TocPreprocessorOptions = {
	/**
	 * a function that returns true if the file should be processed, process all files by default
	 */
	files?: (filename?: string) => boolean;
	/**
	 * target tag as table-of-content entries
	 * @default ['h2', 'h3', 'h4', 'h5', 'h6']
	 */
	tags?: string[];
	/**
	 * look for this attribute, if present will be taken as slug otherwise, set it to the generated slug
	 * @default to 'id'
	 */
	idAttribute?: string;
	/** instructions for generating slug */
	slug?: (input: SlugResolverInput) => string;
	/** instructions for adding the anchor tag */
	anchor?: TocPreprocessorAnchorOptions | false;
	/**
	 * name of the package / alias used in the imports, e.g. for the `compileToc` static marker
	 * @default '@svelte-put/toc'
	 */
	importSource?: string;
	/**
	 * whether to inject a `VariableDeclaration` that holds the Table-of-Contents data collected at
	 * compile-time to the "module" script. It is the equivalence using the `compileToc` manually:
	 *
	 * ```svelte
	 * <script module>
	 *   import { compileToc } from '@svelte-put/toc'
	 *   export const toc = compileToc(); // manually
	 * </script>
	 * ```
	 */
	autoDeclare?: TocPreprocessorAutoDeclareOptions | boolean;
};

export interface TocPreprocessorAutoDeclareOptions {
	/**
	 * turn on globally or filter out which file to auto-declare
	 */
	enabled?: ((filename?: string) => boolean) | boolean;
	/**
	 * the variable name to set the data to. Note that name collison is not guarded.
	 * @default 'toc'
	 */
	identifier?: string;
}

/** instructions for adding anchor tag */
export interface TocPreprocessorAnchorOptions {
	/** whether to insert an anchor tag for each matching node */
	enabled?: boolean;
	/**
	 * where to create the anchor tag
	 * - 'prepend' - inject link before the target tag text
	 * - 'append' - inject link after the target tag text
	 * - 'wrap' - wrap the whole target tag text with the link
	 * - 'before' - insert link before the target tag
	 * - 'after' - insert link after the target tag
	 * @default 'prepend'
	 */
	position?: 'prepend' | 'append' | 'wrap' | 'before' | 'after';
	/**
	 * content of the inserted anchor tag, ignored when behavior is `wrap`.
	 * @default '#'
	 */
	content?: string;
	/**
	 * properties set to the inserted anchor tag, unless position is 'wrap' (no properties).
	 * when provided will replace the default completely (no merging),
	 * alternatively, provide a callback where the input is the default properties
	 * @default { 'aria-hidden': 'true', 'tab-index': '-1' },
	 */
	properties?:
		| Record<string, string>
		| ((defaultProperties: Record<string, string>) => Record<string, string>);
	/** href attribute of the inserted anchor tag */
	href?: (slug: string) => string;
}

/**
 * information passed as parameter to slug resolver
 */
export interface SlugResolverInput {
	/** generated slug, by default slug will resolve to this */
	generated: string;
	/** text extracted from original node */
	nodeText: string;
	/** see https://github.com/Flet/github-slugger */
	slugger: BananaSlug;
}
