import type { CompileTimeToc } from '@svelte-put/toc';
import type { Component } from 'svelte';

import { collectDocPages } from './collection';
import type { DocPage, PerDefinedDocPageMetadata } from './definition';

export interface LinkPage {
	type: 'page';
	title: string;
	slug: string;
}

export interface LinkGroup {
	type: 'group';
	title?: string;
	pages: LinkPage[];
}

export interface Loaders {
	loadDocPage: (input: { slug: string }) => Promise<DocPage | null>;
	loadDocPageLinks: () => Promise<Array<LinkPage | LinkGroup>>;
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
				nav: { toc },
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
			const groupMap: Record<string, LinkGroup> = {};
			const entries: Array<LinkGroup | LinkPage> = [];

			const pagePromises: Promise<PerDefinedDocPageMetadata & { slug: string }>[] = [];
			for (const [slug, page] of Object.entries(mapping)) {
				pagePromises.push(page.metadata().then((per) => ({ ...per, slug })));
			}
			const pages = await Promise.all(pagePromises);

			for (let i = 0; i < pages.length; i++) {
				const page = pages[i];
				const { title, group: groupTitle, slug } = page;

				const link: LinkPage = { type: 'page', title, slug };
				if (groupTitle) {
					if (!groupMap[groupTitle]) {
						const group: LinkGroup = {
							type: 'group',
							title: groupTitle,
							pages: [],
						};
						groupMap[groupTitle] = group;
						entries.push(group);
					}
					groupMap[groupTitle].pages.push(link);
				} else {
					entries.push(link);
				}
			}

			return entries;
		},
	};
}
