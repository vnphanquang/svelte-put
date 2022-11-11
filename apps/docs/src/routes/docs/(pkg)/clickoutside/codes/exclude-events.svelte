<script>
  import { clickoutside } from '@svelte-put/clickoutside';
  import { fly } from 'svelte/transition';

  let leftOpen = false;
  function toggleLeft() {
    leftOpen = !leftOpen;
  }
  let rightOpen = true;
  function toggleRight() {
    rightOpen = !rightOpen;
  }
</script>

<div class="relative w-full overflow-hidden border-2 border-violet-500">
  {#if leftOpen}
    <div
      class="absolute inset-y-0 left-0 w-1/4 bg-red-200"
      use:clickoutside={{ enabled: leftOpen }}
      on:clickoutside={toggleLeft}
    />
  {/if}
  <div class="mx-auto w-1/2">
    <div class="flex items-center justify-between">
      <button on:click={toggleLeft} class="inline bg-red-400 p-2 active:scale-95">
        Toggle Left
      </button>
      <button
        on:click|stopPropagation={toggleRight}
        class="inline bg-green-400 p-2 active:scale-95"
      >
        Toggle Right
      </button>
    </div>
    <ul>
      <li>
        <span class="text-red-500">Left side</span>
        cannot be toggled because <code>clickoutside</code> is also triggered right after "Toggle
        Left" button is clicked. It also triggers the toggling of
        <span class="text-green-500">Right side</span>
        because it is technically "outside" of the green box.
      </li>
      <li>
        <span class="text-green-500">Right side</span>
        toggles as expected thanks to the added
        <code>|stopPropagation</code> modifier.
      </li>
    </ul>
  </div>
  {#key rightOpen}
    <div
      class="absolute inset-y-0 right-0 w-1/4 bg-green-200"
      transition:fly={{ duration: 200, x: 100 }}
      use:clickoutside={{ enabled: rightOpen }}
      on:clickoutside={toggleRight}
      class:hidden={!rightOpen}
    />
  {/key}
</div>
