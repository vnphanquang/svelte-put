import autoSlug from '@svelte-put/preprocess-auto-slug';
import adapter from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';
import importAssets from 'svelte-preprocess-import-assets';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    importAssets({
      sources: () => [
        {
          tag: 'Code',
          srcAttributes: ['code'],
        },
      ],
    }),
    autoSlug((defaultOptions) => ({
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
