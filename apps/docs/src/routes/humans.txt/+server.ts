import Handlebars from 'handlebars';

import { BUILD_TIMESTAMP } from '$env/static/private';

import type { RequestHandler } from './$types';
import source from './humans.template.txt?raw';

export const GET: RequestHandler = async () => {
  const template = Handlebars.compile(source);
  const txt = template({
    last_update: BUILD_TIMESTAMP,
  });
  const headers = {
    'Cache-Control': 'max-age=0, s-maxage=3600',
    'Content-Type': 'text/plain',
  };
  return new Response(txt, { headers });
};
