import fs from 'fs';
import path from 'path';

/**
 * @typedef {{ directories: string[]; attributes: Record<string, string> }} ResolvedSourceConfig
 */

/** @package */
export const DEFAULT_SOURCES_CONFIG = /** @satisfies {ResolvedSourceConfig} */({
	directories: [],
	attributes: {},
});

/**
 * @param {import('./types.d.ts').SourceConfig} [options]
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
 * @param {import('./types.d.ts').SourceConfig | import('./types.d.ts').SourceConfig[]} [sources]
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
 * @typedef {Required<import('./types.d.ts').InlineSvgConfig>} ResolvedInlineSvgConfig
 */

/** @package */
export const DEFAULT_INLINE_SVG_CONFIG = /** @type {ResolvedInlineSvgConfig} */({
	inlineSrcAttributeName: 'data-inline-src',
	keepInlineSrcAttribute: false,
});

/**
 * @package
 * @param {import('./types.d.ts').InlineSvgConfig} [config]
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
