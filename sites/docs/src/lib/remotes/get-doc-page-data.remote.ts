import { error } from '@sveltejs/kit';
import * as v from 'valibot';

import { loadDocPage, loadDocPageLinks } from '#data/docs';
import { packageLinkGroup } from '#data/loader';
import { prerender } from '$app/server';

export const getDocPageData = prerender(v.string(), async (slug) => {
	const [doc, siteLinks] = await Promise.all([loadDocPage({ slug }), loadDocPageLinks()]);
	if (!doc) {
		error(404, `No page with slug ${slug}`);
	}
	return {
		doc,
		links: [...siteLinks, packageLinkGroup],
	};
});
