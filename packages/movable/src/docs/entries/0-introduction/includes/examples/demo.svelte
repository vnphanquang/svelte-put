<script lang="ts">
	import { movable } from '@svelte-put/movable';

	let parent: HTMLElement;
</script>

<div class="not-md grid place-items-center space-y-4 border-2 border-primary py-10" bind:this={parent}>
	<div class="hl-info z-overlay grid h-20 w-20 place-items-center" use:movable={{ limit: { parent } }}>...</div>
</div>
