<script lang="ts">
	import { error } from '@sveltejs/kit';
	import { Markdown } from '@vnphanquang/markdown/svelte';

	import '../../app.css';
	import { loadDocPage } from '../../docs';

	import type { PageProps } from './$types';

	let { params }: PageProps = $props();

	let doc = $derived(await loadDocPage({ slug: params.slug ?? '' }));

	// svelte-ignore state_referenced_locally
	if (!doc) error(400, 'No documentation page with this path!'); // for SSR
	$effect(() => {
		if (!doc) error(400, 'No documentation page with this path!'); // for CSR
	});
</script>

<main class="tablet:gap-20 tablet:py-20 max-w-pad flex flex-1 flex-col gap-10 py-10">
	<section class="md flex-1">
		<Markdown>
			<h1>{doc.metadata.title}</h1>
			<doc.content />
		</Markdown>
	</section>
	{#if doc.nav}
		{const commonClasses =
			'border border-current py-2 px-4 flex flex-col hover:border-primary transition-colors w-full max-w-100'}
		<nav class="tablet:gap-20 grid grid-cols-2 gap-10 border-t pbs-6">
			{#if doc.nav.previous}
				<a class={commonClasses} href={doc.nav.previous.href}>
					<span class="text-stroke-200 text-sm"> Previous page </span>
					<span class="text-primary">
						{doc.nav.previous.title}
					</span>
				</a>
			{/if}
			{#if doc.nav.next}
				<a
					class={[commonClasses, 'col-start-2 items-end justify-self-end']}
					href={doc.nav.next.href}
				>
					<span class="text-stroke-200 text-sm"> Next page </span>
					<span class="text-primary">
						{doc.nav.next.title}
					</span>
				</a>
			{/if}
		</nav>
	{/if}
</main>
