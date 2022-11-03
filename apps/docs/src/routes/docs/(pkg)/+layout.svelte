<script lang="ts">
  import Empty from '$lib/ui/components/icons/Empty.svelte';
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
  <h1>{data.package.name}</h1>
  <p class="h-6 space-x-2">
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
  <div class="grid place-items-center font-bold">
    <p class="text-2xl">Documentation coming very soon</p>
    <Empty />
    <p class="text-lg">Wow, such empty</p>
  </div>
{/if}
