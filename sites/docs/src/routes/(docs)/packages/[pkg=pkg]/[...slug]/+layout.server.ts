import { getPackageDocPageData } from '#lib/remotes';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	return await getPackageDocPageData(params);
};
