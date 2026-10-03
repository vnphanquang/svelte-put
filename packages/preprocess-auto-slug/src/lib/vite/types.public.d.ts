import type { AutoSlugPreprocessorOptions } from '../preprocessor';

/**
 * options to config the vite plugin
 */
export interface AutoSlugViteOptions {
	/** what files the vite plugin should process, passed to Vite `transform.filter.id.include` */
	include?: FilterIdSpecs;
	/** what files the vite plugin should skip, passed to Vite `transform.filter.id.exclude` */
	exclude?: FilterIdSpecs;
	preprocessor?:
		| Omit<AutoSlugPreprocessorOptions, 'files'>
		| ((
				defaultOptions: Omit<DefaultAutoSlugPreprocessorOptions, 'files'>,
		  ) => Omit<AutoSlugPreprocessorOptions, 'files'>);
}

export type FilterIdSpecs = (string | RegExp)[] | string | RegExp;
