import { AutoSlugOptions } from './auto-slug.types';

/**
 * default options for auto-slug
 *
 * @public
 */
export const DEFAULT_AUTO_SLUG_OPTIONS: AutoSlugOptions = {
  tags: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  files: () => true,
  attributeName: 'id',
  slug: ({ generated }) => generated,
  anchor: {
    enabled: true,
    position: 'prepend',
    content: '#',
    properties: {
      'aria-hidden': 'true',
      tabindex: '-1',
    },
    href: (slug) => `#${slug}`,
  },
};
