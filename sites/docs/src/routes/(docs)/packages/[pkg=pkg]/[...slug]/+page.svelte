<script lang="ts">
	import { DocContent } from '@internals/docpage/components';

	import { getLoadersByPackage } from '#data/loader';

	import type { PageProps } from './$types';

	let { data, params }: PageProps = $props();

	let doc = $derived(data.doc);
	let loaders = $derived(await getLoadersByPackage(params.pkg));
	let Content = $derived(await loaders?.loadDocPageContent({ slug: doc.metadata.slug }));
</script>

<DocContent {doc}>
	<Content />
</DocContent>
