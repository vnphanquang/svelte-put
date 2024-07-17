<script lang="ts">
	import type { ActionReturn } from 'svelte/action';
	import { flip } from 'svelte/animate';
	import { SvelteMap } from 'svelte/reactivity';
	import { fly } from 'svelte/transition';

	import { toastStack } from './toast';

	const MAX_ITEMS = 3;
	const SCALE_STEP = 0.05;
	const EXPAND_REM_GAP = 1;
	const TRANSLATE_REM_STEP = 1;

	const heights = new SvelteMap<string, number>();
	let expanded = $state(false);
	let visibleItems = $derived(toastStack.items.slice(-3));
	const olHeight = $derived.by(() => {
		if (!expanded) return 'auto';
		const contentPx = visibleItems.reduce(
			(acc, item) => acc + (heights.get(item.config.id) ?? 0) + EXPAND_REM_GAP,
			0,
		);
		const remGap = EXPAND_REM_GAP * (visibleItems.length - 1);
		return `calc(${contentPx}px + ${remGap}rem)`;
	});

	function collect(node: HTMLLIElement): ActionReturn {
		const id = node.dataset.id;

		function collectHeight() {
			if (id) heights.set(id, node.clientHeight);
		}

		node.addEventListener('resize', collectHeight);
		collectHeight();

		return {
			destroy() {
				if (id) heights.delete(id);
				node.removeEventListener('resize', collectHeight);
			},
		};
	}

	function getTransform(index: number) {
		if (!expanded) {
			const delta = Math.min(toastStack.items.length - index, MAX_ITEMS + 1) - 1;
			const scale = 1 - delta * SCALE_STEP;
			const translateY = -1 * delta * TRANSLATE_REM_STEP;
			return `scale(${scale}) translateY(${translateY}rem)`;
		}

		let accumulatedHeight = 0;
		let rem = 0;
		for (let i = toastStack.items.length - 1; i > index; i--) {
			const notification = toastStack.items[i];
			accumulatedHeight += heights.get(notification.config.id) ?? 0;
			rem += EXPAND_REM_GAP;
		}

		let scale = index < toastStack.items.length - MAX_ITEMS ? 1 - MAX_ITEMS * SCALE_STEP : 1;

		return `scale(${scale}) translateY(calc(-${accumulatedHeight}px - ${rem}rem))`;
	}

	function getOpacity(index: number) {
		if (index >= toastStack.items.length - MAX_ITEMS) return 1;
		return 0;
	}

	function onMouseEnter() {
		expanded = true;
		visibleItems.forEach((i) => i.pause());
	}
	function onMouseLeave() {
		expanded = false;
		visibleItems.forEach((i) => i.resume());
	}
</script>

<!-- toast portal, typically setup at somewhere global like root layout -->
<ol
	class="fixed bottom-2 right-4 z-notification grid content-end items-end tb:bottom-10 tb:right-10"
	style:height={olHeight}
	onmouseenter={onMouseEnter}
	onmouseleave={onMouseLeave}
	data-expanded={expanded}
>
	{#each toastStack.items as notification, index (notification.config.id)}
		{@const id = notification.config.id}
		<li
			data-id={id}
			class="w-full origin-center"
			animate:flip={{ duration: 200 }}
			transition:fly={{ duration: 200, y: '2rem' }}
			style:opacity={getOpacity(index)}
			style:transform={getTransform(index)}
			use:toastStack.actions.render={notification}
			use:collect
		></li>
	{/each}
</ol>

<style lang="postcss">
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

		transition-timing-function: theme('transitionTimingFunction.DEFAULT');
		transition-duration: inherit;
		transition-property: transform;
	}
</style>
