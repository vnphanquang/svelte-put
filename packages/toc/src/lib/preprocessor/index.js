import { MagicString } from 'magic-string';
import { parse } from 'svelte/compiler';

import { preprocessAnchor } from '../engine/anchor/preprocess.js';
import { preprocessCompileToc } from '../engine/compile-toc/preprocess/index.js';
import { preprocessIndex } from '../engine/index/preprocess/index.js';

import { resolvePreprocessorOptions } from './options.js';

export * from './types.public.js';

/** @import { TocPreprocessorOptions } from './types.public.js' */
/** @import { PreprocessorGroup } from 'svelte/compiler' */

/**
 * create a preprocessor that collects and transforms indexable contents for building table-of-contents
 * or internal content linking
 * @param {TocPreprocessorOptions} [options]
 * @returns {PreprocessorGroup}
 */
export function toc(options = {}) {
	const o = resolvePreprocessorOptions(options);
	return {
		name: 'preprocess-toc',
		markup({ content, filename }) {
			if (!o.files(filename) || content.includes('<!-- ignore @svelte-put/toc -->')) return;
			const s = new MagicString(content);
			const ast = parse(content, { modern: true, filename });

			// resolve id, if any
			const id = o.id?.({ filename });

			// 1. index content, find matching tags for Table-of-Contents
			const { items, nodes } = preprocessIndex({ s, ast, id, options: o.index, track: o.track });

			// 2. inject anchor tag, if instructed so
			if (o.anchor.enabled) {
				for (let i = 0; i < items.length; i++) {
					const item = items[i];
					const element = nodes[i];
					preprocessAnchor({ s, id, items, item, element, options: o.anchor });
				}
			}

			// 3. populate `copmileToc`, if used
			preprocessCompileToc({ items, ast, filename, s, options: o.compileToc });

			if (!s.hasChanged()) return;
			return {
				code: s.toString(),
				map: s.generateMap({
					source: filename,
					includeContent: true,
					hires: true,
				}),
			};
		},
	};
}
