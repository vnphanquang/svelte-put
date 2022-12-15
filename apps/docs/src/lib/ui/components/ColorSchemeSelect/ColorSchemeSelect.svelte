<script lang="ts">
  import { clickoutside } from '@svelte-put/clickoutside';
  import { createEventDispatcher } from 'svelte';
  import { slide, fade } from 'svelte/transition';

  import DarkMode from '../icons/material/DarkMode.svelte';
  import LightMode from '../icons/material/LightMode.svelte';
  import SettingsSuggest from '../icons/material/SettingsSuggest.svelte';

  export let scheme: App.ColorScheme;
  const SCHEMES = {
    light: {
      scheme: 'light',
      icon: LightMode,
    },
    dark: {
      scheme: 'dark',
      icon: DarkMode,
    },
    system: {
      scheme: 'system',
      icon: SettingsSuggest,
    },
  } as const;

  let open = false;
  function toggle() {
    open = !open;
  }

  const dispatch = createEventDispatcher<{ select: App.ColorScheme }>();
  function changeMode(_scheme: App.ColorScheme) {
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
      <svelte:component this={SCHEMES[scheme].icon} height="24" width="24" />
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
              <svelte:component this={s.icon} height="24" width="24" />
              <span>{s.scheme}</span>
            </button>
          </li>
        {/each}
      </ul>
    </div>
  {/key}
</div>
