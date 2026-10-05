import { MagicString } from 'magic-string';
import { parse } from 'svelte/compiler';

import { extractTocImport } from './transformers/extract-toc-import.js';
import { populateToc } from './transformers/populate-toc.js';
import { processTags } from './transformers/process-tags.js';
import { nodeWithPosition } from './utils/node-with-position.js';
import { resolveOptions } from './utils/resolve-options.js';

export * from './types.public.js';

/** @import { TocPreprocessorOptions } from './types.public.js' */
/** @import { PreprocessorGroup } from 'svelte/compiler' */

/**
 * create a preprocessor that searches for external links and add appropriate attributes
 * @param {TocPreprocessorOptions} [options]
 * @returns {PreprocessorGroup}
 */
export function toc(options = {}) {
	const o = resolveOptions(options);
	return {
		name: 'preprocess-toc',
		markup({ content, filename }) {
			if (!o.files(filename) || content.includes('<!-- ignore @svelte-put/toc -->')) return;
			const s = new MagicString(content);
			const ast = parse(content, { modern: true, filename });

			const items = processTags({ s, ast, ...o });
			const toc = { items };

			const names = extractTocImport({ s, ast, ...o });
			populateToc({ s, ast, names, toc });

			const shouldDeclare = o.autoDeclare.enabled(filename);
			if (shouldDeclare) {
				const declaration = `export const ${o.autoDeclare.identifier} = ${JSON.stringify(toc)}`;
				if (ast.module) {
					s.appendLeft(nodeWithPosition(ast.module.content).end, declaration);
				} else {
					s.prepend(`<script module>\n\t${declaration}\n</script>`);
				}
			}

			return {
				code: s.toString(),
				map: s.generateMap({ hires: 'boundary', includeContent: true }),
			};
		},
	};
}
