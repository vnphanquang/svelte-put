<script lang="ts">
	import { DocContent } from '@internals/docpage/components';

	import { loadDocPageContent } from '#data/docs';

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let doc = $derived(data.doc);
	let Content = $derived(await loadDocPageContent({ slug: doc.metadata.slug }));
</script>

<DocContent {doc}>
	<Content />
</DocContent>
