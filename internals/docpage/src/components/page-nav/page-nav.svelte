<script lang="ts" module>
	import type { LinkPage, PageLinks } from '../../loader';

	export interface PageNavProps {
		slug: string;
		links: PageLinks;
		title?: string;
		active?: (page: LinkPage) => boolean;
	}
</script>

<script lang="ts">
	let { slug, links: pageLinks, title, active = ({ id }) => id === slug }: PageNavProps = $props();

	let popover: HTMLElement;

	function handleClickLink() {
		popover?.hidePopover();
	}
</script>

{#snippet pageLink(page: LinkPage)}
	<li>
		<a
			class="c-link-lazy leading-double block w-full overflow-hidden text-ellipsis whitespace-nowrap"
			href={page.href}
			title={page.title}
			onclick={handleClickLink}
			{...active(page) && { 'aria-current': true }}
		>
			{page.title}
		</a>
	</li>
{/snippet}

<button class="c-btn c-btn--icon text-sm" popovertarget="pages">
	<i class="i i-[ph--list] h-5 w-5"></i>
	<span id="pages-label">Pages</span>
</button>
<div popover id="pages" bind:this={popover}>
	<nav class="space-y-4" aria-labelledby="pages-label">
		{#if title}
			<p class="text-lg font-bold">{title}</p>
		{/if}
		<ol>
			{#each pageLinks as link, i (link.type + i)}
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
		padding-block-start: 0;
		border-block-start: 0;
	}

	.page-group:last-child {
		margin-block-end: 0;
		padding-block-end: 0;
		border-block-end: 0;
	}
</style>
