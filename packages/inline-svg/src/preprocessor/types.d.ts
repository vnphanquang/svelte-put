/**
 * sources for the inline svg
 */
export type PreprocessorSourceDefinition = {
	/**
	 * directories relative to which the svg source path will be resolved
	 */
	directories?: string[] | string;
	/**
	 * default attributes to add to the svg element, will override the attributes from the svg source,
	 * but be overridden by the attributes from the element itself (in svelte source)
	 */
	attributes?: Record<string, string>;
};

/**
 * global options for configuring behaviors of the inline-svg preprocessor
 */
export type PreprocessorConfig = {
	/** attribute to get the svg source from, default to `data-inline-src` */
	inlineSrcAttributeName?: string;
	/** whether to keep the inline src attribute after build, default to `false` */
	keepInlineSrcAttribute?: boolean;
};
