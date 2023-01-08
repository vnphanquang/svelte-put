<script>
  import { toc } from '@svelte-put/toc';
  function handleTocInit(event) {
    const { items } = event.detail;
  }
  function handleTocChange(event) {
    const { activeItem } = event.detail;
  }
</script>

<main use:toc={{ observe: true }} on:tocinit={handleTocInit} on:tocchange={handleTocChange}>
  ...
</main>
