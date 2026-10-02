import path from 'node:path';

import debounce from 'lodash.debounce';

import { inlineSvg as createPreprocessor } from '../preprocessor/index.js';

import { generateSourceTyping, matchFileExtension } from './internals.js';

/**
 * create a preprocessor that inlines SVG from disk to source code at compile time
 * @param {import('../preprocessor').InlineSvgSource} source
 * @param {import('./types.public').InlineSvgViteConfig} config
 * @returns {import('vite').Plugin} - vite plugin that wraps a Svelte preprocessor
 */
export function inlineSvg(source, config) {
	const preprocessor = createPreprocessor(source, config);

	/** @type {import('./types.public').FilterIdSpecs | null} */
	let svelteIdFilter = null;
	let typedef = config.typedef;

	return {
		name: 'vite-plugin-svelte-preprocess-inline-svg',
		configResolved(c) {
			svelteIdFilter = c.plugins.find((p) => p.name === 'vite-plugin-svelte:config')?.api?.filter
				.id;
		},
		configureServer(server) {
			const root = server.config.root;
			const { sources, config } = preprocessor.__params__;

			const rTypedef =
				typeof typedef === 'string'
					? typedef
					: typedef === true
						? path.resolve(root, 'src/preprocess-inline-svg.d.ts')
						: null;
			if (rTypedef) generateSourceTyping(sources, config, rTypedef);

			const reload = debounce(
				/**
				 * @param {string} file
				 * @param {boolean} [skip]
				 */
				(file, skip = false) => {
					if (matchFileExtension(file, ['.svg'])) {
						if (rTypedef && !skip) {
							generateSourceTyping(sources, config, rTypedef);
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
		transform: {
			/// reference: https://github.com/sveltejs/vite-plugin-svelte/blob/8d032b286f0e2374173258b9f1cbabc309fe0d3e/docs/advanced-usage.md#transform-svelte-files-with-vite-plugins
			order: 'pre',
			filter: {
				id: {
					include: config.include || svelteIdFilter || /\.svelte$/,
					exclude: config.exclude,
				},
			},
			async handler(content, filename) {
				return /** @type {import('vite').TransformResult} */ (
					preprocessor.markup?.({ content, filename })
				);
			},
		},
	};
}

export * from './types.public.js';
