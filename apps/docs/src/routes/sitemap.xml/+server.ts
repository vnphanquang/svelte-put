import Handlebars from 'handlebars';

import { packages } from '$data/packages';
import { BUILD_TIMESTAMP } from '$env/static/private';
import { PUBLIC_ROOT_URL } from '$env/static/public';

import type { RequestHandler } from './$types';
import source from './sitemap.template.xml?raw';

/** https://www.sitemaps.org/protocol.html */
type SiteMapUrl = {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
};

export const GET: RequestHandler = () => {
  const template = Handlebars.compile(source);
  const urls: SiteMapUrl[] = [
    {
      loc: `${PUBLIC_ROOT_URL}/docs`,
      changefreq: 'monthly',
      priority: 0.9,
    },
    ...Object.values(packages).map(
      (pkg) =>
        ({
          loc: `${PUBLIC_ROOT_URL}${pkg.path}`,
          changefreq: 'monthly',
          priority: 0.8,
        } satisfies SiteMapUrl),
    ),
    {
      loc: PUBLIC_ROOT_URL,
      lastmod: BUILD_TIMESTAMP,
      changefreq: 'monthly',
      priority: 0.2,
    },
  ];
  const xml = template({ urls });
  const headers = {
    'Cache-Control': 'max-age=0, s-maxage=3600',
    'Content-Type': 'application/xml',
  };
  return new Response(xml, { headers });
};
