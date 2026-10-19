<!-- [!code word:toc] -->
<script>
	// [!code ++:3]
	import { Toc } from '@svelte-put/toc';
	import '@svelte-put/toc/styles.css';
	const toc = new Toc();
</script>

<main> <!-- [!code --] -->
<main {...toc.enhance.scope()} {...toc.runtime.index()}> <!-- [!code ++] -->
  ...truncated...

  <section>
    <h2>Table of Contents</h2>
    {#if toc.items.size}  <!-- [!code ++:10] -->
      <ul>
        {#each toc.items.values() as item (item.id)}
          <li>
            <a {...toc.enhance.link(item)}>
              {item.text}
            </a>
          </li>
        {/each}
      </ul>
    {/if}
  </section>

	...truncated...
</main>