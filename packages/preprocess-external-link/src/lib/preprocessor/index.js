import { MagicString } from 'magic-string';
import { parse } from 'svelte/compiler';
import { walk } from 'zimmerframe';

export * from './types.public.js';

/** @import { ExternalLinkPreprocessorOptions } from './types.public.js' */
/** @import { PreprocessorGroup, AST } from 'svelte/compiler' */

/**
 * create a preprocessor that searches for external links and add appropriate attributes
 * @param {ExternalLinkPreprocessorOptions | ExternalLinkPreprocessorOptions['hosts']} [input]
 * @returns {PreprocessorGroup}
 */
export function externalLink(input = {}) {
	const o = Array.isArray(input)
		? {
				...DEFAULT_EXTERNAL_LINK_CONFIG,
				hosts: [...DEFAULT_EXTERNAL_LINK_CONFIG.hosts, ...input],
			}
		: {
				hosts: [...DEFAULT_EXTERNAL_LINK_CONFIG.hosts, ...(input.hosts ?? [])],
				markerAttribute: input.markerAttribute || DEFAULT_EXTERNAL_LINK_CONFIG.markerAttribute,
				attributes: { ...DEFAULT_EXTERNAL_LINK_CONFIG.attributes, ...input.attributes },
				files: input.files || DEFAULT_EXTERNAL_LINK_CONFIG.files,
			};

	return {
		name: 'preprocess-auto-slug',
		markup({ content, filename }) {
			if (content.includes('<!-- ignore @svelte-put/preprocess-external-link -->')) return;
			const s = new MagicString(content);
			const ast = parse(content, { modern: true, filename });

			walk(/** @type {AST.RegularElement} */ (/** @type {unknown} */ (ast.fragment)), null, {
				RegularElement(node, { next }) {
					if (node.name !== 'a') return next();

					const attributes = /** @type {AST.Attribute[]} */ (
						node.attributes.filter((attr) => attr.type === 'Attribute')
					);

					let external = attributes.some(
						(attr) => attr.type === 'Attribute' && attr.name === o.markerAttribute,
					);
					if (!external) {
						const hrefAttr = attributes.find((attr) => attr.name === 'href');
						if (Array.isArray(hrefAttr?.value) && hrefAttr.value[0]?.type === 'Text') {
							const href = hrefAttr.value[0].raw;
							try {
								if (href.startsWith('mailto')) {
									external = true;
								} else if (href.startsWith('http')) {
									const url = new URL(href);
									external = !o.hosts.includes(url.hostname);
								}
							} catch (error) {
								console.error(
									'@svelte-put/external-link: error checking whether anchor tag is external:',
									error,
								);
							}
						}
					}

					const firstChild = node.fragment.nodes[0];
					if (external && firstChild) {
						let attrs = ' ';
						for (const [name, value] of Object.entries(o.attributes)) {
							if (attributes.every((attr) => attr.name !== name)) {
								attrs += `${name}="${value}"`;
							}
						}

						s.appendLeft(firstChild.start - 1, attrs);
					}
				},
			});

			return {
				code: s.toString(),
				map: s.generateMap({ hires: 'boundary', includeContent: true }),
			};
		},
	};
}

const DEFAULT_EXTERNAL_LINK_CONFIG = /** @satisfies {ExternalLinkPreprocessorOptions} */ ({
	hosts: ['localhost'],
	markerAttribute: 'data-external',
	attributes: { target: '_blank', rel: 'noopener noreferrer' },
	files: () => true,
});
