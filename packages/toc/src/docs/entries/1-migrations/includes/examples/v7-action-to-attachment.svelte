<script>
  import { Toc } from '@svelte-put/toc';
  const toc = new Toc({ observe: true });
</script>

<main use:toc.actions.root>  <!-- [!code --] -->
<main {...toc.enhance.root()}>  <!-- [!code ++] -->
  <h1>Page Heading</h1>

  <section>
    <h2>Table of Contents</h2>
    {#if toc.items.size}
      <ul>
        {#each toc.items.values() as item (item.id)}
          <li>
            <a use:toc.actions.link={item}></a> <!-- [!code --] -->
            <a {...toc.enhance.link(item)}>{...item.text}</a> <!-- [!code ++] -->
          </li>
        {/each}
      </ul>
    {/if}
  </section>
</main>
