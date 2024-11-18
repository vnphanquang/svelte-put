<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		line = true,
		class: cls,
		children,
		...rest
	}: HTMLAttributes<HTMLLIElement> & { line?: boolean } = $props();
</script>

<li class="group flex items-baseline space-x-4 {cls}" {...rest}>
	<div class="mt-0 flex flex-col items-center self-stretch">
		<p
			class="connected-step bg-primary-bg text-primary-fg grid h-7 w-7 place-items-center rounded-full text-xs font-bold"
		></p>
		{#if line}
			<div class="bg-primary-bg/75 min-h-[1rem] w-0.5 flex-1 group-last:hidden"></div>
		{/if}
	</div>
	<div class="mb-4">
		{#if children}
			{@render children()}
		{/if}
	</div>
</li>

<style lang="postcss">
	.connected-step::after {
		content: counter(connected-list);
		counter-increment: connected-list;
	}
</style>
