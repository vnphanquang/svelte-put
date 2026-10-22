import type { CompileTimeToc } from '@svelte-put/toc';

export interface RelativeDocPageNav {
	previous?: {
		title: string;
		slug: string;
		href: string;
	};
	next?: {
		title: string;
		slug: string;
		href: string;
	};
}

export interface DocPage {
	metadata: DocPageMetadata;
	nav: RelativeDocPageNav & {
		toc: CompileTimeToc;
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
