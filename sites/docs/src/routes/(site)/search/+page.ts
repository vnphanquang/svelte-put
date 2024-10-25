import type { PageLoad } from './$types';

export const prerender = false;

export const load: PageLoad = ({ url }) => {
	return {
		query: url.searchParams.get('q') || '',
		meta: {
			title: 'Search | @svelte-put',
		},
	};
}

