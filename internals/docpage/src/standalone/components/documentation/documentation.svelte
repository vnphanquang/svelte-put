<script lang="ts" module>
	import { Toc } from '@svelte-put/toc';
	import { error } from '@sveltejs/kit';

	import { DocContent } from '../../../components/doc-content';
	import { PageNav } from '../../../components/page-nav';
	import { TableOfContents } from '../../../components/table-of-contents';
	import type { Loaders } from '../../../loader';

	import './styles.css';

	export interface DocumentationProps {
		slug: string;
		loaders: Loaders;
	}
</script>

<script lang="ts">
	let { slug, loaders }: DocumentationProps = $props();

	let doc = $derived(await loaders.loadDocPage({ slug }));
	let Content = $derived(await loaders.loadDocPageContent({ slug }));

	// svelte-ignore state_referenced_locally
	if (!doc) error(400, 'No documentation page with this path!'); // for SSR
	$effect(() => {
		if (!doc) error(400, 'No documentation page with this path!'); // for CSR
	});

	let toc = $derived(new Toc({ items: doc.nav.toc.items }));
</script>

<div class="page max-w-pad grid flex-1" {...toc.enhance.scope()}>
	<div class="nav">
		<PageNav {slug} package={await loaders.loadDocPageLinks()} />
		<TableOfContents {toc} />
	</div>
	<DocContent {doc}>
		<Content />
	</DocContent>
</div>

<style>
	@import '@vnphanquang/gach/styles/custom-medias';

	.page {
		--py: 2.5rem;
		--px: 1rem;

		grid-template-columns: 1fr;

		@media (--desktop) {
			--pad-max-width: 90rem;
			--pad-min-padding-x: 2.5rem;
			--pb: 5rem;

			grid-template-areas: 'pages doc toc';
			grid-template-columns: auto 1fr auto;
		}

		@media (--widescreen) {
			--pad-max-width: 90rem;
			--pad-min-padding-x: 5rem;
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

		@media (--desktop) {
			display: contents;
		}
	}
</style>
