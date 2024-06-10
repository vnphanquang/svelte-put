import path from 'path';

import debounce from 'lodash.debounce';

import { preprocessor } from '../preprocessor/index.js';
import { resolveInlineSvgConfig, resolveSources } from '../preprocessor/internals.js';

import { generateSourceTyping, matchFileExtension } from './internals.js';

/**
 * create a Vite plugin that wraps a Svelte preprocessor to
 * inline SVG from disk to source code at compile time
 * @param {import('../preprocessor/types.d.ts').PreprocessorSourceDefinition[]} [sources]
 * @param {import('./types.d.ts').VitePluginConfig} [config]
 * @returns {import('vite').Plugin}
 */
export function inlineSvg(sources, config) {
	const { typedef, ...pConfig } = config ?? {};
	const rConfig = resolveInlineSvgConfig(pConfig);
	const rSources = resolveSources(sources);
	return {
		name: 'vite-plugin-svelte-preprocess-inline-svg',
		api: {
			sveltePreprocess: preprocessor(rSources, rConfig),
		},
		enforce: 'pre',
		configureServer(server) {
			const root = server.config.root;
			const rTypedef = typeof typedef === 'string'
				? typedef
				: typedef === true
					? path.resolve(root, 'src/preprocess-inline-svg.d.ts')
					: null

			if (rTypedef) {
				generateSourceTyping(rSources, rConfig, rTypedef);

				const updateSourceTyping = debounce(() => {
					generateSourceTyping(rSources, rConfig, rTypedef);
					server.ws.send({ type: 'full-reload' });
				});

				const directories = [...rSources.local.directories, ...rSources.dirs.flatMap((d) => d.directories)];

				server.watcher.add(directories.map((dir) => `${dir}/**/*.svg`));
				server.watcher.on('add', (file) => {
					if (matchFileExtension(file, ['.svg'])) {
						updateSourceTyping();
					}
				});
				server.watcher.on('unlink', (file) => {
					if (matchFileExtension(file, ['.svg'])) {
						updateSourceTyping();
					}
				});
				server.watcher.on('change', (file) => {
					if (matchFileExtension(file, ['.svg'])) {
						server.ws.send({ type: 'full-reload' });
					}
				});
			}
		}
	};
}

export default inlineSvg;
