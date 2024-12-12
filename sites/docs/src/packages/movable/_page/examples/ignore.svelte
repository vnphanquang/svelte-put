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
	class="hl-info z-overlay grid h-40 w-40 place-items-center"
	use:movable={{ ignore: '.to-ignore' }}
>
	{#if mounted}
		<p class="to-ignore hl-error cursor-auto p-2 text-sm">To ignore</p>
	{/if}
</div>
