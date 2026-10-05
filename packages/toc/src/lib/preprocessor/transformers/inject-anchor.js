/** @import { MagicString } from 'magic-string' */
/** @import { AST } from 'svelte/compiler' */
/** @import { TocPreprocessorAnchorOptions } from '../types.public' */

/**
 * @param {MagicString} s
 * @param {AST.RegularElement} element
 * @param {string} id
 * @param {Required<Omit<TocPreprocessorAnchorOptions, 'properties'>> & { properties: Record<string, string>}} options
 * @returns {void}
 */
export function injectAnchor(s, element, id, options) {
	if (!options.enabled) return;

	/** @type {{ 'aria-hidden'?: string; tabindex?: string }}  */
	const properties = { ...options.properties };
	if (options.position === 'wrap') {
		delete properties['aria-hidden'];
		delete properties['tabindex'];
	}
	const inlineProperties = Object.entries(properties)
		.map(([key, value]) => `${key}="${value}"`)
		.join(' ');
	const href = options.href(id);
	const anchorOpening = `<a href="${href}" ${inlineProperties}>`;
	const anchorClosing = '</a>';

	switch (options.position) {
		case 'before':
			s.appendLeft(element.start, `${anchorOpening}${options.content}${anchorClosing}`);
			break;
		case 'prepend':
			s.appendRight(
				element.fragment.nodes[0].start,
				`${anchorOpening}${options.content}${anchorClosing}`,
			);
			break;
		case 'wrap':
			s.appendRight(element.fragment.nodes[0].start, anchorOpening).appendLeft(
				element.fragment.nodes[element.fragment.nodes.length - 1].end,
				anchorClosing,
			);
			break;
		case 'append':
			s.appendLeft(
				element.fragment.nodes[element.fragment.nodes.length - 1].end,
				`${anchorOpening}${options.content}${anchorClosing}`,
			);
			break;
		case 'after':
			s.appendRight(element.end, `${anchorOpening}${options.content}${anchorClosing}`);
			break;
	}
	s.appendLeft(element.fragment.nodes[0].start - 1, ` data-anchor=${options.position}`);
}
