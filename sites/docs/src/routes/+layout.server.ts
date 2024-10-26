import type { LayoutServerLoad } from './$types';

export const prerender = true;
export const load: LayoutServerLoad = ({ url, locals }) => {
	return {
		pathname: url.pathname, // to trigger when pathname changes
		settings: locals.settings,
	};
};
