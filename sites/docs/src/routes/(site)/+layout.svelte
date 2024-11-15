<script lang="ts">
	import { Toc } from '@svelte-put/toc';
	import { onMount } from 'svelte';

	import { goto } from '$app/navigation';
	import { navigating, page } from '$app/stores';
	import { ColorSchemeMenu } from '$lib/components/color-scheme-menu';
	import { MenuLabel } from '$lib/components/menu-label';
	import { PageLoadIndicator } from '$lib/components/page-load-indicator/';
	import { StatusBadge } from '$lib/components/status-badge';
	import { SOCIAL_LINKS } from '$lib/constants';
	import { deprecatedPackages, packages } from '$lib/data/packages';
	import NotificationPortal from '$lib/notifications/components/NotificationPortal.svelte';
	import Svelte5 from '$lib/notifications/components/Svelte5.svelte';
	import { NotificationContext } from '$lib/notifications/context.svelte';

	let { data, children } = $props();

	const TOP_LEVEL_PATHS = {
		Introduction: '/docs',
		Architecture: '/docs/architecture',
		Guidelines: '/docs/guidelines',
		Contributing: '/docs/contributing',
	};

	const toc = new Toc({
		selector: ':where(h2, h3, h4, h5, h6)',
		observe: {
			enabled: true,
			link: {
				activeAttribute: 'data-current',
			},
		},
	});

	let isleftSidebarOpen = $state(false);
	function closeLeftSidebar() {
		isleftSidebarOpen = false;
	}

	let hydrated = $state(false);

	const { stack } = NotificationContext.set();
	onMount(() => {
		hydrated = true;
		const url = $page.url;
		if (url.searchParams.has('color-scheme')) {
			url.searchParams.delete('color-scheme');
			goto(url, { replaceState: true });
		}

		if (!localStorage.getItem('skip-svelte-5-notification')) {
			stack.push('custom', {
				component: Svelte5,
				timeout: 10_000,
			});
		}
	});
</script>

{#if $navigating}
	<PageLoadIndicator />
{/if}
<div class="pt-header relative flex w-full flex-1 flex-col" id="docs">
	<header class="z-header h-header border-outline fixed inset-x-0 top-0 flex flex-col border-b">
		<nav class="max-w-pad flex flex-1 items-center py-2" aria-label="header">
			<a href="/" class="mr-auto flex items-center gap-2">
				<svg class="h-8 w-8 shrink-0" inline-src="svelte-put" width="32" height="32" />
				<span class="font-fingerpaint text-gradient-brand text-sm font-bold">svelte-put</span>
			</a>
			{#if hydrated}
				<a class="c-btn c-btn--outlined gap-2 py-1.5 pl-3 pr-4" href="/search">
					<span class="i i-[magnifying-glass] h-5 w-5"></span>
					<span class="text-sm">Search...</span>
				</a>
			{/if}
			<ColorSchemeMenu class="ml-5" />
			<a href={SOCIAL_LINKS.GITHUB} data-external class="c-link-icon ml-5">
				<svg inline-src="simpleicon/github" height="28" width="28" />
				<span class="sr-only">Github</span>
			</a>
		</nav>
		<div
			class="max-w-pad border-outline desktop:justify-end widescreen:hidden flex flex-1 items-center justify-between
			border-t py-1"
		>
			<MenuLabel class="desktop:hidden" for="pages-toggler">Navigation</MenuLabel>
			<MenuLabel align="right" for="toc-toggler">Table of Contents</MenuLabel>
		</div>
	</header>

	<div class="max-w-pad flex items-stretch">
		<!-- left sidebar -->
		<nav class="sidebar sidebar-left" aria-label="pages">
			<input id="pages-toggler" type="checkbox" hidden bind:checked={isleftSidebarOpen} />
			<ul class="sidebar-content space-y-4 text-sm">
				<li>
					<p class="font-bold uppercase">Overview</p>
					<ul class="border-outline mt-3 space-y-1 border-l">
						<li>
							{#each Object.entries(TOP_LEVEL_PATHS) as [label, path]}
								<a
									href={path}
									data-current={data.pathname === path}
									class="c-link-lazy current:border-link current:text-link -ml-px block whitespace-nowrap border-l border-transparent py-1 pl-3"
								>
									{label}
								</a>
							{/each}
						</li>
					</ul>
				</li>
				<li>
					<p class="font-bold uppercase">Packages</p>
					<ul class="border-outline mt-3 space-y-1 border-l">
						{#each Object.values(packages) as { path, status, id }}
							<li>
								<a
									href={path}
									data-current={data.pathname.includes(`/${id}`)}
									class="current:text-link c-link-lazy current:border-link -ml-px block whitespace-nowrap border-l border-transparent py-1 pl-3"
									onclick={closeLeftSidebar}
								>
									<span class="bg-primary h-full w-1"></span>
									{id}
									<sup>
										{#if status !== 'stable'}
											<StatusBadge {status} />
										{/if}
									</sup>
								</a>
							</li>
						{/each}
						<li class="pt-4">
							<p class="border-t pl-3 pt-4 font-bold uppercase">Deprecated</p>
							<ul class="mt-3">
								{#each Object.values(deprecatedPackages) as { path, id }}
									<li>
										<a
											href={path}
											data-current={data.pathname.includes(`/${id}`)}
											class="current:text-link c-link-lazy current:border-link -ml-px block whitespace-nowrap border-l border-transparent py-1 pl-3"
											onclick={closeLeftSidebar}
										>
											<span class="bg-primary h-full w-1"></span>
											{id}
										</a>
									</li>
								{/each}
							</ul>
						</li>
					</ul>
				</li>
			</ul>
		</nav>
		<label class="sidebar-backdrop" for="pages-toggler"></label>

		<!-- main content -->
		{#key data.pathname}
			<main class="prose dark:prose-invert" use:toc.actions.root>
				{@render children()}
			</main>
		{/key}

		<!-- right sidebar -->
		<nav class="sidebar sidebar-right" aria-label="table of contents">
			<p
				class="c-callout c-callout--success c-callout--icon-megaphone upto-widescreen:hidden mt-10"
			>
				Still on Svelte 4? See
				<a class="c-link" href="https://svelte-put-svelte-4.vnphanquang.com"
					>the old docs site here.</a
				>
			</p>
			<div class="sveltevietnam-banner upto-widescreen:hidden mt-5 space-y-2 rounded border p-4">
				<p class="font-medium">Are you based in Vietnam?</p>
				<div class="flex items-center gap-4">
					<div class="c-logo c-logo--themed"></div>
					<p>
						Join the <a class="c-link" href="https://www.sveltevietnam.dev">Svelte Vietnam</a> community.
					</p>
				</div>
			</div>
			<input id="toc-toggler" type="checkbox" hidden />
			<div class="sidebar-content text-sm">
				{#if toc.items.size}
					<p class="py-2 font-bold uppercase">On This Page</p>
					<ul class="border-outline space-y-1 border-l">
						{#each toc.items.values() as tocItem (tocItem.id)}
							{@const level = tocItem.element.tagName.slice(1)}
							<li>
								<!-- svelte-ignore a11y_missing_attribute -->
								<a
									use:toc.actions.link={tocItem}
									class="c-link-lazy current:border-link current:text-link -ml-px block border-l border-transparent py-1 capitalize"
									style:padding-left="calc(({level} - 1) * 2ch)"
								>
									<!-- textContent injected by toc -->
								</a>
							</li>
						{/each}
					</ul>
				{/if}
			</div>
		</nav>
	</div>
</div>
<NotificationPortal />

<style lang="postcss">
	@import '@svelte-put/ui/css/medias'; /* stylelint-disable-line import-notation */

	#docs {
		--color-bg-aside: color-mix(in oklch, var(--color-bg), var(--color-fg) 4%);
	}

	header {
		background-color: var(--color-bg-aside);
	}

	.sidebar {
		flex-shrink: 0;

		width: var(--spacing-sidebar);

		font-size: var(--font-size-sm);

		transition-timing-function: var(--default-transition-timing-function);
		transition-duration: 200ms;
		transition-property: transform, opacity;

		& .sidebar-content {
			position: sticky;
			top: var(--spacing-header);
			overflow: auto;
			padding-block: calc(var(--spacing) * 10);
		}

		&.sidebar-left {
			& .sidebar-content {
				max-height: calc(100dvh - var(--spacing-header));
				padding-inline: calc(var(--spacing) * 4);
			}

			@media (--upto-desktop) {
				position: fixed;
				z-index: calc(var(--z-index-header) + 2);
				top: 0;
				bottom: 0;
				left: 0;
				transform: translateX(-100%);

				display: flex;

				opacity: 0;
				background-color: var(--color-bg-aside);
				border-right-width: 1px;
				box-shadow: var(--box-shadow-lg);

				& .sidebar-content {
					max-height: 100vh;
				}
			}
		}

		&.sidebar-right {
			& .sidebar-content {
				max-height: calc(100dvh - var(--spacing-header));
				padding: calc(var(--spacing) * 10) calc(var(--spacing) * 2) calc(var(--spacing) * 2);
			}

			@media (--upto-widescreen) {
				position: fixed;
				z-index: calc(var(--z-index-header) + 2);
				top: var(--spacing-header);
				right: 0;
				transform: translateX(100%);

				display: flex;
				justify-content: center;

				width: auto;
				max-width: 80vw;

				opacity: 0;
				background-color: var(--color-bg-aside);
				border-bottom-right-radius: var(--radius-sm);
				border-bottom-left-radius: var(--radius-sm);
				box-shadow: var(--box-shadow-lg);

				& .sidebar-content {
					max-height: calc(95dvh - var(--spacing-header));
					padding: calc(var(--spacing) * 8) calc(var(--spacing) * 8) calc(var(--spacing) * 10);
				}
			}
		}
	}

	.sidebar-backdrop {
		pointer-events: none;

		position: fixed;
		z-index: calc(var(--z-index-header) + 1);
		inset: 0;

		opacity: 0;
		background-color: color-mix(in oklch, var(--color-black) 50%, transparent 50%);
		backdrop-filter: blur(1px);

		transition: opacity 200ms var(--default-transition-timing-function);

		&::-webkit-scrollbar {
			display: none;
		}
	}

	.sidebar:has(input:checked) {
		transform: translateX(0);
		opacity: 1;

		& + .sidebar-backdrop {
			pointer-events: unset;
			opacity: 1;
		}
	}

	main {
		width: 100%;
		max-width: 100%;
		padding-top: calc(var(--spacing) * 10);
		padding-bottom: calc(var(--spacing) * 20);

		@media (--desktop) {
			max-width: calc(100% - var(--spacing-sidebar));
			padding-inline: calc(var(--spacing) * 10);
		}

		@media (--widescreen) {
			max-width: calc(100% - var(--spacing-sidebar) * 2);
			padding-inline: calc(var(--spacing) * 14);
		}
	}

	#docs :global(:where(h1, h2, h3, h4, h5, h6)) {
		padding-bottom: 0.5rem;
		border-bottom: 1px solid var(--color-outline);
	}
</style>
