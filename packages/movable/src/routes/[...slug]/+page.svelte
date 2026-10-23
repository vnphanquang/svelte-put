<script lang="ts">
	import { Documentation } from '@internals/docpage/standalone';

	import * as loaders from '../../docs';

	import type { PageProps } from './$types';

	let { params }: PageProps = $props();
</script>

<Documentation slug={params.slug ?? ''} {loaders} />
