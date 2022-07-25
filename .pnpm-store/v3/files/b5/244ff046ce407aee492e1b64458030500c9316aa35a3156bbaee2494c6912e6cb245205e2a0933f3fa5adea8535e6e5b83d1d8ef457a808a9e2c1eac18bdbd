import { client } from '../client/singletons.js';

/**
 * @param {string} name
 */
function guard(name) {
	return () => {
		throw new Error(`Cannot call ${name}(...) on the server`);
	};
}

const ssr = import.meta.env.SSR;

const disableScrollHandling = ssr
	? guard('disableScrollHandling')
	: client.disable_scroll_handling;
const goto = ssr ? guard('goto') : client.goto;
const invalidate = ssr ? guard('invalidate') : client.invalidate;
const prefetch = ssr ? guard('prefetch') : client.prefetch;
const prefetchRoutes = ssr ? guard('prefetchRoutes') : client.prefetch_routes;
const beforeNavigate = ssr ? () => {} : client.before_navigate;
const afterNavigate = ssr ? () => {} : client.after_navigate;

export { afterNavigate, beforeNavigate, disableScrollHandling, goto, invalidate, prefetch, prefetchRoutes };
