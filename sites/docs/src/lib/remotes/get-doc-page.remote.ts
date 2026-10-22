import { error } from '@sveltejs/kit';
import * as v from 'valibot';

import { loadDocPage, loadDocPageLinks } from '#data/docs';
import { getLoadersByPackage, packageLinkGroup } from '#data/loader';
import { query } from '$app/server';

const GetDocPageSchema = v.object({
	slug: v.string(),
	pkg: v.optional(v.string()),
});

export const getDocPage = query(GetDocPageSchema, async ({ slug, pkg }) => {
	if (!pkg) {
		const [doc, siteLinks] = await Promise.all([loadDocPage({ slug }), loadDocPageLinks()]);
		if (!doc) {
			error(404, `No page with slug ${slug}`);
		}
		return {
			doc,
			links: {
				site: [...siteLinks, packageLinkGroup],
			},
		};
	}

	const loaders = await getLoadersByPackage(pkg);
	if (!loaders) {
		error(404, `No package named ${pkg}`);
	}
	const root = `/packages/${pkg}/`;
	const [doc, packageLinks, siteLinks] = await Promise.all([
		loaders.loadDocPage({ slug, root }),
		loaders.loadDocPageLinks({ root }),
		loadDocPageLinks(),
	]);

	if (!doc) {
		error(404, `No page with slug ${slug}`);
	}

	return {
		doc,
		links: {
			site: [...siteLinks, packageLinkGroup],
			package: packageLinks,
		},
	};
});
