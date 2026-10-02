export interface InlineSvgConfig {
	/** what files the vite plugin should process, passed to Vite `transform.filter.id.include` */
	include?: FilterIdSpecs;
	/** what files the vite plugin should skip, passed to Vite `transform.filter.id.exclude` */
	exclude?: FilterIdSpecs;
	/**
	 * output path for generated type definition for inline-src attribute.
	 * Defaults to `null` (no generation).
	 * Set to `true` to use the default `src/preprocess-inline-svg.d.ts` path.
	 */
	typedef?: string | null | true;
	/** attribute to get the svg source from, default to `inline-src` */
	inlineSrcAttributeName?: string;
	/** whether to keep the inline src attribute after compilation, default to `false` */
	keepInlineSrcAttribute?: boolean;
}

export type InlineSvgSource = InlineSvgSourceDefinition | InlineSvgSourceDefinition[];

/** sources for the inline svg */
export type InlineSvgSourceDefinition = {
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

export type FilterIdSpecs = (string | RegExp)[] | string | RegExp;
