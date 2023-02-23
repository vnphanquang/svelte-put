<script lang="ts">
  import { clickoutside } from '@svelte-put/clickoutside';
  import { createEventDispatcher } from 'svelte';
  import { slide, fade } from 'svelte/transition';

  import type { ColorScheme } from '$shared/types';

  import ColorSchemeIcon from './ColorSchemeIcon.svelte';

  export let scheme: ColorScheme;
  const SCHEMES = {
    light: {
      scheme: 'light',
    },
    dark: {
      scheme: 'dark',
    },
    system: {
      scheme: 'system',
    },
  } as const;

  let open = false;
  function toggle() {
    open = !open;
  }

  const dispatch = createEventDispatcher<{ select: ColorScheme }>();
  function changeMode(_scheme: ColorScheme) {
    dispatch('select', _scheme);
  }
</script>

<div class="relative grid place-items-center">
  {#key scheme}
    <button
      class="hover:text-primary"
      on:click|stopPropagation={toggle}
      aria-expanded={open}
      in:fade|local={{ duration: 150 }}
    >
      <ColorSchemeIcon {scheme} />
    </button>
  {/key}
  {#key open}
    <div
      class="absolute top-full right-0 z-tooltip mt-1 flex flex-col items-end shadow-lg"
      class:hidden={!open}
      transition:slide|local={{ duration: 150 }}
      aria-expanded={open}
      use:clickoutside={{ enabled: open }}
      on:clickoutside={toggle}
    >
      <div class="triangle mr-2 triangle-t triangle-bg-muted" />
      <ul class="bg-bg-muted py-1">
        {#each Object.values(SCHEMES) as s}
          <li>
            <button
              on:click={changeMode.bind(undefined, s.scheme)}
              class="flex w-full items-center space-x-2 py-2 px-4 text-xs font-bold capitalize hover:bg-border hover:text-primary"
              class:text-primary={scheme === s.scheme}
            >
              <ColorSchemeIcon scheme={s.scheme} />
              <span>{s.scheme}</span>
            </button>
          </li>
        {/each}
      </ul>
    </div>
  {/key}
</div>
