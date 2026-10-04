import type { Component } from 'svelte';

import { collectDocPages } from './collection';
import type { DocPage, PerDefinedDocPageMetadata } from './definition';

export interface Loaders {
	loadDocPage: (input: { slug: string }) => Promise<DocPage | null>;
	loadDocPageLinks: () => Promise<
		{
			slug: string;
			title: string;
		}[]
	>;
}

export function createLoaders(
	contentModules: Record<string, () => Promise<Component>>,
	metadataModules: Record<string, () => Promise<PerDefinedDocPageMetadata>>,
): Loaders {
	const mapping = collectDocPages(contentModules, metadataModules);

	return {
		async loadDocPage(input) {
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
		},
		async loadDocPageLinks() {
			return await Promise.all(
				Object.entries(mapping).map(async ([slug, page]) => {
					const { title } = await page.metadata();
					return {
						title,
						slug,
					};
				}),
			);
		},
	};
}
