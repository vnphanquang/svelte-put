import { TocItem } from '../toc';

/**
 * Table-of-Contents data collected at compile time within a Svelte file
 */
export interface CompileTimeToc {
	items: Map<string, TocItem>;
}
