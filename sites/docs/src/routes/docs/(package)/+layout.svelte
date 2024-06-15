<script lang="ts">
  import {
    createBundlephobiaBadgeUrl,
    createBundlephobiaUrl,
    createChangelogBadgeUrl,
    createNpmBadgeUrl,
    createNpmDownloadBadgeUrl,
    createNpmUrl,
    createSvelteReplBadgeUrl,
    createSvelteReplUrl,
  } from '$lib/utils/badge';

	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<h1 class="flex items-center justify-between font-fingerpaint">
	{data.package.name}
	<a href={data.package.githubUrl} class="c-link c-link--icon" external>
		<svg inline-src="simpleicon/github" class="inline" height="28" width="28" />
	</a>
</h1>
{#if data.package.description}
	<p class="c-callout c-callout--info c-callout--icon-bulb">{data.package.description}</p>
{/if}

<p class="flex flex-wrap items-center gap-2 not-prose">
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

{#if data.package.ready}
	<p class="c-callout c-callout--success c-callout--icon-megaphone max-w-md xl:hidden">
		Migrating to Svelte 5? See
		<a class="c-link" href="https://svelte-put-next.vnphanquang.com">the new docs site here</a>.
	</p>
	<slot />
	<p class="text-right text-sm">
		<a class="c-link" href="https://github.com/vnphanquang/svelte-put/edit/main/sites/docs/src/routes/docs/(package)/{data.package.id}/_page/content.md.svelte">
			Edit this page on Github
		</a>
	</p>
{:else}
	<div class="flex flex-col items-center text-center">
    <p class="text-lg font-bold">Wow, such empty</p>
		<svg inline-src="blocks" height="200" width="655" class="text-bg-200 max-w-full h-auto" />
    <p class="mt-10">
			Documentation is being put together and will be available very soon.
			<br />
			<br />
      In the mean time, you can visit
      <a href={data.package.githubUrl} external>github</a> for more information.
    </p>
	</div>
{/if}
