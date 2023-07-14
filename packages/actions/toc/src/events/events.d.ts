import type { TocItem } from '../action/action.d.ts';

/**
 * @public
 */
export interface TocEventDetail {
  /** the ID of this toc operation. see {@link TocParameters} */
  id: string;
}

/**
 * `event.detail` of `on:tocinit`
 * @public
 */
export interface TocInitEventDetail extends TocEventDetail {
  items: Record<string, TocItem>;
}

/**
 * `event.detail` of `on:tocchange`
 * @public
 */
export interface TocChangeEventDetail extends TocInitEventDetail {
  activeItem: TocItem;
}
