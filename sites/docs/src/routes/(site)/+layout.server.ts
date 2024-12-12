import { getPackageListing } from '$packages';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	return {
		packages: await getPackageListing(),
	};
};
