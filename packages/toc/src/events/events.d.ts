import type { TocItem } from '../action/action.d.ts';

/**
 *
 */
export interface TocEventDetail {
	/** the ID of this toc operation. see {@link TocParameters} */
	id: string;
}

/**
 * `event.detail` of `on:tocinit`
 *
 */
export interface TocInitEventDetail extends TocEventDetail {
	items: Map<string, TocItem>;
}

/**
 * `event.detail` of `on:tocchange`
 *
 */
export interface TocChangeEventDetail extends TocInitEventDetail {
	activeItem: TocItem;
}
