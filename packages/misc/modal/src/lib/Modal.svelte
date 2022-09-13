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
    default: Record<string, never>;
    all: Record<string, never>;
    backdrop: {
      class: string;
      onClick: () => void;
    };
    container: {
      class: string;
    };
    x: {
      class: string;
      onClick: () => void;
    };
    'x-content': Record<string, never>;
  }

  type Classes = Record<
    Exclude<keyof $$Slots, 'default' | 'x-content' | 'all'>,
    string | { override: string }
  >;

  export let topmost = false;
  export let backdrop: 'static' | boolean = true;
  export let xBtn = true;
  export let escape = true;
  export let clickoutside: boolean | ClickOutsideParameters = true;
  export let movable: boolean | MovableParameters = false;
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

<slot name="all">
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
</slot>

<style>
  :global(.s-modal-backdrop) {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgb(17 24 39 / 0.25);
    z-index: 0;
  }

  :global(.s-modal-container) {
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    z-index: 1;
  }

  :global(.s-modal-x) {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.5rem;
    transition-property: transform;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }

  :global(.s-modal-x:hover) {
    scale: 1.05;
  }

  :global(.s-modal-x:active) {
    scale: 0.95;
  }
</style>
