<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	let { status, class: cls, children, ...rest }: HTMLAttributes<HTMLSpanElement> & {
		status: 'dev' | 'beta' | 'new' | 'flux' | 'stable';
	} = $props();

  const BADGE_CLASSES = {
    beta: 'bg-info-surface text-info-text',
    dev: 'bg-warning-surface text-warning-text',
    new: 'bg-success-surface text-success-text',
    flux: 'bg-error-surface text-error-text',
    stable: 'bg-gray-700 text-white',
  } satisfies Record<typeof status, string>;
  let badgeClass = $derived(BADGE_CLASSES[status]);
</script>

<span class="text-xs rounded-lg px-1.5 py-px {badgeClass} {cls}" {...rest}>
	{#if children}
		{@render children()}
	{:else}
		{status}
	{/if}
</span>

