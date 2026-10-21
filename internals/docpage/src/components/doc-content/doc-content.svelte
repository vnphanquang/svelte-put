<script lang="ts">
	import { Markdown } from '@vnphanquang/markdown/svelte';

	import type { DocPage } from '../../definition';

	let { doc }: { doc: DocPage } = $props();
</script>

<main class="@container">
	{#key doc.contentEditUrl}
		<section class="md flex-1">
			<Markdown>
				<h1>{doc.metadata.title}</h1>
				<doc.content />
			</Markdown>
		</section>
	{/key}
	<div class="desktop:mbs-15 mbs-10 space-y-10">
		<p class="border-fill-200 border-b py-1 text-sm">
			Found typo or problem?
			<a class="c-link" href={doc.contentEditUrl} data-external> Suggest an edit! </a>
		</p>

		<!-- Relative Page Navigation -->
		{#if doc.nav.previous || doc.nav.next}
			{const commonClasses =
				'border border-current py-3 gap-1 px-4 flex flex-col hover:border-primary transition-colors w-full max-w-100 flex-1 min-w-50'}
			<nav class="tablet:gap-10 flex flex-wrap gap-4">
				{#if doc.nav.previous}
					<a class={commonClasses} href="/{doc.nav.previous.slug}">
						<span class="text-stroke-200 text-sm"> Previous page </span>
						<span class="text-primary">
							{doc.nav.previous.title}
						</span>
					</a>
				{/if}
				{#if doc.nav.next}
					<a class={[commonClasses, 'ms-auto items-end']} href="/{doc.nav.next.slug}">
						<span class="text-stroke-200 text-sm"> Next page </span>
						<span class="text-primary">
							{doc.nav.next.title}
						</span>
					</a>
				{/if}
			</nav>
		{/if}
	</div>
</main>

<style>
	@import '@vnphanquang/gach/styles/custom-medias';

	main {
		padding-block: var(--py);

		@media (--desktop) {
			grid-area: doc;

			width: 100%;
			max-width: 80ch;
			margin-inline: auto;
			padding-inline-start: var(--px);
		}

		@media (--desktop) {
			padding-inline: var(--px);
		}
	}
</style>
