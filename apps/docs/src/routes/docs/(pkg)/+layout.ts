import { packages } from '$data/packages';
import type { PackageId, Package } from '$data/packages';
import { PUBLIC_ROOT_URL } from '$env/static/public';

import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ url }) => {
  const routeSegments = (url.pathname ?? '').split('/');
  const pkgId = routeSegments[routeSegments.length - 1] as PackageId;
  const pkg = packages[pkgId] as Package;
  return {
    package: pkg,
    meta: {
      title: `${pkg.id} | @svelte-put`,
      description: pkg.description,
      og: {
        image: `${PUBLIC_ROOT_URL}/images/og/svelte-put-${pkg.id}.png`,
      },
    },
  };
};
