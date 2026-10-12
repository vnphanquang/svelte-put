<section>
  <h2>Table of Contents</h2>
  {#if Object.values($tocStore.items).length} <!-- [!code --] -->
  {#if $tocStore.items.size}  <!-- [!code ++] -->
    <ul>
      {#each Object.values($tocStore.items) as tocItem} <!-- [!code --] -->
      {#each $tocStore.items.values() as tocItem} <!-- [!code ++] -->
        <li>...</li>
      {/each}
    </ul>
  {/if}
</section>