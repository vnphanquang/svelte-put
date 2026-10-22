import type { CompileTimeToc } from '@svelte-put/toc';
import type { Component } from 'svelte';

import { collectDocPages } from './collection';
import type { DocPage, PerDefinedDocPageMetadata } from './definition';

export interface LinkPage {
	type: 'page';
	title: string;
	id: string;
	href: string;
}

export interface LinkGroup {
	type: 'group';
	title?: string;
	pages: LinkPage[];
}

export type PageLinks = Array<LinkPage | LinkGroup>;

export interface Loaders {
	loadDocPage: (input: { slug: string; root?: string }) => Promise<DocPage | null>;
	loadDocPageContent: (input: { slug: string }) => Promise<Component | null>;
	loadDocPageLinks: (options?: { root?: string }) => Promise<PageLinks>;
}

export function createLoaders(
	modules: [
		Record<string, () => Promise<Component>>,
		Record<string, () => Promise<PerDefinedDocPageMetadata>>,
		Record<string, () => Promise<CompileTimeToc>>,
	],
	options?: {
		/** doc page for a specific package? used to create content-edit url  */
		package?: string;
	},
): Loaders {
	const mapping = collectDocPages(...modules);

	return {
		async loadDocPageContent(input) {
			const { slug } = input;
			const collected = mapping[slug];
			if (!collected) return null;
			return collected.content();
		},
		async loadDocPage(input) {
			const { slug } = input;
			const collected = mapping[slug];
			if (!collected) return null;
			const [metadata, toc] = await Promise.all([collected.metadata(), collected.toc()]);
			const merged: DocPage = {
				metadata: {
					...metadata,
					slug,
				},
				nav: { toc },
				contentEditUrl: options?.package
					? `https://github.com/vnphanquang/svelte-put/edit/${import.meta.env.GIT_REF}/packages/${options.package}/src/docs/${collected.path}`
					: `https://github.com/vnphanquang/svelte-put/edit/${import.meta.env.GIT_REF}/sites/docs/src/data/docs/${collected.path}`,
			};
			const { previousSlug, nextSlug } = collected;
			if (previousSlug !== null || nextSlug !== null) {
				if (previousSlug !== null) {
					const { title } = await mapping[previousSlug]!.metadata();
					merged.nav.previous = {
						title,
						slug: previousSlug,
						href: `${input.root ?? '/'}${previousSlug}`,
					};
				}
				if (nextSlug !== null) {
					const { title } = await mapping[nextSlug]!.metadata();
					merged.nav.next = {
						title,
						slug: nextSlug,
						href: `${input.root ?? '/'}${nextSlug}`,
					};
				}
			}
			return merged;
		},
		async loadDocPageLinks(options) {
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

				const link: LinkPage = {
					type: 'page',
					title,
					id: slug,
					href: `${options?.root ?? '/'}${slug}`,
				};
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
