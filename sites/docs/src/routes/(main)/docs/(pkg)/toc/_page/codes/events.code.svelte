<script lang="ts">
  import { toc } from '@svelte-put/toc';
  import type { TocInitEventDetail, TocChangeEventDetail } from '@svelte-put/toc';
  function handleTocInit(event: CustomEvent<TocInitEventDetail>) {
    const { items } = event.detail;
    console.log('Extracted item', items);
  }
  function handleTocChange(event: CustomEvent<TocChangeEventDetail>) {
    const { activeItem } = event.detail;
    console.log('Item currently on viewport', activeItem);
  }
</script>

<main use:toc={{ observe: true }} on:tocinit={handleTocInit} on:tocchange={handleTocChange}>
  ...
</main>
