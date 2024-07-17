<script>
	import { Toc } from '@svelte-put/toc';

	import { navigating } from '$app/stores';
	import { ColorSchemeMenu } from '$lib/components/color-scheme-menu';
	import { PageLoadIndicator } from '$lib/components/page-load-indicator/';
	import { SOCIAL_LINKS } from '$lib/constants';
	import { deprecatedPackages, packages } from '$lib/data/packages';

	import MenuLabel from './_page/components/MenuLabel.svelte';
	import StatusBadge from './_page/components/StatusBadge.svelte';

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

</script>

{#if $navigating}
	<PageLoadIndicator />
{/if}
<div class="relative flex w-full flex-1 flex-col pt-header" id="docs">
	<header class="fixed inset-x-0 top-0 z-header flex h-header flex-col border-b border-outline">
		<nav class="max-w-pad flex flex-1 items-center py-2" aria-label="header">
			<a href="/" class="mr-auto flex items-center gap-2">
				<svg inline-src="svelte-put" width="32" height="32" />
				<span class="font-fingerpaint text-sm font-bold text-gradient-brand">svelte-put</span>
			</a>
			<ColorSchemeMenu />
			<a href={SOCIAL_LINKS.GITHUB} data-external class="c-link c-link--icon ml-4">
				<svg inline-src="simpleicon/github" height="28" width="28" />
			</a>
		</nav>
		<div
			class="max-w-pad flex flex-1 items-center justify-between border-t border-outline py-1 lg:justify-end xl:hidden"
		>
			<MenuLabel class="lg:hidden" for="pages-toggler">Navigation</MenuLabel>
			<MenuLabel align="right" for="toc-toggler">Table of Contents</MenuLabel>
		</div>
	</header>

	<div class="max-w-pad flex items-stretch">
		<nav class="sidebar sidebar-left" aria-label="pages">
			<input id="pages-toggler" type="checkbox" hidden bind:checked={isleftSidebarOpen} />
			<ul class="sidebar-content space-y-4">
				<li>
					<p class="font-bold uppercase">Overview</p>
					<ul class="mt-3 space-y-1 border-l border-outline">
						<li>
							{#each Object.entries(TOP_LEVEL_PATHS) as [label, path]}
								<a
									href={path}
									data-current={data.pathname === path}
									class="c-link c-link--lazy -ml-px block whitespace-nowrap border-l border-transparent py-1 pl-3 data-current:border-link data-current:text-link"
								>
									{label}
								</a>
							{/each}
						</li>
					</ul>
				</li>
				<li>
					<p class="font-bold uppercase">Packages</p>
					<ul class="mt-3 space-y-1 border-l border-outline">
						{#each Object.values(packages) as { path, status, id }}
							<li>
								<a
									href={path}
									data-current={data.pathname.includes(`/${id}`)}
									class="data-current:link c-link c-link--lazy -ml-px block whitespace-nowrap border-l border-transparent py-1 pl-3 data-current:border-link"
									onclick={closeLeftSidebar}
								>
									<span class="h-full w-1 bg-primary"></span>
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
											class="data-current:link c-link c-link--lazy -ml-px block whitespace-nowrap border-l border-transparent py-1 pl-3 data-current:border-link"
											onclick={closeLeftSidebar}
										>
											<span class="h-full w-1 bg-primary"></span>
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

		{#key data.pathname}
			<main class="prose dark:prose-invert" use:toc.actions.root>
				{@render children()}
			</main>
		{/key}

		<nav class="sidebar sidebar-right" aria-label="table of contents">
			<p class="c-callout c-callout--success c-callout--icon-megaphone mt-10 upto-xl:hidden">
				Still on Svelte 4? See
				<a class="c-link" href="https://svelte-put-svelte-4.vnphanquang.com"
					>the old docs site here.</a
				>
			</p>
			<div class="sveltevietnam-banner mt-5 space-y-2 rounded border p-4 upto-xl:hidden">
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
					<ul class="space-y-1 border-l border-outline">
						{#each toc.items.values() as tocItem (tocItem.id)}
							{@const level = tocItem.element.tagName.slice(1)}
							<li>
								<!-- svelte-ignore a11y_missing_attribute -->
								<a
									use:toc.actions.link={tocItem}
									class="c-link c-link--lazy -ml-px block border-l border-transparent py-1 capitalize data-current:border-link data-current:text-link"
									class:pl-3={level === '2'}
									class:pl-5={level === '3'}
									class:pl-7={level === '4'}
									class:pl-9={level === '5'}
									class:pl-11={level === '6'}
								>
									<!-- textContent injected by toc -->
								</a>
							</li>
						{/each}
					</ul>
				{/if}
			</div>
		</nav>
		<label class="sidebar-backdrop" for="toc-toggler"></label>
	</div>
</div>

<style lang="postcss">
	#docs {
		--color-bg-aside: color-mix(in hsl, theme('colors.bg.DEFAULT'), theme('colors.fg.DEFAULT') 4%);
	}

	header {
		background-color: var(--color-bg-aside);
	}

	.sidebar {
		flex-shrink: 0;

		width: theme('spacing.sidebar');

		font-size: theme('fontSize.sm');

		border-color: theme('colors.outline.DEFAULT');

		transition-timing-function: theme('transitionTimingFunction.DEFAULT');
		transition-duration: 200ms;
		transition-property: transform, opacity;

		& .sidebar-content {
			position: sticky;
			top: theme('spacing.header');
			overflow: auto;
			padding-block: theme('spacing.10');
		}

		&.sidebar-left {
			& .sidebar-content {
				max-height: calc(100dvh - theme('spacing.header'));
				padding-inline: theme('spacing.4');
			}

			@screen upto-lg {
				position: fixed;
				z-index: calc(theme('zIndex.header') + 2);
				top: 0;
				bottom: 0;
				left: 0;
				transform: translateX(-100%);

				display: flex;

				opacity: 0;
				background-color: var(--color-bg-aside);
				border-right: theme('borderWidth.DEFAULT');
				box-shadow: theme('boxShadow.lg');

				& .sidebar-content {
					max-height: 100vh;
				}
			}
		}

		&.sidebar-right {
			& .sidebar-content {
				max-height: calc(100vh - theme('spacing.header'));
				padding: theme('spacing.2');
				padding-top: theme('spacing.10');
			}

			@screen upto-xl {
				position: fixed;
				z-index: calc(theme('zIndex.header') + 2);
				top: theme('spacing.header');
				right: 0;
				transform: translateX(100%);

				display: flex;
				justify-content: center;

				width: auto;
				max-width: 80vw;

				opacity: 0;
				background-color: var(--color-bg-aside);
				border-bottom-right-radius: theme('borderRadius.DEFAULT');
				border-bottom-left-radius: theme('borderRadius.DEFAULT');
				box-shadow: theme('boxShadow.lg');

				& .sidebar-content {
					max-height: calc(95dvh - theme('spacing.header'));
					padding: theme('spacing.8') theme('spacing.8') theme('spacing.10');
				}
			}
		}
	}

	.sidebar-backdrop {
		pointer-events: none;

		position: fixed;
		z-index: calc(theme('zIndex.header') + 1);
		inset: 0;

		opacity: 0;
		background-color: theme('backgroundColor.black / 20%');
		backdrop-filter: blur(1px);

		transition: opacity 200ms theme('transitionTimingFunction.DEFAULT');

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
		padding-top: theme('spacing.10');
		padding-bottom: theme('spacing.20');

		@screen lg {
			max-width: calc(100% - theme('spacing.sidebar'));
			padding-inline: theme('spacing.10');
		}

		@screen xl {
			max-width: calc(100% - theme('spacing.sidebar') * 2);
			padding-inline: theme('spacing.14');
		}
	}

	#docs :global(:where(h1)) {
		font-family: theme('fontFamily.fingerpaint');
	}

	#docs :global(:where(h1, h2, h3, h4, h5, h6)) {
		padding-bottom: 0.5rem;
		border-bottom: 1px solid theme('colors.outline.DEFAULT');
	}
</style>

