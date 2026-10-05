/**
 * Table-of-Contents data collected at compile time within a Svelte file
 */
export interface CompileTimeToc {
	items: CompileTimeTocItem[];
}

export interface CompileTimeTocItem {
	/**
	 * the slug of the item, typically the value of the id attribute, unless configured
	 * differently in the preprocessor options
	 */
	id: string;
	/**
	 * text content of the matching node
	 */
	text: string;
	/**
	 * tag name of the matching node, typically a heading element, unless configured
	 * differently in the preprocesor options
	 */
	tag: string;
}
