import MagicString from 'magic-string';
import { parse } from 'svelte-parse-markup';
import { walk } from 'zimmerframe';

/**
 * @typedef ComponentDefinition
 * @property {string} name - name of the component
 * @property {string} path - path to import component
 * @property {boolean} default - whether should import component from default export of module
 */

/**
 * @typedef ComponentsConfig
 * @property {ComponentDefinition} [one] - component for single code block
 * @property {ComponentDefinition} [group] - component for group of code blocks
 */

/**
 * @typedef EnhanceCodeBlockConfig
 * @property {ComponentsConfig} [components] - components to use for code blocks
 * @property {(filename?: string) => boolean} [files] - a function that returns true if the file should be processed. By defaults it will match files with `.md.svelte` extension
 * @property {string} [enhancedElement] - element name to search for and enhance. Default is `enhanced-code-block`
 */

const DEFAULT_CONFIG =
	/** @satisfies {Required<EnhanceCodeBlockConfig> & { components: Required<ComponentsConfig>}} */ ({
		components: {
			one: {
				name: 'EnhancedCodeBlock',
				path: '@svelte-put/preprocess-markdown/EnhancedCodeBlock.svelte',
				default: true,
			},
			group: {
				name: 'EnhancedCodeBlockGroup',
				path: '@svelte-put/preprocess-markdown/EnhancedCodeBlockGroup.svelte',
				default: true,
			},
		},
		files: (filename) => filename?.endsWith('.md.svelte') ?? false,
		enhancedElement: 'enhanced-code-block',
	});

let globalCounter = 0;

/**
 * @param {EnhanceCodeBlockConfig} [config]
 * @returns {import('svelte/compiler').PreprocessorGroup}
 */
export function enhanceCodeBlock(config = {}) {
	const { components, enhancedElement, files } = {
		...DEFAULT_CONFIG,
		...config,
		components: {
			...DEFAULT_CONFIG.components,
			...config.components,
		},
	};

	return {
		name: 'preprocess-markdown:enhance-code-block',
		markup({ content, filename }) {
			if (!files(filename)) return;

			const s = new MagicString(content);
			const ast = parse(content, { filename, modern: true });

			let isOneImported = new RegExp(`import\\s*{?\\s*${components.one.name}`).test(content);
			let isGroupImported = new RegExp(`import\\s*{?\\s*${components.group.name}`).test(content);

			/** @type {string[]} */
			const imports = [];
			/**
			 * @param {ComponentDefinition} component
			 */
			function addImport(component) {
				const nameSegment = component.default ? component.name : `{ ${component.name} }`;
				imports.push(`import ${nameSegment} from '${component.path}';`);
			}

			/**
			 * @param {any} node
			 * @param {ComponentDefinition} component
			 */
			function replaceNodeName(node, component) {
				s.update(node.start, node.start + enhancedElement.length + 1, '<' + component.name);

				s.update(node.end - enhancedElement.length - 1, node.end, component.name + '>');
			}

			walk(
				/** @type {import('svelte/compiler').ElementLike} */ (
					/** @type {unknown} */ (ast.fragment)
				),
				null,
				{
					RegularElement(node, { next }) {
						if (node.name !== enhancedElement) return next();

						const attributes = /** @type {import('svelte/compiler').Attribute[]} */ (
							node.attributes.filter((attr) => attr.type === 'Attribute')
						);

						const grouped = attributes.some((attr) => attr.name === 'group');

						if (grouped) {
							let additionalAttributes = '';

							// process "cols" attribute
							const colsAttr = attributes.find((attr) => attr.name === 'cols');
							if (!colsAttr) {
								const codeBlockChildren = node.fragment.nodes.filter(
									(n) =>
										(n.type === 'Component' && n.name === components.one.name) ||
										(n.type === 'RegularElement' && n.name === enhancedElement),
								);
								additionalAttributes = ` cols={${codeBlockChildren.length}}`;
							}

							// process "name" attribute
							const nameAttr = attributes.find((attr) => attr.name === 'name');
							if (!nameAttr) {
								let id = (++globalCounter).toString();
								if (crypto?.randomUUID) {
									id = crypto.randomUUID();
								}
								additionalAttributes += ` name="${id}"`;
							}

							s.appendLeft(node.start + enhancedElement.length, additionalAttributes);

							replaceNodeName(node, components.group);
							if (isGroupImported) return;
							addImport(components.group);
							isGroupImported = true;
						} else {
							replaceNodeName(node, components.one);
							if (isOneImported) return;
							addImport(components.one);
							isOneImported = true;
						}

						return next();
					},
				},
			);

			if (imports.length) {
				const importStatement = imports.join('\n');
				if (ast.module) {
					s.appendLeft(/** @type {any} */ (ast.module.content).start, importStatement);
				} else if (ast.instance) {
					s.appendLeft(/** @type {any} */ (ast.instance.content).start, importStatement);
				} else {
					s.append(`<script>${importStatement}</script>`);
				}
			}

			return {
				code: s.toString(),
				map: s.generateMap(),
			};
		},
	};
}

export default enhanceCodeBlock;
