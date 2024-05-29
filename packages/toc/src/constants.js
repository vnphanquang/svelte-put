import { ATTRIBUTES } from './attributes/index.js';

/**
 * The default {@link TocConfig} for `toc` action
 */
export const DEFAULT_TOC_CONFIG = /** @satisfies {import('./types.js').TocConfig} */ ({
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
