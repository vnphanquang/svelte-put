<script lang="ts">
  import { clickoutside as clickoutsideAction } from '@svelte-put/clickoutside';
  import type { ClickOutsideParameters } from '@svelte-put/clickoutside';
  import { movable as movableAction } from '@svelte-put/movable';
  import type { MovableParameters } from '@svelte-put/movable';
  import { shortcut } from '@svelte-put/shortcut';
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';

  import type { ModalComponentBaseSlots } from './modal.types';

  interface $$Slots extends ModalComponentBaseSlots {
    /** content of the modal */
    default: Record<string, never>;
    /** backdrop of the modal */
    backdrop: {
      /** the resolved class name, merged from the default and the `classes` prop */
      class: string;
      /** default click handler for backdrop (dismiss with (trigger) as `backdrop`) */
      onClick: () => void;
    };
    /** modal container */
    container: {
      /** the resolved class name, merged from the default and the `classes` prop */
      class: string;
    };
    /** x` button */
    x: {
      /** the resolved class name, merged from the default and the `classes` prop */
      class: string;
      /** default click handler for x button (dismiss with (trigger) as `x`) */
      onClick: () => void;
    };
    /** content of `x` button */
    'x-content': Record<string, never>;
  }

  type Classes = Record<
    Exclude<keyof $$Slots, 'default' | 'x-content'>,
    string | { override: string }
  >;

  /**
   * whether the modal is at topmost position (last pushed),
   * this prop is handled by the `ModalPortal` component
   */
  export let topmost = false;
  /**
   * how the backdrop should render or behave
   *
   * - `false` - no backdrop
   *
   * - `true` - backdrop that when clicked on will dismiss modal
   *
   * - `static` - backdrop that does not dismiss modal
   */
  export let backdrop: 'static' | boolean = true;
  /**
   * whether to render the `x` button (for dismissing modal)
   */
  export let xBtn = true;
  /**
   * whether to dismiss modal when `esc` key is pressed
   */
  export let escape = true;
  /**
   * whether to dismiss modal when clicking outside. Most useful when
   * you want to not have a backdrop but still dismiss modal when clicking
   * outside the modal.
   *
   * Can be provided as boolean or the parameter object to `@svelte-put/clickoutside`
   */
  export let clickoutside: boolean | ClickOutsideParameters = true;
  /**
   * whether to make the modal "movable" (drag around).
   * Can be provided as boolean or the parameter object to `@svelte-put/movable`
   */
  export let movable: boolean | MovableParameters = false;
  /**
   * custom class names for the modal elements.
   *
   * - If property is provided as `string`, it'll be added to the default class name of that element.
   *
   * - If property is provided as `{ override: string }`, it'll override the default class name of that element.
   *
   * @remarks
   *
   * As Svelte style is component-scoped. You will need to use either a global
   * styling system like Tailwind or the `:global()` selector (example below)
   *
   */
  export let classes: Partial<Classes> = {};

  // resolving classes prop
  const DEFAULT_CLASSES: Record<keyof Classes, string> = {
    backdrop: 's-modal-backdrop',
    container: 's-modal-container',
    x: 's-modal-x',
  };
  function resolveClasses(): typeof DEFAULT_CLASSES {
    const rClasses = { ...DEFAULT_CLASSES };
    for (const [key, value] of Object.entries(classes ?? {})) {
      if (typeof value === 'string') {
        rClasses[key as keyof Classes] = `${rClasses[key as keyof Classes]} ${value}`;
      } else {
        rClasses[key as keyof Classes] = value.override;
      }
    }
    return rClasses;
  }
  $: rClasses = resolveClasses();

  // resolving clickoutside prop
  const DEFAULT_CLICKOUTSIDE: ClickOutsideParameters = { enabled: true };
  function resolveClickoutside(): ClickOutsideParameters {
    if (!clickoutside) return DEFAULT_CLICKOUTSIDE;
    return typeof clickoutside === 'boolean'
      ? { ...DEFAULT_CLICKOUTSIDE, enabled: clickoutside }
      : clickoutside;
  }
  $: rClickoutside = resolveClickoutside();

  // resolving movable prop
  const DEFAULT_MOVABLE: MovableParameters = { enabled: false };
  function resolveMovable(): MovableParameters {
    if (!movable) return DEFAULT_MOVABLE;
    return typeof movable === 'boolean' ? { ...DEFAULT_MOVABLE, enabled: movable } : movable;
  }
  $: rMovable = resolveMovable();

  type BaseTrigger = 'backdrop' | 'x' | 'escape' | 'clickoutside';
  const dispatch = createEventDispatcher<{ resolve: { trigger: BaseTrigger } | null }>();

  function onClickX() {
    dispatch('resolve', { trigger: 'x' });
  }

  function onClickBackdrop() {
    if (backdrop && backdrop !== 'static') {
      dispatch('resolve', { trigger: 'backdrop' });
    }
  }

  function onClickOutside() {
    dispatch('resolve', { trigger: 'clickoutside' });
  }

  function onPressEscape() {
    dispatch('resolve', { trigger: 'escape' });
  }
</script>

<!--
  @component
  Modal component for use as is or as a base for building other modals.

  @public
-->

<svelte:window
  use:shortcut={{
    trigger: [
      {
        key: 'Escape',
        enabled: escape && topmost,
        callback: onPressEscape,
      },
    ],
  }}
/>

<slot name="backdrop" class={rClasses.backdrop} onClick={onClickBackdrop}>
  {#if backdrop}
    <div
      class={rClasses.backdrop}
      on:click={onClickBackdrop}
      transition:fade={{ duration: 75 }}
    />
  {/if}
</slot>

<slot name="container" class={rClasses.container}>
  <div
    class={rClasses.container}
    transition:fade={{ duration: 200 }}
    use:clickoutsideAction={rClickoutside}
    on:clickoutside={onClickOutside}
    use:movableAction={rMovable}
  >
    <slot name="x" class={rClasses.x} onClick={onClickX}>
      {#if xBtn}
        <button class={rClasses.x} on:click={onClickX}>
          <slot name="x-content">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 48 48">
              <path
                d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z"
              />
            </svg>
          </slot>
        </button>
      {/if}
    </slot>
    <slot />
  </div>
</slot>

<style>
  :global(:where(.s-modal-backdrop)) {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgb(17 24 39 / 0.25);
    z-index: 0;
  }

  :global(:where(.s-modal-container)) {
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    z-index: 1;
  }

  :global(:where(.s-modal-x)) {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.5rem;
    transition-property: transform;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }

  :global(:where(.s-modal-x) svg) {
    stroke: currentColor;
  }

  :global(:where(.s-modal-x):hover) {
    scale: 1.05;
  }

  :global(:where(.s-modal-x):active) {
    scale: 0.95;
  }
</style>
