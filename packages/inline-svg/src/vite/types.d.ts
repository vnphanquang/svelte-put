import { PreprocessorConfig } from '../preprocessor/types';

/** configuration for the vite plugin that wraps inline-svg preprocessor */
export type VitePluginConfig = PreprocessorConfig & {
	/**
	 * output path for generated type definition for `static-src` attribute. Defaults to `null` (no generation)
	 */
	typedef?: string | null;
}
