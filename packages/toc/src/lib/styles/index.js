/**
 * @param {number} index
 * @param {number} [id]
 * @returns {string}
 */
export function tocPositionValue(index, id) {
	if (id) {
		return `--toc-${id}-${index}`;
	}
	return `--toc-${index}`;
}
