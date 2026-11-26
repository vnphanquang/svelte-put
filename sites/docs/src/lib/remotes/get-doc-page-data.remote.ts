import { error } from '@sveltejs/kit';
import * as v from 'valibot';

import { loadDocPage, loadDocPageLinks } from '#data/docs';
import { packageLinkGroup } from '#data/loader';
import { query } from '$app/server';

const GetDocPageData = v.object({
	slug: v.string(),
	root: v.string(),
});

export const getDocPageData = query(GetDocPageData, async ({ slug, root }) => {
	if (slug.endsWith('/')) slug = slug.slice(0, -1);
	const [doc, siteLinks] = await Promise.all([
		loadDocPage({ slug, root }),
		loadDocPageLinks({ root }),
	]);
	if (!doc) {
		error(404, `No page with slug ${slug}`);
	}

	const deprecated = siteLinks.find((l) => l.type === 'group' && l.title === 'Deprecated');
	const topLevel = siteLinks.filter((l) => !(l.type === 'group' && l.title === 'Deprecated'));
	return {
		doc,
		links: [...topLevel, packageLinkGroup, deprecated].filter((d) => !!d),
	};
});
