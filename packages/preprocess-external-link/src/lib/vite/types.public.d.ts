import type { ExternalLinkPreprocessorOptions } from '../preprocessor';

/**
 * options to config the vite plugin
 */
export interface ExternalLinkViteOptions {
	/** what files the vite plugin should process, passed to Vite `transform.filter.id.include` */
	include?: FilterIdSpecs;
	/** what files the vite plugin should skip, passed to Vite `transform.filter.id.exclude` */
	exclude?: FilterIdSpecs;
	preprocessor?:
		ExternalLinkPreprocessorOptions['hosts'] | Omit<ExternalLinkPreprocessorOptions, 'files'>;
}

export type FilterIdSpecs = (string | RegExp)[] | string | RegExp;
