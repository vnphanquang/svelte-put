import { packages } from '$data/packages';
import type { PackageId, Package } from '$data/packages';

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
        image: `https://svelte-put.vnphanquang/images/og/svelte-put-${pkg.id}.png`,
      },
    },
  };
};
