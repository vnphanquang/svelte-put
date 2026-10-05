<script lang="ts">
	import { Documentation } from '@internals/docpage/standalone';

	import { loadDocPage, loadDocPageLinks } from '../../docs';

	import type { PageProps } from './$types';

	let { params }: PageProps = $props();
</script>

<Documentation slug={params.slug ?? ''} {loadDocPage} pages={await loadDocPageLinks()} />
