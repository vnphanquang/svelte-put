<script>
  import { dragscroll } from '@svelte-put/dragscroll';
</script>

<div class="cursor-pointer overflow-x-auto" use:dragscroll>
  {#each new Array(10) as _, row}
    <div class="grid grid-cols-[repeat(10,1fr)]">
      {#each new Array(10) as _, col}
        <div
          class="
            grid h-10 w-32 place-items-center
            {row % 2 === 0
            ? 'odd:bg-black odd:text-white even:bg-white even:text-black'
            : 'odd:bg-white odd:text-black even:bg-black even:text-white'}
          "
        >
          {row * 10 + col + 1}
        </div>
      {/each}
    </div>
  {/each}
</div>
