<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		status,
		class: cls,
		children,
		...rest
	}: HTMLAttributes<HTMLSpanElement> & {
		status: Exclude<App.Package['status'], 'deprecated'>;
	} = $props();

	const BADGE_CLASSES = {
		beta: 'hl-info',
		dev: 'hl-warning',
		new: 'hl-success',
		flux: 'hl-error',
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
