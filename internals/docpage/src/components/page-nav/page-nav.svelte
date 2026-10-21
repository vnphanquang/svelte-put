<script lang="ts" module>
	import type { LinkPage, PageLinks } from '../../loader';

	export interface PageNavProps {
		slug: string;
		links: PageLinks;
	}
</script>

<script lang="ts">
	let { slug, links }: PageNavProps = $props();
</script>

{#snippet pageLink(page: LinkPage)}
	<li>
		<a
			class="c-link-lazy leading-double block w-full overflow-hidden text-ellipsis whitespace-nowrap"
			href="../{page.slug}"
			{...page.slug === slug && { 'aria-current': true }}
		>
			{page.title}
		</a>
	</li>
{/snippet}

<button class="c-btn c-btn--icon text-sm" popovertarget="pages">
	<i class="i i-[ph--list] h-5 w-5"></i>
	<span id="pages-label">Pages</span>
</button>
<div popover id="pages">
	<nav class="space-y-4" aria-labelledby="pages-label">
		<p class="text-stroke-200 max-desktop:hidden text-sm uppercase">Pages</p>
		<ol>
			{#each links as link, i (link.type + i)}
				{#if link.type === 'page'}
					{@render pageLink(link)}
				{:else}
					<li class="border-y-stroke-200 page-group my-4 space-y-2 border-y py-4">
						{#if link.title}
							<p class="font-bold uppercase">{link.title}</p>
						{/if}
						<ol>
							{#each link.pages as page (page.slug)}
								{@render pageLink(page)}
							{/each}
						</ol>
					</li>
				{/if}
			{/each}
		</ol>
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

	#pages {
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

	nav {
		--width: 10rem;

		overflow-y: auto;
		overscroll-behavior: contain;
		grid-area: pages;

		width: var(--width);
		max-height: calc(100dvh - var(--bs, 0));

		@media (--desktop) {
			position: sticky;
			inset-block-start: 0;

			height: fit-content;
			max-height: 100dvh;
			padding-block: var(--py);
			padding-inline-end: var(--px);
		}

		@media (--widescreen) {
			--width: 14rem;
		}
	}

	.page-group + .page-group {
		border-block-start: 0;
	}
</style>
