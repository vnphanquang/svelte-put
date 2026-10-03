import BananaSlug from 'github-slugger';
import { MagicString } from 'magic-string';
import { parse } from 'svelte/compiler';
import { walk } from 'zimmerframe';

export * from './types.public.js';

/** @import { AutoSlugInput, DefaultAutoSlugPreprocessorOptions } from './types.public.js' */
/** @import { PreprocessorGroup, AST } from 'svelte/compiler' */
/** @import { Identifier, Literal } from 'estree' */

/**
 * create a preprocessor that slugifies matching elements in svelte markup
 * @param {AutoSlugInput} input
 * @returns {PreprocessorGroup}
 */
export function autoSlug(input = {}) {
	const userOptions = typeof input === 'function' ? input(DEFAULT_AUTO_SLUG_OPTIONS) : input;

	const options = {
		...DEFAULT_AUTO_SLUG_OPTIONS,
		...userOptions,
		anchor: {
			...DEFAULT_AUTO_SLUG_OPTIONS.anchor,
			...(userOptions.anchor !== false ? userOptions.anchor : { enabled: false }),
			properties: {
				...DEFAULT_AUTO_SLUG_OPTIONS.anchor.properties,
				...(userOptions.anchor ? userOptions.anchor.properties : {}),
			},
		},
	};

	return {
		name: 'preproocess-auto-slug',
		markup({ content, filename }) {
			if (content.includes('<!-- ignore @svelte-put/preprocess-auto-slug -->')) return;
			const slugger = new BananaSlug();
			const s = new MagicString(content);
			const ast = parse(content, { modern: true, filename });

			walk(/** @type {AST.RegularElement} */ (/** @type {unknown} */ (ast.fragment)), null, {
				RegularElement(node, { next }) {
					if (!options.tags.includes(node.name) || !node.fragment.nodes?.length) return next();

					/** @type {string} */
					let id;
					// find the id attribute (or as specified in user config), if any
					const idAttribute = /** @type {AST.Attribute | undefined} */ (
						node.attributes.find(
							(attr) => attr.type === 'Attribute' && attr.name === options.attributeName,
						)
					);
					if (idAttribute) {
						id = content.slice(
							idAttribute.start + options.attributeName.length + 1,
							idAttribute.end,
						);
						if (id.startsWith('"') && id.endsWith('"')) {
							id = id.slice(1, -1);
						}
					} else {
						// slugify content of node, whether it's literal or inside an expression
						// for example, `<h1>Hello {name}! {obj.key} {func()} {name === 'a' ? 1 : 2}</h1>`
						// should generate `Hello-name--obj-key-func-name-a-1-2` (Note: -- due to !)
						/** @type {string[]} */
						const chunks = [];
						walk(
							/** @type {Identifier | Literal | AST.Text} */ (
								/** @type {unknown} */ (node.fragment)
							),
							null,
							{
								Identifier(node) {
									const chunk = node.name.trim();
									if (chunk) chunks.push(chunk);
								},
								Literal(node) {
									const chunk = node.raw?.trim() ?? node.value?.toString() ?? '';
									if (chunk) chunks.push(chunk);
								},
								Text(node) {
									const chunk = node.raw.trim();
									if (chunk) chunks.push(chunk);
								},
							},
						);
						const nodeText = chunks.join(' ');
						const slug = slugger.slug(nodeText);
						id = options.slug({ generated: slug, nodeText, slugger });
						s.appendLeft(node.fragment.nodes[0].start - 1, ` ${options.attributeName}="${id}"`);
					}

					if (options.anchor.enabled) {
						/** @type {{ 'aria-hidden'?: string; tabindex?: string }}  */
						const properties = { ...options.anchor.properties };
						if (options.anchor.position === 'wrap') {
							delete properties['aria-hidden'];
							delete properties['tabindex'];
						}
						const inlineProperties = Object.entries(properties)
							.map(([key, value]) => `${key}="${value}"`)
							.join(' ');
						const href = options.anchor.href(id);
						const anchorOpening = `<a href="${href}" ${inlineProperties} data-auto-slug-anchor>`;
						const anchorClosing = '</a>';

						switch (options.anchor.position) {
							case 'before':
								s.appendLeft(
									node.start,
									`${anchorOpening}${options.anchor.content}${anchorClosing}`,
								);
								break;
							case 'prepend':
								s.appendRight(
									node.fragment.nodes[0].start,
									`${anchorOpening}${options.anchor.content}${anchorClosing}`,
								);
								break;
							case 'wrap':
								s.appendRight(node.fragment.nodes[0].start, anchorOpening).appendLeft(
									node.fragment.nodes[node.fragment.nodes.length - 1].end,
									anchorClosing,
								);
								break;
							case 'append':
								s.appendLeft(
									node.fragment.nodes[node.fragment.nodes.length - 1].end,
									`${anchorOpening}${options.anchor.content}${anchorClosing}`,
								);
								break;
							case 'after':
								s.appendRight(
									node.end,
									`${anchorOpening}${options.anchor.content}${anchorClosing}`,
								);
								break;
						}
						s.appendLeft(
							node.fragment.nodes[0].start - 1,
							` data-auto-slug-anchor-position=${options.anchor.position}`,
						);
					}

					// mark element with `data-autoslug` attribute
					// intended for `@svelte-put/toc` to skip anchor processing
					s.appendLeft(node.fragment.nodes[0].start - 1, ` data-auto-slug`);
				},
			});

			return {
				code: s.toString(),
				map: s.generateMap({ hires: 'boundary', includeContent: true }),
			};
		},
	};
}

const DEFAULT_AUTO_SLUG_OPTIONS = /** @satisfies {DefaultAutoSlugPreprocessorOptions} */ ({
	files: () => true,
	tags: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
	attributeName: 'id',
	slug: ({ generated }) => generated,
	anchor: {
		enabled: true,
		position: 'prepend',
		content: '#',
		properties: {
			'aria-hidden': 'true',
			tabindex: '-1',
		},
		href: (slug) => `#${slug}`,
	},
});
