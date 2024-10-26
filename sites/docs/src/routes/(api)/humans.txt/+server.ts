import Mustache from 'mustache';

import type { RequestHandler } from './$types';
import template from './humans.template.txt?raw';

export const GET: RequestHandler = async () => {
	const txt = Mustache.render(template, {
		last_update: new Date(parseInt(__BUILD_TIMESTAMP__, 10)).toISOString(),
	});
	const headers = {
		'Cache-Control': 'max-age=0, s-maxage=3600',
		'Content-Type': 'text/plain',
	};
	return new Response(txt, { headers });
};
