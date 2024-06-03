import fs from 'fs';
import path from 'path';

import { toHtml } from 'hast-util-to-html';
import MagicString from 'magic-string';
import { parse as parseSvelteMarkup } from 'svelte-parse-markup';
import { parse as parseSvg } from 'svg-parser';
import { walk } from 'zimmerframe';

/**
 * @typedef {{ directories: string[]; attributes: Record<string, string> }} ResolvedSourceConfig
 */

/** @package */
export const DEFAULT_SOURCES_CONFIG = /** @satisfies {ResolvedSourceConfig} */({
	directories: [],
	attributes: {},
});

/**
 * @param {import('./types').SourceConfig} [options]
 * @returns {ResolvedSourceConfig}
 * @package
 */
function resolveSourceOptions(options) {
	return {
		directories: options?.directories
			? Array.isArray(options.directories)
				? options.directories
				: [options.directories]
			: DEFAULT_SOURCES_CONFIG.directories,
		attributes: options?.attributes
			? { ...DEFAULT_SOURCES_CONFIG.attributes, ...options.attributes }
			: DEFAULT_SOURCES_CONFIG.attributes,
	};
}

/**
 * resolve config input and search for a default
 * If none is found, use DEFAULT_SOURCES_CONFIG.
 * If multiple of such input are found, throw an error.
 * @param {import('./types').SourceConfig | import('./types').SourceConfig[]} [sources]
 * @returns {{ local: ResolvedSourceConfig; dirs: ResolvedSourceConfig[] }}
 * @package
 */
export function resolveSources(sources) {
	if (!sources) return { local: DEFAULT_SOURCES_CONFIG, dirs: [] };
	if (!Array.isArray(sources)) {
		if (!sources.directories) {
			return {
				local: resolveSourceOptions(sources),
				dirs: [],
			};
		}
		const dir = resolveSourceOptions(sources);
		const local = {
			...dir,
			directories: [],
		};
		return { local, dirs: [dir] };
	}

	const inputsWithoutDirectories = sources.filter((i) => !i.directories);
	if (inputsWithoutDirectories.length > 1) {
		throw new Error(
			'\n@svelte-put/preprocess-inline-svg: only one default input (one without `directories` option) is allowed',
		);
	}

	return {
		local: resolveSourceOptions(inputsWithoutDirectories[0]),
		dirs: sources.filter((i) => !!i.directories).map(resolveSourceOptions),
	};
}

/**
 * @typedef {Required<import('./types').InlineSvgConfig>} ResolvedInlineSvgConfig
 */

/** @package */
export const DEFAULT_INLINE_SVG_CONFIG = /** @type {ResolvedInlineSvgConfig} */({
	inlineSrcAttributeName: 'data-inline-src',
	keepInlineSrcAttribute: false,
});

/**
 * @package
 * @param {import('./types').InlineSvgConfig} [config]
 * @returns {ResolvedInlineSvgConfig}
 */
export function resolveInlineSvgConfig(config = {}) {
	return {
		inlineSrcAttributeName:
			config.inlineSrcAttributeName ?? DEFAULT_INLINE_SVG_CONFIG.inlineSrcAttributeName,
		keepInlineSrcAttribute:
			config.keepInlineSrcAttribute ?? DEFAULT_INLINE_SVG_CONFIG.keepInlineSrcAttribute,
	};
}

/**
 * @param {string} filename
 * @param {string[]} directories
 * @param {string} [inlineSrc]
 * @returns {string | undefined}
 * @package
 */
export function findSvgSrc(filename, directories, inlineSrc) {
	/** @type {string | undefined} */
	let resolvedSrc= undefined;
	if (inlineSrc) {
		if (!inlineSrc.endsWith('.svg')) inlineSrc += '.svg';
		if (directories.length === 0) {
			resolvedSrc = path.join(path.dirname(filename), inlineSrc);
			if (!fs.existsSync(resolvedSrc)) resolvedSrc = undefined;
		} else {
			for (const dir of directories) {
				resolvedSrc = path.join(dir, inlineSrc);
				if (!path.isAbsolute(resolvedSrc)) {
					resolvedSrc = path.join(process.cwd(), resolvedSrc);
				}
				if (fs.existsSync(resolvedSrc)) break;
				else resolvedSrc = undefined;
			}
		}
	}
	return resolvedSrc;
}

/**
 * @param {string} source
 * @param {import('svelte/compiler').RegularElement} node
 * @param {string} attributeName
 * @returns {string | undefined}
 */
export function getAttribute(source, node, attributeName) {
	const attr = /** @type {import('svelte/compiler').Attribute} */(node.attributes.find(
		(attr) => attr.type === 'Attribute' && attr.name === attributeName,
	));
	if (attr) {
		let raw = source.slice(attr.start + attributeName.length + 1, attr.end);
		if (raw.startsWith('"') && raw.endsWith('"')) {
			raw = raw.slice(1, -1);
		}
		return raw;
	}
}

/**
 * @param {string} code
 * @param {string} filename
 * @param {ReturnType<typeof resolveSources>} sources
 * @param {ResolvedInlineSvgConfig} config
 * @returns {ReturnType<import('svelte/compiler').MarkupPreprocessor>}
 */
export function transform(code, filename, sources, config) {
	const { local, dirs } = sources;
	const { inlineSrcAttributeName, keepInlineSrcAttribute } = config;

	const s = new MagicString(code);
	const ast = parseSvelteMarkup(code, { filename, modern: true });

	walk(/** @type {import('svelte/compiler').ElementLike} */(/** @type {unknown} */(ast.fragment)), null, {
		RegularElement(node) {
			if (node.name !== 'svg') return;
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
					`\n@svelte-put/preprocess-inline-svg: cannot find svg source for ${inlineSrc} at ${filename}`,
				);
			}

			const hast = parseSvg(fs.readFileSync(svgSource, 'utf8'));
			const svg = /** @type {import('svg-parser').ElementNode} */(hast.children[0]);

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

			const content = toHtml(/** @type {any} */(svg.children), {
				allowDangerousCharacters: true,
			});
			s.update(insertIndex, node.end, `>${content}</svg>`);

			return;
		},
	});

	return {
		code: s.toString(),
		map: s.generateMap(),
	};

}
