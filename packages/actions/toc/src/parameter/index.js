import { DEFAULT_TOC_LINK_PARAMETER, DEFAULT_TOC_PARAMETER } from './const.js';

/**
 * @internal
 * resolve {@link TocParameter}
 * for internal usage within toc operations
 * @param {import('./parameter.js').TocParameter} param
 */
export function resolveTocConfig(param = {}) {
  /** @type {string[]} */
  let ignore = DEFAULT_TOC_PARAMETER.ignore;
  if (param.ignore) {
    ignore = Array.isArray(param.ignore) ? param.ignore : [param.ignore];
  }
  return {
    id: param?.id ?? param?.store?.id() ?? crypto.randomUUID(),
    selector: `${param.selector ?? DEFAULT_TOC_PARAMETER.selector}${ignore
      .map((i) => `:not(${i})`)
      .join('')}`,
    scrollMarginTop: param.scrollMarginTop ?? DEFAULT_TOC_PARAMETER.scrollMarginTop,
    anchor:
      typeof param.anchor === 'undefined'
        ? DEFAULT_TOC_PARAMETER.anchor
        : typeof param.anchor === 'boolean'
        ? { ...DEFAULT_TOC_PARAMETER.anchor, enabled: param.anchor }
        : {
            enabled: param.anchor.enabled ?? true,
            position: param.anchor.position ?? DEFAULT_TOC_PARAMETER.anchor.position,
            content: param.anchor.content ?? DEFAULT_TOC_PARAMETER.anchor.content,
            properties: {
              ...DEFAULT_TOC_PARAMETER.anchor.properties,
              ...param.anchor.properties,
            },
            href: param.anchor.href ?? DEFAULT_TOC_PARAMETER.anchor.href,
          },
    observe:
      typeof param.observe === 'undefined'
        ? DEFAULT_TOC_PARAMETER.observe
        : typeof param.observe === 'boolean'
        ? { ...DEFAULT_TOC_PARAMETER.observe, enabled: param.observe }
        : {
            ...DEFAULT_TOC_PARAMETER.observe,
            ...param.observe,
            enabled: param.observe.enabled ?? true,
            strategy: param.observe.strategy ?? DEFAULT_TOC_PARAMETER.observe.strategy,
            threshold: param.observe.threshold ?? DEFAULT_TOC_PARAMETER.observe.threshold,
          },
    store: param.store,
  };
}

/**
 * Compare two ResolvedTocConfig
 * @deprecated not necessary as dynamic update is not supported
 * @internal
 * @param {import('./parameter.js').ResolvedTocConfig} p1 first parameters object to compare
 * @param {import('./parameter.js').ResolvedTocConfig} p2 second parameters object to compare
 * @returns whether 2 parameters objects have the same properties
 */
export function compareTocParameters(p1, p2) {
  return Object.keys(p1).every((key) => {
    const typedKey = /** @type {keyof import('./parameter.js').ResolvedTocConfig} */ (key);
    if (typedKey === 'anchor') {
      return Object.keys(p1.anchor).every((anchorKey) => {
        const typedAnchorKey =
          /** @type {keyof import('./parameter.js').ResolvedTocConfig['anchor']} */ (anchorKey);
        return p1.anchor[typedAnchorKey] === p2.anchor[typedAnchorKey];
      });
    }
    if (typedKey === 'observe') {
      return Object.keys(p1.observe).every((observeKey) => {
        const typedObserveKey =
          /** @type {keyof import('./parameter.js').ResolvedTocConfig['observe']}*/ (observeKey);
        return p1.observe[typedObserveKey] === p2.observe[typedObserveKey];
      });
    }
    return p1[typedKey] === p2[typedKey];
  });
}
/**
 * @internal
 * resolve {@link TocLinkParameter} for internal usage within toc operations
 * @param {import('./parameter.js').TocLinkParameter} param
 */
export function resolveTocLinkConfig(param = {}) {
  return {
    ...DEFAULT_TOC_LINK_PARAMETER,
    ...param,
    observe:
      typeof param.observe === 'undefined'
        ? DEFAULT_TOC_LINK_PARAMETER.observe
        : typeof param.observe === 'boolean'
        ? { ...DEFAULT_TOC_LINK_PARAMETER.observe, enabled: param.observe }
        : {
            enabled: param.observe.enabled ?? true,
            attribute: resolveTocLinkObserveAttribute(param.observe.attribute),
            throttleOnClick:
              param.observe.throttleOnClick ?? DEFAULT_TOC_LINK_PARAMETER.observe.throttleOnClick,
          },
    store: param.store ?? DEFAULT_TOC_LINK_PARAMETER.store,
  };
}

/**
 * @internal
 * @param {import('./parameter.js').TocLinkObserveConfig['attribute']} attribute | undefined
 * @returns {string[]}
 */
function resolveTocLinkObserveAttribute(attribute) {
  if (!attribute) return DEFAULT_TOC_LINK_PARAMETER.observe.attribute;
  if (typeof attribute === 'boolean') return DEFAULT_TOC_LINK_PARAMETER.observe.attribute;
  if (typeof attribute === 'string')
    return [...DEFAULT_TOC_LINK_PARAMETER.observe.attribute, attribute];
  return [...DEFAULT_TOC_LINK_PARAMETER.observe.attribute, ...attribute];
}

/**
 * @internal
 * @param {import('./parameter.js').TocLinkConfig} a
 * @param {import('./parameter.js').TocLinkConfig} b
 * @returns {boolean}
 */
export function compareTocLinkConfig(a, b) {
  return a.store === b.store && JSON.stringify(a) === JSON.stringify(b);
}

/**
 * Deprecated, use `TocParameter` and `TocConfig` instead
 * @typedef {import('./parameter').TocConfig} TocParameters
 */

/**
 * Deprecated, use `TocLinkParameter` and `TocLinkConfig` instead
 * @typedef {import('./parameter').TocLinkConfig} TocLinkParameters
 */
