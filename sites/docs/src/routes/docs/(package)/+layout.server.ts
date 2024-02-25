import { error } from '@sveltejs/kit';

import { packages, type PackageId, type Package } from '$lib/data/packages';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ url }) => {
	const pkgId = (url.pathname.split('/').at(-1) ?? '') as PackageId;
	const pkg = packages[pkgId] as Package;
	if (!pkg) error(404, 'No such package');
	return {
		package: pkg,
    meta: {
      title: `${pkg.id} | @svelte-put`,
      description: pkg.description,
		},
	};
};
