<script lang="ts">
	import { resize } from '@svelte-put/resize';
	import type { ResizeDetail } from '@svelte-put/resize';

	let enabled = $state(true);

	function calcBorderRadius(size1: number, size2: number) {
		return `${Math.min(100, size1 / 10 + size2 / 10)}px`;
	}

	function onResized(e: CustomEvent<ResizeDetail>) {
		const { entry } = e.detail;

		const target = entry.target as HTMLElement;
		if (entry.borderBoxSize?.length > 0) {
			target.style.borderRadius = calcBorderRadius(
				entry.borderBoxSize[0].inlineSize,
				entry.borderBoxSize[0].blockSize,
			);
		} else {
			target.style.borderRadius = calcBorderRadius(
				entry.contentRect.width,
				entry.contentRect.height,
			);
		}
	}

	let box: HTMLDivElement;
	$effect(() => {
		if (!enabled) box.style.borderRadius = '8px';
	});
</script>

<div class="flex flex-col items-center space-y-4">
	<p>
		Resize <span class="bg-blue-500 px-2 text-white">blue</span> box (dragging bottom right corner) to
		see change
	</p>
	<div
		class="h-24 w-24 resize overflow-auto bg-blue-500"
		use:resize={{ enabled }}
		onresized={onResized}
		bind:this={box}
	></div>
	<div class="flex items-center space-x-2">
		<label for="resize-enable">Check to {enabled ? 'disable' : 'enable'} action:</label>
		<input
			type="checkbox"
			id="resize-enable"
			bind:checked={enabled}
			class="c-input accent-primary h-5 w-5"
		/>
	</div>
</div>
