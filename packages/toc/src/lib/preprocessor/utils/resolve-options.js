/** @import { TocPreprocessorOptions } from '../types.public' */
/** @import { ResolvedOptions } from '../types.private' */

/**
 * @param {TocPreprocessorOptions} [options]
 * @returns {ResolvedOptions}
 */
export function resolveOptions(options = {}) {
	/** @type {ResolvedOptions['anchor']} */
	let anchor = { ...DEFAULT_TOC_OPTIONS.anchor };
	if (options.anchor === false) {
		anchor.enabled = false;
	} else if (options.anchor) {
		anchor = {
			...anchor,
			...options.anchor,
			properties:
				typeof options.anchor.properties === 'function'
					? options.anchor.properties(anchor.properties)
					: (options.anchor.properties ?? anchor.properties),
		};
	}

	/** @type {ResolvedOptions['autoDeclare']} */
	let autoDeclare = { ...DEFAULT_TOC_OPTIONS.autoDeclare };
	if (options.autoDeclare) {
		if (options.autoDeclare === true) {
			autoDeclare.enabled = () => true;
		} else if (options.autoDeclare.enabled) {
			const enabled = options.autoDeclare.enabled;
			autoDeclare = {
				...autoDeclare,
				...options.autoDeclare,
				enabled: typeof enabled === 'function' ? enabled : () => enabled,
			};
		}
	}

	return {
		files: options.files ?? DEFAULT_TOC_OPTIONS.files,
		tags: options.tags ?? DEFAULT_TOC_OPTIONS.tags,
		idAttribute: options.idAttribute ?? DEFAULT_TOC_OPTIONS.idAttribute,
		slug: options.slug ?? DEFAULT_TOC_OPTIONS.slug,
		importSource: options.importSource ?? DEFAULT_TOC_OPTIONS.importSource,
		anchor,
		autoDeclare,
	};
}

const DEFAULT_TOC_OPTIONS = /** @satisfies {TocPreprocessorOptions} */ ({
	files: () => true,
	tags: ['h2', 'h3', 'h4', 'h5', 'h6'],
	idAttribute: 'id',
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
	importSource: '@svelte-put/toc',
	autoDeclare: {
		enabled: () => false,
		identifier: 'toc',
	},
});
