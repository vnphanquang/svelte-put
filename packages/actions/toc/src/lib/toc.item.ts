import type { TocObserveParameters } from './toc.parameters';

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
    strategy: TocObserveParameters['strategy'];
    /** the resolved toc threshold used for this matching element */
    threshold: TocObserveParameters['threshold'];
    /** the element that was observed by `IntersectionObserver` */
    element: HTMLElement;
  };
}
