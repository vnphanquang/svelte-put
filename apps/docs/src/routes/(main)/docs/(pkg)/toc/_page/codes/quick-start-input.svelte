<script>
  import { toc, createTocStore, toclink } from '@svelte-put/toc';
  const tocStore = createTocStore();
</script>

<main use:toc={{ store: tocStore, observe: true }}>
  <h1>Page Heading</h1>

  <section>
    <h2>Table of Contents</h2>
    {#if Object.values($tocStore.items).length}
      <ul>
        {#each Object.values($tocStore.items) as tocItem}
          <li>
            <!-- svelte-ignore a11y-missing-attribute -->
            <a use:toclink={{ store: tocStore, tocItem, observe: true }} />
          </li>
        {/each}
      </ul>
    {/if}
  </section>

  <section>
    <h2>Section Heading Level 2</h2>
    <p>...</p>
  </section>

  <section>
    <h3>Section Heading Level 3</h3>
    <p>...</p>
  </section>
  <!-- ... -->
</main>
