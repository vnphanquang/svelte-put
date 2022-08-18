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

<main class="grid flex-1 grid-rows-[auto,1fr] flex-col gap-y-10 p-4">
  <h1 class="text-center text-4xl font-bold">@svelte-put/clickoutside</h1>
  <fieldset
    class="relative grid grid-rows-[auto,1fr] place-items-center border-2 border-blue-500 p-10"
    bind:this={containerNode}
  >
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
        class="inset-center absolute max-h-[50vh] overflow-y-auto border-2 border-border bg-bg p-8 drop-shadow-lg"
        use:clickoutside={{ limit: { parent: containerNode } }}
        on:clickoutside={onClickOutside}
      >
        <p class="text-xl">Modal content goes here</p>
        <p class="mt-10">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem, quasi
          repellendus voluptatem consequatur sed quia blanditiis, iure nam, incidunt quibusdam velit
          quo soluta corrupti? Explicabo voluptas voluptate adipisci incidunt perspiciatis!
        </p>
      </div>
    {/if}
  </fieldset>
</main>

<style>
</style>
