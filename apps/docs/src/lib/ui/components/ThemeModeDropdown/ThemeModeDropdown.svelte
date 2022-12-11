<script lang="ts">
  import { clickoutside } from '@svelte-put/clickoutside';
  import { slide, fade } from 'svelte/transition';

  import { storeTheme } from '$lib/ui/stores/theme';

  import DarkMode from '../icons/material/DarkMode.svelte';
  import LightMode from '../icons/material/LightMode.svelte';
  import SettingsSuggest from '../icons/material/SettingsSuggest.svelte';

  const modes = {
    light: {
      mode: 'light',
      icon: LightMode,
    },
    dark: {
      mode: 'dark',
      icon: DarkMode,
    },
    system: {
      mode: 'system',
      icon: SettingsSuggest,
    },
  } as const;

  let open = false;
  function toggle() {
    open = !open;
  }

  function changeMode(mode: keyof typeof modes) {
    storeTheme.changeMode(mode);
  }
</script>

<div class="relative grid place-items-center">
  {#key $storeTheme.mode}
    <button
      class="hover:text-primary"
      on:click|stopPropagation={toggle}
      aria-expanded={open}
      in:fade|local={{ duration: 150 }}
    >
      <svelte:component this={modes[$storeTheme.mode].icon} height="24" width="24" />
    </button>
  {/key}
  {#key open}
    <div
      class="absolute top-full right-0 z-tooltip mt-1 flex flex-col items-end shadow-lg"
      class:hidden={!open}
      transition:slide|local={{ duration: 150 }}
      aria-expanded={open}
      use:clickoutside
      on:clickoutside={toggle}
    >
      <div class="triangle mr-2 triangle-t triangle-bg-muted" />
      <ul class="bg-bg-muted py-1">
        {#each Object.values(modes) as { mode, icon }}
          <li>
            <button
              on:click={changeMode.bind(undefined, mode)}
              class="flex w-full items-center space-x-2 py-2 px-4 text-xs font-bold capitalize hover:bg-border hover:text-primary"
            >
              <svelte:component this={icon} height="24" width="24" />
              <span>{mode}</span>
            </button>
          </li>
        {/each}
      </ul>
    </div>
  {/key}
</div>
