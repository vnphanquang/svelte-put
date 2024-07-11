/**
 * options to config how `toc` action create `IntersectionObserver` for each
 * matching toc element
 */
export interface TocObserveConfig extends Omit<IntersectionObserverInit, 'threshold'> {
	/**
	 * whether to add `IntersectionObserver` to each matching toc element
	 * to track active active element in the viewport.
	 * Default to: `true`
	 */
	enabled: boolean;
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
	 * Alternatively, this can be overridden per element by setting the `data-toc-strategy` attribute
	 * on that element.
	 */
	strategy: 'parent' | 'self' | 'auto';
	/**
	 * threshold passed to `IntersectionObserver`.
	 * Default to: `(element) => Math.min((0.8 * window.innerHeight) / element.offsetHeight, 1)`
	 *
	 * Alternatively, `data-toc-threshold` (number) attribute can be set on
	 * the matching toc element
	 */
	threshold: number | ((element: HTMLElement) => number);
	/**
	 * behavioral configuration for elements that `use:toc.actions.link={tocItem}` is placed on.
	 */
	link: {
		/**
		 * whether to enable this configuration
		 * Default to: `false`
		 */
		enabled: boolean;
		/**
		 * throttle the observe of `use:toc.actions.link` on click
		 *
		 * This ensures that the active toc item will be
		 * the same one that this link is pointing to.
		 * Otherwise, it is not guaranteed so, because `observe`
		 * is handled with `IntersectionObserver` the next items might
		 * already comes into viewport when this link is clicked.
		 *
		 * Set to 0 to disable throttling.
		 *
		 * Default to: `800`
		 */
		throttleOnClick: number;
		/**
		 * boolean attribute(s) to indicate if this
		 * is linking to the active toc item
		 *
		 * For this to work, it is required that `tocItem` be provided
		 * or the href is in the form `'#<toc-item-id>'`
		 *
		 * By default, `toclink` uses {@link https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver | MutationObserver}
		 *
		 * Set `false` to disable this behavior
		 *
		 * Default to: `'data-toc-link-active'`
		 */
		activeAttribute: string | string[] | boolean;
	};
}

/**
 * options to config how `toc` action inject anchor tag for each matching toc element
 */
export interface TocAnchorConfig {
	/** whether to insert an anchor tag for each matching node */
	enabled: boolean;
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
	position: 'prepend' | 'append' | 'wrap' | 'before' | 'after';
	/**
	 * content of the inserted anchor tag,
	 * ignored when behavior is `wrap`.
	 * Default to: '#
	 */
	content: string;
	/**
	 * href attribute of the inserted anchor tag
	 * Default to: `href: (id) => '#' + id`
	 */
	href: (id: string) => string;
	/**
	 * properties set to the inserted anchor tag,
	 * Default to: `{ 'aria-hidden': 'true', 'tab-index': '-1' }`
	 */
	properties: Record<string, string>;
}

export interface TocConfig {
	/**
	 * the query selector used to find all matching
	 * DOM elements.
	 * Default to: `:where(h1, h2, h3, h4, h5, h6)`
	 */
	selector: string;
	/**
	 * query selector(s) that match DOM elements to ignore
	 * Each selector is used as `:not(selector)`.
	 * Default to: `.toc-exclude`
	 *
	 * Alternatively, you can set the `data-toc-ignore` attribute on the element
	 * Default to: `[]`
	 */
	ignore: string[] | string;
	/**
	 * inline `scroll-margin-top` value applied matching elements.
	 * Default to: `0`
	 */
	scrollMarginTop: number | string | ((element: HTMLElement) => number | string);
	/**
	 * instructions to add the anchor tag.
	 * Default to: `true`
	 */
	anchor: TocAnchorConfig;
	/**
	 * instructions to track the active element in the viewport using `IntersectionObserver`.
	 * Default to: `false`
	 */
	observe: TocObserveConfig;
}

export interface TocInit extends Partial<Omit<TocConfig, 'anchor' | 'observe'>> {
	anchor?: boolean | Partial<TocAnchorConfig>;
	observe?: boolean | Partial<Omit<TocObserveConfig, 'link'>> & {
		link?: Partial<TocObserveConfig['link']>;
	};
}

/** information about an extracted toc item */
export interface TocItem {
	/**
	 * the DOM element that was transformed
	 */
	element: HTMLElement;
	/**
	 * the id of `element` or the "slugified" string from `textContent`
	 */
	id: string;
	/**
	 * the `textContent` of `element`
	 */
	text: string;
	/**
	 * the anchor element inserted by the `toc` action unless
	 * the `anchor.enabled` option from {@link TocParameters} is `false`
	 */
	anchor?: HTMLAnchorElement;
	/**
	 * the resolved observe config during extraction
	 * unless the `observe.enabled` option from {@link TocParameters} is `false`
	 */
	observe?: {
		/** the `IntersectionObserver` instance watching this `element`, */
		observer: IntersectionObserver;
		/** the resolved toc strategy used for this matching element */
		strategy: TocObserveConfig['strategy'];
		/** the resolved toc threshold used for this matching element */
		threshold: TocObserveConfig['threshold'];
		/** the element that was observed by `IntersectionObserver` */
		element: HTMLElement;
	};
}

export * from './attributes';
export * from './actions/actions';

