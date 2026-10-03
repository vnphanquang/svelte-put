import type BananaSlug from 'github-slugger';

/**
 * input to preprocessor. Either on object of options or a
 * function that returns one (with the defaultOptions as its parameter).
 */
export type AutoSlugInput =
	| AutoSlugPreprocessorOptions
	| ((defaultOptions: DefaultAutoSlugPreprocessorOptions) => AutoSlugPreprocessorOptions);

/**
 * options to config preprocessor
 */
export interface AutoSlugPreprocessorOptions {
	/**
	 * filter which files the preprocessor will run on;
	 * alternatively, you can skip processing per file by adding
	 * `<!-- ignore @svelte-put/preprocess-auto-slug -->` somewhere in the file.
	 */
	files?: (options: Parameters<MarkupPreprocessor>[0]) => boolean;
	/** target tag, default to all heading tags */
	tags?: string[];
	/**
	 * look for this attribute, if present will be taken as slug otherwise, set it to the generated slug
	 * @default to 'id'
	 */
	attributeName?: string;
	/** instructions for adding the anchor tag */
	anchor?: AutoSlugAnchorOptions | false;
	/** instructions for generating slug */
	slug?: (input: SlugResolverInput) => string;
}

/** instructions for adding anchor tag */
export interface AutoSlugAnchorOptions {
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
	 * When provided will replace the default completely (no merging)
	 * @default { 'aria-hidden': 'true', 'tab-index': '-1' },
	 */
	properties?: Record<string, string>;
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

export type DefaultAutoSlugPreprocessorOptions = Required<
	Omit<AutoSlugPreprocessorOptions, 'anchor'>
> & {
	anchor?: AutoSlugAnchorOptions;
};
