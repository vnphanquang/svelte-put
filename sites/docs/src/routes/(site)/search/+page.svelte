<script lang="ts">
	import { onMount } from 'svelte';

	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let { data } = $props();

	let pagefind: typeof import('@pagefind') | null = $state(null);
	let sanitize: typeof import('sanitize-html') | null = $state(null);
	let query = $state(data.query);
	let promise: ReturnType<import('@pagefind').PageFind['debouncedSearch']> = $derived.by(() => {
		if (!pagefind || !data.query) return new Promise(() => {});
		return pagefind.debouncedSearch(data.query, undefined, 500);
	});

	onMount(async () => {
		pagefind = await import('@pagefind');
		sanitize = (await import('sanitize-html')).default;
		pagefind.init();
	});

	function submit(e: Event) {
		e.preventDefault();
		const url = new URL($page.url);
		url.searchParams.set('q', query);
		goto(url, { replaceState: true });
	}

	function transformLink(url: string) {
		return url.replace('.html', '');
	}
</script>

<div class="not-prose contents">
	<h1 class="text-4xl">Search</h1>
	<form class="mt-8" method="GET" onsubmit={submit}>
		<div class="flex gap-2">
			<label class="c-input-temp flex items-center gap-2 flex-1 h-full">
				<svg class="h-6 w-6 shrink-0" inline-src="phosphor/magnifying-glass" width="24" height="24"
				></svg>
				<input
					class="flex-1"
					type="text"
					name="q"
					id="q"
					bind:value={query}
					placeholder="search something..."
				/>
			</label>
			<button class="c-btn c-btn--outlined" type="submit">Search</button>
		</div>
		<label class="block text-sm text-fg-200 mt-0.5" for="q">Type and press enter or hit "search" button</label>
	</form>
	{#await promise then searched}
		{#if searched}
			<ul class="divide-y divide-outline">
				{#each searched.results as { data }}
					<li class="">
						{#await data()}
							<div class="c-loader mx-auto"></div>
						{:then { meta, url, sub_results }}
							<article class="space-y-4 py-4">
								<p class="font-fingerpaint text-lg">
									<a class="c-link" href={transformLink(url)}>{meta.title}</a>
								</p>
								{#if sub_results?.length}
									<ul class="space-y-2 px-4">
										{#each sub_results.slice(0, 5) as { title, url, excerpt }}
											<li>
												<p class=""><a class="c-link" href={transformLink(url)}>{title}</a></p>
												{#if sanitize}
													<!-- eslint-disable-next-line svelte/no-at-html-tags -->
													<p>...{@html sanitize(excerpt)}...</p>
												{:else}
													<p>...{excerpt}...</p>
												{/if}
											</li>
										{/each}
									</ul>
								{/if}
							</article>
						{/await}
					</li>
				{/each}
			</ul>
		{/if}
	{/await}
</div>

