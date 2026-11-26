<script lang="ts" module>
	import type { Toc } from '@svelte-put/toc';
	import type { Snippet } from 'svelte';

	import type { LinkPage, PageLinks } from '../../loader';
	import { UnsupportedCSSScrollWarning } from '../unsupported-css-scroll-warning';

	export interface DocLayoutProps {
		slug: string;
		children?: Snippet;
		/** start sidebar, render links to other pages */
		inter: {
			title?: string;
			links?: PageLinks;
		};
		/** end sidebar, render links & info within this page */
		intra: {
			toc?: Toc | null;
		};
	}
</script>

<script lang="ts">
	let { slug, children, inter, intra }: DocLayoutProps = $props();

	let popoverInter: HTMLElement;

	function handleClickLinkInInter() {
		popoverInter?.hidePopover();
	}
</script>

{#snippet pageLink(page: LinkPage)}
	<li>
		<a
			class="c-link-lazy leading-double block w-full overflow-hidden text-ellipsis whitespace-nowrap"
			href={page.href}
			title={page.title}
			onclick={handleClickLinkInInter}
			{...page.id === slug && { 'aria-current': true }}
		>
			{page.title}
		</a>
	</li>
{/snippet}

<div class="page max-w-pad pbs-header grid flex-1" {...intra.toc?.enhance.scope()}>
	<div class="nav">
		<button class="c-btn c-btn--icon text-sm" popovertarget="inter">
			<i class="i i-[ph--list] h-5 w-5"></i>
			<span id="pages-label">Pages</span>
		</button>
		<div popover id="inter" bind:this={popoverInter}>
			<section class="inter-content space-y-4">
				{#if inter.title}
					<p class="text-lg font-bold">{inter.title}</p>
				{/if}
				<nav>
					<ol>
						{#each inter.links as link, i (link.type + i)}
							{#if link.type === 'page'}
								{@render pageLink(link)}
							{:else}
								<li class="border-y-stroke-200 page-group space-y-2 border-y">
									{#if link.title}
										<p class="font-bold uppercase">{link.title}</p>
									{/if}
									<ol>
										{#each link.pages as page (page.id)}
											{@render pageLink(page)}
										{/each}
									</ol>
								</li>
							{/if}
						{/each}
					</ol>
				</nav>
			</section>
		</div>

		<button class="c-btn c-btn--icon text-sm" popovertarget="intra">
			<span>On this page</span>
			<i class="i i-[ph--list] h-5 w-5"></i>
		</button>
		<div popover id="intra">
			<section class="intra-content desktop:space-y-10 space-y-4">
				{#if intra.toc?.items.size}
					<nav>
						<p class="text-stroke-200 max-desktop:hidden pbe-4 text-sm uppercase">
							<span>On this page</span>
							<UnsupportedCSSScrollWarning />
						</p>
						<ol>
							{#each intra.toc.items.values() as item (item.id)}
								{let level = $derived(item.tag[1])}
								<li>
									<a
										class="c-link-lazy leading-double block w-full overflow-hidden text-ellipsis whitespace-nowrap"
										{...intra.toc.enhance.link(item)}
									>
										<span style:padding-inline-start="calc(1rem * ({level} - 2))">
											{item.text}
										</span>
									</a>
								</li>
							{/each}
						</ol>
					</nav>
				{/if}
				<article class="border-fill-200 space-y-3 border p-3 text-sm">
					<p>Are you based in Vietnam?</p>
					<div class="flex items-start gap-2">
						<svg
							class="h-10 w-10 shrink-0"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								fill="currentcolor"
								d="M4.7 17.1c.4.6 1.7 0 2.5-.5.4-.2.5-.6.4-1-.2-.6-.4-1.7-.1-3 .1-.2-.3-.4-.4-.2-1.1 1.3-3 3.8-2.4 4.6ZM17.4 6.5c.3.1.7.1.9-.3.6-.9 1.6-2.5 1.2-2.9-.3-.3-2.6 1.1-4.5 2.3-.4.3-.1.9.3.8.8-.1 1.5-.2 2 0ZM10.1 8.7c-4.6 4-7.1 8-6.2 8.8.9.8 2.8-.3 3.6-.7.2-.1.4-.2.4-.2.1.1-1.4 1.2-2.5 1.6-1.4.5-2.5.1-2.5-1.1L3.6 3.7c0-.9 1-1.8 2-1.7 0 0 10.7.5 13.7.6.2 0 .2.2 0 .3-2.3.8-6 3-9.2 5.8ZM6.4 4.9l-.9-.5.2 1-.8.7 1 .1.5.9.5-.9 1-.1-.8-.7.2-1-.9.5Zm7.5 2.6c2-1.3 4.9-.7 6.3 1.4.3.5.6 1 .7 1.6s.1 1.2 0 1.8c-.1.4-.2.8-.4 1.2-.1.2-.1.5 0 .7.3.8.4 1.6.3 2.4-.1.6-.3 1.1-.6 1.6s-.7.9-1.2 1.2l-3.6 2.3c-2 1.3-4.9.7-6.3-1.4-.3-.5-.6-1-.7-1.6s-.1-1.2 0-1.8c.1-.4.2-.8.4-1.2.1-.2.1-.5 0-.7-.3-.8-.4-1.6-.3-2.4.1-.6.3-1.1.6-1.6.3-.5.7-.9 1.2-1.2l3.6-2.3ZM11.8 20.4c.6.2 1.1.2 1.7.1.3-.1.5-.2.7-.3l3.6-2.3c.3-.2.6-.4.7-.7.2-.3.3-.6.4-.9.1-.3.1-.7 0-1.1-.1-.3-.2-.7-.4-1-.3-.5-.8-.8-1.4-1.1-.6-.2-1.1-.2-1.7-.1-.3.1-.5.2-.7.3l-1.4.9c-.1 0-.1.1-.2.1-.2 0-.3 0-.5 0-.2-.1-.3-.2-.4-.3-.1-.1-.1-.2-.1-.3 0-.1 0-.2 0-.3 0-.1.1-.2.1-.3.1-.1.1-.2.2-.2l3.6-2.3c.1 0 .1-.1.2-.1.2-.1.3 0 .5 0 .2.1.3.2.4.3.1.2.2.3.1.5v.1c.6.2 1.2.5 1.7.8l.1.1.1-.2c0-.1.1-.2.1-.3.1-.3 0-.7 0-1.1-.1-.3-.2-.7-.4-1-.3-.5-.8-.8-1.4-1.1-.6-.2-1.1-.2-1.7-.1-.3.1-.5.2-.7.3l-3.6 2.3c-.3.2-.5.4-.7.7-.2.3-.3.6-.4.9s-.1.7 0 1.1c.1.3.2.7.4 1 .3.5.8.8 1.4 1.1.6.2 1.1.2 1.7.1.3-.1.5-.2.7-.3l1.4-.9c.1 0 .1-.1.2-.1.2 0 .3 0 .5 0 .2.1.3.2.4.3.1.1.1.2.1.3 0 .1 0 .2 0 .3 0 .1-.1.2-.1.3-.1.1-.1.2-.2.2l-3.6 2.3c-.1 0-.1.1-.2.1-.2.1-.3 0-.5 0-.2-.1-.3-.2-.4-.3s-.2-.3-.1-.5v-.1c-.6-.2-1.2-.5-1.7-.8l-.1-.1-.1.2c0 .1-.1.2-.1.3-.1.3-.1.7 0 1.1.1.3.2.7.4 1 .3.5.8.8 1.4 1.1Z"
							/>
						</svg>

						<p>
							Join our community at <a class="c-link" href="https://sveltevietnam.dev">
								Svelte Vietnam
							</a>.
						</p>
					</div>
				</article>
			</section>
		</div>
	</div>
	<main class="desktop:border-x border-fill-200 @container">
		{@render children?.()}
	</main>
</div>

<style>
	@import '@vnphanquang/gach/styles/custom-medias';

	.page {
		--py: 2.5rem;
		--px: 2rem;

		grid-template-columns: 1fr;
		grid-template-rows: auto 1fr;

		@media (--desktop) {
			--pb: 5rem;

			grid-template-areas: 'inter content intra';
			grid-template-columns: auto 1fr auto;
		}

		@media (--widescreen) {
			--px: 2.5rem;
		}
	}

	.nav {
		position: sticky;
		z-index: var(--z-index-header);
		inset-block-start: 0;

		display: flex;
		justify-content: space-between;

		height: var(--header-height, auto);
		margin-inline: calc(var(--pad-padding-x) * -1);
		padding-inline: calc(var(--pad-padding-x));
		border-block-end: 1px solid var(--color-fill-200);

		background-color: var(--color-fill-50);

		@media (--desktop) {
			display: contents;
		}
	}

	main {
		padding-block: var(--py);

		@media (--desktop) {
			grid-area: content;
			width: 100%;
			margin-inline: auto;
			padding-inline: var(--px);
		}
	}

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

	#inter {
		--x: -100%;

		position: fixed;
		inset-block: 0;
		transform: translateX(var(--x));

		width: 75dvw;
		height: 100%;
		padding: 2rem;

		opacity: 0;
		background-color: var(--color-fill-100);

		transition-timing-function: ease-out;
		transition-duration: 150ms;
		transition-property: display, overlay, transform, opacity;
		transition-behavior: allow-discrete;

		&::backdrop {
			background-color: oklch(from var(--color-fill-50) l c h / 40%);
			backdrop-filter: blur(0.2rem);
		}

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

	.inter-content {
		--width: 10rem;

		overflow-y: auto;
		overscroll-behavior: contain;
		grid-area: inter;

		width: var(--width);
		max-height: calc(100dvh - var(--bs, 0));

		@media (--desktop) {
			position: sticky;
			inset-block-start: var(--header-height, 0);

			height: fit-content;
			max-height: calc(100dvh - var(--header-height, 0));
			padding-block: var(--py);
			padding-inline-end: var(--px);
		}

		@media (--widescreen) {
			--width: 14rem;
		}
	}

	.page-group {
		margin-block: 1rem;
		padding-block: 1rem;
	}

	.page-group + .page-group,
	.page-group:first-child {
		margin-block-start: 0;
		padding-block-start: 0;
		border-block-start: 0;
	}

	.page-group:last-child {
		margin-block-end: 0;
		padding-block-end: 0;
		border-block-end: 0;
	}

	#intra {
		--x: 100%;
		--bs: 3.25rem;
		--pie: 0.2rem;

		position: fixed;
		inset-block-start: calc(var(--bs) + var(--pie) + var(--header-height, 0px));
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

	.intra-content {
		--width: 12rem;

		overflow-y: auto;
		overscroll-behavior: contain;
		grid-area: intra;
		max-height: calc(100dvh - var(--bs, 0));

		@media (--desktop) {
			--width: 14rem;

			position: sticky;
			inset-block-start: var(--header-height, 0);

			width: var(--width);
			height: fit-content;
			max-height: calc(100dvh - var(--header-height, 0));
			padding-block: var(--py);
			padding-inline-start: var(--px);
		}

		@media (--widescreen) {
			--width: 16rem;
		}
	}
</style>
