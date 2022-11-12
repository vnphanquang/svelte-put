<script lang="ts">
  import BackToTopBtn from '$lib/ui/components/BackToTopBtn/BackToTopBtn.svelte';
  import ResourceLink from '$lib/ui/components/ResourceLink/ResourceLink.svelte';
  import Empty from '$lib/ui/components/icons/Empty.svelte';
  import Github from '$lib/ui/components/icons/Github.svelte';
  import {
    createBundlephobiaBadgeUrl,
    createBundlephobiaUrl,
    createChangelogBadgeUrl,
    createNpmBadgeUrl,
    createNpmUrl,
    createSvelteReplBadgeUrl,
    createSvelteReplUrl,
  } from '$lib/utils/badge';

  import type { LayoutData } from './$types';

  export let data: LayoutData;
</script>

{#key data.package.name}
  <h1 class="flex items-center justify-between">
    {data.package.name}
    <ResourceLink href={data.package.githubUrl} class="text-fg active:text-primary">
      <Github class="inline" height="28" width="28" />
    </ResourceLink>
  </h1>
  {#if data.package.description}
    <p class="c-callout">{data.package.description}</p>
  {/if}

  <p class="flex flex-wrap gap-2">
    <a href={createNpmUrl(data.package.name)} target="__blank" class="h-full">
      <img
        class="my-0 inline-block h-full w-auto rounded"
        src={createNpmBadgeUrl(data.package.name)}
        alt={data.package.name}
        height="24"
        width="100"
      />
    </a>
    <a href={createBundlephobiaUrl(data.package.name)} target="__blank" class="h-full">
      <img
        class="my-0 inline-block h-full w-auto rounded"
        src={createBundlephobiaBadgeUrl(data.package.name)}
        alt={data.package.name}
        height="24"
        width="132"
        target="__blank"
      />
    </a>
    {#if data.package.replId}
      <a href={createSvelteReplUrl(data.package.replId)} target="__blank" class="h-full">
        <img
          class="my-0 inline-block h-full w-auto rounded"
          src={createSvelteReplBadgeUrl()}
          alt={data.package.name}
          height="24"
          width="112"
          target="__blank"
        />
      </a>
    {/if}
    {#if data.package.changelogUrl}
      <a href={data.package.changelogUrl} target="__blank" class="h-full">
        <img
          class="my-0 inline-block h-full w-auto rounded"
          src={createChangelogBadgeUrl()}
          alt="changelog"
          height="24"
          width="89"
          target="__blank"
        />
      </a>
    {/if}
  </p>
  <p class="h-px w-full bg-border" />
{/key}

{#if data.package.ready}
  <slot />
{:else}
  <div class="grid w-full place-items-center text-center">
    <p class="text-lg font-bold">Wow, such empty</p>
    <Empty />
    <p>Documentation is being put together and will be available very soon.</p>
    <p>
      In the mean time, you can visit
      <ResourceLink href={data.package.githubUrl}>github</ResourceLink> for more information.
    </p>
  </div>
{/if}

<BackToTopBtn class="fixed bottom-4 right-4 z-header" />
