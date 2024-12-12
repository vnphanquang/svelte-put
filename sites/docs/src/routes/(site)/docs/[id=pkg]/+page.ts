import { getDocsContent } from '$packages';

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ data, params: { id } }) => {
	return {
		...data,
		Content: await getDocsContent(id),
	};
};
