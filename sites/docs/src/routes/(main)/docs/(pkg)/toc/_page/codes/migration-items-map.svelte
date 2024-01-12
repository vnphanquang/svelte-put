<section>
  <h2>Table of Contents</h2>
- {#if Object.values($tocStore.items).length}
+ {#if $tocStore.items.size}
    <ul>
-     {#each Object.values($tocStore.items) as tocItem}
+     {#each $tocStore.items.values() as tocItem}
        <li>
          ...
        </li>
      {/each}
    </ul>
  {/if}
</section>
