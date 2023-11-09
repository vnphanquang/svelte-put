declare module '@svelte-put/clickoutside' {
  import type { ActionReturn } from 'svelte/action';
  /**
   * Dispatch a `clickoutside` {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent | CustomEvent } on click outside of node
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
   * @param node - node outside of which `click` event will trigger `clickoutside`
   * @param param - instructions for `clickoutside` behavior
   * */
  export function clickoutside(
    node: HTMLElement,
    param?: ClickOutsideParameter,
  ): ClickOutsideActionReturn;

  export function resolveConfig(param?: ClickOutsideParameter): {
    enabled: boolean;
    nodeForEvent: Document | HTMLElement;
    eventType: string;
    options: boolean | AddEventListenerOptions | undefined;
    capture: boolean | undefined;
  };
  /**
   * Deprecated, use `ClickOutsideParameter` and `ClickOutsideConfig` instead
   */
  export type ClickOutsideParameters = ClickOutsideConfig;
  /**
   * Additional attributes extended from `svelte-put/clickoutside`
   * @remarks
   * The ambient types for these extended attributes should be available automatically
   * whenever `svelte-put/clickoutside` is imported.
   *
   * ```html
   * <script lang="ts">
   *   import { clickoutside } from '@svelte-put/clickoutside';
   * </script>
   *
   * <!-- on:clickoutside should be typed -->
   * <div
   *   use:clickoutside
   *   on:clickoutside
   * />
   * ```
   */
  interface ClickOutsideAttributes {
    'on:clickoutside'?: (event: CustomEvent<MouseEvent>) => void;
  }

  /**
   * Limit to which the click event will trigger `clickoutside`
   * @remarks
   * Currently only the parent option is supported
   */
  interface ClickOutsideLimit {
    /** Click event beyond the `boundingRect` of this parent node will not trigger `clickoutside` */
    parent: HTMLElement;
  }

  /**
   * svelte action parameters to config behavior of `clickoutside`
   * */
  interface ClickOutsideConfig {
    /** whether to activate the action. Default to `true` */
    enabled: boolean;
    /** limit to which the click event will trigger `clickoutside` */
    limit?: ClickOutsideLimit;
    /** event to register callback. Default to `click` */
    event?: string;
    /** options to add to `addEventListener` */
    options?: AddEventListenerOptions | boolean;
  }

  /**
   * parameter received from action input
   * */
  type ClickOutsideParameter = Partial<ClickOutsideConfig> | undefined;

  type ClickOutsideActionReturn = ActionReturn<ClickOutsideParameter, ClickOutsideAttributes>;
}

//# sourceMappingURL=index.d.ts.map
