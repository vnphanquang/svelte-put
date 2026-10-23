<script lang="ts">
	import { movable } from '@svelte-put/movable';

	let handle: HTMLElement;
	let parent: HTMLElement;
</script>

<div class="not-prose grid place-items-center space-y-4 border-2 border-primary py-10 px-4" bind:this={parent}>
  <p class="text-center">
		Move <span class="hl-info px-2">blue</span> box by dragging the
		<span class="hl-warning px-2">yellow</span> box
	</p>
	<div class="hl-info flex h-40 w-40 flex-col p-2" use:movable={{ handle, limit: { parent } }}>
		<div class="hl-warning grid h-8 w-8 place-items-center self-end" bind:this={handle}>.</div>
		<div class="grid flex-1 place-items-center self-stretch">...</div>
	</div>
</div>
