<script>
  import { toc, createTocStore } from '@svelte-put/toc';
  const tocStore = createTocStore();
</script>

<main use:toc={{ store: tocStore, observe: true }}>
  <!-- ... -->
  <section>
    <h2>Table of Contents</h2>
    {#if Object.values($tocStore.items).length}
      <ul>
        {#each Object.values($tocStore.items) as { id, text }}
          <li>
            <a href="#{id}" data-toc-link-active={$tocStore.activeItem?.id === id}>{text}</a>
          </li>
        {/each}
      </ul>
    {/if}
  </section>
  <!-- ... -->
</main>
