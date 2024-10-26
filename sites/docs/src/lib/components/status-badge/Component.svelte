<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		status,
		class: cls,
		children,
		...rest
	}: HTMLAttributes<HTMLSpanElement> & {
		status: 'dev' | 'beta' | 'new' | 'flux' | 'stable';
	} = $props();

	const BADGE_CLASSES = {
		beta: 'bg-info-bg text-info-fg',
		dev: 'bg-warning-bg text-warning-fg',
		new: 'bg-success-bg text-success-fg',
		flux: 'bg-error-bg text-error-fg',
		stable: 'bg-gray-700 text-white',
	} satisfies Record<typeof status, string>;
	let badgeClass = $derived(BADGE_CLASSES[status]);
</script>

<span class="rounded-lg px-1.5 py-px text-xs {badgeClass} {cls}" {...rest}>
	{#if children}
		{@render children()}
	{:else}
		{status}
	{/if}
</span>
