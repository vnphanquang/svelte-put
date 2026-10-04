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
		<nav class="sidebar pages space-y-4" aria-labelledby="nav-pages">
			<p class="text-stroke-200 text-sm uppercase" id="nav-pages">Pages</p>
			<ol>
				{#each pages as page (page.slug)}
					<li class="">
						<a
							class="c-link-lazy block w-full overflow-hidden py-2 text-ellipsis whitespace-nowrap"
							href="../{page.slug}"
							{...page.slug === slug && { 'aria-current': true }}
						>
							{page.title}
						</a>
					</li>
				{/each}
			</ol>
		</nav>
		<section class="sidebar toc"></section>
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
				<!-- FIXME: add link to github -->
				<a class="c-link" href="FIXME"> Suggest an edit! </a>
			</p>
			{#if doc.nav}
				{const commonClasses =
					'border border-current py-3 gap-1 px-4 flex flex-col hover:border-primary transition-colors w-full max-w-100'}
				<nav class="desktop:gap-20 grid grid-cols-2 gap-10">
					{#if doc.nav.previous}
						<a class={commonClasses} href={doc.nav.previous.href}>
							<span class="text-stroke-200 text-sm"> Previous page </span>
							<span class="text-primary">
								{doc.nav.previous.title}
							</span>
						</a>
					{/if}
					{#if doc.nav.next}
						<a
							class={[commonClasses, 'col-start-2 items-end justify-self-end']}
							href={doc.nav.next.href}
						>
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
		--pages-wdith: 10rem;
		--toc-wdith: 12rem;

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
		@media (--tablet) {
			display: contents;
		}
	}

	.sidebar {
		@media (--tablet) {
			position: sticky;
			top: 0;

			overflow-y: auto;
			overscroll-behavior: contain;

			height: fit-content;
			max-height: calc(100dvh);
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
