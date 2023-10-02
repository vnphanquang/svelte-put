import { LOAD_DEPENDENCIES } from '$shared/constants';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ url, locals, depends }) => {
  depends(LOAD_DEPENDENCIES.COLOR_SCHEME);
  return {
    pathname: url.pathname,
    colorScheme: locals.colorScheme,
    packageManager: locals.packageManager,
  };
};
