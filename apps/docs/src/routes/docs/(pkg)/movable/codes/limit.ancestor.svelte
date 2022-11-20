<script lang="ts">
  import { movable } from '@svelte-put/movable';

  let parentNode: HTMLElement;
</script>

<div class="grid place-items-center border-2 border-violet-500 p-4" bind:this={parentNode}>
  <p class="text-center">Box below can be moved around, but only within the violet border</p>
  <div
    class="grid h-20 w-20 place-items-center bg-blue-200"
    use:movable={{ limit: { parent: parentNode } }}
  >
    ...
  </div>
</div>
