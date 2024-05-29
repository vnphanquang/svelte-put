import { tick } from 'svelte';

import { ATTRIBUTES } from '../attributes/index.js';
import { DEFAULT_TOC_CONFIG } from '../constants.js';

import {
	extractElementText,
	extractTocItemId,
	processAnchor,
	processObserve,
} from './internals.js';

/**
 * @param {import('../toc.svelte.js').Toc} toc
 * @returns {import('./types.js').TocRootAction}
 */
export function createTocRootAction(toc) {
	// eslint-disable-next-line no-undef
	let selector = $derived.by(() => {
		const ignoreStr = (Array.isArray(toc.config.ignore)
			? toc.config.ignore
			: [toc.config.ignore]).map((i) => `:not(${i})`).join('');
		return `${toc.config.selector}${ignoreStr}`;
	});

	return function(node) {
		toc.root = node;
		// stay minimal by reusing as few `IntersectionObserver` as possible
		// only create new `IntersectionObserver` for each new `threshold`
		/** @type {Record<number, IntersectionObserver>} */
		let intersectionObservers = {};
		/** @type {MutationObserver | undefined} */
		let mutationObserver;

		function updateActiveTocItem(activeTocItemId = '') {
			if (!toc.observeThrottled) {
				node.setAttribute(ATTRIBUTES.observeActiveId, activeTocItemId);
			}
		}

		/** @type {ReturnType<typeof setTimeout> | undefined} */
		let tocObserveThrottleTimeoutId;

		const observeActiveIdAttribute = () => {
			mutationObserver = new MutationObserver((mutationList) => {
				if (!node.isConnected) return;
				for (const mutation of mutationList) {
					if (mutation.type === 'attributes') {
						switch (mutation.attributeName) {
							case ATTRIBUTES.observeActiveId: {
								const activeTocItemId = /** @type {HTMLElement} */ (mutation.target).getAttribute(
									ATTRIBUTES.observeActiveId,
								);
								if (activeTocItemId && activeTocItemId !== toc.activeItem?.id) {
									const activeItem = toc.items.get(activeTocItemId);
									if (activeItem) {
										toc.activeItem = activeItem;
										node.dispatchEvent(new CustomEvent('tocchange', { detail: toc }));
									}
								}
								break;
							}
							case ATTRIBUTES.observeThrottled: {
								const throttled = /** @type {HTMLElement} */ (mutation.target).getAttribute(
									ATTRIBUTES.observeThrottled,
								);
								if (!toc.observeThrottled && throttled) {
									toc.observeThrottled = true;
									clearTimeout(tocObserveThrottleTimeoutId);
									let ms = parseInt(throttled);
									if (Number.isNaN(ms)) ms = DEFAULT_TOC_CONFIG.observe.link.throttleOnClick;
									tocObserveThrottleTimeoutId = setTimeout(() => {
										toc.observeThrottled = false;
										node.toggleAttribute(ATTRIBUTES.observeThrottled, false);
									}, ms);
								}
								break;
							}
						}
					}
				}
			});
			mutationObserver.observe(node, {
				attributes: true,
				attributeFilter: [ATTRIBUTES.observeActiveId, ATTRIBUTES.observeThrottled],
			});
		}

		tick().then(async () => {
			const { anchor, observe, scrollMarginTop } = toc.config;
			/** @type {HTMLElement[]} */
			const elements = Array.from(node.querySelectorAll(selector));
			/** @type {Promise<import('../types').TocItem['observe']>[]} */
			const observePromises = [];

			node.toggleAttribute(ATTRIBUTES.observeActiveId, true);

			for (const element of elements) {
				if (element.hasAttribute(ATTRIBUTES.ignore)) continue;

				const text = extractElementText(element);

				const tocId = extractTocItemId(element, text);
				element.id = tocId;

				// set scroll-margin-top, if specified
				let mt = typeof scrollMarginTop === 'function' ? scrollMarginTop(element) : scrollMarginTop;
				if (mt) {
					element.style.scrollMarginTop = typeof mt === 'number' ? `${mt}px` : mt;
				}

				const a = processAnchor(element, anchor, tocId);

				toc.items.set(tocId, { element, id: tocId, text, anchor: a });

				if (observe.enabled) {
					// process observe async to avoid blocking main thread,
					// which should be prioritized for rendering initial TOC
					observePromises.push(
						new Promise((resolve) => {
							const rObserve = processObserve(element, observe, tocId, updateActiveTocItem, intersectionObservers);
							if (toc.items.has(tocId)) {
								const tocItem = /** @type {import('../types').TocItem} */ (toc.items.get(tocId));
								toc.items.set(tocId, { ...tocItem, observe: rObserve });
							}

							resolve(rObserve);
						}),
					);
				}

				// mark that this element has been processed by `toc`
				element.toggleAttribute(ATTRIBUTES.toc, true);
			}

			node.dispatchEvent(new CustomEvent('tocinit', { detail: toc }));
			if (observePromises.length) {
				Promise.all(observePromises).then(() => {
					observeActiveIdAttribute();
					if (toc.activeItem) updateActiveTocItem(toc.activeItem?.id);
				});
			}

			// mark this element as toc root
			node.setAttribute(ATTRIBUTES.root, toc.id);
		});

		return {
			destroy: () => {
				mutationObserver?.disconnect();
				for (const observer of Object.values(intersectionObservers)) {
					observer.disconnect();
				}
				clearTimeout(tocObserveThrottleTimeoutId);
			},
		};
	};
}
