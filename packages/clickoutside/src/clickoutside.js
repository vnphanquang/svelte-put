import { on } from 'svelte/events';
/**
 * Dispatch a `clickoutside` {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent | CustomEvent } on click outside of node
 * @example
 * Typical usage to close a modal / overlay when backdrop is clicked on
 *
 * ```html
 * <script lang="ts">
 *  import { clickoutside } from '@svelte-put/clickoutside';
 *
 *  let containerNode: Element;
 *  let modal = false;
 *
 *  function onClickOutside(event: CustomEvent<MouseEvent>) {
 *    console.log('Forwarded event:', event);
 *    modal = false;
 *  }
 * </script>
 *
 * <section class="relative" bind:this={containerNode}>
 *  <button
 *    type="button"
 *    class="mt-10 bg-primary p-6 drop-shadow-lg hover:bg-orange-700"
 *    on:click={() => (modal = true)}
 *  >
 *      Click to open modal
 *    </button>
 *  {#if modal}
 *    <aside
 *      class="absolute top-0 left-0 right-0 bottom-0"
 *      use:clickoutside={{ limit: { parent: containerNode }}}
 *      onclickoutside={onClickOutside}
 *    >
 *      ...some modal content...
 *    </aside>
 *  {/if}
 * </section
 * ```
 *
 *
 * As with any svelte action, `clickoutside` should be use with element and not component.
 *
 * ```html
 * <-- correct usage-->
 *  <div use:clickoutside />
 *
 * <-- incorrect usage-->
 * <Component use:clickoutside/>
 * ```
 * @param {Element} node - node outside of which `click` event will trigger `clickoutside`
 * @param {import('./types.public').ClickOutsideParameter} param - instructions for `clickoutside` behavior
 * @returns {import('./types.public').ClickOutsideActionReturn}
 */
export function clickoutside(node, param = { enabled: true }) {
	let { enabled, eventType, nodeForEvent, options } = resolveConfig(param);

	/**
	 * @param {Event} event
	 */
	function handle(event) {
		if (!event.target) return;
		if (node && !node.contains(/** @type {Node} */ (event.target)) && !event.defaultPrevented) {
			node.dispatchEvent(new CustomEvent('clickoutside', { detail: event }));
		}
	}

	/** @type {undefined | (() => void)} */
	let off;
	if (param.enabled !== false) {
		off = on(/** @type {Element} */(nodeForEvent), eventType, handle, options);
	}

	return {
		update(update) {
			off?.();
			({ enabled, eventType, nodeForEvent, options } = resolveConfig(update));
			if (enabled) off = on(/** @type {Element} */(nodeForEvent), eventType, handle, options);
		},
		destroy() {
			off?.();
		},
	};
}

/**
 * @package
 * @param {import('./types.public').ClickOutsideParameter} param
 * @returns {{
 * 	enabled: boolean;
 * 	nodeForEvent: Element | Document;
 * 	eventType: string;
 * 	options?: AddEventListenerOptions;
 * }}
 */
export function resolveConfig(param = {}) {
	return {
		enabled: param.enabled ?? true,
		nodeForEvent: param.limit?.parent ?? document,
		eventType: param.event ?? 'click',
		options: typeof param.options === 'boolean'
			? { capture: param.options }
			: param.options,
	};
}

/**
 * Deprecated, use `ClickOutsideParameter` and `ClickOutsideConfig` instead
 * @typedef {import('./types.public').ClickOutsideConfig} ClickOutsideParameters
 */

