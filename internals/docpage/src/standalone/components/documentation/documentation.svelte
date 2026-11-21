<script lang="ts" module>
	import { Toc } from '@svelte-put/toc';
	import { error } from '@sveltejs/kit';

	import { DocContent } from '../../../components/doc-content';
	import type { Loaders } from '../../../loader';

	import './styles.css';

	export interface DocumentationProps {
		slug: string;
		loaders: Loaders;
	}
</script>

<script lang="ts">
	import { DocLayout } from '../../../components';

	let { slug, loaders }: DocumentationProps = $props();

	let doc = $derived(await loaders.loadDocPage({ slug }));
	let Content = $derived(await loaders.loadDocPageContent({ slug }));

	// svelte-ignore state_referenced_locally
	if (!doc) error(400, 'No documentation page with this path!'); // for SSR
	$effect(() => {
		if (!doc) error(400, 'No documentation page with this path!'); // for CSR
	});

	let toc = $derived(new Toc({ items: doc.nav.toc.items }));
</script>

<DocLayout
	{slug}
	inter={{
		links: await loaders.loadDocPageLinks(),
	}}
	intra={{ toc }}
>
	<DocContent {doc}>
		<Content />
	</DocContent>
</DocLayout>
