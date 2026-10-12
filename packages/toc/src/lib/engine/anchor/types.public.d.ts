import type {
	ResolvedTocAttributes,
	TocAttributes,
	TocAttributesResolver,
} from '../attributes/types.public';

/** instructions for adding anchor tag */
export interface TocAnchorOptions {
	/** whether to insert an anchor tag for each matching node */
	enabled?: boolean;
	/**
	 * where to create the anchor tag
	 * - 'prepend' - inject link before the target tag text
	 * - 'append' - inject link after the target tag text
	 * - 'wrap' - wrap the whole target tag text with the link
	 * - 'content' - wrap the whole content text with the link
	 * - 'before' - insert link before the target tag
	 * - 'after' - insert link after the target tag
	 * @default 'content'
	 */
	position?: 'prepend' | 'append' | 'wrap' | 'before' | 'after' | 'content';
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
	 * - `data-toc-anchor`: set to the `position` option
	 * - `aria-hidden` & `tabindex="-1"`: if `position` is anything other than `'wrap'|'content'`
	 * - `style` with the following CSS variables if `position` is `'wrap'|'content'`:
	 *   - `--current:--toc-<number>`: where number is the item's position, intended for CSS Anchor positioning
	 *   - `--content: <string>`: value of the content option
	 */
	attributes?: TocAttributes | TocAttributesResolver;
	/** href attribute of the inserted anchor tag */
	href?: (slug: string) => string;
}

export type ResolvedTocAnchor = Required<Omit<TocAnchorOptions, 'attributes'>> & {
	attributes: ResolvedTocAttributes;
};
