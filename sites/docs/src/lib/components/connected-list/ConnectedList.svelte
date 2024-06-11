<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	let { class: cls, children, ...rest }: HTMLAttributes<HTMLUListElement> = $props();
</script>

<ul class="prose-p:m-0 prose-ul:m-4 prose-li:m-0 {cls}" {...rest}>
	{#if children}
		{@render children()}
	{/if}
</ul>

<style>
	ul {
		counter-reset: connected-list;
	}
</style>
