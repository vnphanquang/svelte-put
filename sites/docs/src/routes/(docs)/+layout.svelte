<script lang="ts">
	import { DocLayout } from '@internals/docpage/components';
	import { Toc } from '@svelte-put/toc';
	import { ColorSchemeSwitch } from '@vnphanquang/gach/components';

	import { packages } from '#data/loader';
	import { asset, resolve } from '$app/paths';
	import { page } from '$app/state';

	import type { LayoutProps } from './$types';

	let { children, params }: LayoutProps = $props();

	let slug = $derived(params.slug ?? '');
	let links = $derived(page.data.links);
	let toc = $derived(page.data.doc ? new Toc({ ...page.data.doc.nav.toc }) : null);

	let popover_packages: HTMLElement;
</script>

<header
	class="z-header h-header bg-fill-50 border-fill-200 max-w-pad max-desktop:border-be fixed inset-x-0"
>
	<nav class="desktop:border-be border-fill-200 inset-bs-0 flex h-full items-center gap-2">
		<a class="me-4 flex shrink-0 items-center gap-2" href={resolve('/')}>
			<img class="h-8 w-8" src={asset('favicon.svg')} width="32" height="32" alt="" />
			<span class="font-fingerpaint text-gradient-brand mobile:hidden text-sm font-bold">
				svelte-put
			</span>
		</a>

		<a
			class="c-link-lazy mobile:text-sm p-2"
			href={resolve('/(docs)/[...slug]', { slug: 'overview' })}
		>
			Overview
		</a>

		<div>
			<button class="c-dropdown mobile:text-sm" popovertarget="packages">
				Packages
				<i class="i i-[ph--caret-down]"></i>
			</button>
			<aside id="packages" popover bind:this={popover_packages}>
				<ul>
					{#each packages as pkg (pkg)}
						<li>
							<a
								href={resolve('/(docs)/packages/[pkg=pkg]/[...slug]', { pkg, slug: '' })}
								onclick={() => popover_packages?.hidePopover()}
							>
								{pkg}
							</a>
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

<DocLayout {slug} inter={{ links, title: params.pkg }} intra={{ toc }}>
	{@render children()}
</DocLayout>

<footer class="max-w-pad">
	<div
		class="border-fill-200 text-stroke-200 flex flex-wrap justify-between gap-1 border-bs-2 pbs-6
		pbe-10 text-sm"
	>
		<p>svelte-put - a collection of utilities for Svelte land - MIT License</p>
		<p>
			built by <a class="c-link" href="https://vnphanquang.com">vnphanquang</a> and
			<a class="c-link" href="https://github.com/vnphanquang/svelte-put/graphs/contributors">
				friends
			</a>
			- no ai
		</p>
	</div>
</footer>
