import type { Writable } from 'svelte/store';

/**
 * options to config how `toc` action create `IntersectionObserver` for each
 * matching toc element
 * @public
 */
export interface TocObserveParameters extends Omit<IntersectionObserverInit, 'threshold'> {
  /**
   * whether to add `IntersectionObserver` to each matching toc element
   * to track active active element in the viewport.
   * default to `true`
   */
  enabled: boolean;
  /**
   * strategy to observe matching toc elements. default to `auto`
   *
   * - `'parent'` — observe the parent element of the matching toc element
   *
   * - `'self'` — observe the matching toc element itself
   *
   * - `'auto'` — attempt to compare matching toc element & its parent `offsetHeight` with
   * `window.innerHeight` to determine the best strategy.
   *
   * @remarks
   *
   * Alternatively, this can be override per element by setting the `data-toc-strategy` attribute
   * on that element.
   */
  strategy: 'parent' | 'self' | 'auto';
  /**
   * threshold passed to `IntersectionObserver`.
   * default to `(element) => Math.min((0.8 * window.innerHeight) / element.offsetHeight, 1)`
   *
   * @remarks
   *
   * Alternatively, `data-toc-threshold` (number) attribute can be set on
   * the matching toc element
   */
  threshold: number | ((element: HTMLElement) => number);
}

/**
 * options to config how `toc` action inject anchor tag for each matching toc element
 * @public
 */
export interface TocAnchorParameters {
  /** whether to insert an anchor tag for each matching node */
  enabled: boolean;
  /**
   * where to create the anchor tag
   *
   * - 'prepend' — inject link before the target tag text
   *
   * - 'append' — inject link after the target tag text
   *
   * - 'wrap' — wrap the whole target tag text with the link
   *
   * - 'before' — insert link before the target tag
   *
   * - 'after' — insert link after the target tag
   *
   * default to `prepend`
   */
  position: 'prepend' | 'append' | 'wrap' | 'before' | 'after';
  /**
   * content of the inserted anchor tag,
   * ignored when behavior is `wrap`.
   * Default to '#'
   */
  content: string;
  /**
   * properties set to the inserted anchor tag,
   * defaults to `{ 'aria-hidden': 'true', 'tab-index': '-1' }`
   */
  properties: Record<string, string>;
  /** href attribute of the inserted anchor tag */
  href: (id: string) => string;
}

/**
 * @public
 */
export interface TocParameters {
  /**
   * A unique ID representing
   * the operation. This is used for caching so that if the action
   * is run multiple times with same parameters it can use the results
   * from previous execution. Defaults to `crypto.randomUUID()`
   */
  id: string;
  /**
   * the query selector used to find all matching
   * DOM elements. Defaults to `:where(h1, h2, h3, h4, h5, h6)`
   */
  selector: string;
  /**
   * query selector(s) that match DOM elements to ignore
   * Each selector is used as `:not(selector)`. Defaults to `.toc-exclude`
   *
   * @remarks
   *
   * Alternatively, you can set the `data-toc-ignore` attribute on the element
   */
  ignore: string[] | string;
  /**
   * instructions to add the anchor tag. Default to `true` (default options)
   */
  anchor: TocAnchorParameters | boolean;
  /**
   * inline `scroll-margin-top` value applied matching elements.
   * Defaults to `0`
   */
  scrollMarginTop: number | string | ((element: HTMLElement) => number | string);
  /**
   * instructions to track the active element in the viewport using `IntersectionObserver`.
   * default to `false`
   */
  observe: TocObserveParameters | boolean;
  /**
   * a svelte store that, if provides, will update with the list of extracted
   * toc elements, and the active one (if `observe` is enabled)
   *
   * @remarks
   *
   * This provides an alternative to `on:tocinit` & `on:tocchange` with less code
   */
  store?: Writable<TocStoreValue>;
}

/**
 * Resolved {@link TocParameters} from `toc` action input
 * @internal
 */
export type ResolvedTocParameters = Omit<TocParameters, 'ignore'> & {
  anchor: TocAnchorParameters;
  observe: TocObserveParameters;
};

/**
 * user-defined `toc` parameters
 * @public
 */
export type UserTocParameters = Partial<
  Omit<TocParameters, 'observe' | 'anchor'> & {
    observe: Partial<TocObserveParameters> | boolean;
    anchor: Partial<TocAnchorParameters> | boolean;
  }
>;

/**
 * @public
 */
export type TocStoreValue = {
  /** the ID of this toc operation. see {@link TocParameters}, set on mount (`tocinit`) */
  id?: string;
  /** the extracted toc items, populated on mount (`tocinit`) */
  items: TocInitEventDetails['items'];
  /** the active toc items, set on update (`tocchange`) if `observer` is set to true */
  activeItem?: TocChangeEventDetails['activeItem'];
};

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
    strategy: TocObserveParameters['strategy'];
    threshold: TocObserveParameters['threshold'];
  };
}

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
export interface TocChangeEventDetails extends TocEventDetails {
  activeItem: TocItem;
}

/**
 * @public
 */
export interface TocAttributes {
  'on:tocinit'?: (event: CustomEvent<TocInitEventDetails>) => void;
  'on:tocchange'?: (event: CustomEvent<TocChangeEventDetails>) => void;
}

/**
 * Data attributes to override `toc` behavior per matching element
 * @public
 */
export interface TocDataAttributes {
  /** whether to ignore this element when searching for matching elements */
  'data-toc-ignore'?: boolean;
  /**
   * the `id` to use for this element in `toc` context. If not provided, this
   * will be the element `id`, or generated by `toc`
   * if element does not have an `id` either.
   */
  'data-toc-id'?: string;
  /**
   * override the `strategy` for this element to use in creating
   * `IntersectionObserver` This only has effect if the `observe`
   * option is enabled in {@link TocParameters}
   */
  'data-toc-strategy'?: TocObserveParameters['strategy'];
  /**
   * override the `threshold` for this element to use in creating
   * `IntersectionObserver` This only has effect if the `observe`
   * option is enabled in {@link TocParameters}
   */
  'data-toc-threshold'?: number;
}

/**
 * @internal
 */
export type TocCacheItem = {
  parameters: ResolvedTocParameters;
  items: Record<string, TocItem>;
};
