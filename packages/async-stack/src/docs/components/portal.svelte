<script lang="ts">
	import { flip } from 'svelte/animate';
	import { fade, fly } from 'svelte/transition';

	import type { Stack } from '@svelte-put/async-stack';

	let { stack }: { stack: Stack } = $props();
</script>

<div
	class="z-notification pointer-events-none fixed inset-y-0 right-0 flex flex-col-reverse justify-end gap-4 p-10 md:left-1/2 md:justify-start"
>
	{#each stack.items as item (item.config.id)}
		<div
			animate:flip={{ duration: 200 }}
			in:fly={{ duration: 200, x: 20 }}
			out:fade={{ duration: 120 }}
			class="relative w-full"
		>
			<item.render.component {...item.render.props()} />
		</div>
	{/each}
</div>
