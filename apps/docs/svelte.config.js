import autoSlug from '@svelte-put/preprocess-auto-slug';
import adapter from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    autoSlug((defaultOptions) => ({
      tags: ['h2', 'h3', 'h4', 'h5', 'h6'],
      anchor: {
        content: '#',
        position: 'prepend',
        properties: {
          ...defaultOptions.anchor.properties,
          class: 'heading-anchor',
        },
      },
    })),
    preprocess({ postcss: true }),
  ],

  kit: {
    adapter: adapter(),
    alias: {
      $data: 'src/data',
    },
  },
};

export default config;
