/** @typedef {import('svelte/action').Action} Action */

/**
 * Dispatch a `clickoutside` {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent | CustomEvent } on click outside of node
 * @public
 *
 * @example
 * Typical usage to close a modal / overlay when backdrop is clicked on
 *
 * ```html
 * <script lang="ts">
 *  import { clickoutside } from '@svelte-put/clickoutside';
 *
 *  let containerNode: HTMLElement;
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
 * @remarks
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
 *
 * @param {HTMLElement} node - node outside of which `click` event will trigger `clickoutside`
 * @param {import('./public').ClickOutsideParameters} parameters - instructions for `clickoutside` behavior
 * @returns {import('./public').ClickOutsideActionReturn}
 */
export function clickoutside(node, parameters = { enabled: true }) {
  let { enabled, eventType, nodeForEvent, options, capture } = resolveParameters(parameters);

  /**
   * @param {Event} event
   */
  function handle(event) {
    if (!event.target) return;
    if (node && !node.contains(/** @type {Node} */ (event.target)) && !event.defaultPrevented) {
      node.dispatchEvent(new CustomEvent('clickoutside', { detail: event }));
    }
  }

  if (parameters.enabled !== false) {
    nodeForEvent.addEventListener(eventType, handle, options);
  }

  return {
    update(update) {
      nodeForEvent.removeEventListener(eventType, handle, capture);
      ({ enabled, eventType, nodeForEvent, options, capture } = resolveParameters(update));
      if (enabled) nodeForEvent.addEventListener(eventType, handle, options);
    },
    destroy() {
      nodeForEvent.removeEventListener(eventType, handle, capture);
    },
  };
}

/**
 * @internal
 * @param {Partial<import('./public').ClickOutsideParameters>} parameters
 */
export function resolveParameters(parameters) {
  return {
    enabled: parameters.enabled ?? true,
    nodeForEvent: parameters.limit?.parent ?? document,
    eventType: parameters.event ?? 'click',
    options: parameters.options,
    capture:
      typeof parameters.options === 'object' ? parameters.options?.capture : parameters.options,
  };
}
