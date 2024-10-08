import fs from 'fs';

import { toHtml } from 'hast-util-to-html';
import MagicString from 'magic-string';
import { parse as parseSvelteMarkup } from 'svelte-parse-markup';
import { parse as parseSvg } from 'svg-parser';
import { walk } from 'zimmerframe';

import { findSvgSrc, getAttribute, resolveConfig, resolveSources } from './internals.js';

/**
 * @typedef ResolvedUserParameters
 * @property {import('./internals.js').ResolvedSources} sources - resolved sources parameter
 * @property {import('./internals.js').ResolvedPreprocessorConfig} config - resolved config parameter
 */

/**
 * create a preprocessor that inlines SVG from disk to source code at compile time
 * @param {import('./types.d.ts').PreprocessorSourceDefinition | import('./types.d.ts').PreprocessorSourceDefinition[]} [uSources] - sources to search for svg
 * @param {import('./types.d.ts').PreprocessorConfig} [uConfig] - global options to configure preprocessor input & output
 * @returns {import('svelte/compiler').PreprocessorGroup & { __params: ResolvedUserParameters }} - Svelte preprocessor interface
 */
export function inlineSvg(uSources, uConfig) {
	const config = resolveConfig(uConfig);
	const sources = resolveSources(uSources);
	return {
		__params: { config, sources },
		name: 'preprocess-inline-svg',
		markup({ content, filename }) {
			if (!filename) return;
			const { local, dirs } = sources;
			const { inlineSrcAttributeName, keepInlineSrcAttribute } = config;

			const s = new MagicString(content);
			const ast = parseSvelteMarkup(content, { filename, modern: true });

			walk(
				/** @type {import('svelte/compiler').AST.RegularElement} */ (
					/** @type {unknown} */ (ast.fragment)
				),
				null,
				{
					RegularElement(node, { next }) {
						if (node.name !== 'svg') return next();
						let options = local;
						let inlineSrc = getAttribute(content, node, inlineSrcAttributeName);
						let svgSource = findSvgSrc(filename, options.directories, inlineSrc);
						if (!svgSource) {
							for (let i = 0; i < dirs.length; i++) {
								options = dirs[i];
								inlineSrc = getAttribute(content, node, inlineSrcAttributeName);
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
				map: s.generateMap(),
			};
		},
	};
}

export default inlineSvg;
