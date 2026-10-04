<script lang="ts">
	import { StandaloneDoc } from '@internals/docpage';

	import '../../app.css';
	import { loadDocPage } from '../../docs';

	import type { PageProps } from './$types';

	let { params }: PageProps = $props();
</script>

<StandaloneDoc slug={params.slug ?? ''} loader={loadDocPage} />
