import path from 'path';
import { fileURLToPath } from 'url';

import autoSlug from '@svelte-put/preprocess-auto-slug';
import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/kit/vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
    vitePreprocess(),
  ],
  kit: {
    adapter: adapter({
      routes: {
        include: ['/*'],
        exclude: ['<all>'],
      },
    }),
    alias: {
      $routes: path.resolve(__dirname, 'src/routes'),
      $client: path.resolve(__dirname, 'src/lib/client'),
      $server: path.resolve(__dirname, 'src/lib/server'),
      $shared: path.resolve(__dirname, 'src/lib/shared'),
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
