import type { InlineSvgPreprocessorConfig } from '../preprocessor';

export interface InlineSvgViteConfig extends InlineSvgPreprocessorConfig {
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
}

export type FilterIdSpecs = (string | RegExp)[] | string | RegExp;
