import { DEFAULT_TOC_LINK_PARAMETERS, DEFAULT_TOC_PARAMETERS } from './const.js';

/**
 * @internal
 * resolve {@link TocParameters}
 * for internal usage within toc operations
 * @param {import('./parameter.js').TocParameters} parameters
 */
export function resolveTocParameters(parameters) {
  /** @type {string[]} */
  let ignore = DEFAULT_TOC_PARAMETERS.ignore;
  if (parameters.ignore) {
    ignore = Array.isArray(parameters.ignore) ? parameters.ignore : [parameters.ignore];
  }
  return {
    id: parameters?.id ?? parameters?.store?.id() ?? crypto.randomUUID(),
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
 * @param {import('./parameter.js').ResolvedTocParameters} p1 first parameters object to compare
 * @param {import('./parameter.js').ResolvedTocParameters} p2 second parameters object to compare
 * @returns whether 2 parameters objects have the same properties
 */
export function compareTocParameters(p1, p2) {
  return Object.keys(p1).every((key) => {
    const typedKey = /** @type {keyof import('./parameter.js').ResolvedTocParameters} */ (key);
    if (typedKey === 'anchor') {
      return Object.keys(p1.anchor).every((anchorKey) => {
        const typedAnchorKey =
          /** @type {keyof import('./parameter.js').ResolvedTocParameters['anchor']} */ (anchorKey);
        return p1.anchor[typedAnchorKey] === p2.anchor[typedAnchorKey];
      });
    }
    if (typedKey === 'observe') {
      return Object.keys(p1.observe).every((observeKey) => {
        const typedObserveKey =
          /** @type {keyof import('./parameter.js').ResolvedTocParameters['observe']}*/ (
            observeKey
          );
        return p1.observe[typedObserveKey] === p2.observe[typedObserveKey];
      });
    }
    return p1[typedKey] === p2[typedKey];
  });
}
/**
 * @internal
 * resolve {@link TocLinkParameters} for internal usage within toc operations
 * @param {import('./parameter.js').TocLinkParameters} parameters
 */
export function resolveTocLinkParameters(parameters) {
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
            attribute: resolveTocLinkObserveAttribute(parameters.observe.attribute),
            throttleOnClick:
              parameters.observe.throttleOnClick ??
              DEFAULT_TOC_LINK_PARAMETERS.observe.throttleOnClick,
          },
    store: parameters.store ?? DEFAULT_TOC_LINK_PARAMETERS.store,
  };
}

/**
 * @internal
 * @param {import('./parameter.js').TocLinkObserveParameters['attribute']} attribute | undefined
 * @returns {string[]}
 */
function resolveTocLinkObserveAttribute(attribute) {
  if (!attribute) return DEFAULT_TOC_LINK_PARAMETERS.observe.attribute;
  if (typeof attribute === 'boolean') return DEFAULT_TOC_LINK_PARAMETERS.observe.attribute;
  if (typeof attribute === 'string')
    return [...DEFAULT_TOC_LINK_PARAMETERS.observe.attribute, attribute];
  return [...DEFAULT_TOC_LINK_PARAMETERS.observe.attribute, ...attribute];
}

/**
 * @internal
 * @param {import('./parameter.js').TocLinkParameters} a
 * @param {import('./parameter.js').TocLinkParameters} b
 * @returns {boolean}
 */
export function compareTocLinkParameters(a, b) {
  return a.store === b.store && JSON.stringify(a) === JSON.stringify(b);
}
