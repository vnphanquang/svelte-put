/**
 * See public typing in action.d.ts
 * @template {import('./types.public').Preaction} Preaction
 * @param {Preaction} preaction
 * @returns {Preaction}
 */
export function make(preaction) {
	preaction.__preaction__ = true;
	// Returning the wrong type here to support editor tooling
	// while it should be handled at compile time by the `preaction` preprocessor
	return preaction;
}

/** See public typing in action.d.ts */
export function apply() {
	// This codeblock should only run if the preprocessor was not set up correctly
	throw new Error(
		`import('@svelte-put/preaction).preaction must be set up in "preprocess" option of your "svelte.config.js"`,
	);
}

