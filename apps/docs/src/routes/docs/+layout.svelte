<script lang="ts">
  import { cubicIn, cubicOut } from 'svelte/easing';
  import { fly } from 'svelte/transition';

  import type { LayoutData } from './$types';

  export let data: LayoutData;

  const contents = [
    {
      category: 'Actions',
      packages: [
        {
          name: '@svelte-put/clickoutside',
        },
        {
          name: '@svelte-put/intersect',
        },
        {
          name: '@svelte-put/movable',
        },
        {
          name: '@svelte-put/shortcut',
        },
        {
          name: '@svelte-put/toc',
        },
      ],
    },
    {
      category: 'Components',
      packages: [
        {
          name: '@svelte-put/select',
        },
      ],
    },
    {
      category: 'Miscellaneous',
      packages: [
        {
          name: '@svelte-put/avatar',
        },
        {
          name: '@svelte-put/modal',
        },
      ],
    },
  ] as const;

  function generateDocHref(packageName: string) {
    return `/docs/${packageName}`;
  }

  const TRANSITION_DURATION = 200;
  const yIn = 10;
  const yOut = -10;
</script>

<div class="grid min-h-screen flex-1 overflow-y-scroll" id="site-wrapper">
  <nav id="navbar" class="border-b border-border">
    <div class="h-px w-full bg-gradient-brand" />
    <div class="flex w-full items-center justify-between py-2 px-6">
      <a href="/" class="flex items-center gap-2">
        <img src="/images/svelte-put-logo.svg" alt="svelte-put" width="32" height="32" />
        <span class="c-link text-sm font-bold">svelte-put</span>
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

  <nav data-sveltekit-prefetch id="sidebar" class="max-w-xs border-r border-border py-6 text-sm">
    <ul>
      <li>
        <a
          href="/docs"
          data-active={data.pathname === '/docs'}
          class="c-link-bg block py-2 px-6 font-bold"
        >
          Introduction
        </a>
      </li>
      {#each contents as { category, packages }}
        <li class="py-2">
          <p class="mx-6 font-bold">{category}</p>
          <ul>
            {#each packages as { name }}
              {@const href = generateDocHref(name)}
              <li>
                <a
                  {href}
                  data-active={data.pathname.includes(name)}
                  class="c-link-bg block py-2 px-10"
                >
                  <span class="h-full w-1 bg-primary" />
                  {name}
                </a>
                <!-- <ul>
                  Get headings from toc automatically and set to some store/context?
                  {#each headings as h}
                    <li>
                      <a href="{href}#{h}" class="block py-2 px-14 text-sm c-link-bg">Installation</a>
                    </li>
                  {/each}
                </ul> -->
              </li>
            {/each}
          </ul>
        </li>
      {/each}
    </ul>
  </nav>

  {#key data.pathname}
    <main
      class="justify-self-stretch py-10 container"
      in:fly={{
        y: yIn,
        duration: TRANSITION_DURATION,
        delay: TRANSITION_DURATION,
        easing: cubicOut,
      }}
      out:fly={{
        y: yOut,
        duration: TRANSITION_DURATION,
        easing: cubicIn,
      }}
    >
      <slot />
    </main>
  {/key}
</div>

<style lang="postcss">
  #site-wrapper {
    @apply grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto 1fr;
    grid-template-areas:
      'navbar navbar'
      'sidebar content';
  }

  nav#navbar {
    grid-area: navbar;
  }

  nav#sidebar {
    grid-area: sidebar;
  }

  main {
    grid-area: content;
  }
</style>
