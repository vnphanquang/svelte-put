<script>
	import { movable } from '@svelte-put/movable';
	import { onMount } from 'svelte';

	let mounted = false;
	onMount(() => {
		setTimeout(() => {
			mounted = true;
		}, 500);
	});
</script>

<div
	class="bg-info-bg text-info-fg z-overlay grid h-40 w-40 place-items-center"
	use:movable={{ ignore: '.to-ignore' }}
>
	{#if mounted}
		<p class="to-ignore bg-error-bg text-error-fg cursor-auto p-2 text-sm">To ignore</p>
	{/if}
</div>
