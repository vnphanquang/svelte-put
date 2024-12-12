<script lang="ts">
	import { movable } from '@svelte-put/movable';

	let handle: HTMLElement | undefined = $state();
</script>

<div class="hl-info flex h-40 w-40 flex-col p-2" use:movable={{ handle }}>
	<div class="hl-warning grid h-8 w-8 place-items-center self-end" bind:this={handle}>.</div>
	<div class="grid flex-1 place-items-center self-stretch">...</div>
</div>
