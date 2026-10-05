import { MagicString } from 'magic-string';
import { parse } from 'svelte/compiler';
import { walk } from 'zimmerframe';

export * from './types.public.js';

/** @import { TocPreprocessorOptions } from './types.public.js' */
/** @import { PreprocessorGroup, AST } from 'svelte/compiler' */

/**
 * create a preprocessor that searches for external links and add appropriate attributes
 * @param {TocPreprocessorOptions} [options]
 * @returns {PreprocessorGroup}
 */
export function toc(options = {}) {
	const o = { ...DEFAULT_TOC_OPTIONS, ...options };
	return {
		name: 'preprocess-toc',
		markup({ content, filename }) {
			if (!o.files(filename) || content.includes('<!-- ignore @svelte-put/toc -->')) return;
			const s = new MagicString(content);
			const ast = parse(content, { modern: true, filename });

			walk(/** @type {AST.RegularElement} */ (/** @type {unknown} */ (ast.fragment)), null, {
				// RegularElement(node, { next }) {
				// },
			});

			return {
				code: s.toString(),
				map: s.generateMap({ hires: 'boundary', includeContent: true }),
			};
		},
	};
}

const DEFAULT_TOC_OPTIONS = /** @satisfies {TocPreprocessorOptions} */ ({
	files: () => true,
});
