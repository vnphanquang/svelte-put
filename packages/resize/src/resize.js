/**
 * Create an {@link https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver | ResizeObserver} that observers this node
 * @example
 *
 * ```html
 * <script lang="ts">
 *  import { resize, type ResizeDetail } from '@svelte-put/resize';
 *
 *  function onResized(event: CustomEvent<ResizeDetail>) {
 *    const { observer, entries } = event.detail;
 *    console.log('action resize was used on element', observer.target);
 *    console.log('list of ResizeObserverEntry:', entries);
 *
 *   // see MDN docs for what you can do with ResizeObserverEntry
 *   // https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry
 *  }
 * </script>
 *
 * <section use:resize on:resized={onResized}>
 *   ...
 * </section
 * ```
 *
 *
 *
 * As with any svelte action, `resize` should be use with element and not component.
 *
 * ```html
 * <-- correct usage-->
 *  <div use:resize />
 *
 * <-- incorrect usage-->
 * <Component use:resize/>
 * ```
 * @param {HTMLElement} node - HTMLElement to observe
 * @param {import('./public').ResizeParameter} param - svelte action parameters
 * @returns {import('./public').ResizeActionReturn}
 */
export function resize(node, param = {}) {
	let { enabled = true, observer = 'singleton', options } = param;

	let rObserver = resolveObserver(observer);

	if (enabled) {
		rObserver.observe(node, options);
	}
	return {
		update(update = {}) {
			const newObserver = update.observer ?? 'singleton';
			const newEnabled = update.enabled ?? true;

			if (newObserver !== observer) {
				rObserver.unobserve(node);
				rObserver = resolveObserver(observer);
			}

			if (!enabled && newEnabled) {
				rObserver.observe(node, options);
			} else if (enabled && !newEnabled) {
				rObserver.unobserve(node);
			}

			enabled = newEnabled;
			observer = newObserver;
		},
		destroy() {
			rObserver.disconnect();
		},
	};
}

/**
 * @package
 * @type {ResizeObserverCallback}
 */
function callback(entries) {
	for (const entry of entries) {
		/** @type {import('./public').ResizeDetail} */
		const detail = { observer: observerSingleton, entry };
		entry.target.dispatchEvent(new CustomEvent('resized', { detail }));
	}
}

/**
 * singleton for all actions to use
 * @package
 * @type {ResizeObserver}
 */
let observerSingleton;

/**
 * resolve to a ResizeObserver for use in action
 * @package
 * @param {import('./public').ResizeConfig['observer']} input
 * @returns {ResizeObserver}
 */
function resolveObserver(input = 'singleton') {
	if (input === 'singleton') {
		if (!observerSingleton) {
			observerSingleton = new ResizeObserver(callback);
		}
		return observerSingleton;
	}
	if (input === 'new') {
		return new ResizeObserver(callback);
	}
	return input;
}

/**
 * Deprecated, use `ResizeConfig` and `ResizeParameter` instead
 * @typedef {import('./public').ResizeConfig} ResizeParameters
 */
