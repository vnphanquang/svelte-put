import { error } from '@sveltejs/kit';

import { packages, type Package, deprecatedPackages } from '$lib/data/packages';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ url }) => {
	const pkgId = (url.pathname.split('/').at(-1) ?? '');
	let pkg: Package;
	if (pkgId in packages) {
		pkg = packages[pkgId as keyof typeof packages];
	} else if (pkgId in deprecatedPackages) {
		pkg = deprecatedPackages[pkgId as keyof typeof deprecatedPackages];
	} else {
		error(404, 'No such package');
	}
	return {
		package: pkg,
    meta: {
      title: `${pkg.id} | @svelte-put`,
      description: pkg.description,
		},
	};
};
