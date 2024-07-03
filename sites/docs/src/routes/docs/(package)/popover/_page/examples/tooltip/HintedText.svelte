<script lang="ts">
	import { Popover, type PopoverPlugin } from '@svelte-put/popover';
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	import { compute } from './compute';
	import './tooltip.css';

	let {
		children,
		hint,
		class: cls,
		...rest
	}: HTMLButtonAttributes & { children: Snippet; hint: Snippet } = $props();

	let controlEl: HTMLButtonElement;
	let targetEl: HTMLElement;
	let arrowEl: HTMLDivElement;

	let cleanup = () => {};
	const tooltipPlugin: PopoverPlugin = () => ({
		name: 'tooltip',
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
	});

	const popover = new Popover({
		triggers: {
			hover: true,
			focus: true,
		},
		plugins: tooltipPlugin,
	});
</script>

<button
	bind:this={controlEl}
	class="inline {cls}"
	use:popover.control.actions
	{...popover.control.attributes}
	{...rest}>{@render children()}</button
>

<div bind:this={targetEl} {...popover.target.attributes} use:popover.target.actions>
	<div class="arrow" bind:this={arrowEl}></div>
	{@render hint()}
</div>
