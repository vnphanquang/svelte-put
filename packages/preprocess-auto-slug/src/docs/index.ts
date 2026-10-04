import { type PerDefinedDocPageMetadata, createLoaders } from '@internals/docpage';
import type { Component } from 'svelte';

const { loadDocPage, loadDocPageLinks } = createLoaders(
	import.meta.glob<Component>('./entries/**/doc.svelte', {
		import: 'default',
	}),
	import.meta.glob<PerDefinedDocPageMetadata>('./entries/**/doc.svelte', { import: 'metadata' }),
);

export { loadDocPage, loadDocPageLinks };
