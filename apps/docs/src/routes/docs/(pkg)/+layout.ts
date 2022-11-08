import { packages } from '$data/packages';
import type { PackageId, Package } from '$data/packages';

import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ url }) => {
  // was gonna use routeId here but can't due to this bug: https://github.com/sveltejs/kit/issues/6980
  // so using url.pathname instead.
  const routeSegments = (url.pathname ?? '').split('/');
  const pkgId = routeSegments[routeSegments.length - 1] as PackageId;
  const pkg = packages[pkgId] as Package;
  return {
    package: pkg,
    meta: {
      title: `${pkg.id} | @svelte-put`,
      description: pkg.description,
    },
  };
};
