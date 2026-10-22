import { getDocPage } from '#lib/remotes';

import type { LayoutServerLoad } from '../$types';

export const load: LayoutServerLoad = async ({ params }) => {
	return await getDocPage({
		slug: params.slug ?? '',
		pkg: params.pkg,
	});
};
