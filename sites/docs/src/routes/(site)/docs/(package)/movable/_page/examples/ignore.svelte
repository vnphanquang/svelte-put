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
	class="grid h-40 w-40 place-items-center bg-blue-200 dark:text-black"
	use:movable={{ ignore: '.to-ignore' }}
>
	{#if mounted}
		<p class="to-ignore cursor-auto bg-red-200 p-2 text-sm">To ignore</p>
	{/if}
</div>
