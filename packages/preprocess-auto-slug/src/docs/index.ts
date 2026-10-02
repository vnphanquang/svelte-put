import { type PerDefinedDocPageMetadata, createDocPageLoader } from '@internals/docpage';
import type { Component } from 'svelte';

export const loadDocPage = createDocPageLoader(
	import.meta.glob<Component>('./entries/**/doc.svelte', {
		import: 'default',
	}),
	import.meta.glob<PerDefinedDocPageMetadata>('./entries/**/doc.svelte', { import: 'metadata' }),
);
