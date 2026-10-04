declare module '@svelte-put/preprocess-external-link' {
	import type { Plugin } from 'vite';
	/**
	 * create a Vite plugin wrapping a preprocessor that searches for external links and adds appropriate attributes
	 * @param input - behavioral configurations
	 * @returns - vite plugin that wraps a Svelte preprocessor
	 */
	export function externalLink(
		input?: ExternalLinkViteOptions | ExternalLinkPreprocessorOptions['hosts'],
	): Plugin;
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
	type ExternalLinkPreprocessorOptions = {
		/**
		 * a function that returns true if the file should be processed, process all files by default
		 */
		files?: (filename?: string) => boolean;
		/**
		 * a list of hosts that, if href does NOT match, will be marked as external
		 * `localhost` is always included
		 */
		hosts?: string[];
		/**
		 * a boolean attribute that explicitly marks the anchor tag as external to be processed
		 * @default 'data-external'
		 */
		markerAttribute?: string;
		/**
		 * attributes to add to the anchor tag. Note that when specified, attributes are replaced, not merged
		 * @default { target: '_blank', rel: 'noopener noreferrer' }
		 */
		attributes?: Record<string, string>;
	};

	export {};
}

declare module '@svelte-put/preprocess-external-link/preprocessor' {
	import type { PreprocessorGroup } from 'svelte/compiler';
	/**
	 * create a preprocessor that searches for external links and add appropriate attributes
	 * */
	export function externalLink(
		input?: ExternalLinkPreprocessorOptions | ExternalLinkPreprocessorOptions['hosts'],
	): PreprocessorGroup;
	export type ExternalLinkPreprocessorOptions = {
		/**
		 * a function that returns true if the file should be processed, process all files by default
		 */
		files?: (filename?: string) => boolean;
		/**
		 * a list of hosts that, if href does NOT match, will be marked as external
		 * `localhost` is always included
		 */
		hosts?: string[];
		/**
		 * a boolean attribute that explicitly marks the anchor tag as external to be processed
		 * @default 'data-external'
		 */
		markerAttribute?: string;
		/**
		 * attributes to add to the anchor tag. Note that when specified, attributes are replaced, not merged
		 * @default { target: '_blank', rel: 'noopener noreferrer' }
		 */
		attributes?: Record<string, string>;
	};

	export {};
}

//# sourceMappingURL=index.d.ts.map
