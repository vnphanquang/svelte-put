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

	const githubSourceUrl = `https://github.com/vnphanquang/svelte-put/edit/next/sites/docs/src/routes/(site)/docs/(package)/${data.package.id}/+page.md.svelte`;
</script>

<h1 class="font-fingerpaint flex items-center justify-between">
	{data.package.name}
	<a href={data.package.githubUrl} class="c-link c-link--icon" data-external>
		<svg inline-src="simpleicon/github" class="inline" height="28" width="28" />
		<span class="sr-only">Github</span>
	</a>
</h1>
{#if data.package.description}
	<p class="c-callout c-callout--info c-callout--icon-bulb">{data.package.description}</p>
{/if}

{#if data.package.rune}
	<Runes class="float-right" />
{/if}

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

<p class="not-prose flex flex-wrap items-center gap-2">
	{@render badge(
		createNpmUrl(data.package.name),
		createNpmBadgeUrl(data.package.name, data.package.releaseTag),
		24,
		107,
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
		{@render badge(createSvelteReplUrl(data.package.replId), createSvelteReplBadgeUrl(), 24, 112)}
	{/if}
	{#if data.package.changelogUrl}
		{@render badge(data.package.changelogUrl, createChangelogBadgeUrl(), 24, 90)}
	{/if}
</p>

<p class="c-callout c-callout--success c-callout--icon-megaphone max-w-md xl:hidden">
	Still on Svelte 4? See
	<a class="c-link" href="https://svelte-put-svelte-4.vnphanquang.com">the old docs site here.</a>
</p>

{@render children()}

<p class="text-right text-sm">
	<a class="c-link" href={githubSourceUrl}> Edit this page on Github </a>
</p>
