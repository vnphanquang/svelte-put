/**
 * Limit to which the click event will trigger `clickoutside`
 * @public
 *
 * @remarks
 * Currently only the parent option is supported
 */
export interface ClickOutsideLimit {
  /** Click event beyond the `boundingRect` of this parent node will not trigger `clickoutside` */
  parent: HTMLElement;
}

/**
 * svelte action parameters to config behavior of `clickoutside`
 * @public
 */
export interface ClickOutsideParameters {
  /** whether to dispatch the `clickoutside` event or not */
  enabled: boolean;
  /** limit to which the click event will trigger `clickoutside` */
  limit?: ClickOutsideLimit;
}

/**
 * Dispatch a `clickoutside` CustomEvent on click outside of node
 * @public
 *
 * @example
 * Typical usage to close a modal / overlay when backdrop is clicked on
 *
 * ```svelte
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
 * @param node
 * @param parameters
 * @returns
 */
export function clickoutside(
  node: HTMLElement,
  parameters: Partial<ClickOutsideParameters> = { enabled: true },
) {
  let limit = parameters.limit;
  let enabled = parameters.enabled ?? true;
  const handleClick = (event: Event) => {
    if (
      node &&
      !node.contains(event.target as Node) &&
      !event.defaultPrevented &&
      (!limit || limit.parent.contains(event.target as Node))
    ) {
      node.dispatchEvent(new CustomEvent('clickoutside', { detail: event }));
    }
  };

  if (parameters.enabled !== false) {
    document.addEventListener('mousedown', handleClick, true);
  }

  return {
    update(update: ClickOutsideParameters) {
      if (!enabled && update.enabled) {
        document.addEventListener('mousedown', handleClick, true);
      } else if (enabled && !update.enabled) {
        document.removeEventListener('mousedown', handleClick, true);
      }
      limit = update.limit;
      enabled = update.enabled ?? true;
    },
    destroy() {
      document.removeEventListener('mousedown', handleClick, true);
    },
  };
}
