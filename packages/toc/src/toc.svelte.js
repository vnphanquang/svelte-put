import { Map } from 'svelte/reactivity';

import { createTocLinkAction } from './actions/link.svelte.js';
import { createTocRootAction } from './actions/root.svelte.js';
import { DEFAULT_TOC_CONFIG } from './constants.js';

export class Toc {
	/**
	 * the ID of this toc operation. see {@link TocParameters}, set on `Toc` instantiation
	 * @type {string}
	 */
	// eslint-disable-next-line no-undef
	id = crypto.randomUUID();

	/**
	 * the extracted toc items, populated on mount (`tocinit`)
	 * @type {Map<string, import('./types.js').TocItem>}
	 */
	items = new Map();

	/**
	 * the active toc items, set on update (`tocchange`) if `observer` is set to true
	 * @type {import('./types.js').TocItem | undefined}
	 */
	// eslint-disable-next-line no-undef
	activeItem = $state(undefined);

	/**
	 * configuration for `toc` behavior
	 * @type {import('./types.js').TocConfig}
	 */
	// eslint-disable-next-line no-undef
	config = $state(DEFAULT_TOC_CONFIG);

	/**
	 * a Svelte action to place on the TOC root
	 * @returns {any}
	 */
	actions = {
		root: createTocRootAction(this),
		link: createTocLinkAction(this),
	};

	/**
	 * The element `root` action is placed on
	 * @type {HTMLElement | undefined}
	 */
	// eslint-disable-next-line no-undef
	root = $state(undefined);

	/**
	 * whether the observe operation is being throttled,
	 * that is, activeItem will not be updated during this time
	 * @type {boolean}
	 */
	// eslint-disable-next-line no-undef
	observeThrottled = $state(false);

	/**
	 * @param {import('./types.js').TocInit} [init]
	 */
	constructor(init) {
		if (init) {
			if (init.selector) this.config.selector = init.selector;
			if (init.ignore) this.config.ignore = init.ignore;
			if (init.scrollMarginTop) this.config.scrollMarginTop = init.scrollMarginTop;
			if (init.anchor !== undefined) {
				if (typeof init.anchor === 'boolean') {
					this.config.anchor.enabled = init.anchor;
				} else {
					this.config.anchor.enabled = init.anchor.enabled ?? true;
					if (init.anchor.position) this.config.anchor.position = init.anchor.position;
					if (init.anchor.content) this.config.anchor.content = init.anchor.content;
					if (init.anchor.href) this.config.anchor.href = init.anchor.href;
					if (init.anchor.properties) {
						this.config.anchor.properties = {
							...this.config.anchor.properties,
							...init.anchor.properties,
						};
					}
				}
			}
			if (init.observe !== undefined) {
				if (typeof init.observe === 'boolean') {
					this.config.observe.enabled = init.observe;
				} else {
					this.config.observe.link.enabled = this.config.observe.enabled = init.observe.enabled ?? true;
					if (init.observe.strategy) this.config.observe.strategy = init.observe.strategy;
					if (init.observe.threshold) this.config.observe.threshold = init.observe.threshold;
					if (init.observe.root) this.config.observe.root = init.observe.root;
					if (init.observe.rootMargin) this.config.observe.rootMargin = init.observe.rootMargin;
					if (init.observe.link !== undefined) {
						if (typeof init.observe.link === 'boolean') {
							this.config.observe.link.enabled = init.observe.link;
						} else {
							this.config.observe.link.enabled = init.observe.link.enabled ?? init.observe.enabled ?? true;
							if (init.observe.link.activeAttribute) this.config.observe.link.activeAttribute = init.observe.link.activeAttribute;
							if (init.observe.link.throttleOnClick) this.config.observe.link.throttleOnClick = init.observe.link.throttleOnClick;
						}
					}
				}
			}
		}
	}
}

