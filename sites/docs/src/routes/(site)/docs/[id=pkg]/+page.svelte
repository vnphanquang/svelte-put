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

	let { data } = $props();

	const name = $derived(`@svelte-put/${data.package.id}`);
	const githubSourceUrl = $derived(
		`https://github.com/vnphanquang/svelte-put/edit/main/sites/docs/src/routes/(site)/docs/(package)/${data.package.id}/+page.md.svelte`,
	);
	const changelogUrl = $derived(
		`https://github.com/vnphanquang/svelte-put/tree/main/packages/${data.package.id}`,
	);
	const githubUrl = $derived(
		`https://github.com/vnphanquang/svelte-put/tree/main/packages/${data.package.id}`,
	);
</script>

<div class="mb-8 flex items-center justify-between border-b">
	<h1 class="font-fingerpaint border-b-0">
		{name}
	</h1>
	<a href={githubUrl} class="c-link-icon not-prose" data-external>
		<svg inline-src="simpleicon/github" class="inline" height="28" width="28" />
		<span class="sr-only">Github</span>
	</a>
</div>
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
			alt={name}
			{src}
			{width}
			{height}
		/>
	</a>
{/snippet}

<p class="not-prose flex flex-wrap items-center gap-2">
	{@render badge(
		createNpmUrl(name),
		createNpmBadgeUrl(name, data.package.releaseTag),
		24,
		107,
	)}
	{@render badge(
		createNpmUrl(name),
		createNpmDownloadBadgeUrl(name),
		24,
		134,
	)}
	{@render badge(
		createBundlephobiaUrl(name),
		createBundlephobiaBadgeUrl(name),
		24,
		125,
	)}

	{#if data.package.replId}
		{@render badge(createSvelteReplUrl(data.package.replId), createSvelteReplBadgeUrl(), 24, 112)}
	{/if}
	{@render badge(changelogUrl, createChangelogBadgeUrl(), 24, 90)}
</p>

<p class="c-callout c-callout--success c-callout--icon-megaphone max-w-md xl:hidden">
	Still on Svelte 4? See
	<a class="c-link" href="https://svelte-put-svelte-4.vnphanquang.com">the old docs site here.</a>
</p>

{#if data.Content}
	{@const Content = data.Content}
	<Content />
{/if}

<p class="text-right text-sm">
	<a class="c-link" href={githubSourceUrl}> Edit this page on Github </a>
</p>

<style lang="postcss">
	h1 {
		margin-bottom: 0;
		border-bottom: 0;
	}
</style>
