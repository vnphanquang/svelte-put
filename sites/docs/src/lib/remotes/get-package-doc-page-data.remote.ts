import { error } from '@sveltejs/kit';
import * as v from 'valibot';

import { getLoadersByPackage, getOgImageUrlByPackage } from '#data/loader';
import { query } from '$app/server';

import { getPackageManifest } from './get-package-manifest.remote';

const GetPackageDocPageDataSchema = v.object({
	slug: v.string(),
	pkg: v.string(),
});

export const getPackageDocPageData = query(GetPackageDocPageDataSchema, async ({ slug, pkg }) => {
	const [loaders, og, manifest] = await Promise.all([
		getLoadersByPackage(pkg),
		getOgImageUrlByPackage(pkg),
		getPackageManifest(pkg),
	]);
	if (!loaders) {
		error(404, `No package named ${pkg}`);
	}
	const root = `/packages/${pkg}/`;
	const [doc, packageLinks] = await Promise.all([
		loaders.loadDocPage({ slug, root }),
		loaders.loadDocPageLinks({ root }),
	]);

	if (!doc) {
		error(404, `No page with slug ${slug}`);
	}

	return {
		doc,
		links: packageLinks,
		og,
		manifest,
	};
});
