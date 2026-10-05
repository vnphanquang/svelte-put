import type { TocPreprocessorOptions } from '../preprocessor';

/**
 * options to config the vite plugin
 */
export interface TocViteOptions {
	/** what files the vite plugin should process, passed to Vite `transform.filter.id.include` */
	include?: FilterIdSpecs;
	/** what files the vite plugin should skip, passed to Vite `transform.filter.id.exclude` */
	exclude?: FilterIdSpecs;
	preprocessor?: TocPreprocessorOptions;
}

export type FilterIdSpecs = (string | RegExp)[] | string | RegExp;
