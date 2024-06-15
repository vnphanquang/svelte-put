<script lang="ts">
  import { Runes } from '$lib/components/runes';
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

	let { data, children } = $props();
</script>

<h1 class="flex items-center justify-between font-fingerpaint">
	{data.package.name}
	<a href={data.package.githubUrl} class="c-link c-link--icon" data-external>
		<svg inline-src="simpleicon/github" class="inline" height="28" width="28" />
	</a>
</h1>
{#if data.package.description}
	<p class="c-callout c-callout--info c-callout--icon-bulb">{data.package.description}</p>
{/if}

<Runes class="float-right" />

{#snippet badge(href: string, src: string, width: number, height: number)}
	<a {href} data-external class="h-full">
		<img
			loading="lazy"
			decoding="async"
			class="my-0 inline-block h-6 w-auto rounded"
			alt={data.package.name}
			{src}
			{width}
			{height}
		/>
	</a>
{/snippet}

<p class="flex flex-wrap items-center gap-2 not-prose">
	{@render badge(
		createNpmUrl(data.package.name),
		createNpmBadgeUrl(data.package.name),
		24,
		107
	)}
	{@render badge(
		createNpmUrl(data.package.name),
		createNpmDownloadBadgeUrl(data.package.name),
		24,
		134,
	)}
	{@render badge(
		createBundlephobiaUrl(data.package.name),
		createBundlephobiaBadgeUrl(data.package.name),
		24,
		125,
	)}

	{#if data.package.replId}
		{@render badge(
			createSvelteReplUrl(data.package.replId),
			createSvelteReplBadgeUrl(),
			24,
			112,
		)}
	{/if}
	{#if data.package.changelogUrl}
		{@render badge(
			data.package.changelogUrl,
			createChangelogBadgeUrl(),
			24,
			90,
		)}
	{/if}
</p>


{#if data.package.ready}
	<p class="c-callout c-callout--success c-callout--icon-megaphone max-w-md xl:hidden">
		Still on Svelte 4? See
		<a class="c-link" href="https://svelte-put-svelte-4.vnphanquang.com">the old docs site here.</a>
	</p>
	{@render children()}
	<p class="text-right text-sm">
		<a class="c-link" href="https://github.com/vnphanquang/svelte-put/edit/main/sites/docs/src/routes/docs/(package)/{data.package.id}/+page.md.svelte">
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
      <a href={data.package.githubUrl} data-external>github</a> for more information.
    </p>
	</div>
{/if}

