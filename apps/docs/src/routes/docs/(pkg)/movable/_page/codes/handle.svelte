<script lang="ts">
  import { movable } from '@svelte-put/movable';

  let handle: HTMLElement;
</script>

<div class="flex h-40 w-40 flex-col bg-blue-200 p-2 dark:text-black" use:movable={{ handle }}>
  <div class="grid h-8 w-8 place-items-center self-end bg-green-200" bind:this={handle}>.</div>
  <div class="grid flex-1 place-items-center self-stretch">...</div>
</div>
