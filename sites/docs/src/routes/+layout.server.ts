import { getPreferences } from '#lib/preferences/get-preferences.remote';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	return { preferences: await getPreferences() };
};
