import { getDocPageData } from '#lib/remotes';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params }) => {
	return await getDocPageData(params.slug);
};
