import MagicString from 'magic-string';
import { parse } from 'svelte-parse-markup';
import { walk } from 'zimmerframe';

/**
 * @typedef ExternalLinkConfig
 * @property {string[]} hosts - a list of hosts that, if href does NOT match, will be marked as external. `localhost` is already included
 * @property {(filename?: string) => boolean} [files] - a function that returns true if the file should be processed. By defaults it will matches
 * @property {string} [markerAttribute] a boolean attribute that explicitly marks the anchor tag as external to be processed. Defaults to `'data-external'`
 * @property {Record<string, string>} [attributes] - attributes to add to the anchor tag. Defaults to `{ target: '_blank', rel: 'noopener noreferrer' }`
 */

const DEFAULT_EXTERNAL_LINK_CONFIG = /** @satisfies {Required<ExternalLinkConfig>} */ ({
	hosts: ['localhost'],
	markerAttribute: 'data-external',
	attributes: { target: '_blank', rel: 'noopener noreferrer' },
	files: () => true,
});

/**
 * search for external links and add appropriate attributes
 * @param {ExternalLinkConfig | NonNullable<ExternalLinkConfig['hosts']>} config
 * @returns {import('svelte/compiler').PreprocessorGroup}
 */
export function externalLink(config) {
	/** @type {Required<ExternalLinkConfig>} */
	let rConfig;
	if (Array.isArray(config)) {
		rConfig = {
			...DEFAULT_EXTERNAL_LINK_CONFIG,
			hosts: [...DEFAULT_EXTERNAL_LINK_CONFIG.hosts, ...config],
		};
	} else {
		rConfig = {
			hosts: [...DEFAULT_EXTERNAL_LINK_CONFIG.hosts, ...config.hosts],
			markerAttribute: config.markerAttribute || DEFAULT_EXTERNAL_LINK_CONFIG.markerAttribute,
			attributes: { ...DEFAULT_EXTERNAL_LINK_CONFIG.attributes, ...config.attributes },
			files: config.files || DEFAULT_EXTERNAL_LINK_CONFIG.files,
		};
	}
	return {
		markup({ content, filename }) {
			if (!rConfig.files(filename)) return;

			const s = new MagicString(content);
			const ast = parse(content, { filename, modern: true });

			walk(
				/** @type {import('svelte/compiler').ElementLike} */ (
					/** @type {unknown} */ (ast.fragment)
				),
				null,
				{
					RegularElement(node, { next }) {
						if (node.name !== 'a') return next();

						const attributes = /** @type {import('svelte/compiler').Attribute[]} */ (
							node.attributes.filter((attr) => attr.type === 'Attribute')
						);

						let external = attributes.some(
							(attr) => attr.type === 'Attribute' && attr.name === rConfig.markerAttribute,
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
										external = !rConfig.hosts.includes(url.hostname);
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
							for (const [name, value] of Object.entries(rConfig.attributes)) {
								if (attributes.every((attr) => attr.name !== name)) {
									attrs += `${name}="${value}"`;
								}
							}

							s.appendLeft(firstChild.start - 1, attrs);
						}
					},
				},
			);

			return {
				code: s.toString(),
				map: s.generateMap(),
			};
		},
	};
}

export default externalLink;

// TODO: add unit tests
/**
 *<script>
 *	 const href = '/through/variable';
 *</script>
 *<a href="https://svelte-5-preview.vercel.app">Svelte 5 preview vercel</a>
 *<a href="https://svelte-put.vnphanquang.com">Home page</a>
 *<a href="http://localhost:4545">Localhost</a>
 *<a href="/">Root</a>
 *<a href="/relative">Root relative</a>
 *<a {href}>Through variable</a>
 *<a {href} data-external>Forced external</a>
 */
