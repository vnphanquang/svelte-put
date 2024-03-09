<script lang="ts">
  import { intersect } from '@svelte-put/intersect';
  import { fly } from 'svelte/transition';

  let ulElement: HTMLUListElement;
  let intersectionMap: Record<string, boolean> = {
    one: false,
    two: false,
    three: false,
    four: false,
    five: false,
    six: false,
    seven: false,
    eight: false,
  };
</script>

<ul
  class="max-h-[400px] w-full space-y-40 overflow-hidden overflow-y-auto p-4"
  bind:this={ulElement}
>
  {#each Object.keys(intersectionMap) as key (key)}
    {#key intersectionMap[key]}
      <li
        class="h-[300px] odd:bg-green-200 even:bg-blue-200 marker:content-none"
        class:invisible={!intersectionMap[key]}
        in:fly={{ y: 100, duration: 250 }}
        use:intersect={{ threshold: 0.4, root: ulElement }}
        on:intersectonce={() => (intersectionMap[key] = true)}
      />
    {/key}
  {/each}
</ul>
