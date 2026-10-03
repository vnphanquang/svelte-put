import type { Component } from 'svelte';

import { collectDocPages } from './collection';
import type { DocPage, PerDefinedDocPageMetadata } from './definition';

export interface DocPageLoader {
	(input: { slug: string }): Promise<DocPage | null>;
}

export function createDocPageLoader(
	contentModules: Record<string, () => Promise<Component>>,
	metadataModules: Record<string, () => Promise<PerDefinedDocPageMetadata>>,
): DocPageLoader {
	const mapping = collectDocPages(contentModules, metadataModules);
	return async function (input) {
		const { slug } = input;
		const defined = mapping[slug];
		if (!defined) return null;
		const [content, metadata] = await Promise.all([defined.content(), defined.metadata()]);
		const merged: DocPage = {
			content,
			metadata: {
				...metadata,
				slug,
			},
		};
		const { previousSlug, nextSlug } = defined;
		if (previousSlug !== null || nextSlug !== null) {
			merged.nav = {};
			if (previousSlug !== null) {
				const { title } = await mapping[previousSlug]!.metadata();
				merged.nav.previous = {
					title,
					href: `../${previousSlug}`,
				};
			}
			if (nextSlug !== null) {
				const { title } = await mapping[nextSlug]!.metadata();
				merged.nav.next = {
					title,
					href: `../${nextSlug}`,
				};
			}
		}
		return merged;
	};
}
