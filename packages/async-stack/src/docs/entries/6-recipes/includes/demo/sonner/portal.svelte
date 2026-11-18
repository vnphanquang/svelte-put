<script lang="ts">
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';

	import type { Stack } from '@svelte-put/async-stack';

	let { stack }: { stack: Stack } = $props();

	const MAX_ITEMS = 3;
	const SCALE_STEP = 0.05;
	const EXPAND_REM_GAP = 1;
	const TRANSLATE_REM_STEP = 1;
	/** if render top down, 1, if bottom up, -1 */
	const Y_SIGN = -1;

	let expanded = $state(false);
	let visibleItems = $derived(stack.items.slice(-3));

	let liMap: Record<string, HTMLLIElement> = $state({});
	let liHeightMap = $derived(
		Object.entries(liMap).reduce(
			(acc, [id, li]) => {
				acc[id] = li.clientHeight;
				return acc;
			},
			{} as Record<string, number>,
		),
	);
	let liOpacityMap = $derived(
		Object.entries(liMap).reduce(
			(acc, [id, li]) => {
				const index = parseInt(li.dataset.index ?? '0') || 0;
				acc[id] = index >= stack.items.length - MAX_ITEMS ? 1 : 0;
				return acc;
			},
			{} as Record<string, number>,
		),
	);
	let liTransformMap = $derived(
		Object.entries(liMap).reduce(
			(acc, [id, li]) => {
				const index = parseInt(li.dataset.index ?? '0') || 0;
				if (!expanded) {
					const delta = Math.min(stack.items.length - index, MAX_ITEMS + 1) - 1;
					const scaleX = 1 - delta * SCALE_STEP;

					const liHeight = liHeightMap[id] ?? 0;
					let topLiHeight = 0;
					const topItem = stack.items.at(-1);
					if (topItem) topLiHeight = liHeightMap[topItem.config.id] ?? 0;

					let scaleY = scaleX;
					let yPx = 0;
					if (liHeight >= topLiHeight) {
						scaleY = topLiHeight / liHeight || 1;
					} else {
						yPx = Y_SIGN * (topLiHeight - liHeight * scaleY);
					}
					const yRem = (Y_SIGN * delta * TRANSLATE_REM_STEP) / scaleY;

					acc[id] = `scaleX(${scaleX}) scaleY(${scaleY}) translateY(calc(${yPx}px + ${yRem}rem))`;
					return acc;
				}

				let accumulatedHeight = 0;
				let rem = 0;
				for (let i = stack.items.length - 1; i > index; i--) {
					accumulatedHeight += liHeightMap[stack.items[i].config.id] ?? 0;
					rem += EXPAND_REM_GAP;
				}
				let scale = index < stack.items.length - MAX_ITEMS ? 1 - MAX_ITEMS * SCALE_STEP : 1;

				acc[id] =
					`scale(${scale}) translateY(calc(${Y_SIGN * accumulatedHeight}px + ${Y_SIGN * rem}rem))`;
				return acc;
			},
			{} as Record<string, string>,
		),
	);
	const olHeight = $derived.by(() => {
		if (!expanded) return 'auto';
		const contentPx = visibleItems.reduce((acc, item) => {
			acc += (liHeightMap[item.config.id] ?? 0) + EXPAND_REM_GAP;
			return acc;
		}, 0);
		const remGap = EXPAND_REM_GAP * (visibleItems.length - 1);
		return `calc(${contentPx}px + ${remGap}rem)`;
	});

	function onMouseEnter() {
		expanded = true;
		stack.pause(); // pause all items;
	}
	function onMouseLeave() {
		expanded = false;
		stack.resume(); // resume all items;
	}
</script>

<!-- toast portal, typically setup at somewhere global like root layout -->
<ol
	class="z-notification tablet:bottom-10 tablet:right-10 fixed right-4 bottom-2 grid content-end items-end"
	style:height={olHeight}
	onmouseenter={onMouseEnter}
	onmouseleave={onMouseLeave}
	data-expanded={expanded}
>
	{#each stack.items as item, index (item.config.id)}
		{@const id = item.config.id}
		<li
			data-index={index}
			class="w-full origin-center"
			animate:flip={{ duration: 200 }}
			transition:fly={{ duration: 200, y: '2rem' }}
			style:opacity={liOpacityMap[id]}
			style:transform={liTransformMap[id]}
			{@attach (node) => {
				liMap[id] = node;
				return () => {
					delete liMap[id];
				};
			}}
		>
			<item.render.component {...item.render.props()} />
		</li>
	{/each}
</ol>

<style>
	ol {
		width: min(calc(100% - 2rem), 40rem);
		transition-duration: 500ms;

		&:hover {
			transition-duration: 250ms;
		}
	}

	li {
		grid-column: 1;
		grid-row: 1;

		transition-timing-function: var(--default-transition-timing-function);
		transition-duration: inherit;
		transition-property: transform;
	}
</style>
