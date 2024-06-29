import { getContext, setContext, hasContext } from 'svelte';

/**
 * @typedef EnhancedCodeBlockGroupContextInit
 * @property {string} id - unique id to identify this context
 * @property {string} name - name for the code block group, mapped to the checkbox input `name` field
 * @property {import('./types.d.ts').EnhancedCodeBlockGroupProps['display']} display - display mode of the code block group
 * @property {string} [title] - initial code block identifier to display
 */

export class EnhancedCodeBlockGroupContext {
	static KEY = 'enhanced:codeblock:group';

	/** @type {HTMLElement | undefined} */
	node;

	/** @type {EnhancedCodeBlockGroupContextInit} */
	#init

	/**
	 * Caution: expect init.title to be in a "writable closure"
	 * @param {EnhancedCodeBlockGroupContextInit} init
	 */
	constructor(init) {
		this.#init = init;
	}

	get id() {
		return this.#init.id;
	}

	get name() {
		return this.#init.name;
	}

	get display() {
		return this.#init.display;
	}

	/** @returns {string | undefined} */
	get title() {
		return this.#init.title;
	}

	/** @param {string} title */
	set title(title) {
		this.#init.title = title;
	}

	/**
	 * @param {EnhancedCodeBlockGroupContextInit} init
	 * @returns {EnhancedCodeBlockGroupContext}
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

