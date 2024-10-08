<script lang="ts">
	import { Popover } from '@svelte-put/popover';
	import type { HTMLAttributes } from 'svelte/elements';

	import { compute } from '$lib/popover/compute';

	let { class: cls, ...rest }: HTMLAttributes<HTMLDivElement> = $props();

	let controlEl: HTMLButtonElement;
	let targetEl: HTMLElement;
	let arrowEl: HTMLDivElement;

	let cleanup = () => {};
	const popover = new Popover({
		triggers: {
			hover: true,
			focus: true,
		},
		plugins: () => ({
			target: {
				attributes: {
					role: 'tooltip',
					onbeforetoggle: (e) => {
						if (e.newState !== 'open') return cleanup();
						cleanup = compute(controlEl, targetEl, arrowEl);
					},
				},
				actions: [
					(node) => {
						node.classList.toggle('enhanced', true);
					},
				],
			},
		}),
	});
</script>

<div class="not-prose {cls}" {...rest}>
	<button
		type="button"
		class="hover:text-link transition-colors"
		bind:this={controlEl}
		{...popover.control.attributes}
		use:popover.control.actions
	>
		<svg inline-src="runes" width="80" height="80"></svg>
		<span class="sr-only">Run support</span>
	</button>

	<div
		bind:this={targetEl}
		{...popover.target.attributes}
		use:popover.target.actions
		class="c-tooltip"
	>
		<div class="arrow" bind:this={arrowEl}></div>
		<p>
			Compatible with or powered directly by
			<a href="https://svelte.dev/blog/runes" class="c-link">Svelte runes</a>.
		</p>
	</div>
</div>
