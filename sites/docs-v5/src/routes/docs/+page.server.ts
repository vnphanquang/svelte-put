import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	return {
		meta: {
			title: 'Docs | @svelte-put',
		},
	};
}
