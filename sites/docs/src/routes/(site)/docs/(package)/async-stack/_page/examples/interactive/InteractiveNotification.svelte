<script lang="ts">
	import type { StackItemProps } from '@svelte-put/async-stack';
	import { fly } from 'svelte/transition';

	let { item, message }: StackItemProps<boolean> & { message: string } = $props();

	// :::highlight
	const join = () => item.resolve(true);
	const del = () => item.resolve(false);
	// :::
</script>

<div
	class="bg-bg-100 pointer-events-auto rounded-sm px-4 py-2 shadow-lg"
	in:fly|global={{ duration: 200, y: -20 }}
>
	<p class="text-xl font-bold">Invitation</p>
	<p class="text-lg">{message}</p>
	<div class="flex gap-6">
		<button class="c-btn w-40" onclick={join}> Join </button>
		<button class="c-btn c-btn--outlined w-40" onclick={del}> Delete </button>
	</div>
</div>
