import path from 'path';
import { fileURLToPath } from 'url';

import { inlineSvg } from '@svelte-put/preprocess-inline-svg/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: UserConfig = {
  plugins: [
    inlineSvg(
      [
        {
          directories: [path.resolve(__dirname, 'src/lib/shared/assets/images/svg')],
          attributes: {
            width: '20',
            height: '20',
          },
        },
      ],
      {
        inlineSrcAttributeName: 'inline-src',
        keepInlineSrcAttribute: true,
      },
    ),
    sveltekit(),
  ],
  optimizeDeps: {
    include: ['highlight.js', 'highlight.js/lib/core'],
  },
  define: {
    'process.env.BUILD_TIMESTAMP': JSON.stringify(Date.now()),
  },
};

export default config;
