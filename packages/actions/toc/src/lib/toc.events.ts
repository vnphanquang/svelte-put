import type { TocItem } from './toc.item';

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

/**
 * all relevant event name literals
 * @internal
 */
export const EVENTS = {
  init: 'tocinit',
  change: 'tocchange',
};

/**
 * @internal
 */
export function dispatchChange(node: HTMLElement, detail: TocChangeEventDetails) {
  node.dispatchEvent(new CustomEvent(EVENTS.change, { detail }));
  return detail;
}

/**
 * @internal
 */
export function dispatchInit(node: HTMLElement, detail: TocInitEventDetails) {
  node.dispatchEvent(new CustomEvent(EVENTS.init, { detail }));
  return detail;
}
