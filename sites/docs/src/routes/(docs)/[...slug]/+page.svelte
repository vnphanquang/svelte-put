<script lang="ts">
	import { DocContent } from '@internals/docpage/components';
	import { PageMetadata } from '@vnphanquang/gach/metadata';

	import { loadDocPageContent } from '#data/docs';

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let doc = $derived(data.doc);
	let Content = $derived(await loadDocPageContent({ slug: doc.metadata.slug }));
</script>

<PageMetadata
	metadata={{
		title: [doc.metadata.title, doc.metadata.group, 'svelte-put'].filter(Boolean).join(' | '),
	}}
/>

<DocContent {doc}>
	<Content />
</DocContent>
