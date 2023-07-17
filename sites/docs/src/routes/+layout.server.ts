import type { Config } from '@sveltejs/adapter-vercel';

import { VERCEL_ANALYTICS_ID } from '$env/static/private';
import { LOAD_DEPENDENCIES } from '$shared/constants';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ url, locals, depends }) => {
  depends(LOAD_DEPENDENCIES.COLOR_SCHEME);
  return {
    pathname: url.pathname,
    vercelAnalyticsId: VERCEL_ANALYTICS_ID,
    colorScheme: locals.colorScheme,
    packageManager: locals.packageManager,
  };
};

export const config: Config = {
  runtime: 'edge',
};
