import child_process from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

import autoSlug from '@svelte-put/preprocess-auto-slug';
import inlineSvg from '@svelte-put/preprocess-inline-svg';
import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { autoExternalLink } from '@sveltevietnam/ui/preprocessors/auto-external-link';
import { enhanceCodeBlock } from '@sveltevietnam/ui/preprocessors/enhance-code-block';
import { mdsvex, mdsvexDefaultConfig } from '@sveltevietnam/ui/preprocessors/mdsvex';

import pkg from './package.json' assert { type: 'json' };

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const commitHash = child_process.execSync('git rev-parse --short HEAD').toString().trim();

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexDefaultConfig.extensions],
  preprocess: [
		mdsvex(),
		enhanceCodeBlock(),
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
		autoExternalLink(['svelte-put.vnphanquang.com']),
		inlineSvg(
			[
				{
					directories: [path.resolve(__dirname, 'src/lib/assets/images/svg')],
					attributes: {
						height: '24',
						width: '24',
					},
				},
			],
			{
				inlineSrcAttributeName: 'inline-src',
				keepInlineSrcAttribute: true,
			},
		),
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
