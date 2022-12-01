import { VERCEL_ANALYTICS_ID } from '$env/static/private';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ url }) => {
  return {
    pathname: url.pathname,
    vercelAnalyticsId: VERCEL_ANALYTICS_ID,
  };
};
