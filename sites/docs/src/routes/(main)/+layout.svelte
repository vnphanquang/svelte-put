<script lang="ts">
  import { clickoutside } from '@svelte-put/clickoutside';
  import { toc, toclink, createTocStore } from '@svelte-put/toc';
  import { slide } from '@svelte-put/transitions';
  import { fade } from 'svelte/transition';
  import gruvboxDark from 'svelte-highlight/styles/gruvbox-dark-soft';
  import gruvboxLight from 'svelte-highlight/styles/gruvbox-light-soft';

  import { browser } from '$app/environment';
  import { invalidate } from '$app/navigation';
  import { page } from '$app/stores';
  import ColorSchemeSelect from '$client/components/ColorSchemeSelect/ColorSchemeSelect.svelte';
  import MenuButton from '$client/components/MenuButton/MenuButton.svelte';
  import ResourceLink from '$client/components/ResourceLink/ResourceLink.svelte';
  import StatusBadge from '$client/components/StatusBadge/StatusBadge.svelte';
  import { getPrefersColorScheme } from '$client/utils/color-scheme';
  import { LOAD_DEPENDENCIES, APP_ROUTE_TREE } from '$shared/constants';
  import { packages } from '$shared/data/packages';
  import type { ColorScheme } from '$shared/types';

  import type { LayoutData } from './$types';

  export let data: LayoutData;

  let innerWidth = 0;
  $: isLg = innerWidth > 1024;
  $: leftSidebarOpen = isLg;
  function toggleLeftSidebar() {
    leftSidebarOpen = !leftSidebarOpen;
  }
  function closeLeftSidebar() {
    leftSidebarOpen = false;
  }
  $: isXl = innerWidth > 1280;
  $: rightSidebarOpen = isXl;
  function toggleRightSidebar() {
    rightSidebarOpen = !rightSidebarOpen;
  }

  const tocStore = createTocStore();

  $: rColorScheme =
    $page.data.colorScheme === 'system' && browser
      ? getPrefersColorScheme()
      : $page.data.colorScheme;
  let clientColorScheme = $page.data.colorScheme;
  async function changeColorScheme(e: CustomEvent<ColorScheme>) {
    const scheme = e.detail;
    if (clientColorScheme === scheme) return;
    clientColorScheme = scheme;
    document.documentElement.dataset.colorScheme = scheme;
    await fetch('/api/color-scheme', {
      method: 'POST',
      body: scheme,
    });
    invalidate(LOAD_DEPENDENCIES.COLOR_SCHEME);
  }
</script>

<svelte:head>
  {#if rColorScheme === 'light'}
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html gruvboxLight}
  {:else}
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html gruvboxDark}
  {/if}
</svelte:head>

<svelte:window bind:innerWidth />

<div class="relative flex min-h-screen w-full flex-1 flex-col pt-header">
  <header
    class="fixed inset-x-0 top-0 z-header flex h-header flex-col border-b border-border bg-bg-soft"
  >
    {#key data.pathname}
      <div class="h-0.5 w-full bg-gradient-brand" in:slide={{ axis: 'x', duration: 500 }} />
    {/key}
    <nav class="c-container flex flex-1 items-center py-2">
      <a href="/" class="flex items-center gap-2">
        <img
          src="/images/svelte-put-logo.svg"
          alt="svelte-put"
          width="32"
          height="32"
          loading="lazy"
          decoding="async"
        />
        <span class="c-link font-fingerpaint text-sm font-bold text-gradient-brand">svelte-put</span
        >
      </a>
      <div class="flex flex-1 items-center justify-end space-x-4">
        <ColorSchemeSelect scheme={clientColorScheme} on:select={changeColorScheme} />
        <ResourceLink class="c-link" key="github">
          <svg inline-src="simpleicon/github" height="24" width="24" />
        </ResourceLink>
      </div>
    </nav>
    <div class="border-t border-border dark:text-primary xl:hidden">
      <nav
        class="h-subheader c-container flex items-center justify-between py-1 lg:justify-end"
        aria-label="svelte-put & github"
      >
        <MenuButton on:click={toggleLeftSidebar} class="lg:hidden">Packages</MenuButton>
        <MenuButton on:click={toggleRightSidebar} align="right">Table of Contents</MenuButton>
      </nav>
    </div>
  </header>

  <div class="c-container relative flex w-full flex-1 items-stretch">
    <nav
      class="sidebar sidebar-left"
      use:clickoutside={{ enabled: leftSidebarOpen && !isLg }}
      on:clickoutside={toggleLeftSidebar}
      data-open={leftSidebarOpen}
      aria-label="Pages"
      data-sveltekit-preload-data="hover"
    >
      <ul class="sidebar-content space-y-4">
        <li>
          <p class="font-bold uppercase">Overview</p>
          <ul class="mt-3 space-y-1 border-l border-border">
            <li>
              <a
                href={APP_ROUTE_TREE.docs.$.path()}
                data-current={data.pathname === APP_ROUTE_TREE.docs.$.path()}
                class="c-link -ml-px block whitespace-nowrap border-l border-transparent py-1 pl-3 data-current:border-primary"
                on:click={closeLeftSidebar}
              >
                Introduction
              </a>
            </li>
            <li>
              <a
                href={APP_ROUTE_TREE.docs.architecture.$.path()}
                data-current={data.pathname === APP_ROUTE_TREE.docs.architecture.$.path()}
                class="c-link -ml-px block whitespace-nowrap border-l border-transparent py-1 pl-3 data-current:border-primary"
                on:click={closeLeftSidebar}
              >
                Architecture
              </a>
            </li>
            <li>
              <a
                href={APP_ROUTE_TREE.docs.guidelines.$.path()}
                data-current={data.pathname === APP_ROUTE_TREE.docs.guidelines.$.path()}
                class="c-link -ml-px block whitespace-nowrap border-l border-transparent py-1 pl-3 data-current:border-primary"
                on:click={closeLeftSidebar}
              >
                Guidelines
              </a>
            </li>
            <li>
              <a
                href={APP_ROUTE_TREE.docs.contributing.$.path()}
                data-current={data.pathname === APP_ROUTE_TREE.docs.contributing.$.path()}
                class="c-link -ml-px block whitespace-nowrap border-l border-transparent py-1 pl-3 data-current:border-primary"
                on:click={closeLeftSidebar}
              >
                Contributing
              </a>
            </li>
          </ul>
        </li>
        <li>
          <p class="font-bold uppercase">Packages</p>
          <ul class="mt-3 space-y-1 border-l border-border">
            {#each Object.values(packages) as { path, status, id }}
              <li>
                <a
                  href={path}
                  data-current={data.pathname.includes(`/${id}`)}
                  class="c-link -ml-px block whitespace-nowrap border-l border-transparent py-1 pl-3 data-current:border-primary"
                  on:click={closeLeftSidebar}
                >
                  <span class="h-full w-1 bg-primary" />
                  {id}
                  <sup>
                    {#if status !== 'stable'}
                      <StatusBadge {status} />
                    {/if}
                  </sup>
                </a>
              </li>
            {/each}
          </ul>
        </li>
      </ul>
    </nav>
    {#if leftSidebarOpen}
      <div class="sidebar-backdrop" transition:fade|local={{ duration: 150 }} />
    {/if}

    {#key data.pathname}
      <main
        class="prose flex-1 dark:prose-invert"
        use:toc={{
          store: tocStore,
          selector: ':where(h2, h3, h4, h5, h6)',
          observe: true,
        }}
      >
        <slot />
      </main>
    {/key}

    <nav
      class="sidebar sidebar-right"
      use:clickoutside={{ enabled: rightSidebarOpen && !isXl }}
      on:clickoutside={toggleRightSidebar}
      data-open={rightSidebarOpen}
      aria-label="Table of Contents"
    >
      <div class="sidebar-content text-sm">
        {#if Object.values($tocStore.items).length}
          <p class="py-2 font-bold uppercase">On This Page</p>
          <ul class="space-y-1 border-l border-border">
            {#each Object.values($tocStore.items) as tocItem (tocItem.id)}
              {@const level = tocItem.element.tagName.slice(1)}
              <li>
                <!-- svelte-ignore a11y-missing-attribute -->
                <a
                  use:toclink={{
                    tocItem,
                    store: tocStore,
                    observe: {
                      attribute: 'data-current',
                    },
                  }}
                  class="c-link -ml-px block border-l border-transparent py-1 capitalize data-current:border-primary"
                  class:pl-3={level === '2'}
                  class:pl-5={level === '3'}
                  class:pl-7={level === '4'}
                  class:pl-9={level === '5'}
                  class:pl-11={level === '6'}>{tocItem.text}</a
                >
              </li>
            {/each}
          </ul>
        {/if}
      </div>
    </nav>
  </div>

  <footer class="border-t border-border bg-bg-soft py-6 text-center font-fira text-xs">
    <div class="c-container grid md:grid-cols-[auto,1fr,auto]">
      <div
        class="max-md:mb-4 max-md:flex max-md:items-center max-md:justify-center max-md:space-x-8 md:space-y-2 md:text-left"
      >
        <p>
          <a href="/sitemap.xml" class="c-link" target="_blank">
            <svg inline-src="google/account-tree" class="inline-block" height="16" width="16" />
            <span>Sitemap</span>
          </a>
        </p>
        <p>
          <a href="/rss.xml" class="c-link" target="_blank">
            <svg inline-src="google/rss-feed" class="inline-block" height="16" width="16" />
            <span>RSS</span>
          </a>
        </p>
      </div>
      <div class="space-y-2">
        <p>
          Released under the <ResourceLink key="MIT License" class="font-medium" />
        </p>
        <p>
          Powered by
          <ResourceLink key="svelte-kit">
            <svg inline-src="svelte" class="inline" height="16" width="16" />
          </ResourceLink>
          <ResourceLink key="TailwindCSS">
            <svg inline-src="simpleicon/tailwindcss" class="inline" height="16" width="16" />
          </ResourceLink>
          <ResourceLink key="cloudflare">
            <svg inline-src="simpleicon/cloudflare" class="inline" height="16" width="16" />
          </ResourceLink>
        </p>
      </div>
      <div class="max-md:mt-4">
        <p>
          <a href="/docs/contributing#money" class="c-link">
            <span>Donate</span>

            <svg
              inline-src="google/volunteer-activism"
              class="inline-block"
              height="16"
              width="16"
            />
          </a>
        </p>
      </div>
    </div>
  </footer>
</div>

<style lang="postcss">
  .sidebar {
    flex-shrink: 0;

    width: theme('spacing.sidebar');

    font-size: theme('fontSize.sm');

    border-color: theme('borderColor.border');

    transition-timing-function: theme('transitionTimingFunction.DEFAULT');
    transition-duration: 200ms;
    transition-property: transform, opacity;

    & .sidebar-content {
      position: sticky;
      top: theme('spacing.header');

      overflow: auto;

      width: 100%;
      padding: theme('spacing.10') 0;
    }
  }

  .sidebar-left {
    & .sidebar-content {
      max-height: calc(100vh - theme('spacing.header'));
      padding-right: theme('spacing.4');
      padding-left: theme('spacing.4');
    }

    @screen md-max {
      position: fixed;
      z-index: theme('zIndex.sidebar');
      top: 0;
      bottom: 0;
      left: 0;
      transform: translateX(-100%);

      display: flex;

      opacity: 0;
      background-color: theme('backgroundColor.bg.DEFAULT');
      border-right: theme('borderWidth.DEFAULT');
      box-shadow: theme('boxShadow.lg');

      &[data-open='true'] {
        transform: translateX(0);
        opacity: 1;
      }

      & .sidebar-content {
        max-height: 100vh;
      }
    }
  }

  .sidebar-backdrop {
    position: fixed;
    z-index: calc(theme('zIndex.sidebar') - 1);
    inset: 0;

    display: hidden;

    background-color: theme('backgroundColor.black / 20%');
    backdrop-filter: blur(1px);

    @screen lg {
      display: none;
    }

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .sidebar-right {
    & .sidebar-content {
      max-height: calc(100vh - theme('spacing.header'));
      padding: theme('spacing.2');
      padding-top: theme('spacing.10');
    }

    @screen lg-max {
      position: fixed;
      z-index: theme('zIndex.sidebar');
      top: theme('spacing.header');
      right: 0;
      transform: translateX(100%);

      display: flex;
      justify-content: center;

      width: auto;
      max-width: 80vw;

      opacity: 0;
      background-color: theme('backgroundColor.bg.DEFAULT');
      border-bottom-right-radius: theme('borderRadius.DEFAULT');
      border-bottom-left-radius: theme('borderRadius.DEFAULT');
      box-shadow: theme('boxShadow.lg');

      &[data-open='true'] {
        transform: translateX(0);
        opacity: 1;
      }

      & .sidebar-content {
        max-height: calc(95vh - theme('spacing.header'));
        padding: theme('spacing.8') theme('spacing.2') theme('spacing.2') theme('spacing.8');
      }
    }
  }

  main {
    max-width: 100%;
    padding-top: theme('spacing.10');
    padding-bottom: theme('spacing.20');

    @screen lg {
      max-width: calc(100% - var(--sidebar-width));
      padding-right: theme('spacing.10');
      padding-left: theme('spacing.10');
    }

    @screen xl {
      max-width: calc(100% - var(--sidebar-width) * 2);
      padding-right: theme('spacing.14');
      padding-left: theme('spacing.14');
    }
  }
</style>
