<script>
  import { toc, createTocStore } from '@svelte-put/toc';
  const tocStore = createTocStore();
</script>

<main use:toc={{ store: tocStore, observe: true }}>
  <!-- ... -->
  <section>
    <h2>Table of Contents</h2>
    {#if $tocStore.items.size}
      <ul>
        {#each $tocStore.items.values() as { id, text }}
          <li>
            <a href="#{id}" data-toc-link-active={$tocStore.activeItem?.id === id}>{text}</a>
          </li>
        {/each}
      </ul>
    {/if}
  </section>
  <!-- ... -->
</main>
