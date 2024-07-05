import path from 'path';

import debounce from 'lodash.debounce';

import { inlineSvg as preprocessor } from '../preprocessor/index.js';

import { generateSourceTyping, matchFileExtension } from './internals.js';

/**
 * create a Vite plugin that wraps a Svelte preprocessor to
 * inline SVG from disk to source code at compile time
 * @param {import('../preprocessor/public').PreprocessorSourceDefinition | import('../preprocessor/public').PreprocessorSourceDefinition[]} [uSources]
 * @param {import('./public').VitePluginConfig} [uConfig]
 * @returns {import('vite').Plugin}
 */
export function inlineSvg(uSources, uConfig) {
	const { __params, ...sveltePreprocess } = preprocessor(uSources, uConfig);
	const { config, sources } = __params;
	return {
		name: 'vite-plugin-svelte-preprocess-inline-svg',
		api: { sveltePreprocess },
		enforce: 'pre',
		configureServer(server) {
			const root = server.config.root;

			const iTypedef = uConfig?.typedef;
			const typedef =
				typeof iTypedef === 'string'
					? iTypedef
					: iTypedef === true
						? path.resolve(root, 'src/preprocess-inline-svg.d.ts')
						: null;
			if (typedef) generateSourceTyping(sources, config, typedef);

			const reload = debounce(
				/**
				 * @param {string} file
				 * @param {boolean} [skip]
				 */
				(file, skip = false) => {
					if (matchFileExtension(file, ['.svg'])) {
						if (typedef && !skip) {
							generateSourceTyping(sources, config, typedef);
						}
						server.ws.send({ type: 'full-reload' });
						server.moduleGraph.invalidateAll();
					}
				},
			);

			const directories = [
				...sources.local.directories,
				...sources.dirs.flatMap((d) => d.directories),
			];
			server.watcher.add(directories);

			server.watcher
				.on('add', (file) => {
					reload(file);
				})
				.on('unlink', (file) => {
					reload(file);
				})
				.on('change', (file) => {
					reload(file, true);
				});
		},
	};
}

export default inlineSvg;
export * from './public.js';

