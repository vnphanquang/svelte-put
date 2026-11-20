<script lang="ts">
	import { DocContent } from '@internals/docpage/components';
	import { PageMetadata } from '@vnphanquang/gach/metadata';

	import { getLoadersByPackage } from '#data/loader';

	import type { PageProps } from './$types';

	let { data, params }: PageProps = $props();

	let doc = $derived(data.doc);
	let loaders = $derived(await getLoadersByPackage(params.pkg));
	let Content = $derived(await loaders?.loadDocPageContent({ slug: doc.metadata.slug }));
</script>

<PageMetadata
	metadata={{
		title: `${doc.metadata.title} | ${params.pkg}`,
		description: data.manifest?.description,
		...(data.og && {
			og: {
				image: {
					src: data.og,
					alt: '',
				},
			},
		}),
	}}
/>

<DocContent {doc}>
	<Content />
</DocContent>
