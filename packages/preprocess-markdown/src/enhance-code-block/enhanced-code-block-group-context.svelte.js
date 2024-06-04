import { getContext, setContext, hasContext } from 'svelte';

/**
 * @typedef EnhancedCodeBlockGroupContextInit
 * @property {string} name - name for the code block group, mapped to the checkbox input `name` field
 * @property {import('./types.d.ts').EnhancedCodeBlockGroupProps['display']} display - display mode of the code block group
 * @property {string} [title] - initial code block identifier to display
 */

export class EnhancedCodeBlockGroupContext {
	static KEY = 'enhanced:codeblock:group';

	// eslint-disable-next-line no-undef
	name = $state('');
	/** @type {import('./types.d.ts').EnhancedCodeBlockGroupProps['display']} */
	// eslint-disable-next-line no-undef
	display = $state('files');
	/** @type {string | undefined} */
	// eslint-disable-next-line no-undef
	title = $state(undefined);

	/**
	 * @param {EnhancedCodeBlockGroupContextInit} init
	 */
	constructor(init) {
		this.name = init.name;
		this.display = init.display;
		this.title = init.title;
	}

	/**
	 * @param {EnhancedCodeBlockGroupContextInit} init
	 * @returns {EnhancedCodeBlockGroupContext| null}
	 */
	static set(init) {
		return setContext(EnhancedCodeBlockGroupContext.KEY, new EnhancedCodeBlockGroupContext(init));
	}

	/**
	 * @returns {EnhancedCodeBlockGroupContext | null}
	 */
	static get() {
		if (!hasContext(EnhancedCodeBlockGroupContext.KEY)) return null;
		return getContext(EnhancedCodeBlockGroupContext.KEY);
	}
}
