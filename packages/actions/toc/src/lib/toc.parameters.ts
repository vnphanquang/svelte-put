import type { TocParameters, ResolvedTocParameters, UserTocParameters } from './toc.types';

/**
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
} satisfies TocParameters;

/**
 * @internal
 *
 * @param parameters
 * @returns
 */
export function resolve(parameters: UserTocParameters): ResolvedTocParameters {
  let ignore: string[] = DEFAULT_TOC_PARAMETERS.ignore;
  if (parameters.ignore) {
    ignore = Array.isArray(parameters.ignore) ? parameters.ignore : [parameters.ignore];
  }
  return {
    ...DEFAULT_TOC_PARAMETERS,
    ...parameters,
    selector: `${parameters.selector ?? DEFAULT_TOC_PARAMETERS.selector}${ignore
      .map((i) => `:not(${i})`)
      .join('')}`,
    id: parameters?.id ?? crypto.randomUUID(),
    anchor:
      typeof parameters.anchor === 'boolean'
        ? { ...DEFAULT_TOC_PARAMETERS.anchor, enabled: parameters.anchor }
        : {
            ...DEFAULT_TOC_PARAMETERS.anchor,
            ...parameters.anchor,
            enabled: parameters.anchor?.enabled ?? true,
            properties: {
              ...DEFAULT_TOC_PARAMETERS.anchor.properties,
              ...parameters.anchor?.properties,
            },
          },
    observe:
      typeof parameters.observe === 'boolean'
        ? { ...DEFAULT_TOC_PARAMETERS.observe, enabled: parameters.observe }
        : {
            ...DEFAULT_TOC_PARAMETERS.observe,
            ...parameters.observe,
            enabled: parameters.observe?.enabled ?? true,
          },
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
