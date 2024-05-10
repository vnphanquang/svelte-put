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
 *      on:clickoutside={onClickOutside}
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
 * @param {import('./public').ClickOutsideParameter} param - instructions for `clickoutside` behavior
 * @returns {import('./public').ClickOutsideActionReturn}
 */
export function clickoutside(node, param = { enabled: true }) {
	let { enabled, eventType, nodeForEvent, options, capture } = resolveConfig(param);

	/**
	 * @param {Event} event
	 */
	function handle(event) {
		if (!event.target) return;
		if (node && !node.contains(/** @type {Node} */ (event.target)) && !event.defaultPrevented) {
			node.dispatchEvent(new CustomEvent('clickoutside', { detail: event }));
		}
	}

	if (param.enabled !== false) {
		nodeForEvent.addEventListener(eventType, handle, options);
	}

	return {
		update(update) {
			nodeForEvent.removeEventListener(eventType, handle, capture);
			({ enabled, eventType, nodeForEvent, options, capture } = resolveConfig(update));
			if (enabled) nodeForEvent.addEventListener(eventType, handle, options);
		},
		destroy() {
			nodeForEvent.removeEventListener(eventType, handle, capture);
		},
	};
}

/**
 * @package
 * @param {import('./public').ClickOutsideParameter} param
 * @returns {{
 * 	enabled: boolean;
 * 	nodeForEvent: Element | Document;
 * 	eventType: string;
 * 	options: boolean | AddEventListenerOptions | undefined;
 * 	capture: boolean | undefined;
 * }}
 */
export function resolveConfig(param = {}) {
	return {
		enabled: param.enabled ?? true,
		nodeForEvent: param.limit?.parent ?? document,
		eventType: param.event ?? 'click',
		options: param.options,
		capture: typeof param.options === 'object' ? param.options?.capture : param.options,
	};
}

/**
 * Deprecated, use `ClickOutsideParameter` and `ClickOutsideConfig` instead
 * @typedef {import('./public').ClickOutsideConfig} ClickOutsideParameters
 */
