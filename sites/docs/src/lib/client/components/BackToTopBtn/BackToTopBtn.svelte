<script lang="ts">
  import { fly } from 'svelte/transition';

  let cls = '';
  export { cls as class };

  let scrollY = 0;
  let innerHeight = 0;
  $: shown = scrollY > innerHeight;

  function handleClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
</script>

<svelte:window bind:scrollY bind:innerHeight />

{#if shown}
  <button
    transition:fly={{ y: 100, duration: 200 }}
    type="button"
    on:click={handleClick}
    class="grid place-items-center rounded-full bg-fg p-2 text-bg shadow transition-opacity duration-150 hover:opacity-100 md:opacity-50 {cls}"
    aria-label="Back to top"
  >
    <svg inline-src="google/arrow-upward" height="24" width="24" />
  </button>
{/if}
