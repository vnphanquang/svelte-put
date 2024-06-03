import child_process from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

import autoSlug from '@svelte-put/preprocess-auto-slug';
import externalLink from '@svelte-put/preprocess-external-link';
import inlineSvg from '@svelte-put/preprocess-inline-svg';
import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

import pkg from './package.json' assert { type: 'json' };

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const commitHash = child_process.execSync('git rev-parse --short HEAD').toString().trim();

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte'],
  preprocess: [
		externalLink(['svelte-put.vnphanquang.com']),
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
		inlineSvg([{
			directories: [path.resolve(__dirname, 'src/lib/assets/images/svg')],
			attributes: {
				height: '24',
				width: '24',
			},
		}], {
			inlineSrcAttributeName: 'data-inline-src',
		}),
    vitePreprocess(),
  ],
  kit: {
    adapter: adapter({
      routes: {
        include: ['/*'],
        exclude: ['<all>'],
      },
    }),
		version: {
			name: `${pkg.version} (#${commitHash}@${Date.now()})`,
			// pollInterval: 10_000, // every 10 seconds
		},
    alias: {
      $routes: path.resolve(__dirname, 'src/routes'),
    },
  },
	compilerOptions: {
		modernAst: true,
	},
  vitePlugin: {
    inspector: {
      toggleKeyCombo: 'alt-shift',
      holdMode: true,
      showToggleButton: 'always',
      toggleButtonPos: 'bottom-left',
    },
  },
};

export default config;
