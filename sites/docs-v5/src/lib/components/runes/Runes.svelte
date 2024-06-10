<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	let { ...rest }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div {...rest}>
	<button popovertarget="rune-popover" type="button" class="hover:text-link transition-colors">
		<svg inline-src="runes" width="80" height="80"></svg>
	</button>
	<!-- TODO: enhance with floating-ui and/or @svelte-put/tooltip -->
	<div id="rune-popover" popover="auto" class="rounded bg-bg-200 text-fg py-2 px-4 not-prose text-sm backdrop:bg-bg backdrop:opacity-50 relative">
		<p>
			Compatible with or powered directly by
			<a href="https://svelte.dev/blog/runes" class="c-link">Svelte runes</a>.
		</p>
	</div>
</div>
