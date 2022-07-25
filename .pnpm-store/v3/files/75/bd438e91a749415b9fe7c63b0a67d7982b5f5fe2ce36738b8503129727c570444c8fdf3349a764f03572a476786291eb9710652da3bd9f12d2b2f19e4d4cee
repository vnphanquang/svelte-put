import { getContext } from 'svelte';
import { browser } from './env.js';
import '../env.js';

// TODO remove this (for 1.0? after 1.0?)
let warned = false;
function stores() {
	if (!warned) {
		console.error('stores() is deprecated; use getStores() instead');
		warned = true;
	}
	return getStores();
}

/**
 * @type {import('$app/stores').getStores}
 */
const getStores = () => {
	const stores = getContext('__svelte__');

	return {
		page: {
			subscribe: stores.page.subscribe
		},
		navigating: {
			subscribe: stores.navigating.subscribe
		},
		// TODO remove this (for 1.0? after 1.0?)
		// @ts-expect-error - deprecated, not part of type definitions, but still callable
		get preloading() {
			console.error('stores.preloading is deprecated; use stores.navigating instead');
			return {
				subscribe: stores.navigating.subscribe
			};
		},
		session: stores.session,
		updated: stores.updated
	};
};

/** @type {typeof import('$app/stores').page} */
const page = {
	/** @param {(value: any) => void} fn */
	subscribe(fn) {
		const store = getStores().page;
		return store.subscribe(fn);
	}
};

/** @type {typeof import('$app/stores').navigating} */
const navigating = {
	subscribe(fn) {
		const store = getStores().navigating;
		return store.subscribe(fn);
	}
};

/** @param {string} verb */
const throw_error = (verb) => {
	throw new Error(
		browser
			? `Cannot ${verb} session store before subscribing`
			: `Can only ${verb} session store in browser`
	);
};

/** @type {typeof import('$app/stores').session} */
const session = {
	subscribe(fn) {
		const store = getStores().session;

		if (browser) {
			session.set = store.set;
			session.update = store.update;
		}

		return store.subscribe(fn);
	},
	set: () => throw_error('set'),
	update: () => throw_error('update')
};

/** @type {typeof import('$app/stores').updated} */
const updated = {
	subscribe(fn) {
		const store = getStores().updated;

		if (browser) {
			updated.check = store.check;
		}

		return store.subscribe(fn);
	},
	check: () => throw_error('check')
};

export { getStores, navigating, page, session, stores, updated };
