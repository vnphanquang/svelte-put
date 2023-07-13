// LEAVE HERE BECAUSE OF THIS ISSUE https://github.com/Rich-Harris/dts-buddy/issues/26
// FIXME: refactor when above is resolved

/**
 * The default {@link TocParameters} for `toc` action
 */
export const DEFAULT_TOC_PARAMETERS = /** @satisfies {import('./parameter').TocParameters} */ ({
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
 * The default {@link TocLinkParameters} for `toclink` action
 * @internal
 */
export const DEFAULT_TOC_LINK_PARAMETERS =
  /** @satisfies {import('./parameter').TocLinkParameters} */ ({
    tocId: undefined,
    tocItem: undefined,
    observe: {
      enabled: false,
      throttleOnClick: 800,
      attribute: ['data-toc-link-current'],
    },
    store: undefined,
  });
