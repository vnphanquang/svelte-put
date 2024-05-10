/**
 * @template {any[]} Args
 * @template {(...args: Args) => void} Func
 * @param {Func} callback
 * @param {number} ms
 * @returns {(...args: Args) => void}
 */
export function debounce(callback, ms) {
	/** @type {ReturnType<typeof setTimeout>} */
	let timeoutId;
	/**
	 * @param {Args} args
	 */
	return function (...args) {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			callback.apply(null, args);
		}, ms);
	};
}

/**
 * @template {import('./public').TooltipComponentBaseProps} Props
 * @param {import('./public').TooltipContent<Props>} content
 * @returns {content is (import('svelte').ComponentType<import('svelte').SvelteComponent<Props>>)}
 */
export function isContentConfigDirectComponent(content) {
	return typeof content !== 'string' && !('component' in content);
}
