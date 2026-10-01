import type BananaSlug from 'github-slugger';

export type FilterIdSpecs = (string | RegExp)[] | string | RegExp;

export type DefaultAutoSlugOptions = Omit<AutoSlugOptions, 'anchor'> & {
	anchor?: AutoSlugAnchorOptions;
};

/**
 * input to preprocessor. Either on object of options or a
 * function that returns one (with the defaultOptions as its parameter).
 */
export type AutoSlugInput =
	AutoSlugOptions | ((defaultOptions: DefaultAutoSlugOptions) => AutoSlugOptions);

/**
 * instructions for adding anchor tag
 */
export interface AutoSlugAnchorOptions {
	/** whether to insert an anchor tag for each matching node */
	enabled?: boolean;
	/**
	 * where to create the anchor tag
	 *
	 * - 'prepend' — inject link before the target tag text
	 *
	 * - 'append' — inject link after the target tag text
	 *
	 * - 'wrap' — wrap the whole target tag text with the link
	 *
	 * - 'before' — insert link before the target tag
	 *
	 * - 'after' — insert link after the target tag
	 *
	 * default to `prepend`
	 */
	position?: 'prepend' | 'append' | 'wrap' | 'before' | 'after';
	/**
	 * content of the inserted anchor tag,
	 * ignored when behavior is `wrap`.
	 * Default to '#'
	 */
	content?: string;
	/**
	 * properties set to the inserted anchor tag,
	 * defaults to `{ 'aria-hidden': 'true', 'tab-index': '-1' }`,
	 * unless position is 'wrap' (no properties).
	 * When provided will replace the default completely (no merging)
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
	/** the {@link https://github.com/Flet/github-slugger | BananaSlug} object */
	slugger: BananaSlug;
}

/**
 * options to config preprocess-auto-slug
 */
export interface AutoSlugOptions {
	/** what files the vite plugin should process, passed to Vite `transform.filter.id.include` */
	include?: FilterIdSpecs;
	/** what files the vite plugin should skip, passed to Vite `transform.filter.id.exclude` */
	exclude?: FilterIdSpecs;
	/** target tag, default to all heading tags */
	tags?: string[];
	/** default to `id` */
	attributeName?: string;
	/** instructions to add the anchor tag */
	anchor?: AutoSlugAnchorOptions | false;
	/** slug resolver */
	slug?: (input: SlugResolverInput) => string;
}
