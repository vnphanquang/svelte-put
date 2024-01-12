import { Action, ActionReturn } from 'svelte/action';

import type { TocEventAttributes } from '../attributes/attributes.d.ts';
import type {
  TocLinkParameter,
  TocObserveConfig,
  TocParameter,
} from '../parameter/parameter.d.ts';

/**
 * information about an extracted toc item
 * @public
 */
export interface TocItem {
  /**
   * the DOM element that was transformed
   */
  element: HTMLElement;
  /**
   * the id of `element` or the "slugified" string from `textContent`
   */
  id: string;
  /**
   * the `textContent` of `element`
   */
  text: string;
  /**
   * the anchor element inserted by the `toc` action unless
   * the `anchor.enabled` option from {@link TocParameters} is `false`
   */
  anchor?: HTMLAnchorElement;
  /**
   * the resolved observe config during extraction
   * unless the `observe.enabled` option from {@link TocParameters} is `false`
   */
  observe?: {
    /** the `IntersectionObserver` instance watching this `element`, */
    observer: IntersectionObserver;
    /** the resolved toc strategy used for this matching element */
    strategy: TocObserveConfig['strategy'];
    /** the resolved toc threshold used for this matching element */
    threshold: TocObserveConfig['threshold'];
    /** the element that was observed by `IntersectionObserver` */
    element: HTMLElement;
  };
}

/** @public */
export type TocAction = Action<HTMLElement, TocParameter, TocEventAttributes>;
/** @public */
export type TocActionReturn = ActionReturn<TocParameter, TocEventAttributes>;

/** @public */
export type TocLinkAction = Action<HTMLAnchorElement, TocLinkParameter>;
/** @public */
export type TocLinkActionReturn = ActionReturn<TocLinkParameter>;
