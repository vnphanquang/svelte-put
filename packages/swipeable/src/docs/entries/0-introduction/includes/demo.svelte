<script lang="ts">
	import { slide } from 'svelte/transition';

	import {
		type SwipeEndEventDetail,
		type SwipeSingleDirection,
		type SwipeStartEventDetail,
		swipeable,
	} from '@svelte-put/swipeable';

	const ITEMS = new Array(4).fill(undefined).map(() => ({
		id: 'crypto' in globalThis ? crypto.randomUUID() : Math.random().toString(36).slice(2),
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

<div class="not-md border-primary border p-4">
	<div class="flex items-baseline justify-between gap-4">
		<p class="mt-0">Swipe left to archive, swipe right to delete</p>
		<button class="c-btn c-btn--outlined" onclick={reset}>Reset</button>
	</div>
	<ul class="relative mt-8 overflow-hidden border border-current p-2">
		{#each items as { id, title, excerpt } (id)}
			<li
				class="relative"
				class:bg-error-fill-50={direction === 'right'}
				class:bg-info-fill-50={direction === 'left'}
				out:slide={{ axis: 'y', duration: 200 }}
			>
				{#if direction === 'right'}
					<div
						class="i i-[ph--trash] absolute top-1/2 left-4 z-0 h-6 w-6 -translate-y-1/2 text-white"
					></div>
				{/if}

				<article
					class="z-px border-outline bg-fill-100 relative touch-pan-y space-y-1 border p-4"
					use:swipeable={{ disableTouchEvents: false, followThrough: { container: 'ul' } }}
					onswipestart={swipestart}
					onswipeend={swipeend}
					style:left="var(--swipe-distance-x)"
					data-id={id}
				>
					<p class="flex items-center gap-2 leading-normal">
						<i class="i i-[ph--envelope-simple] h-6 w-6"></i>
						<span>>></span>
						<span class="font-medium">{title}</span>
					</p>
					<hr />
					<p class="text-sm leading-relaxed">{excerpt}</p>
				</article>

				{#if direction === 'left'}
					<div
						class="i i-[ph--archive] absolute top-1/2 right-4 z-0 h-6 w-6 -translate-y-1/2 text-white"
					></div>
				{/if}
			</li>
		{:else}
			<p class="px-4 py-2 text-center">You're all caught up 🎉</p>
		{/each}
	</ul>
</div>
