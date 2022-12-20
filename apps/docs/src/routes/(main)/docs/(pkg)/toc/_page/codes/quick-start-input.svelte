<script lang="ts">
  import { toc } from '@svelte-put/toc';
  import type { TocInitEventDetails, TocChangeEventDetails, TocEventItem } from '@svelte-put/toc';

  const tocItems: TocEventItem[] = [];
  function onTocInit(e: CustomEvent<TocInitEventDetails>) {
    let items = e.detail.items;
  }

  function onTocChange(e: CustomEvent<TocChangeEventDetails>) {
    const { id } = e.detail;
  }
</script>

<main use:toc on:tocinit={onTocInit} on:tocchange={onToc}>
  <h1>Page Heading</h1>
  <section>
    <h2>Section Heading</h2>

    <section>
      <h3>Nested Section Heading</h3>
    </section>
  </section>
  <!-- ... -->
</main>
