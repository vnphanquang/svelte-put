<script lang="ts">
  import { clickoutside } from '@svelte-put/clickoutside';
  import { fade } from 'svelte/transition';

  let modal = false;
  let containerNode: HTMLElement;

  function onClickOutside(_event: CustomEvent<MouseEvent>) {
    modal = false;
  }
</script>

<title>clickoutside | @svelte-put</title>

<main class="grid flex-1 flex-col gap-y-10 p-4 grid-rows-[auto,1fr]">
  <h1 class="text-center text-4xl font-bold">@svelte-put/clickoutside</h1>
    <fieldset class="border-2 border-blue-500 relative grid place-items-center p-10 grid-rows-[auto,1fr]" bind:this={containerNode}>
      <legend>Boundary</legend>
      <p>click beyond this will not trigger clickoutside event</p>
      <button
        type="button"
        class="mt-10 bg-primary p-6 drop-shadow-lg hover:bg-orange-700"
        on:click={() => (modal = true)}
      >
        Click to open modal
      </button>
      {#if modal}
        <div
          transition:fade={{ duration: 250 }}
          class="absolute inset-center overflow-y-auto border-border border-2 bg-bg p-8 drop-shadow-lg max-h-[50vh]"
          use:clickoutside={{ limit: { parent: containerNode } }}
          on:clickoutside={onClickOutside}
        >
          <p class="text-xl">Modal content goes here</p>
          <p class="mt-10">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem, quasi
            repellendus voluptatem consequatur sed quia blanditiis, iure nam, incidunt quibusdam
            velit quo soluta corrupti? Explicabo voluptas voluptate adipisci incidunt
            perspiciatis!
          </p>
        </div>
      {/if}
    </fieldset>
</main>

<style>
</style>
