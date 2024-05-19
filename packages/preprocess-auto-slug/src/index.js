import BananaSlug from 'github-slugger';
import MagicString from 'magic-string';
import { parse as parseSvelteMarkup } from 'svelte-parse-markup';
import { walk } from 'zimmerframe';

/**
 * default options for auto-slug
 */
const DEFAULT_AUTO_SLUG_OPTIONS = /** @satisfies {import('./types').AutoSlugOptions} */({
	tags: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
	files: () => true,
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

/**
 * create a preprocessor that slugifies matching elements in svelte markup
 * @param {import('./types').AutoSlugInput} [input] - behavioral configurations
 * @returns {import('svelte/compiler').PreprocessorGroup} - svelte preprocessor interface
 */
export function autoSlug(input = {}) {
	const userOptions = typeof input === 'function' ? input(DEFAULT_AUTO_SLUG_OPTIONS) : input;

	/** @type {import('./types').AutoSlugOptions} */
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
		name: 'preprocess-auto-slug',
		markup({ content, filename }) {
			if (!options.files({ content, filename })) return;
			if (content.includes('<!-- ignore @svelte-put/preprocess-auto-slug -->')) return;
			const s = new MagicString(content);
			const ast = parseSvelteMarkup(content, { filename, modern: true });
			const slugger = new BananaSlug();

			walk(/** @type {import('svelte/compiler').ElementLike} */(/** @type {unknown} */(ast.fragment)), null, {
				RegularElement(node) {
					if (
						!options.tags.includes(node.name) ||
						!node.fragment.nodes?.length
					) return node;

					let id = '';
					// find the id attribute (or as specified in user config), if any
					const idAttribute = /** @type {import('svelte/compiler').Attribute | undefined} */(node.attributes.find(
						(attr) => attr.type === 'Attribute' && attr.name === options.attributeName
					));
					if (idAttribute) {
						id = content.slice(idAttribute.start + options.attributeName.length + 1, idAttribute.end);
						if (id.startsWith('"') && id.endsWith('"')) {
							id = id.slice(1, -1);
						}
					} else {
						// slugify content of node, whether it's literal or inside an expression
						// for example, `<h1>Hello {name}! {obj.key} {func()} {name === 'a' ? 1 : 2}</h1>`
						// should generate `Hello-name--obj-key-func-name-a-1-2` (Note: -- due to !)
						/** @type {string[]} */
						const chunks = [];
						walk(/** @type {import('estree').Identifier | import('estree').Literal | import('svelte/compiler').Text} */(/** @type {unknown} */(node.fragment)), null, {
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
						});
						const nodeText = chunks.join(' ');
						const slug = slugger.slug(nodeText);
						id = options.slug({ generated: slug, nodeText, slugger });
						s.appendLeft(node.fragment.nodes[0].start - 1, ` ${options.attributeName}="${id}"`)
					}

					if (options.anchor.enabled) {
						const properties = { ... options.anchor.properties };
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
				map: s.generateMap(),
			};
		},
	};
}

export default autoSlug;
