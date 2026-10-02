/* eslint-disable jsdoc/reject-any-type */

import fs from 'node:fs';
import path from 'node:path';

import { toHtml } from 'hast-util-to-html';
import debounce from 'lodash.debounce';
import { MagicString } from 'magic-string';
import { parse } from 'svelte/compiler';
import { parse as parseSvg } from 'svg-parser';
import { walk } from 'zimmerframe';

import {
	findSvgSrc,
	generateSourceTyping,
	getAttribute,
	matchFileExtension,
	resolveConfig,
	resolveSources,
} from './internals.js';

/**
 * create a preprocessor that inlines SVG from disk to source code at compile time
 * @param {import('./types.public').InlineSvgSource} source
 * @param {import('./types.public').InlineSvgConfig} config
 * @returns {import('vite').Plugin} - vite plugin that wraps a Svelte preprocessor
 */
export function inlineSvg(source, config) {
	const rConfig = resolveConfig(config);
	const rSources = resolveSources(source);

	/** @type {import('./types.public').FilterIdSpecs | null} */
	let svelteIdFilter = null;

	return {
		name: 'vite-plugin-svelte-preprocess-inline-svg',
		configResolved(c) {
			svelteIdFilter = c.plugins.find((p) => p.name === 'vite-plugin-svelte:config')?.api?.filter
				.id;
		},
		configureServer(server) {
			const root = server.config.root;

			const typedef =
				typeof rConfig.typedef === 'string'
					? rConfig.typedef
					: rConfig.typedef === true
						? path.resolve(root, 'src/preprocess-inline-svg.d.ts')
						: null;
			if (typedef) generateSourceTyping(rSources, rConfig, typedef);

			const reload = debounce(
				/**
				 * @param {string} file
				 * @param {boolean} [skip]
				 */
				(file, skip = false) => {
					if (matchFileExtension(file, ['.svg'])) {
						if (typedef && !skip) {
							generateSourceTyping(rSources, rConfig, typedef);
						}
						server.ws.send({ type: 'full-reload' });
						server.moduleGraph.invalidateAll();
					}
				},
			);

			const directories = [
				...rSources.local.directories,
				...rSources.dirs.flatMap((d) => d.directories),
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
			async handler(code, filename) {
				if (!filename || code.includes('<!-- ignore @svelte-put/preprocess-inline-svg -->')) return;
				const s = new MagicString(code);
				const ast = parse(code, { modern: true, filename });

				const { local, dirs } = rSources;
				const { inlineSrcAttributeName, keepInlineSrcAttribute } = rConfig;

				walk(
					/** @type {import('svelte/compiler').AST.RegularElement} */ (
						/** @type {unknown} */ (ast.fragment)
					),
					null,
					{
						RegularElement(node, { next }) {
							if (node.name !== 'svg') return next();
							let options = local;
							let inlineSrc = getAttribute(code, node, inlineSrcAttributeName);
							let svgSource = findSvgSrc(filename, options.directories, inlineSrc);
							if (!svgSource) {
								for (let i = 0; i < dirs.length; i++) {
									options = dirs[i];
									inlineSrc = getAttribute(code, node, inlineSrcAttributeName);
									svgSource = findSvgSrc(filename, options.directories, inlineSrc);
									if (svgSource) break;
								}
							}

							if (!inlineSrc) return;
							if (!svgSource) {
								throw new Error(
									`\n@svelte-put/inline-svg (preprocessor): cannot find svg source for ${inlineSrc} at ${filename}`,
								);
							}

							const hast = parseSvg(fs.readFileSync(svgSource, 'utf8'));
							const svg = /** @type {import('svg-parser').ElementNode} */ (hast.children[0]);

							const attributes = {
								...svg.properties,
								...options.attributes,
							};

							node.attributes.map((attr) => {
								if (attr.type === 'Attribute') {
									// remove the source attribute, unless instructed otherwise by global user config
									if (attr.name === inlineSrcAttributeName && !keepInlineSrcAttribute) {
										s.remove(attr.start, attr.end);
									}

									// if user specify an attribute, overwrite any existing one
									if (attributes[attr.name]) {
										delete attributes[attr.name];
									}
								}
							});

							for (const [name, value] of Object.entries(attributes)) {
								s.appendRight(node.start + '<svg'.length, ` ${name}="${value}" `);
							}

							let insertIndex = node.end - '/>'.length;
							if (s.slice(insertIndex, node.end) !== '/>') {
								insertIndex = node.end - '</svg>'.length;
							}

							const html = toHtml(/** @type {any} */ (svg.children), {
								allowDangerousCharacters: true,
							});
							s.update(insertIndex, node.end, `>${html}</svg>`);

							return;
						},
					},
				);

				return {
					code: s.toString(),
					map: s.generateMap({ hires: 'boundary', includeContent: true }),
				};
			},
		},
	};
}

export * from './types.public.js';
