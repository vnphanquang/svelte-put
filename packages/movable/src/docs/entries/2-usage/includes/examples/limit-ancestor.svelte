<script lang="ts">
	import { movable } from '@svelte-put/movable';

	let parent: HTMLElement;
</script>

<div class="grid place-items-center border-2 border-primary px-4 py-6 space-y-4">
  <p class="text-center">
    Box below can be moved around,
		<br />
		but only within an ancestor.
  </p>
  <div class="px-20 py-10 border border-dashed border-red-500" bind:this={parent}>
		<div
			class="hl-info grid h-20 w-20 place-items-center"
			use:movable={{ limit: { parent } }}
		>
			...
		</div>
  </div>
</div>