import type { CompileTimeToc } from '@svelte-put/toc';
import type { Component } from 'svelte';

export interface DocPage {
	content: Component;
	metadata: DocPageMetadata;
	nav: {
		toc: CompileTimeToc;
		previous?: {
			href: string;
			title: string;
		};
		next?: {
			href: string;
			title: string;
		};
	};
	contentEditUrl: string;
}

export interface DocPageMetadata {
	/** organise this page in a group */
	group?: string;
	/** h1 on the page an title in SEO */
	title: string;
	/**
	 * should be detected from path
	 */
	slug: string;
}

export type AutoDetectedFields = 'slug';
export type PerDefinedDocPageMetadata = Omit<DocPageMetadata, AutoDetectedFields>;

export function defineDocPageMetadata(
	metadata: PerDefinedDocPageMetadata,
): PerDefinedDocPageMetadata {
	return metadata;
}
