<script lang="ts">
  import BackToTopBtn from '$client/components/BackToTopBtn/BackToTopBtn.svelte';
  import EditThisPageLink from '$client/components/EditThisPageLink/EditThisPageLink.svelte';
  import ResourceLink from '$client/components/ResourceLink/ResourceLink.svelte';
  import {
    createBundlephobiaBadgeUrl,
    createBundlephobiaUrl,
    createChangelogBadgeUrl,
    createNpmBadgeUrl,
    createNpmDownloadBadgeUrl,
    createNpmUrl,
    createSvelteReplBadgeUrl,
    createSvelteReplUrl,
  } from '$shared/utils/badge';

  import type { LayoutData } from './$types';

  export let data: LayoutData;
</script>

{#key data.package.name}
  <h1 class="flex items-center justify-between font-fingerpaint">
    {data.package.name}
    <ResourceLink href={data.package.githubUrl} class="text-fg active:text-primary">
      <svg data-inline-src="simpleicon/github" class="inline" height="28" width="28" />
    </ResourceLink>
  </h1>
  {#if data.package.description}
    <p class="c-callout-info">{data.package.description}</p>
  {/if}

  <p class="flex flex-wrap items-center gap-2">
    <a href={createNpmUrl(data.package.name)} target="_blank" rel="noreferrer">
      <img
        loading="lazy"
        decoding="async"
        class="my-0 inline-block h-6 w-auto rounded"
        src={createNpmBadgeUrl(data.package.name)}
        alt={data.package.name}
        height="24"
        width="107"
      />
    </a>
    <a href={createNpmUrl(data.package.name)} target="_blank" rel="noreferrer">
      <img
        loading="lazy"
        decoding="async"
        class="my-0 inline-block h-6 w-auto rounded"
        src={createNpmDownloadBadgeUrl(data.package.name)}
        alt={data.package.name}
        height="24"
        width="134"
      />
    </a>
    <a
      href={createBundlephobiaUrl(data.package.name)}
      target="_blank"
      class="h-full"
      rel="noreferrer"
    >
      <img
        loading="lazy"
        decoding="async"
        class="my-0 inline-block h-6 w-auto rounded"
        src={createBundlephobiaBadgeUrl(data.package.name)}
        alt={data.package.name}
        height="24"
        width="125"
      />
    </a>
    {#if data.package.replId}
      <a
        href={createSvelteReplUrl(data.package.replId)}
        target="_blank"
        class="h-full"
        rel="noreferrer"
      >
        <img
          loading="lazy"
          decoding="async"
          class="my-0 inline-block h-6 w-auto rounded"
          src={createSvelteReplBadgeUrl()}
          alt={data.package.name}
          height="24"
          width="112"
        />
      </a>
    {/if}
    {#if data.package.changelogUrl}
      <a href={data.package.changelogUrl} target="_blank" rel="noreferrer">
        <img
          loading="lazy"
          decoding="async"
          class="my-0 inline-block h-6 w-auto rounded"
          src={createChangelogBadgeUrl()}
          alt="changelog"
          height="24"
          width="90"
        />
      </a>
    {/if}
  </p>
  <p class="h-px w-full bg-border" />
{/key}

{#if data.package.ready}
  <slot />

  <p class="text-right">
    <EditThisPageLink packageId={data.package.id} />
  </p>
{:else}
  <div class="grid w-full place-items-center text-center">
    <p class="text-lg font-bold">Wow, such empty</p>
    <svg data-inline-src="empty" />
    <p>Documentation is being put together and will be available very soon.</p>
    <p>
      In the mean time, you can visit
      <ResourceLink href={data.package.githubUrl}>github</ResourceLink> for more information.
    </p>
  </div>
{/if}

<BackToTopBtn class="fixed bottom-4 right-4 z-header" />
