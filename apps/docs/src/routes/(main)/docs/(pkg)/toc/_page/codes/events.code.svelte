<script lang="ts">
  import { toc } from '@svelte-put/toc';
  import type { TocInitEventDetails, TocChangeEventDetails } from '@svelte-put/toc';
  function handleTocInit(event: CustomEvent<TocInitEventDetails>) {
    const { items } = event.detail;
  }
  function handleTocChange(event: CustomEvent<TocChangeEventDetails>) {
    const { activeItem } = event.detail;
  }
</script>

<main use:toc={{ observe: true }} on:tocinit={handleTocInit} on:tocchange={handleTocChange}>
  ...
</main>
