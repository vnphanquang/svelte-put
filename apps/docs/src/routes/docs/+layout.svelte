<script lang="ts">
  import { clickoutside } from '@svelte-put/clickoutside';
  import { toc } from '@svelte-put/toc';
  import type { TocEventDetails } from '@svelte-put/toc';
  import gruvbox from 'svelte-highlight/styles/gruvbox-dark-soft';
  import { cubicOut } from 'svelte/easing';
  import { fly, fade } from 'svelte/transition';

  import { packagesByCategory } from '$data/packages';
  import { APP_ROUTE_TREE } from '$lib/constants';
  import ResourceLink from '$lib/ui/components/ResourceLink/ResourceLink.svelte';
  import StatusBadge from '$lib/ui/components/StatusBadge/StatusBadge.svelte';
  import Github from '$lib/ui/components/icons/Github.svelte';
  import Menu from '$lib/ui/components/icons/Menu.svelte';
  import Svelte from '$lib/ui/components/icons/Svelte.svelte';
  import Tailwind from '$lib/ui/components/icons/Tailwind.svelte';
  import Vercel from '$lib/ui/components/icons/Vercel.svelte';
  import { capitalize } from '$lib/utils/string';

  import type { LayoutData } from './$types';

  export let data: LayoutData;

  // TODO: extract this to own @svelte-put/transition
  function slide(node: HTMLElement, { delay = 0, duration = 400, easing = cubicOut, axis = 'y' }) {
    const style = getComputedStyle(node);
    const opacity = +style.opacity;
    const primary_dimension = axis === 'y' ? 'height' : 'width';
    const primary_dimension_value = parseFloat(style[primary_dimension]);
    const secondary_dimensions =
      axis === 'y' ? (['Top', 'Bottom'] as const) : (['Left', 'Right'] as const);
    const padding_start_value = parseFloat(style.padding + secondary_dimensions[0]);
    const padding_end_value = parseFloat(style.padding + secondary_dimensions[1]);
    const margin_start_value = parseFloat(style.margin + secondary_dimensions[0]);
    const margin_end_value = parseFloat(style.margin + secondary_dimensions[1]);
    const border_width_start_value = parseFloat(style[`border${secondary_dimensions[0]}Width`]);
    const border_width_end_value = parseFloat(style[`border${secondary_dimensions[1]}Width`]);
    return {
      delay,
      duration,
      easing,
      css: (t: number) =>
        'overflow: hidden;' +
        `opacity: ${Math.min(t * 20, 1) * opacity};` +
        `${primary_dimension}: ${t * primary_dimension_value}px;` +
        `padding-${secondary_dimensions[0].toLowerCase()}: ${t * padding_start_value}px;` +
        `padding-${secondary_dimensions[1].toLowerCase()}: ${t * padding_end_value}px;` +
        `margin-${secondary_dimensions[0].toLowerCase()}: ${t * margin_start_value}px;` +
        `margin-${secondary_dimensions[1].toLowerCase()}: ${t * margin_end_value}px;` +
        `border-${secondary_dimensions[0].toLowerCase()}-width: ${
          t * border_width_start_value
        }px;` +
        `border-${secondary_dimensions[1].toLowerCase()}-width: ${t * border_width_end_value}px;`,
    };
  }

  let innerWidth = 0;
  $: isLg = innerWidth > 1024;
  $: leftSidebarOpen = isLg;
  let leftSidebarTogglerClick = 0;
  function toggleLeftSidebar() {
    leftSidebarOpen = !leftSidebarOpen;
    leftSidebarTogglerClick++;
  }
  function closeLeftSidebar() {
    leftSidebarOpen = false;
  }
  $: isXl = innerWidth > 1280;
  $: rightSidebarOpen = isXl;
  let rightSidebarTogglerClick = 0;
  function toggleRightSidebar() {
    rightSidebarOpen = !rightSidebarOpen;
    rightSidebarTogglerClick++;
  }

  let tocItems: { level: string; text: string; id: string }[] = [];
  let activeTocId = '';
  let intersectEnabled = true;
  let intersectResetTimeoutId: ReturnType<typeof setTimeout>;
  function handleTocItemClick(id: string) {
    clearTimeout(intersectResetTimeoutId);
    activeTocId = id;
    intersectEnabled = false;
    intersectResetTimeoutId = setTimeout(() => {
      intersectEnabled = true;
    }, 800);
  }
  // const stateMap: Record<string, { y: number; isInView: boolean }> = {};
  function onToc(e: CustomEvent<TocEventDetails>) {
    // FIXME: should refactor here once @svelte-put/toc is refactored to support these by default

    // // eslint-disable-next-line no-undef
    // const scrollingDownCallback: IntersectionObserverCallback = (entries) => {
    //   let newActiveTocId = '';
    //   for (const entry of entries) {
    //     const id = entry.target.id;
    //     const y = entry.boundingClientRect.y;

    //     const previousY = stateMap[id]?.y;
    //     stateMap[id] = { y, isInView: entry.isIntersecting };

    //     if (previousY) {
    //       if (y < previousY) {
    //         // scrolling down
    //         if (entry.isIntersecting) {
    //           // entering
    //         } else {
    //           // leaving
    //           if (!newActiveTocId) newActiveTocId = id;
    //         }
    //       }
    //     } else {
    //       if (entry.isIntersecting && !newActiveTocId) newActiveTocId = id;
    //     }
    //   }
    //   if (newActiveTocId) {
    //     activeTocId = newActiveTocId;
    //   }
    // };
    // const scrollingDownObserver = new IntersectionObserver(scrollingDownCallback, {
    //   rootMargin: '-100px 0px 0px 0px',
    // });

    // // eslint-disable-next-line no-undef
    // const scrollingUpCallback: IntersectionObserverCallback = (entries) => {
    //   let newActiveTocId = '';
    //   for (const entry of entries) {
    //     const id = entry.target.id;
    //     const y = entry.boundingClientRect.y;

    //     const previousY = stateMap[id]?.y;
    //     stateMap[id] = { y, isInView: entry.isIntersecting };

    //     if (previousY) {
    //       if (y > previousY) {
    //         // scrolling up
    //         if (entry.isIntersecting) {
    //           // entering
    //           if (!newActiveTocId) newActiveTocId = id;
    //         } else {
    //           // leaving
    //         }
    //       }
    //     } else {
    //       if (entry.isIntersecting && !newActiveTocId) newActiveTocId = id;
    //     }
    //   }
    //   if (newActiveTocId) {
    //     activeTocId = newActiveTocId;
    //   }
    // };
    // const scrollingUpObserver = new IntersectionObserver(scrollingUpCallback, {
    //   rootMargin: '100px 0px 0px 0px',
    // });

    // eslint-disable-next-line no-undef
    const callback: IntersectionObserverCallback = (entries) => {
      for (const entry of entries) {
        const tocId = entry.target.getAttribute('data-toc-id');
        if (entry.isIntersecting && intersectEnabled && tocId) {
          activeTocId = tocId;
        }
      }
    };
    const items = [];
    for (const item of e.detail.items) {
      let tocId = item.id;
      if (item.element.tagName.toLowerCase() !== 'h1') {
        let text = item.text;
        if (text.startsWith('#')) {
          text = text.slice(1);
        }
        // scrollingDownObserver.observe(item.element);
        // scrollingUpObserver.observe(item.element);
        // observer.observe(item.element);
        // see app.d.ts for all these extra data attributes
        if (!item.element.hasAttribute('data-toc-disabled')) {
          type TocStrategy = 'parent' | 'self';
          // TODO: add a `auto` strategy
          // where if the next toc item is very close, use self, otherwise, use parent?
          // remember to remove all the `data-toc-strategy="self"` when this is done
          const tocStrategy = (item.element.getAttribute('data-toc-strategy') ??
            'parent') as TocStrategy;
          let tocNode: HTMLElement;
          switch (tocStrategy) {
            case 'self':
              tocNode = item.element;
              break;
            case 'parent':
            default:
              tocNode = item.element.parentElement ?? item.element;
              break;
          }

          const dataTocId = tocNode.getAttribute('data-toc-id');
          if (dataTocId) {
            tocId = dataTocId;
          } else {
            tocNode.setAttribute('data-toc-id', tocId);
          }

          let threshold = Math.min((0.8 * window.innerHeight) / tocNode.offsetHeight, 1);
          const customThreshold = tocNode.getAttribute('data-toc-threshold');
          try {
            if (customThreshold) threshold = Math.min(parseInt(customThreshold, 10), 1);
          } catch (e) {
            //
          }

          const observer = new IntersectionObserver(callback, { threshold });
          observer.observe(tocNode);
        }

        items.push({
          id: tocId,
          level: item.element.tagName[1],
          text,
        });
      }
    }
    tocItems = items;
  }
</script>

<svelte:head>
  {@html gruvbox}
</svelte:head>

<svelte:window bind:innerWidth />

<div class="relative flex min-h-screen w-full flex-1 flex-col pt-header">
  <header
    class="fixed inset-x-0 top-0 z-header flex h-header flex-col border-b border-border bg-bg"
  >
    {#key data.pathname}
      <div class="h-0.5 w-full bg-gradient-brand" in:slide={{ axis: 'x', duration: 500 }} />
    {/key}
    <nav class="c-container flex flex-1 items-center justify-between py-2">
      <a href="/" class="flex items-center gap-2">
        <img
          src="/images/svelte-put-logo.svg"
          alt="svelte-put"
          width="32"
          height="32"
          loading="lazy"
          decoding="async"
        />
        <span class="c-link text-sm font-bold text-gradient-brand">svelte-put</span>
      </a>
      <ResourceLink class="c-link" key="github">
        <Github class="h-6 w-6" />
      </ResourceLink>
    </nav>
    <div class="border-t border-border xl:hidden">
      <nav class="h-subheader c-container flex items-center justify-between py-1 lg:justify-end">
        <button
          class="c-btn-icon flex items-center space-x-2 text-xs lg:hidden"
          on:click|stopPropagation={toggleLeftSidebar}
        >
          <Menu height="24" width="24" class="inline" />
          <span> Packages </span>
        </button>
        <button
          class="c-btn-icon flex items-center space-x-2 text-xs"
          on:click|stopPropagation={toggleRightSidebar}
        >
          <span> Table of Contents </span>
          <Menu height="24" width="24" class="inline -scale-x-100" />
        </button>
      </nav>
    </div>
  </header>

  <div class="c-container relative flex w-full flex-1 items-stretch">
    {#key leftSidebarTogglerClick}
      <nav
        data-sveltekit-prefetch
        class="sidebar sidebar--left"
        transition:fly|local={{ x: -200, duration: 200 }}
        use:clickoutside={{ enabled: leftSidebarOpen && !isLg }}
        on:clickoutside={toggleLeftSidebar}
        data-open={leftSidebarOpen}
      >
        <ul class="sidebar-content">
          <li>
            <a
              href={APP_ROUTE_TREE.docs.$.path()}
              data-current={data.pathname === APP_ROUTE_TREE.docs.$.path()}
              class="c-link block py-2 font-bold"
              on:click={closeLeftSidebar}
            >
              Introduction
            </a>
          </li>
          {#each Object.entries(packagesByCategory) as [category, packages]}
            <li class="py-2">
              <p class="font-bold">{capitalize(category)}</p>
              <ul class="mt-2 space-y-1 border-l border-border/50">
                {#each packages as { path, status, id }}
                  <li>
                    <a
                      href={path}
                      data-current={data.pathname.includes(id)}
                      class="c-link -ml-px block border-l border-transparent py-1 pl-3 data-current:border-primary"
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
          {/each}
        </ul>
      </nav>
    {/key}
    {#if leftSidebarOpen}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="sidebar-backdrop" transition:fade|local={{ duration: 150 }} />
    {/if}

    {#key data.pathname}
      <main class="prose flex-1" use:toc={{ anchored: false, indicator: false }} on:toc={onToc}>
        <slot />
      </main>
    {/key}

    {#key rightSidebarTogglerClick}
      <nav
        class="sidebar sidebar--right"
        transition:fly|local={{ x: 200, duration: 200 }}
        use:clickoutside={{ enabled: rightSidebarOpen && !isXl }}
        on:clickoutside={toggleRightSidebar}
        data-open={rightSidebarOpen}
      >
        <div class="sidebar-content text-sm">
          <p class="py-2 font-bold uppercase">On This Page</p>
          {#if tocItems.length}
            <ul class="space-y-1 border-l border-border/50">
              {#each tocItems as { id, text, level }}
                {@const current = id === activeTocId}
                <li>
                  <a
                    href={`#${id}`}
                    data-current={current}
                    class="c-link -ml-px block border-l border-transparent py-1 data-current:border-primary"
                    class:pl-3={level === '2'}
                    class:pl-5={level === '3'}
                    class:pl-7={level === '4'}
                    class:pl-9={level === '5'}
                    class:pl-11={level === '6'}
                    on:click={() => handleTocItemClick(id)}
                  >
                    {text}
                  </a>
                </li>
              {/each}
            </ul>
          {/if}
        </div>
      </nav>
    {/key}
  </div>

  <footer class="space-y-2 border-t border-border py-6 text-center font-fira text-xs">
    <p>
      Released under the <ResourceLink key="MIT License" class="font-medium" />
    </p>
    <p>
      Made with rice 🍚 <ResourceLink key="Quang Phan" class="font-medium" />
    </p>
    <p>
      Powered by
      <ResourceLink key="svelte-kit">
        <Svelte class="inline w-4" />
      </ResourceLink>
      <ResourceLink key="TailwindCSS">
        <Tailwind class="inline w-4" />
      </ResourceLink>
      <ResourceLink key="vercel">
        <Vercel class="inline w-4" />
      </ResourceLink>
    </p>
  </footer>
</div>

<style lang="postcss">
  .sidebar {
    @apply w-sidebar shrink-0 border-border text-sm;

    & .sidebar-content {
      @apply sticky top-header pt-10;
    }
  }

  .sidebar--left {
    @apply border-r max-lg:left-0;
    @apply max-lg:fixed max-lg:top-0 max-lg:bottom-0;
    @apply max-lg:z-sidebar max-lg:justify-center max-lg:bg-bg max-lg:shadow-lg;
    @apply max-lg:hidden max-lg:data-open:flex;
  }
  .sidebar-backdrop {
    @apply fixed inset-0 bg-black/20 backdrop-blur-[1px] lg:hidden;
    z-index: calc(theme(zIndex.sidebar) - 1);
  }

  .sidebar--right {
    @apply max-xl:right-0;
    @apply max-xl:fixed max-xl:top-header;
    @apply max-xl:z-sidebar max-xl:justify-center max-xl:rounded-b max-xl:bg-bg max-xl:shadow-lg;
    @apply max-xl:hidden max-xl:data-open:flex;

    & .sidebar-content {
      @apply max-xl:p-4;
    }
  }

  main {
    @apply pb-20 pt-10 lg:px-10 xl:px-14;
    max-width: 100%;
    @media screen(lg) {
      max-width: calc(100% - var(--sidebar-width));
    }
    @media screen(xl) {
      max-width: calc(100% - var(--sidebar-width) * 2);
    }
  }
</style>
