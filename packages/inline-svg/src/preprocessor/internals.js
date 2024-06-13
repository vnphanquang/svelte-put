import fs from 'fs';
import path from 'path';

/**
 * @typedef ResolvedSourceDefinition
 * @property {string[]} directories - directories to search for SVG files
 * @property {Record<string, string>} attributes - HTML attributes to apply to SVG element
 */

/**
 * @typedef ResolvedSources
 * @property {ResolvedSourceDefinition} local - fallback definition
 * @property {ResolvedSourceDefinition[]} dirs - specific directories-based definitions
 */

/** @package */
export const DEFAULT_SOURCES_CONFIG = /** @satisfies {ResolvedSourceDefinition} */({
	directories: [],
	attributes: {},
});

/**
 * @param {import('./types').PreprocessorSourceDefinition} [options]
 * @returns {ResolvedSourceDefinition}
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
 * @param {import('./types').PreprocessorSourceDefinition | import('./types.d.ts').PreprocessorSourceDefinition[]} [sources]
 * @returns {ResolvedSources}
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
			'\n@svelte-put/inline-svg (preprocessor): only one default input (one without `directories` option) is allowed',
		);
	}

	return {
		local: resolveSourceOptions(inputsWithoutDirectories[0]),
		dirs: sources.filter((i) => !!i.directories).map(resolveSourceOptions),
	};
}

/**
 * @typedef {Required<import('./types.d.ts').PreprocessorConfig>} ResolvedPreprocessorConfig
 */

/** @package */
export const DEFAULT_INLINE_SVG_CONFIG = /** @type {ResolvedPreprocessorConfig} */({
	inlineSrcAttributeName: 'inline-src',
	keepInlineSrcAttribute: false,
});

/**
 * @param {import('./types.d.ts').PreprocessorConfig} [config]
 * @returns {ResolvedPreprocessorConfig}
 */
export function resolveConfig(config = {}) {
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
 */
export function findSvgSrc(filename, directories, inlineSrc) {
	/** @type {string | undefined} */
	let resolvedSrc = undefined;
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
