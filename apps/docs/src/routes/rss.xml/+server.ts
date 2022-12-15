import Handlebars from 'handlebars';

import { packages } from '$data/packages';
import { BUILD_TIMESTAMP } from '$env/static/private';
import { PUBLIC_ROOT_URL } from '$env/static/public';
import { APP_ROUTE_TREE } from '$shared/constants';

import type { RequestHandler } from './$types';
import source from './rss.template.xml?raw';

type RssItem = {
  title: string;
  description: string;
  link: string;
  guid: string;
  pubDate: string;
};

export const GET: RequestHandler = () => {
  const template = Handlebars.compile(source);
  const items: RssItem[] = [
    {
      title: 'Introduction',
      description: 'List of all packages under @svelte-put',
      link: `${PUBLIC_ROOT_URL}${APP_ROUTE_TREE.docs.$.path()}`,
      guid: 'intro',
      pubDate: new Date('2022-12-04').toUTCString(),
    },
    ...Object.values(packages).map(
      (pkg) =>
        ({
          title: pkg.name,
          description: pkg.description,
          link: `${PUBLIC_ROOT_URL}${pkg.path}`,
          guid: pkg.id,
          pubDate: new Date(pkg.publishedAt).toUTCString(),
        } satisfies RssItem),
    ),
  ];
  const xml = template({
    title: '@svelte-put',
    link: PUBLIC_ROOT_URL,
    description:
      'Documentation for @svelte-put - a collection of Svelte actions, components, utilities',
    lastBuildDate: new Date(BUILD_TIMESTAMP).toUTCString(),
    copyright: `Copyright ${new Date().getFullYear()}, Quang Phan`,
    items,
  });
  const headers = {
    'Cache-Control': 'max-age=0, s-maxage=3600',
    'Content-Type': 'application/xml',
  };
  return new Response(xml, { headers });
};
