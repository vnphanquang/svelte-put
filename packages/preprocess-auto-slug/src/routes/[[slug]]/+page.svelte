<script lang="ts">
	import { Documentation } from '@internals/docpage/standalone';

	import { loadDocPage } from '../../docs';

	import type { PageProps } from './$types';

	let { params }: PageProps = $props();
</script>

<Documentation slug={params.slug ?? ''} loader={loadDocPage} />
