import type {
	ResolvedTocAttributes,
	TocAttributes,
	TocAttributesResolver,
} from '../attributes/types.public';

export interface TocSharedIndexOptions {
	/**
	 * look for this attribute, if present will be taken as slug otherwise, set it to the generated slug
	 * @default to 'id'
	 */
	idAttribute?: string;
	/** instructions for generating slug */
	slug?: TocIndexSlugResolver;
	/**
	 * attributes to set on the matching tag, when provided will replace the default completely (no merging),
	 * alternatively, provide a callback where input is the default attributes
	 *
	 * Defaults:
	 * - `data-toc-index` includes the folowing comma separated string:
	 *   - 'first' or 'last', depending on its position
	 *   - 'nonflat', if track.flat options
	 * - `style:--current="--toc-{number}"`: where number is its position
	 * - `style:--next="--toc-{number}"` (if any): where number is the next item's position
	 */
	attributes?: TocAttributes | TocAttributesResolver;
}

export interface TocIndexOptions extends TocSharedIndexOptions {
	/**
	 * target tag name as Table-of-Content entries
	 * @default ['h2', 'h3', 'h4', 'h5', 'h6']
	 */
	tags?: string[];
}

export interface TocRuntimeIndexOptions extends TocSharedIndexOptions {
	/**
	 * CSS selector to find matching tags for Table-of-Contents entries
	 *
	 * This is the equivalence of the `tags` option in preprocessor, but more flexible since it is
	 * passed to `.querySelector` at runtime in the real DOM
	 *
	 * To filter out certain elements, add `:not(...)` to the selector.
	 * Alternatively, add `data-toc-ignore` attribute to the element's markup
	 *
	 * @default `:is(h2, h3, h4, h5, h6)`
	 */
	selector?: string;
}

export type ResolvedTocIndex<Runtime extends boolean = false> = Required<
	Omit<Runtime extends true ? TocRuntimeIndexOptions : TocIndexOptions, 'attributes'>
> & {
	attributes: ResolvedTocAttributes;
};

/** information passed as parameter to slug resolver */
export interface TocIndexSlugResolverInput {
	/** generated slug, by default slug will resolve to this */
	generated: string;
	/** text extracted from original node */
	nodeText: string;
	/** see https://github.com/Flet/github-slugger */
	slugger: BananaSlug;
}
export type TocIndexSlugResolver = (input: TocIndexSlugResolverInput) => string;
