import ogImage from '$lib/assets/images/og/svelte-put-movable.jpg?url';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const data = await parent();
	return {
		meta: {
			...data.meta,
			og: {
				image: ogImage,
			},
		},
	};
};
