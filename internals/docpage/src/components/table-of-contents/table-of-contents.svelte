<script lang="ts" module>
	import type { Toc } from '@svelte-put/toc';

	import { UnsupportedCSSScrollWarning } from '../unsupported-css-scroll-warning';

	export interface TableOfContentsProps {
		toc: Toc;
	}
</script>

<script lang="ts">
	let { toc }: TableOfContentsProps = $props();
</script>

<button class="c-btn c-btn--icon text-sm" popovertarget="toc">
	<span id="toc-label">On this page</span>
	<i class="i i-[ph--list] h-5 w-5"></i>
</button>
<div popover id="toc">
	<nav aria-labelledby="toc-label">
		{#if toc.items.size}
			<p
				class="border-fill-200 text-stroke-200 max-desktop:hidden border-s ps-4 pbe-4 text-sm uppercase"
			>
				<span>On this page</span>
				<UnsupportedCSSScrollWarning />
			</p>
			<ol>
				{#each toc.items.values() as item (item.id)}
					{let level = $derived(item.tag[1])}
					<li>
						<a
							class="c-link-lazy leading-double block w-full overflow-hidden text-ellipsis whitespace-nowrap"
							{...toc.enhance.link(item)}
						>
							<span style:padding-inline-start="calc(1rem * ({level} - 2))">
								{item.text}
							</span>
						</a>
					</li>
				{/each}
			</ol>
		{/if}
	</nav>
</div>

<style>
	@import '@vnphanquang/gach/styles/custom-medias';

	button {
		display: flex;
		gap: 0.5rem;
		align-items: center;

		padding-block: 1rem;
		padding-inline-start: 0;

		@media (--desktop) {
			display: none;
		}
	}

	#toc {
		--x: 100%;
		--bs: 3.25rem;
		--pie: 0.2rem;

		position: fixed;
		inset-block-start: calc(var(--bs) + var(--pie));
		transform: translateX(var(--x));

		min-width: 18rem;
		max-width: 90dvw;
		max-height: calc(100dvh - var(--bs) - var(--pie) * 2);
		margin-inline: auto 0.2rem;
		padding: 1rem;

		opacity: 0;
		background-color: var(--color-fill-100);

		transition-timing-function: ease-out;
		transition-duration: 150ms;
		transition-property: display, overlay, transform, opacity;
		transition-behavior: allow-discrete;

		&:popover-open {
			transform: translateX(0);
			opacity: 1;
			transition-timing-function: ease-out;

			@starting-style {
				transform: translate(var(--x));
				opacity: 0;
			}
		}

		@media (--desktop) {
			display: contents;
		}

		@media (prefers-reduced-motion: reduce) {
			transition-property: none;
		}
	}

	nav {
		--width: 12rem;

		overflow-y: auto;
		overscroll-behavior: contain;
		grid-area: toc;
		max-height: calc(100dvh - var(--bs, 0));

		@media (--desktop) {
			position: sticky;
			inset-block-start: 0;

			width: var(--width);
			height: fit-content;
			max-height: 100dvh;
			padding-block: var(--py);
			padding-inline-start: var(--px);
		}

		@media (--widescreen) {
			--width: 16rem;
		}
	}

	a {
		@media (--desktop) {
			padding-inline-start: 1rem;
			border-inline-start: 1px var(--color-fill-200) solid;
		}
	}
</style>
