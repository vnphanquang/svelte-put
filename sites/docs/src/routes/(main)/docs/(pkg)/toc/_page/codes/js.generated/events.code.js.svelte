<script>
  import { toc } from '@svelte-put/toc';
  function handleTocInit(event) {
    const { items } = event.detail;
    console.log('Extracted item', items);
  }
  function handleTocChange(event) {
    const { activeItem } = event.detail;
    console.log('Item currently on viewport', activeItem);
  }
</script>

<main use:toc={{ observe: true }} on:tocinit={handleTocInit} on:tocchange={handleTocChange}>
  ...
</main>
