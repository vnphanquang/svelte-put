import type { TocItem } from '../action/action.d.ts';
import type { TocStore } from '../store/store.d.ts';

import type { resolveTocConfig } from './index.js';

/**
 * options to config how `toc` action create `IntersectionObserver` for each
 * matching toc element
 * @public
 */
export interface TocObserveConfig extends Omit<IntersectionObserverInit, 'threshold'> {
  /**
   * whether to add `IntersectionObserver` to each matching toc element
   * to track active active element in the viewport.
   * Default to: `true`
   */
  enabled?: boolean;
  /**
   * strategy to observe matching toc elements.
   *
   * - `'parent'` — observe the parent element of the matching toc element
   *
   * - `'self'` — observe the matching toc element itself
   *
   * - `'auto'` — attempt to compare matching toc element & its parent `offsetHeight` with
   * `window.innerHeight` to determine the best strategy.
   *
   * Default to: `auto`
   *
   * @remarks
   *
   * Alternatively, this can be override per element by setting the `data-toc-strategy` attribute
   * on that element.
   */
  strategy?: 'parent' | 'self' | 'auto';
  /**
   * threshold passed to `IntersectionObserver`.
   * Default to: `(element) => Math.min((0.8 * window.innerHeight) / element.offsetHeight, 1)`
   *
   * @remarks
   *
   * Alternatively, `data-toc-threshold` (number) attribute can be set on
   * the matching toc element
   */
  threshold?: number | ((element: HTMLElement) => number);
}

/**
 * options to config how `toc` action inject anchor tag for each matching toc element
 * @public
 */
export interface TocAnchorConfig {
  /** whether to insert an anchor tag for each matching node */
  enabled?: boolean;
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
   * Default to: 'prepend'
   */
  position?: 'prepend' | 'append' | 'wrap' | 'before' | 'after';
  /**
   * content of the inserted anchor tag,
   * ignored when behavior is `wrap`.
   * Default to: '#
   */
  content?: string;
  /**
   * properties set to the inserted anchor tag,
   * Default to: `{ 'aria-hidden': 'true', 'tab-index': '-1' }`
   */
  properties?: Record<string, string>;
  /**
   * href attribute of the inserted anchor tag
   * Default to: `href: (id) => '#' + id`
   */
  href?: (id: string) => string;
}

/**
 * @public
 */
export interface TocConfig {
  /**
   * A unique ID representing
   * the operation. This is used for caching so that if the action
   * is run multiple times it can use the results
   * from previous execution.
   * Default to: `crypto.randomUUID()`
   */
  id?: string;
  /**
   * the query selector used to find all matching
   * DOM elements.
   * Default to: `:where(h1, h2, h3, h4, h5, h6)`
   */
  selector?: string;
  /**
   * query selector(s) that match DOM elements to ignore
   * Each selector is used as `:not(selector)`.
   * Default to: `.toc-exclude`
   *
   * @remarks
   *
   * Alternatively, you can set the `data-toc-ignore` attribute on the element
   * Default to: `[]`
   */
  ignore?: string[] | string;
  /**
   * inline `scroll-margin-top` value applied matching elements.
   * Default to: `0`
   */
  scrollMarginTop?: number | string | ((element: HTMLElement) => number | string);
  /**
   * instructions to add the anchor tag.
   * Default to: `true`
   */
  anchor?: TocAnchorConfig | boolean;
  /**
   * instructions to track the active element in the viewport using `IntersectionObserver`.
   * Default to: `false`
   */
  observe?: TocObserveConfig | boolean;
  /**
   * a svelte store that, if provides, will update with the list of extracted
   * toc elements, and the active one (if `observe` is enabled)
   *
   * Default to: undefined
   *
   * @remarks
   * This provides an alternative to `on:tocinit` & `on:tocchange` with less code
   */
  store?: TocStore;
}

/** @public */
export type TocParameter = TocConfig | undefined;

/**
 * @public
 * configure relationship between the `observe` functionality of `toc` and `toclink`
 */
export interface TocLinkObserveConfig {
  /**
   * whether to enable this configuration
   * Default to: `false`
   */
  enabled?: boolean;
  /**
   * throttle the observe of `use:toc` on click
   *
   * @remarks
   * This ensures that the active toc item will be
   * the same one that this link is pointing to.
   * Otherwise, it is not guaranteed so, because `observe`
   * is handled with `IntersectionObserver` the next items might
   * already comes into viewport when this link is clicked.
   *
   * Set to 0 to disable throttling.
   *
   * Default to: `500`
   */
  throttleOnClick?: number;
  /**
   * boolean attribute(s) to indicate if this
   * is linking to the active toc item
   *
   * @remarks
   * For this to work, it is required that `tocItem` be provided
   * or the href is in the form `'#<toc-item-id>'`
   *
   * By default, `toclink` uses {@link https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver | MutationObserver}
   *  . For better performance, provide `store`
   *
   * Set `false` to disable this behavior
   *
   * Default to: `'data-toc-link-active'`
   */
  attribute?: string | string[] | boolean;
}

/**
 * @public
 * options to configure the behavior of the `toclink` svelte action
 */
export interface TocLinkConfig {
  /**
   * the ID of the toc operations.
   * If not provided will search for the closest toc root
   * (where `use:toc` is used)
   *
   * @remarks
   * In case where the element of `use:toc` and element of `use:toclink`
   * live in 2 different DOM subtrees, this is required otherwise `toclink`
   * will not take no effect.
   *
   * This option is recommended where possible as an optimization
   * to skip the search for the closest toc root.
   *
   * Alternatively, this can be skipped if the `store` option is provided
   */
  tocId?: string;
  /**
   * the matching toc item or its id to link to
   *
   * @remarks
   * if provided, href will be added automatically if not already there
   * Otherwise, you have to do that manually.
   *
   * @see {@link TocItem}
   */
  tocItem?: string | TocItem;
  /**
   * connect and reflect the `observe` functionality of `toc`
   * @see {@link TocObserveConfig}
   *
   * Default to: `false`
   */
  observe?: TocLinkObserveConfig | boolean;
  /**
   * svelte store as used in `use:toc`
   *
   * @remarks
   * recommended as an optimization when `observe.current` is enabled
   */
  store?: TocStore;
}

/** @public */
export type TocLinkParameter = TocLinkConfig | undefined;

/** @internal */
export type ResolvedTocConfig = ReturnType<typeof resolveTocConfig>;
