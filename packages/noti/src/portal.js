/**
 * register an HTMLElement as the portal for the provided notification store
 * @param {HTMLElement} node
 * @param {import('./public').NotificationStore} store
 * @returns {import('./public').NotificationPortalActionReturn}
 */
export function portal(node, store) {
	store.portal = node;

	return {
		update(newStore) {
			store.portal = null;
			store = newStore;
			store.portal = node;
		},
		destroy() {
			store.portal = null;
		},
	};
}
