<script lang="ts">
  import gruvbox from 'svelte-highlight/styles/gruvbox-dark-soft';
  import { cubicOut } from 'svelte/easing';

  import { packagesByCategory } from '$data/packages';
  import { APP_ROUTE_TREE } from '$lib/constants';
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
</script>

<svelte:head>
  {@html gruvbox}
</svelte:head>

<div class="relative flex min-h-screen flex-1 flex-col pt-header">
  <header class="fixed inset-x-0 top-0 z-header h-header border-b border-border bg-bg">
    {#key data.pathname}
      <div class="h-0.5 w-full bg-gradient-brand" in:slide={{ axis: 'x' }} />
    {/key}
    <nav class="x-auto c-container">
      <div class="flex w-full items-center justify-between py-2 px-6">
        <a href="/" class="flex items-center gap-2">
          <img src="/images/svelte-put-logo.svg" alt="svelte-put" width="32" height="32" />
          <span class="c-link text-sm font-bold text-gradient-brand">svelte-put</span>
        </a>
        <a href="https://github.com/vnphanquang/svelte-put" target="__blank" class="c-link">
          <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6"
            ><title>GitHub</title><path
              fill="currentColor"
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
            /></svg
          >
        </a>
      </div>
    </nav>
  </header>

  <div class="c-container relative mx-auto flex flex-1 items-stretch">
    <nav data-sveltekit-prefetch class="border-r border-border text-sm">
      <ul class="sticky top-header whitespace-nowrap p-6">
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
              {#each packages as { name, path, status, id }}
                <li>
                  <a
                    href={path}
                    data-current={data.pathname.includes(id)}
                    class="c-link -ml-px block py-1 pl-3 data-current:border-l data-current:border-primary"
                  >
                    <span class="h-full w-1 bg-primary" />
                    {name}
                    {#if status !== 'stable'}
                      <sup class:c-badge-primary={status === 'dev'}>{status}</sup>
                    {/if}
                  </a>
                </li>
              {/each}
            </ul>
          </li>
        {/each}
      </ul>
    </nav>

    {#key data.pathname}
      <main class="prose max-w-full flex-1 py-10 px-6 md:px-10 lg:px-14">
        <slot />
      </main>
    {/key}
  </div>
</div>
