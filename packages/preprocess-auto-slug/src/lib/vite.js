import BananaSlug from 'github-slugger';
import { MagicString } from 'magic-string';
import { parse } from 'svelte/compiler';
import { walk } from 'zimmerframe';

const DEFAULT_AUTO_SLUG_OPTIONS =
	/** @satisfies {import('./types.public').DefaultAutoSlugOptions} */ ({
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

/**
 * create a preprocessor that slugifies matching elements in svelte markup
 * @param {import('./types.public').AutoSlugInput} [input] - behavioral configurations
 * @returns {import('vite').Plugin} - vite plugin that wraps a Svelte preprocessor
 */
export function autoSlug(input = {}) {
	const userOptions = typeof input === 'function' ? input(DEFAULT_AUTO_SLUG_OPTIONS) : input;
	/** @type {import('./types.public').FilterIdSpecs | null} */
	let svelteIdFilter = null;

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
		name: 'vite-plugin-svelte-preprocess-auto-slug',
		configResolved(c) {
			svelteIdFilter = c.plugins.find((p) => p.name === 'vite-plugin-svelte:config')?.api?.filter
				.id;
		},

		transform: {
			/// reference: https://github.com/sveltejs/vite-plugin-svelte/blob/8d032b286f0e2374173258b9f1cbabc309fe0d3e/docs/advanced-usage.md#transform-svelte-files-with-vite-plugins
			order: 'pre',
			filter: {
				id: {
					include: options.include || svelteIdFilter || /\.svelte$/,
					exclude: options.exclude,
				},
			},
			async handler(code, filename) {
				if (code.includes('<!-- ignore @svelte-put/preprocess-auto-slug -->')) return;
				const slugger = new BananaSlug();
				const s = new MagicString(code);
				const ast = parse(code, { modern: true, filename });

				walk(
					/** @type {import('svelte/compiler').AST.RegularElement} */ (
						/** @type {unknown} */ (ast.fragment)
					),
					null,
					{
						RegularElement(node, { next }) {
							if (!options.tags.includes(node.name) || !node.fragment.nodes?.length) return next();

							/** @type {string} */
							let id;
							// find the id attribute (or as specified in user config), if any
							const idAttribute =
								/** @type {import('svelte/compiler').AST.Attribute | undefined} */ (
									node.attributes.find(
										(attr) => attr.type === 'Attribute' && attr.name === options.attributeName,
									)
								);
							if (idAttribute) {
								id = code.slice(
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
									/** @type {import('estree').Identifier | import('estree').Literal | import('svelte/compiler').AST.Text} */ (
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
					},
				);

				return {
					code: s.toString(),
					map: s.generateMap({ hires: 'boundary', includeContent: true }),
				};
			},
		},
	};
}
