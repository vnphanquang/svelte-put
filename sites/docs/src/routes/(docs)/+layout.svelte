<script lang="ts">
	import { PageNav, TableOfContents } from '@internals/docpage/components';
	import { Toc } from '@svelte-put/toc';

	import type { LayoutProps } from './$types';

	let { children, params, data }: LayoutProps = $props();

	let slug = $derived(params.slug ?? '');
	let { doc, links } = $derived(data);
	let toc = $derived(new Toc({ ...doc.nav.toc }));
</script>

<div class="page max-w-pad grid flex-1" {...toc.enhance.scope()}>
	<div class="nav">
		<PageNav {slug} active={({ id }) => slug === id || id === `package.${params.pkg}`} {...links} />
		<TableOfContents {toc} />
	</div>
	{@render children()}
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
