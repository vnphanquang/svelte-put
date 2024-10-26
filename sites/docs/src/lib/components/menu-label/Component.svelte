<script lang="ts">
	import type { HTMLLabelAttributes } from 'svelte/elements';

	let {
		align = 'left',
		class: cls,
		for: forHtml,
		children,
		...rest
	}: HTMLLabelAttributes & { align?: 'left' | 'right' } = $props();

	const commonPathClasses = `transition-transform origin-left`;
</script>

<label
	class="hover:text-link group flex cursor-pointer items-center gap-2 text-xs {cls}"
	class:flex-row-reverse={align === 'right'}
	for={forHtml}
	{...rest}
>
	<span class="sr-only">Menu</span>
	<svg
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		height="24"
		width="24"
		class="inline h-6 w-6"
		class:-scale-x-100={align === 'right'}
		fill="currentcolor"
	>
		<path
			class="{commonPathClasses} group-hover:scale-x-75"
			d="M21,7H3C2.4,7,2,6.6,2,6s0.4-1,1-1h18c0.6,0,1,0.4,1,1S21.6,7,21,7z"
		/>
		<path
			class="{commonPathClasses} group-hover:scale-x-125"
			d="M17,11H3c-0.6,0-1-0.4-1-1s0.4-1,1-1h14c0.6,0,1,0.4,1,1S17.6,11,17,11z"
		/>
		<path
			class="{commonPathClasses} group-hover:scale-x-75"
			d="M21,15H3c-0.6,0-1-0.4-1-1s0.4-1,1-1h18c0.6,0,1,0.4,1,1S21.6,15,21,15z"
		/>
		<path
			class="{commonPathClasses} group-hover:scale-x-125"
			d="M17,19H3c-0.6,0-1-0.4-1-1s0.4-1,1-1h14c0.6,0,1,0.4,1,1S17.6,19,17,19z"
		/>
	</svg>
	{#if children}
		{@render children()}
	{/if}
</label>
