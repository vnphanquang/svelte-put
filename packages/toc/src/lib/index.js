/* eslint-disable jsdoc/require-returns-check */

/** @import { CompileTimeToc } from './types.public' */

/**
 * a marker for compile-time to collect for static table-of-contents entries from the same Svelte file,
 * for this to work, make sure the Vite plugin / Svelte preprocessor is set up correctly
 * @returns {CompileTimeToc[]}
 */
export function compileToc() {
	throw new Error(
		'This collectComptimeToc invocation was not processed at compile-time. Make sure the vite plugin / svelte preprocesor is set up correctly.',
	);
}

export * from './types.public.js';
