import { error } from '@sveltejs/kit';

import { getOgImage, getPackageMetadata } from '$packages';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params: { id } }) => {
	const metadata = await getPackageMetadata(id);
	if (!metadata) error(404, 'No such package');
	return {
		package: metadata,
		meta: {
			title: `${metadata.id} | @svelte-put`,
			description: metadata.description,
			og: {
				image: await getOgImage(id),
			},
		},
	};
};
