<script lang="ts">
	import { PageNav, TableOfContents } from '@internals/docpage/components';
	import { Toc } from '@svelte-put/toc';
	import { ColorSchemeSwitch } from '@vnphanquang/gach/components';

	import { packages } from '#data/loader';

	import type { LayoutProps } from './$types';

	let { children, params, data }: LayoutProps = $props();

	let slug = $derived(params.slug ?? '');
	let { doc, links } = $derived(data);
	let toc = $derived(new Toc({ ...doc.nav.toc }));
</script>

<header class="z-header h-header bg-fill-100 fixed inset-x-0 inset-bs-0 border-be border-current">
	<nav class="max-w-pad flex h-full items-center gap-2">
		<a class="me-4 flex items-center gap-2" href="/">
			<img src="/favicon.svg" width="32" height="32" alt="" />
			<span class="font-fingerpaint text-gradient-brand text-sm font-bold">svelte-put</span>
		</a>

		<a class="c-link-lazy p-2" href="/overview"> Overview </a>

		<div>
			<button class="c-dropdown" popovertarget="packages">
				Packages
				<i class="i i-[ph--caret-down]"></i>
			</button>
			<aside id="packages" popover>
				<ul>
					{#each packages as pkg (pkg)}
						<li>
							<a href="/packages/{pkg}">{pkg}</a>
						</li>
					{/each}
				</ul>
			</aside>
		</div>

		<ColorSchemeSwitch class="ms-auto" />

		<a class="c-link-icon p-2" href="https://github.com/vnphanquang/svelte-put">
			<i class="i i-[simple-icons--github] h-6 w-6"></i>
			<span class="sr-only">Github</span>
		</a>
	</nav>
</header>

<div class="page max-w-pad pbs-header grid flex-1" {...toc.enhance.scope()}>
	<div class="nav">
		<PageNav {slug} {links} title={params.pkg} />
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
		grid-template-rows: auto 1fr;

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
