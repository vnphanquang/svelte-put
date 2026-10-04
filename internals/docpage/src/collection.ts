import type { Component } from 'svelte';

import type { PerDefinedDocPageMetadata } from './definition';

export interface DocPageResolver {
	path: string;
	slug: string;
	previousSlug: string | null;
	nextSlug: string | null;
	content: () => Promise<Component>;
	metadata: () => Promise<PerDefinedDocPageMetadata>;
}

function getSlugFromPath(path: string): string {
	const segments = path.split('/');
	const slugSegment = segments.at(-2)!;
	if (slugSegment.startsWith('0-')) return '';
	return slugSegment.replace(/^\d+-/, '');
}

export function collectDocPages(
	contentModules: Record<string, () => Promise<Component>>,
	metadataModules: Record<string, () => Promise<PerDefinedDocPageMetadata>>,
): Record<string, DocPageResolver> {
	const mapping: Record<string, DocPageResolver> = {};
	const paths = Object.keys(contentModules).toSorted();
	for (let i = 0; i < paths.length; i++) {
		const path = paths[i];
		const slug = getSlugFromPath(path);
		mapping[slug] = {
			path,
			slug,
			previousSlug: i > 0 ? getSlugFromPath(paths[i - 1]) : null,
			nextSlug: i < paths.length - 1 ? getSlugFromPath(paths[i + 1]) : null,
			content: contentModules[path],
			metadata: metadataModules[path],
		};
	}
	return mapping;
}
