import type { CompileTimeToc } from '@svelte-put/toc';
import type { Component } from 'svelte';

import type { PerDefinedDocPageMetadata } from './definition';

export interface DocPageResolver {
	path: string;
	slug: string;
	previousSlug: string | null;
	nextSlug: string | null;
	content: () => Promise<Component>;
	metadata: () => Promise<PerDefinedDocPageMetadata>;
	toc: () => Promise<CompileTimeToc>;
}

function getSlugFromPath(path: string): string {
	const segments = path.split('/');
	let finalSegment = segments.at(-2)!;
	if (finalSegment.startsWith('0-')) {
		finalSegment = '';
	} else {
		finalSegment = finalSegment.replace(/^\d+-/, '');
	}
	return [
		...segments.slice(2, -2).map((s) => s.replace(/^\d+-/, '')),
		...(finalSegment ? [finalSegment] : []),
	].join('/');
}

export function collectDocPages(
	contentModules: Record<string, () => Promise<Component>>,
	metadataModules: Record<string, () => Promise<PerDefinedDocPageMetadata>>,
	tocModules: Record<string, () => Promise<CompileTimeToc>>,
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
			toc: tocModules[path],
		};
	}
	return mapping;
}
