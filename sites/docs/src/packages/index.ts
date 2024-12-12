import type { Component } from 'svelte';

import fallbackOgImage from '$lib/assets/images/svelte-put-og.jpg?url';

const ogImageModules = import.meta.glob<string>('./*/og.jpg', { query: '?url', import: 'default' });
const docsContentModules = import.meta.glob<Component>('./*/docs.md.svelte', { import: 'default' });
const metadataModules = import.meta.glob<Omit<App.Package, 'id'>>('./*/metadata.ts', {
	import: 'default',
});

export const ids = Object.keys(docsContentModules).map((path) => path.split('/')[1]);

export async function getPackageListing() {
	const metadatas = await Promise.all(
		Object.entries(metadataModules).map(async ([path, module]) => {
			const pkg = await module();
			return { id: path.split('/')[1], ...pkg };
		}),
	);
	const active: App.Package[] = [];
	const deprecated: App.Package[] = [];
	for (const metadata of metadatas) {
		if (metadata.status === 'deprecated') {
			deprecated.push(metadata);
		} else {
			active.push(metadata);
		}
	}
	return {
		active: active.sort((a, b) => (a.id > b.id ? 1 : -1)),
		deprecated: deprecated.sort((a, b) => (a.id > b.id ? 1 : -1)),
	};
}

export async function getPackageMetadata(pkg: string): Promise<App.Package | null> {
	const path = `./${pkg}/metadata.ts`;
	if (!(path in metadataModules)) return null;
	return {
		...(await metadataModules[path]()),
		id: pkg,
	};
}

export async function getOgImage(pkg: string): Promise<string> {
	const path = `./${pkg}/og.jpg`;
	if (!(path in ogImageModules)) return fallbackOgImage;
	return await ogImageModules[path]();
}

export async function getDocsContent(pkg: string): Promise<Component | null> {
	const path = `./${pkg}/docs.md.svelte`;
	if (!(path in docsContentModules)) return null;
	return await docsContentModules[path]();
}
