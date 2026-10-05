<script lang="ts" module>
	import { error } from '@sveltejs/kit';
	import { Markdown } from '@vnphanquang/markdown/svelte';

	import './styles.css';

	import type { Loaders } from '../../../loader';

	export interface DocumentationProps {
		slug: string;
		loadDocPage: Loaders['loadDocPage'];
		pages: Awaited<ReturnType<Loaders['loadDocPageLinks']>>;
	}
</script>

<script lang="ts">
	let { slug, loadDocPage, pages }: DocumentationProps = $props();

	let doc = $derived(await loadDocPage({ slug }));

	// svelte-ignore state_referenced_locally
	if (!doc) error(400, 'No documentation page with this path!'); // for SSR
	$effect(() => {
		if (!doc) error(400, 'No documentation page with this path!'); // for CSR
	});
</script>

<div class="page max-w-pad grid flex-1">
	<div class="nav">
		<button class="sidebar-trigger c-btn c-btn--icon text-sm" popovertarget="pages">
			<i class="i i-[ph--list] h-5 w-5"></i>
			<span>Pages</span>
		</button>
		<div class="sidebar-popover-container" popover id="pages">
			<nav class="sidebar pages space-y-4" aria-labelledby="pages-label">
				<p class="text-stroke-200 mobile:sr-only text-sm uppercase" id="pages-label">Pages</p>
				<ol>
					{#each pages as page (page.slug)}
						<li>
							<a
								class="c-link-lazy leading-double block w-full overflow-hidden text-ellipsis whitespace-nowrap"
								href="../{page.slug}"
								{...page.slug === slug && { 'aria-current': true }}
							>
								{page.title}
							</a>
						</li>
					{/each}
				</ol>
			</nav>
		</div>
		<button class="sidebar-trigger c-btn c-btn--icon text-sm" popovertarget="toc">
			<span>On this page</span>
			<i class="i i-[ph--list] h-5 w-5"></i>
		</button>
		<div class="sidebar-popover-container" popover id="toc">
			<nav class="sidebar toc space-y-4" aria-labelledby="toc-label">
				{#if doc.nav.toc.length}
					<p class="text-stroke-200 mobile:sr-only text-sm uppercase" id="toc-label">
						On this page
					</p>
					<ol>
						{#each doc.nav.toc as item (item.id)}
							{const level = item.tag[1]}
							<a
								class="c-link-lazy leading-double block w-full overflow-hidden text-ellipsis whitespace-nowrap"
								href="#{item.id}"
								style:padding-inline-start="calc(1rem * ({level} - 2))"
							>
								{item.text}
							</a>
						{/each}
					</ol>
				{/if}
			</nav>
		</div>
	</div>
	<main class="doc @container">
		<section class="md flex-1">
			{#key slug}
				<Markdown>
					<h1>{doc.metadata.title}</h1>
					<doc.content />
				</Markdown>
			{/key}
		</section>
		<div class="desktop:mbs-15 mbs-10 space-y-10">
			<p class="border-fill-200 border-b py-1 text-sm">
				Found typo or problem?
				<a class="c-link" href={doc.contentEditUrl} data-external> Suggest an edit! </a>
			</p>
			{#if doc.nav.previous || doc.nav.next}
				{const commonClasses =
					'border border-current py-3 gap-1 px-4 flex flex-col hover:border-primary transition-colors w-full max-w-100 flex-1 min-w-50'}
				<nav class="tablet:gap-10 flex flex-wrap gap-4">
					{#if doc.nav.previous}
						<a class={commonClasses} href={doc.nav.previous.href}>
							<span class="text-stroke-200 text-sm"> Previous page </span>
							<span class="text-primary">
								{doc.nav.previous.title}
							</span>
						</a>
					{/if}
					{#if doc.nav.next}
						<a class={[commonClasses, 'ms-auto items-end']} href={doc.nav.next.href}>
							<span class="text-stroke-200 text-sm"> Next page </span>
							<span class="text-primary">
								{doc.nav.next.title}
							</span>
						</a>
					{/if}
				</nav>
			{/if}
		</div>
	</main>
</div>

<style>
	@import '@vnphanquang/gach/styles/custom-medias';

	.page {
		--py: 2.5rem;
		--px: 1rem;
		--pages-width: 10rem;
		--toc-width: 12rem;

		grid-template-columns: 1fr;

		@media (--tablet) {
			grid-template-areas: 'pages doc';
			grid-template-columns: var(--pages-width) 1fr;
		}

		@media (--desktop) {
			--pb: 5rem;

			grid-template-areas: 'pages doc toc';
			grid-template-columns: var(--pages-width) 1fr var(--toc-width);
		}

		@media (--widescreen) {
			--pages-width: 12rem;
			--toc-width: 14rem;
		}
	}

	.doc {
		padding-block: var(--py);

		@media (--tablet) {
			grid-area: doc;
			padding-inline-start: var(--px);
		}

		@media (--desktop) {
			padding-inline: var(--px);
		}
	}

	.nav {
		position: sticky;
		z-index: var(--z-index-header);
		inset-block-start: 0;

		display: flex;
		justify-content: space-between;

		margin-inline: calc(var(--pad-padding-x) * -1);
		padding-inline: calc(var(--pad-padding-x));
		border-block-end: 1px solid var(--color-fill-200);

		background-color: var(--color-fill-100);

		@media (--tablet) {
			display: contents;
		}
	}

	.sidebar-trigger {
		display: flex;
		gap: 0.5rem;
		align-items: center;

		padding-block: 1rem;
		padding-inline-start: 0;

		@media (--tablet) {
			display: none;
		}
	}

	.sidebar-popover-container {
		--x: -100%;

		position: fixed;
		transform: translateX(var(--x));

		width: 75dvw;

		opacity: 0;
		background-color: var(--color-fill-100);

		transition-timing-function: ease-out;
		transition-duration: 150ms;
		transition-property: display, overlay, transform, opacity;
		transition-behavior: allow-discrete;

		&#pages {
			inset-block: 0;
			height: 100%;
			padding: 2rem;

			&::backdrop {
				background-color: oklch(from var(--color-fill-50) l c h / 40%);
				backdrop-filter: blur(0.2rem);
			}
		}

		&#toc {
			--x: 100%;
			--bs: 3.25rem;
			--pie: 0.2rem;

			inset-block-start: calc(var(--bs) + var(--pie));

			max-width: 75dvw;
			max-height: calc(100dvh - var(--bs) - var(--pie) * 2);
			margin-inline: auto 0.2rem;
			padding: 1rem;
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

		@media (--tablet) {
			display: contents;
		}

		@media (prefers-reduced-motion: reduce) {
			transition-property: none;
		}
	}

	.sidebar {
		overflow-y: auto;
		overscroll-behavior: contain;
		max-height: calc(100dvh - var(--bs, 0));

		@media (--tablet) {
			position: sticky;
			inset-block-start: 0;

			height: fit-content;
			max-height: 100dvh;
			padding-block: var(--py);
		}
	}

	.pages {
		grid-area: pages;

		& a {
			max-width: var(--pages-width);
		}

		@media (--tablet) {
			padding-inline-end: var(--px);
		}
	}

	.toc {
		grid-area: toc;

		& a {
			max-width: var(--toc-width);
		}

		@media (--tablet) {
			padding-inline-start: var(--px);
		}
	}
</style>
