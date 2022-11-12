<script lang="ts">
  import clsx from 'clsx';
  import { fly } from 'svelte/transition';

  import ArrowUp from '$lib/ui/components/icons/material/ArrowUp.svelte';

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
    class={clsx('grid place-items-center rounded-full bg-fg p-2 text-bg shadow', $$props.class)}
    aria-label="Back to top"
  >
    <ArrowUp height="24" width="24" />
  </button>
{/if}
