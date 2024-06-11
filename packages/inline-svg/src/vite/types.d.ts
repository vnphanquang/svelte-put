import { PreprocessorConfig } from '../preprocessor/types';

/** configuration for the vite plugin that wraps inline-svg preprocessor */
export type VitePluginConfig = PreprocessorConfig & {
	/**
	 * output path for generated type definition for inline-src attribute.
	 * Defaults to `null` (no generation).
	 * Set to `true` to use the default `src/preprocess-inline-svg.d.ts` path.
	 */
	typedef?: string | null | true;
};
