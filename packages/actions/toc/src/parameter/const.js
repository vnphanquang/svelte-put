/**
 * The default {@link TocParameter} for `toc` action
 */
export const DEFAULT_TOC_PARAMETER = /** @satisfies {import('./parameter').TocParameter} */ ({
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
});

/**
 * The default {@link TocLinkParameter} for `toclink` action
 * @internal
 */
export const DEFAULT_TOC_LINK_PARAMETER =
  /** @satisfies {import('./parameter').TocLinkParameter} */ ({
    tocId: undefined,
    tocItem: undefined,
    observe: {
      enabled: false,
      throttleOnClick: 800,
      attribute: ['data-toc-link-current'],
    },
    store: undefined,
  });
