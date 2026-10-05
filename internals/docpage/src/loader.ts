import type { CompileTimeToc } from '@svelte-put/toc';
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
	pkg: string,
	...modules: [
		Record<string, () => Promise<Component>>,
		Record<string, () => Promise<PerDefinedDocPageMetadata>>,
		Record<string, () => Promise<CompileTimeToc>>,
	]
): Loaders {
	const mapping = collectDocPages(...modules);

	return {
		async loadDocPage(input) {
			const { slug } = input;
			const collected = mapping[slug];
			if (!collected) return null;
			const [content, metadata, toc] = await Promise.all([
				collected.content(),
				collected.metadata(),
				collected.toc(),
			]);
			const merged: DocPage = {
				content,
				metadata: {
					...metadata,
					slug,
				},
				nav: {
					toc: toc.items,
				},
				contentEditUrl: `https://github.com/vnphanquang/svelte-put/edit/${import.meta.env.GIT_REF}/packages/${pkg}/src/docs/${collected.path}`,
			};
			const { previousSlug, nextSlug } = collected;
			if (previousSlug !== null || nextSlug !== null) {
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
