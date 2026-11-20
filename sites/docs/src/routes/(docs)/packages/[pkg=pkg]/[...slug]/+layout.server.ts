import { getPackageDocPageData } from '#lib/remotes';
import { resolve } from '$app/paths';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params }) => {
	return await getPackageDocPageData({
		...params,
		root: resolve('/(docs)/packages/[pkg=pkg]/[...slug]', { pkg: params.pkg, slug: '' }) + '/',
	});
};
