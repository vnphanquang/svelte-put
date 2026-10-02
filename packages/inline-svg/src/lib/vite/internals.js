import fs from 'node:fs';
import path from 'node:path';

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

export const DEFAULT_SOURCES_CONFIG = /** @satisfies {ResolvedSourceDefinition} */ ({
	directories: [],
	attributes: {},
});

/**
 * @param {import('./types.public').InlineSvgSourceDefinition} [options]
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
 * @param {import('./types.public').InlineSvgSourceDefinition | import('./types.public').InlineSvgSourceDefinition[]} [sources]
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
 * @typedef {Required<Omit<import('./types.public').InlineSvgConfig, 'include' | 'exclude'>>} ResolvedPreprocessorConfig
 */

export const DEFAULT_INLINE_SVG_CONFIG = /** @type {ResolvedPreprocessorConfig} */ ({
	inlineSrcAttributeName: 'inline-src',
	keepInlineSrcAttribute: false,
	typedef: null,
});

/**
 * @param {import('./types.public').InlineSvgConfig} [config]
 * @returns {ResolvedPreprocessorConfig}
 */
export function resolveConfig(config = {}) {
	return {
		typedef: config.typedef ?? DEFAULT_INLINE_SVG_CONFIG.typedef,
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
 * @param {import('svelte/compiler').AST.RegularElement} node
 * @param {string} attributeName
 * @returns {string | undefined}
 */
export function getAttribute(source, node, attributeName) {
	const attr = /** @type {import('svelte/compiler').AST.Attribute} */ (
		node.attributes.find((attr) => attr.type === 'Attribute' && attr.name === attributeName)
	);
	if (attr) {
		let raw = source.slice(attr.start + attributeName.length + 1, attr.end);
		if (raw.startsWith('"') && raw.endsWith('"')) {
			raw = raw.slice(1, -1);
		}
		return raw;
	}
}

/**
 * @param {string} dir
 * @returns {string[]}
 */
function findSvgRecursively(dir) {
	/** find all svg files in provided directory */
	const files = fs
		.readdirSync(dir)
		.map((f) => path.join(dir, f))
		.filter((f) => {
			const stat = fs.statSync(f);
			if (stat.isDirectory()) return true;
			if (stat.isFile()) return f.endsWith('.svg');
			return false;
		});
	/** find all svg files in sub directories */
	const directories = files.filter((f) => fs.statSync(f).isDirectory());
	const subFiles = directories.flatMap(findSvgRecursively);
	return [...files, ...subFiles];
}

/**
 * @param {ResolvedSources} sources
 * @param {ResolvedPreprocessorConfig} config
 * @param {string} out - output path
 */
export function generateSourceTyping(sources, config, out) {
	try {
		const { local, dirs } = sources;
		const directories = [...local.directories, ...dirs.flatMap((d) => d.directories)];
		/** @type {Set<string>} */
		const svgs = new Set();
		for (const dir of directories) {
			const files = findSvgRecursively(dir);
			for (const file of files) {
				const svg = path.posix.relative(dir, file).replace('.svg', '');
				svgs.add(`'${svg}'`);
			}
		}
		const indent = '\t\t\t';
		const nonTyped = ['`./${string}`', '`../${string}`'].join(`\n${indent}| `);
		const typing = Array.from(svgs).join(`\n${indent}| `);

		const source = `/** DO NOT EDIT! This file is generated by @svelte-put/inline-svg vite plugin */
declare module 'svelte/elements' {
	export interface SVGAttributes {
		'${config.inlineSrcAttributeName}'?:\n${indent}| ${nonTyped}\n${indent}| ${typing};
	}
}
export {};
`;

		fs.writeFileSync(out, source);
	} catch (error) {
		console.error('[vite-plugin-svelte-preprocess-inline-svg]', error);
	}
}

/**
 *
 * @param {string} file
 * @param {string[]} extensions
 * @returns {boolean}
 */
export function matchFileExtension(file, extensions) {
	return extensions.some((ext) => file.endsWith(ext));
}
