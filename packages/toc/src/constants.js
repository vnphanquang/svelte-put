/**
 * all relevant data attribute name literals
 * @package
 */
export const ATTRIBUTES = /** @type {Record<string, keyof (import('./attributes').TocDataAttributes)>} */({
	// markers from `@svelte-put/preprocess-auo-slug`
	autoslug: 'data-auto-slug',
	autoSlugAnchor: 'data-auto-slug-anchor',
	autoSlugAnchorPosition: 'data-auto-slug-anchor-position',
	// markers
	toc: 'data-toc',
	anchor: 'data-toc-anchor',
	root: 'data-toc-root',
	// customization per matching element
	id: 'data-toc-id',
	ignore: 'data-toc-ignore',
	strategy: 'data-toc-strategy',
	threshold: 'data-toc-threshold',
	// tracking information for `IntersectionObserver`
	observeFor: 'data-toc-observe-for',
	observeThrottled: 'data-toc-observe-throttled',
	observeActiveId: 'data-toc-observe-active-id',
	// for elements that `use:toclink`
	linkFor: 'data-toc-link-for',
	linkActive: 'data-toc-link-active',
});

/**
 * The default {@link TocConfig} for `toc` action
 */
export const DEFAULT_TOC_CONFIG = /** @satisfies {import('./types.public').TocConfig} */ ({
	selector: ':where(h1, h2, h3, h4, h5, h6)',
	ignore: '.toc-exclude',
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
		link: {
			enabled: false,
			throttleOnClick: 800,
			activeAttribute: [ATTRIBUTES.linkActive],
		},
	},
});

