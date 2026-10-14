import type { Attachment } from 'svelte/attachments';

import type { ResolvedTocAnchor, TocAnchorOptions } from '../anchor/types.public';
import type { ResolvedTocIndex, TocIndexOptions } from '../index/types.public';
import type { ResolvedTocTrack, TocTrackOptions, TocTrackResolver } from '../track/types.public';

/**
 * extracted data for an item in the Table-of-Contents, comes from either the compile-time
 * preprocessing or runtime parsing
 */
export interface TocItem {
	/**
	 * the slug of the item, typically the value of the id attribute, unless configured
	 * differently in the preprocessor options
	 */
	id: string;
	/**
	 * text content of the matching node
	 */
	text: string;
	/**
	 * tag name of the matching node, typically a heading element, unless configured
	 * differently in the preprocesor options
	 */
	tag: string;
	/**
	 * position of this item in the flat list of all Table-of-Contents items collected
	 * at compile-time
	 */
	index: number;
}

/** provide enhancements for Table-of-Contents */
export interface TocOptions {
	/**
	 * initialise toc with data about indexable content. This typically comes from `compileTime`, i.e
	 * compile-time preprocessing. At runtime, toc will parse the DOM again to search for any newly
	 * inserted content. If you are sure there is no such dynamic content, set `parsing` to false to
	 * skip it.
	 * @default undefined
	 */
	items?: Map<string, TocItem>;
	/**
	 * set up to enable tracking "active" content in Table-of-Contents
	 * @default true
	 */
	track?: TocTrackOptions | TocTrackResolver | boolean;
	/**
	 * instructions for indexing the Table-of-Contents entries, only takes effect when you call
	 * `toc.index()` on the element under which the DOM subtree will be indexed.
	 *
	 * If you can assert that your content is completely static, and you are already using `compileToc`
	 * to index at compile-time, simply skip calling `toc.index()` to save some bytes
	 */
	index?: TocIndexOptions;
	/** instructions for adding anchor tag to the matching tag */
	anchor?: TocAnchorOptions | boolean;
}

export type ResolvedTocOptions = Required<Pick<TocOptions, 'items'>> & {
	track: ResolvedTocTrack;
	index: ResolvedTocIndex<true>;
	anchor: ResolvedTocAnchor;
};

export interface RuntimeIndexAttributes {
	[symbol]: Attachment<HTMLElement>;
}

export interface EnhanceScopeAttributes {
	/**
	 * a marker to know that this is a common ancestor of indexable content and Table-of-Contents.
	 * It is picked up by `@svelte-put/toc/style.css`.
	 *
	 * The value is `'flat'` unless `track.flat` is turned off in the options, in which case it'll be an empty string.
	 */
	'data-toc-scope': '' | 'flat';
	/**
	 * exposes CSS variables to be picked up by `@svelte-put/goc/style.css`:
	 * `--items: --toc-0, --toc-1, ..., --toc-n` (up to the last indexed content)
	 *
	 * `undefined` initially if only reyling on runtime parsing
	 *             or if the top-level `track` option is turned off
	 */
	style?: string;
}

export interface EnhanceLinkAttributes {
	/**
	 * a marker to know that this is an enhanced toc link, picked up in `@svelte-put/toc/style.css`
	 * - `'first'` if this points to the first indexed content,
	 * - `'last'` if this points to the last indexed content,
	 * - empty string otherwise.
	 */
	'data-toc-link': string;
	/**
	 * ```
	 * `#${item.id}`
	 * ```
	 */
	href: string;
	/**
	 * title typically are rendered as an infobox by browser, which is helpful case the text is too long
	 * and is truncated with CSS
	 */
	title: string;
	/**
	 * exposes CSS variables to be picked up by `@svelte-put/toc/style.css`:
	 * - `--current: --toc-<item.index>`
	 * - `--next: --toc-<item.index + 1>`
	 * `undefined` initially if the asssociated toc item is only available after runtime parsing,
	 *             or if the top-level `track` option is turned off
	 */
	style?: string;
}
