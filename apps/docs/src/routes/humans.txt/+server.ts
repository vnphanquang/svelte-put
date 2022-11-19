import Handlebars from 'handlebars';

import type { RequestHandler } from './$types';
import source from './humans.template.txt?raw';

const template = Handlebars.compile(source);

const date = new Date();
const txt = template({
  last_update: `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date
    .getDate()
    .toString()
    .padStart(2, '0')}`,
});

export const GET: RequestHandler = async () => {
  return new Response(txt, {
    headers: {
      'content-type': 'text/plain',
    },
  });
};
