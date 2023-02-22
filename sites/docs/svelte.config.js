import autoSlug from '@svelte-put/preprocess-auto-slug';
import inlineSvg from '@svelte-put/preprocess-inline-svg';
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';

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
    inlineSvg([
      {
        directories: ['src/lib/shared/assets/images/svg'],
        attributes: {
          width: 20,
          height: 20,
        },
      },
    ]),
    vitePreprocess(),
  ],
  kit: {
    adapter: adapter(),
    alias: {
      $routes: 'src/routes',
      $client: 'src/lib/client',
      $server: 'src/lib/server',
      $shared: 'src/lib/shared',
    },
  },
  vitePlugin: {
    experimental: {
      inspector: {
        toggleKeyCombo: 'control-shift',
        holdMode: true,
        showToggleButton: 'always',
        toggleButtonPos: 'bottom-left',
      },
    },
  },
};

export default config;
