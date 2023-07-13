import type { TocItem } from '../action/action.d.ts';

/**
 * @public
 */
export interface TocEventDetails {
  /** the ID of this toc operation. see {@link TocParameters} */
  id: string;
}

/**
 * `event.detail` of `on:tocinit`
 * @public
 */
export interface TocInitEventDetails extends TocEventDetails {
  items: Record<string, TocItem>;
}

/**
 * `event.detail` of `on:tocchange`
 * @public
 */
export interface TocChangeEventDetails extends TocInitEventDetails {
  activeItem: TocItem;
}
