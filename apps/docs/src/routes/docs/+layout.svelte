<script lang="ts">
  import { toc } from '@svelte-put/toc';
  import type { TocEventDetails } from '@svelte-put/toc';
  import gruvbox from 'svelte-highlight/styles/gruvbox-dark-soft';
  import { cubicOut } from 'svelte/easing';

  import { packagesByCategory } from '$data/packages';
  import { APP_ROUTE_TREE } from '$lib/constants';
  import ResourceLink from '$lib/ui/components/ResourceLink/ResourceLink.svelte';
  import StatusBadge from '$lib/ui/components/StatusBadge/StatusBadge.svelte';
  import Github from '$lib/ui/components/icons/Github.svelte';
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
  let tocItems: { level: string; text: string; id: string }[] = [];
  let activeTocId = '';
  const stateMap: Record<string, { y: number; isInView: boolean }> = {};
  function onToc(e: CustomEvent<TocEventDetails>) {
    // FIXME: should refactor here once @svelte-put/toc is refactored to support these by default

    // eslint-disable-next-line no-undef
    const scrollingDownCallback: IntersectionObserverCallback = (entries) => {
      let newActiveTocId = '';
      for (const entry of entries) {
        const id = entry.target.id;
        const y = entry.boundingClientRect.y;

        const previousY = stateMap[id]?.y;
        stateMap[id] = { y, isInView: entry.isIntersecting };

        if (previousY) {
          if (y < previousY) {
            // scrolling down
            if (entry.isIntersecting) {
              // entering
            } else {
              // leaving
              if (!newActiveTocId) newActiveTocId = id;
            }
          }
        } else {
          if (entry.isIntersecting && !newActiveTocId) newActiveTocId = id;
        }
      }
      if (newActiveTocId) {
        activeTocId = newActiveTocId;
      }
    };
    const scrollingDownObserver = new IntersectionObserver(scrollingDownCallback, {
      rootMargin: '-100px 0px 0px 0px',
    });

    // eslint-disable-next-line no-undef
    const scrollingUpCallback: IntersectionObserverCallback = (entries) => {
      let newActiveTocId = '';
      for (const entry of entries) {
        const id = entry.target.id;
        const y = entry.boundingClientRect.y;

        const previousY = stateMap[id]?.y;
        stateMap[id] = { y, isInView: entry.isIntersecting };

        if (previousY) {
          if (y > previousY) {
            // scrolling up
            if (entry.isIntersecting) {
              // entering
              if (!newActiveTocId) newActiveTocId = id;
            } else {
              // leaving
            }
          }
        } else {
          if (entry.isIntersecting && !newActiveTocId) newActiveTocId = id;
        }
      }
      if (newActiveTocId) {
        activeTocId = newActiveTocId;
      }
    };
    const scrollingUpObserver = new IntersectionObserver(scrollingUpCallback, {
      rootMargin: '100px 0px 0px 0px',
    });

    const items = [];
    for (const item of e.detail.items) {
      if (item.element.tagName.toLowerCase() !== 'h1') {
        scrollingDownObserver.observe(item.element);
        scrollingUpObserver.observe(item.element);
        let text = item.text;
        if (text.startsWith('#')) {
          text = text.slice(1);
        }
        items.push({
          id: item.id,
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

<div class="relative flex min-h-screen w-full flex-1 flex-col pt-header">
  <header
    class="fixed inset-x-0 top-0 z-header flex h-header flex-col border-b border-border bg-bg"
  >
    {#key data.pathname}
      <div class="h-0.5 w-full bg-gradient-brand" in:slide={{ axis: 'x' }} />
    {/key}
    <nav class="x-auto c-container flex-1">
      <div class="flex h-full w-full items-center justify-between py-2 px-6">
        <a href="/" class="flex items-center gap-2">
          <img src="/images/svelte-put-logo.svg" alt="svelte-put" width="32" height="32" />
          <span class="c-link text-sm font-bold text-gradient-brand">svelte-put</span>
        </a>
        <ResourceLink class="c-link" key="github">
          <Github class="h-6 w-6" />
        </ResourceLink>
      </div>
    </nav>
  </header>

  <div class="c-container relative flex w-full flex-1 items-stretch" id="wrapper">
    <nav data-sveltekit-prefetch class="sidebar w-sidebar shrink-0 border-r border-border text-sm">
      <ul class="sidebar-content">
        <li>
          <a
            href={APP_ROUTE_TREE.docs.$.path()}
            data-current={data.pathname === APP_ROUTE_TREE.docs.$.path()}
            class="c-link block py-2 font-bold"
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

    {#key data.pathname}
      <main
        class="prose flex-1 px-6 pb-20 pt-10 md:px-10 lg:px-14"
        use:toc={{ anchored: false, indicator: false }}
        on:toc={onToc}
      >
        <slot />
      </main>
    {/key}

    <nav class="sidebar">
      <div class="sidebar-content text-sm">
        {#if tocItems.length}
          <p class="py-2 font-bold uppercase">On This Page</p>
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
                >
                  {text}
                </a>
              </li>
            {/each}
          </ul>
        {/if}
      </div>
    </nav>
  </div>

  <footer class="space-y-2 border-t border-border py-6 text-center font-fira text-xs">
    <p>
      Released under the <ResourceLink key="MIT License" class="font-medium" />
    </p>
    <p>
      Made with rice 🍚 <ResourceLink key="Quang Phan" class="font-medium" />
    </p>
  </footer>
</div>

<style lang="postcss">
  #wrapper {
    --wrapper-padding: 1rem;
    padding: 0 var(--wrapper-padding);
  }
  .sidebar {
    @apply w-sidebar shrink-0;
    & .sidebar-content {
      @apply sticky top-header px-6 pt-10;
    }
  }
  main {
    max-width: calc(100% - var(--sidebar-width) * 2);
  }
</style>
