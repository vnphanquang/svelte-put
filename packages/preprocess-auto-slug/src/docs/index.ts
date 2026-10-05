import { type PerDefinedDocPageMetadata, createLoaders } from '@internals/docpage';
import type { CompileTimeToc } from '@svelte-put/toc';
import type { Component } from 'svelte';

const { loadDocPage, loadDocPageLinks } = createLoaders(
	'preprocess-auto-slug',
	import.meta.glob<Component>('./entries/**/doc.svelte', {
		import: 'default',
	}),
	import.meta.glob<PerDefinedDocPageMetadata>('./entries/**/doc.svelte', { import: 'metadata' }),
	import.meta.glob<CompileTimeToc>('./entries/**/doc.svelte', { import: 'toc' }),
);

export { loadDocPage, loadDocPageLinks };
