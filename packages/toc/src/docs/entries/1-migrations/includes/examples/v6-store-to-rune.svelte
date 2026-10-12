<script>
  import { createTocStore, toc, toclink } from '@svelte-put/toc'; // [!code --]
  import { Toc } from '@svelte-put/toc'; // [!code ++]

  const tocStore = createTocStore(); // [!code --]
  const toc = new Toc({ observe: true }); // [!code ++]
</script>

<main use:toc={{ store: tocStore, observe: true }}> <!-- [!code --] -->
<main use:toc.actions.root>  <!-- [!code ++] -->
  <h1>Page Heading</h1>

  <section>
    <h2>Table of Contents</h2>
    {#if $tocStore.items.size} <!-- [!code --] -->
    {#if toc.items.size} <!-- [!code ++] -->
      <ul>
        {#each $tocStore.items.values() as tocItem} <!-- [!code --] -->
        {#each toc.items.values() as tocItem} <!-- [!code ++] -->
          <li>
            <!-- svelte-ignore a11y-missing-attribute -->
            <a use:toclink={{ store: tocStore, tocItem, observe: true }}></a> <!-- [!code --] -->
            <a use:toc.actions.link={tocItem}></a> <!-- [!code ++] -->
          </li>
        {/each}
      </ul>
    {/if}
  </section>
</main>