<script lang="ts">
	import { Toc } from '@svelte-put/toc';
	import { loadCompileTimeTocBySlug } from '#lib/.../collect.ts';
	import type { PageProps } from './$types';

	let { params }: PageProps = $props();

	const compileTimeToc = $derived(await loadCompileTimeTocBySlug(params.slug));
	const toc = $derived(new Toc({ ...comipleTimeToc }));
</script>

{#key params.slug}
	use toc instance to render Table-of-Contents
{/key}