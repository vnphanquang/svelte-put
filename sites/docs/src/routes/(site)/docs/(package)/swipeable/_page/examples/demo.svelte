<script lang="ts">
	// :::focus
	// :::highlight
	import {
		swipeable,
		type SwipeEndEventDetail,
		type SwipeSingleDirection,
		type SwipeStartEventDetail,
	} from '@svelte-put/swipeable';
	// :::
	// :::
	import { slide } from 'svelte/transition';

	const ITEMS = new Array(4).fill(undefined).map(() => ({
		id: crypto.randomUUID(),
		title: 'Message from Universe',
		excerpt:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. \
			Repudiandae blanditiis nulla perspiciatis quas necessitatibus deleniti! Sapiente fuge...',
	}));

	let items = $state(structuredClone(ITEMS));
	let direction: SwipeSingleDirection | null = $state(null);

	function swipestart(e: CustomEvent<SwipeStartEventDetail>) {
		direction = e.detail.direction;
	}

	function swipeend(e: CustomEvent<SwipeEndEventDetail>) {
		const { passThreshold } = e.detail;
		if (passThreshold) {
			const id = (e.target as HTMLElement).dataset.id;
			items = items.filter((i) => i.id !== id);
		}
	}

	function reset() {
		items = structuredClone(ITEMS);
		direction = null;
	}
</script>

<div class="flex items-baseline justify-between gap-4">
	<p class="mt-0">Swipe left to archive, swipe right to delete</p>
	<button class="c-btn c-btn--outlined" onclick={reset}>Reset</button>
</div>
<ul class="relative mt-8 overflow-hidden border border-blue-500">
	{#each items as { id, title, excerpt } (id)}
		<li
			class="relative"
			class:bg-red-500={direction === 'right'}
			class:bg-blue-500={direction === 'left'}
			out:slide={{ axis: 'y', duration: 200 }}
		>
			{#if direction === 'right'}
				<div
					class="i i-[trash] absolute left-4 top-1/2 z-0 h-6 w-6 -translate-y-1/2 text-white"
				></div>
			{/if}

			<!-- :::focus -->
			<!-- :::highlight -->
			<article
				class="z-px border-outline bg-bg-100 relative touch-pan-x space-y-1 border p-4"
				use:swipeable
				onswipestart={swipestart}
				onswipeend={swipeend}
				style:left="var(--swipe-distance-x)"
				data-id={id}
			>
				<!-- ::: -->
				<!-- ::: -->
				<p class="flex items-center gap-2 leading-normal">
					<span class="i i-[envelope-simple] h-6 w-6"></span>
					<span>>></span>
					<span class="font-medium">{title}</span>
				</p>
				<hr />
				<p class="text-sm leading-relaxed">{excerpt}</p>
			</article>

			{#if direction === 'left'}
				<div
					class="i i-[archive] absolute right-4 top-1/2 z-0 h-6 w-6 -translate-y-1/2 text-white"
				></div>
			{/if}
		</li>
	{/each}
</ul>
