import fs from 'fs';

import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig, Plugin } from 'vite';

function rawFonts(ext: string[]): Plugin {
  return {
    name: 'vite-plugin-raw-fonts',
    transform(code, id) {
      if (ext.some((e) => id.endsWith(e))) {
        const buffer = fs.readFileSync(id);
        return { code: `export default ${JSON.stringify(buffer)}`, map: null };
      }
    },
  };
}

const config: UserConfig = {
  plugins: [sveltekit(), rawFonts(['.woff'])],
  optimizeDeps: {
    include: ['highlight.js', 'highlight.js/lib/core'],
  },
  define: {
    'process.env.BUILD_TIMESTAMP': JSON.stringify(Date.now()),
  },
};

export default config;
