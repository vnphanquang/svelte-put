import { error } from '@sveltejs/kit';
import * as v from 'valibot';

import { getManifestByPackage, packages } from '#data/loader';
import { query } from '$app/server';

export const getAllPackageManifest = query(async () => {
	return (await Promise.all(packages.map((pkg) => getManifestByPackage(pkg)))).filter(
		(manifest) => manifest !== null,
	);
});

export const getPackageManifest = query(v.string(), async (pkg) => {
	const manifest = await getManifestByPackage(pkg);
	if (!manifest) error(404, 'No pacakge with this name');
	return manifest;
});
