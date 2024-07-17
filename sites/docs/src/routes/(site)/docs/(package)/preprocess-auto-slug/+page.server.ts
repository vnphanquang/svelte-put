import ogImage from '$lib/assets/images/og/svelte-put-preprocess-auto-slug.jpg';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const data = await parent();
	return {
		meta: {
			...data.meta,
			og: {
				image: ogImage,
			}
		},
	};
}
