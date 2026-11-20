import { getDocPageData } from '#lib/remotes';
import { resolve } from '$app/paths';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params: { slug } }) => {
	return await getDocPageData({
		slug,
		root: resolve('/'),
	});
};
