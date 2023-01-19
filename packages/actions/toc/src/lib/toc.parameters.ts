import type { TocItem } from './toc.item';
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
export interface TocParameters {
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
  anchor?: TocAnchorParameters | boolean;
  /**
   * instructions to track the active element in the viewport using `IntersectionObserver`.
   * Default to: `false`
   */
  observe?: TocObserveParameters | boolean;
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

/** @internal */
export type ResolvedTocParameters = ReturnType<typeof resolveTocParameters>;

/**
 * The default {@link TocParameters} for `toc` action
 * @internal
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
 * @internal
 * resolve {@link TocParameters}
 * for internal usage within toc operations
 */
export function resolveTocParameters(parameters: TocParameters) {
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
      typeof parameters.anchor === 'undefined'
        ? DEFAULT_TOC_PARAMETERS.anchor
        : typeof parameters.anchor === 'boolean'
        ? { ...DEFAULT_TOC_PARAMETERS.anchor, enabled: parameters.anchor }
        : {
            enabled: parameters.anchor.enabled ?? true,
            position: parameters.anchor.position ?? DEFAULT_TOC_PARAMETERS.anchor.position,
            content: parameters.anchor.content ?? DEFAULT_TOC_PARAMETERS.anchor.content,
            properties: {
              ...DEFAULT_TOC_PARAMETERS.anchor.properties,
              ...parameters.anchor.properties,
            },
            href: parameters.anchor.href ?? DEFAULT_TOC_PARAMETERS.anchor.href,
          },
    observe:
      typeof parameters.observe === 'undefined'
        ? DEFAULT_TOC_PARAMETERS.observe
        : typeof parameters.observe === 'boolean'
        ? { ...DEFAULT_TOC_PARAMETERS.observe, enabled: parameters.observe }
        : {
            ...DEFAULT_TOC_PARAMETERS.observe,
            ...parameters.observe,
            enabled: parameters.observe.enabled ?? true,
            strategy: parameters.observe.strategy ?? DEFAULT_TOC_PARAMETERS.observe.strategy,
            threshold: parameters.observe.threshold ?? DEFAULT_TOC_PARAMETERS.observe.threshold,
          },
    store: parameters.store,
  };
}

/**
 * Compare two ResolvedTocParameters
 * @deprecated not necessary as dynamic update is not supported
 * @internal
 * @param p1 first parameters object to compare
 * @param p2 second parameters object to compare
 * @returns whether 2 parameters objects have the same properties
 */
export function compareTocParameters(p1: ResolvedTocParameters, p2: ResolvedTocParameters) {
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

/**
 * @public
 * configure relationship between the `observe` functionality of `toc` and `toclink`
 */
export interface TocLinkObserveParameters {
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
export interface TocLinkParameters {
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
   * @see {@link TocLinkClickParameters}
   *
   * Default to: `false`
   */
  observe?: TocLinkObserveParameters | boolean;
  /**
   * svelte store as used in `use:toc`
   *
   * @remarks
   * recommended as an optimization when `observe.current` is enabled
   */
  store?: TocStore;
}

/**
 * The default {@link TocLinkParameters} for `toclink` action
 * @internal
 */
export const DEFAULT_TOC_LINK_PARAMETERS = {
  tocId: undefined,
  tocItem: undefined,
  observe: {
    enabled: false,
    throttleOnClick: 800,
    attribute: ['data-toc-link-current'],
  },
  store: undefined,
} satisfies TocLinkParameters;

/**
 * @internal
 * resolve {@link TocLinkParameters}
 * for internal usage within toc operations
 */
export function resolveTocLinkParameters(parameters: TocLinkParameters) {
  return {
    ...DEFAULT_TOC_LINK_PARAMETERS,
    ...parameters,
    observe:
      typeof parameters.observe === 'undefined'
        ? DEFAULT_TOC_LINK_PARAMETERS.observe
        : typeof parameters.observe === 'boolean'
        ? { ...DEFAULT_TOC_LINK_PARAMETERS.observe, enabled: parameters.observe }
        : {
            enabled: parameters.observe.enabled ?? true,
            attribute: resolveTocLinkAttribute(parameters.observe.attribute),
            throttleOnClick:
              parameters.observe.throttleOnClick ??
              DEFAULT_TOC_LINK_PARAMETERS.observe.throttleOnClick,
          },
    store: parameters.store ?? DEFAULT_TOC_LINK_PARAMETERS.store,
  };
}

/** @internal */
function resolveTocLinkAttribute(attribute?: TocLinkObserveParameters['attribute']): string[] {
  if (!attribute) return DEFAULT_TOC_LINK_PARAMETERS.observe.attribute;
  if (typeof attribute === 'boolean') return DEFAULT_TOC_LINK_PARAMETERS.observe.attribute;
  if (typeof attribute === 'string')
    return [...DEFAULT_TOC_LINK_PARAMETERS.observe.attribute, attribute];
  return [...DEFAULT_TOC_LINK_PARAMETERS.observe.attribute, ...attribute];
}
