<script lang="ts">
  import { toc } from '@svelte-put/toc';
  import type { TocInitEventDetails, TocChangeEventDetails } from '@svelte-put/toc';
  function handleTocInit(event: CustomEvent<TocInitEventDetails>) {
    const { items } = event.detail;
    console.log('Extracted item', items);
  }
  function handleTocChange(event: CustomEvent<TocChangeEventDetails>) {
    const { activeItem } = event.detail;
    console.log('Item currently on viewport', activeItem);
  }
</script>

<main use:toc={{ observe: true }} on:tocinit={handleTocInit} on:tocchange={handleTocChange}>
  ...
</main>
