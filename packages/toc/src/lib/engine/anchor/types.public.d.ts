import type {
	ResolvedTocAttributes,
	TocAttributes,
	TocAttributesResolver,
} from '../attributes/types.public';

export type TocAnchorMixedPosition = 'wrap' | 'content';
export type TocAnchorIsolatedPosition = 'before' | 'prepend' | 'append' | 'after';
export type TocAnchorPosition = TocAnchorMixedPosition | TocAnchorIsolatedPosition;
export type TocAnchorMixedPositionWithFallback = [
	preferred: TocAnchorMixedPosition,
	fallback: TocAnchorIsolatedPosition,
];

/** instructions for adding anchor tag */
export interface TocAnchorOptions {
	/** whether to insert an anchor tag for each matching node */
	enabled?: boolean;
	/**
	 * where to create the anchor tag
	 * - 'before' - insert link before the target tag
	 * - 'prepend' - inject link as the first child of the target tag
	 * - 'wrap' - wrap the whole target tag with a link
	 * - 'content' - wrap the whole content of the target tag with a link
	 * - 'append' - inject link as the last child of the target tag
	 * - 'after' - insert link after the target tag
	 *
	 * In the case of `'wrap'` or `'content'`, markup becomes invalid if the target tag already has
	 * some link within (`<a>` cannot go inside another `<a>`). In such case, provide a fallback, e.g. ['wrap', 'append'].
	 *
	 * @default ['content', 'prepend']
	 */
	position?: TocAnchorPosition | TocAnchorMixedPositionWithFallback;
	/**
	 * content of the inserted anchor tag, or value of `--content` CSS variable when `position` is `'wrap'|'content'`
	 * @default '#'
	 */
	content?: string;
	/**
	 * attributes set to the inserted anchor tag, unless position is 'wrap' (no attributes).
	 * when provided will replace the default completely (no merging),
	 * alternatively, provide a callback where input is the default attributes
	 *
	 * Defaults:
	 * - `href`: point to the current item's id
	 * - `data-toc-anchor`: set to the `position` option
	 * - `aria-hidden` & `tabindex="-1"`: if `position` is anything other than `'wrap'|'content'`
	 * - `style` with the following CSS variables if `position` is `'wrap'|'content'`:
	 *   - `--current:--toc-<number>`: where number is the item's position, intended for CSS Anchor positioning
	 *   - `--content: <string>`: value of the content option
	 */
	attributes?: TocAttributes | TocAttributesResolver;
}

export type ResolvedTocAnchorPosition = {
	try: TocAnchorPosition;
	fallback: TocAnchorIsolatedPosition;
};
export type ResolvedTocAnchor = Required<Omit<TocAnchorOptions, 'attributes' | 'position'>> & {
	position: ResolvedTocAnchorPosition;
	attributes: ResolvedTocAttributes;
};
