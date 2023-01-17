import type { TocStore } from './toc.store';

/**
 * options to config how `toc` action create `IntersectionObserver` for each
 * matching toc element
 * @public
 */
export interface TocObserveParameters extends Omit<IntersectionObserverInit, 'threshold'> {
  /**
   * whether to add `IntersectionObserver` to each matching toc element
   * to track active active element in the viewport.
   * @defaultValue `true`
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
   * @defaultValue `auto`
   *
   * @remarks
   *
   * Alternatively, this can be override per element by setting the `data-toc-strategy` attribute
   * on that element.
   */
  strategy?: 'parent' | 'self' | 'auto';
  /**
   * threshold passed to `IntersectionObserver`.
   * @defaultValue `(element) => Math.min((0.8 * window.innerHeight) / element.offsetHeight, 1)`
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
export interface TocAnchorParameters {
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
   * @defaultValue 'prepend'
   */
  position?: 'prepend' | 'append' | 'wrap' | 'before' | 'after';
  /**
   * content of the inserted anchor tag,
   * ignored when behavior is `wrap`.
   * @defaultValue '#
   */
  content?: string;
  /**
   * properties set to the inserted anchor tag,
   * @defaultValue `{ 'aria-hidden': 'true', 'tab-index': '-1' }`
   */
  properties?: Record<string, string>;
  /**
   * href attribute of the inserted anchor tag
   * @defaultValue `href: (id) => '#' + id`
   */
  href?: (id: string) => string;
}

/**
 * @public
 */
export interface TocParameters {
  /**
   * A unique ID representing
   * the operation. This is used for caching so that if the action
   * is run multiple times with same parameters it can use the results
   * from previous execution.
   * @defaultValue `crypto.randomUUID()`
   */
  id?: string;
  /**
   * the query selector used to find all matching
   * DOM elements.
   * @defaultValue `:where(h1, h2, h3, h4, h5, h6)`
   */
  selector?: string;
  /**
   * query selector(s) that match DOM elements to ignore
   * Each selector is used as `:not(selector)`.
   * @defaultValue `.toc-exclude`
   *
   * @remarks
   *
   * Alternatively, you can set the `data-toc-ignore` attribute on the element
   * @defaultValue `[]`
   */
  ignore?: string[] | string;
  /**
   * inline `scroll-margin-top` value applied matching elements.
   * @defaultValue `0`
   */
  scrollMarginTop?: number | string | ((element: HTMLElement) => number | string);
  /**
   * instructions to add the anchor tag. Default to `true` (default options)
   * @defaultValue `true`
   */
  anchor?: TocAnchorParameters | boolean;
  /**
   * instructions to track the active element in the viewport using `IntersectionObserver`.
   * @defaultValue `false`
   */
  observe?: TocObserveParameters | boolean;
  /**
   * a svelte store that, if provides, will update with the list of extracted
   * toc elements, and the active one (if `observe` is enabled)
   *
   * @defaultValue undefined
   *
   * @remarks
   * This provides an alternative to `on:tocinit` & `on:tocchange` with less code
   */
  store?: TocStore;
}

/** @internal */
export type ResolvedTocParameters = ReturnType<typeof resolve>;

/**
 * The default {@link TocParameters} for `toc` action
 * @public
 */
export const DEFAULT_TOC_PARAMETERS = {
  id: '',
  selector: ':where(h1, h2, h3, h4, h5, h6)',
  ignore: ['.toc-exclude'],
  scrollMarginTop: 0,
  anchor: {
    enabled: true,
    content: '#',
    position: 'prepend',
    properties: {
      'aria-hidden': 'true',
      tabindex: '-1',
    },
    href: (slug) => `#${slug}`,
  },
  observe: {
    enabled: false,
    strategy: 'auto',
    threshold: (element) => Math.min((0.8 * window.innerHeight) / element.offsetHeight, 1),
  },
  store: undefined,
} satisfies TocParameters;

/**
 * resolve {@link TocParameters} to for internal usage
 * for internal usage within toc operations
 *
 * @internal
 *
 * @param parameters
 * @returns
 */
export function resolve(parameters: TocParameters) {
  let ignore: string[] = DEFAULT_TOC_PARAMETERS.ignore;
  if (parameters.ignore) {
    ignore = Array.isArray(parameters.ignore) ? parameters.ignore : [parameters.ignore];
  }
  return {
    id: parameters?.id ?? crypto.randomUUID(),
    selector: `${parameters.selector ?? DEFAULT_TOC_PARAMETERS.selector}${ignore
      .map((i) => `:not(${i})`)
      .join('')}`,
    scrollMarginTop: parameters.scrollMarginTop ?? DEFAULT_TOC_PARAMETERS.scrollMarginTop,
    anchor:
      typeof parameters.anchor === 'boolean'
        ? { ...DEFAULT_TOC_PARAMETERS.anchor, enabled: parameters.anchor }
        : {
            enabled: parameters.anchor?.enabled ?? true,
            position: parameters.anchor?.position ?? DEFAULT_TOC_PARAMETERS.anchor.position,
            content: parameters.anchor?.content ?? DEFAULT_TOC_PARAMETERS.anchor.content,
            properties: {
              ...DEFAULT_TOC_PARAMETERS.anchor.properties,
              ...parameters.anchor?.properties,
            },
            href: parameters.anchor?.href ?? DEFAULT_TOC_PARAMETERS.anchor.href,
          },
    observe:
      typeof parameters.observe === 'boolean'
        ? { ...DEFAULT_TOC_PARAMETERS.observe, enabled: parameters.observe }
        : {
            ...DEFAULT_TOC_PARAMETERS.observe,
            ...parameters.observe,
            enabled: parameters.observe?.enabled ?? true,
            strategy: parameters.observe?.strategy ?? DEFAULT_TOC_PARAMETERS.observe.strategy,
            threshold: parameters.observe?.threshold ?? DEFAULT_TOC_PARAMETERS.observe.threshold,
          },
    store: parameters.store,
  };
}

/**
 * Compare two ResolvedTocParameters
 * @internal
 * @param p1 first parameters object to compare
 * @param p2 second parameters object to compare
 * @returns whether 2 parameters objects have the same properties
 */
export function compare(p1: ResolvedTocParameters, p2: ResolvedTocParameters) {
  return Object.keys(p1).every((key) => {
    const typedKey = key as keyof ResolvedTocParameters;
    if (typedKey === 'anchor') {
      return Object.keys(p1.anchor).every((anchorKey) => {
        const typedAnchorKey = anchorKey as keyof ResolvedTocParameters['anchor'];
        return p1.anchor[typedAnchorKey] === p2.anchor[typedAnchorKey];
      });
    }
    if (typedKey === 'observe') {
      return Object.keys(p1.observe).every((observeKey) => {
        const typedObserveKey = observeKey as keyof ResolvedTocParameters['observe'];
        return p1.observe[typedObserveKey] === p2.observe[typedObserveKey];
      });
    }
    return p1[typedKey] === p2[typedKey];
  });
}
