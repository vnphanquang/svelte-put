/**
 * lock scroll within the given node
 * @param {HTMLElement} node
 * @param {import('./types.public').LockScrollParameter} param
 * @returns {import('./types.public').LockScrollActionReturn}
 */
export function lockscroll(node, param) {
	let locked = false;

	if (node.isSameNode(document)) {
		node = document.documentElement;
	}

	function lock() {
		const scrollBarWidth = window.innerWidth - document.body.clientWidth;
		node.style.paddingRight = `${scrollBarWidth}px`;
		node.style.overflow = 'hidden';
	}

	function unlock() {
		node.style.overflow = '';
		node.style.paddingRight = '';
	}

	/** @param {boolean} _locked */
	function updateLockState(_locked) {
		if (_locked !== locked) {
			locked = _locked;
			locked ? lock() : unlock();
			node.dispatchEvent(new CustomEvent('lockscrolltoggle', { detail: { locked } }));
		}
	}

	updateLockState(param);

	return {
		update(update) {
			updateLockState(update);
		},
	};
}

