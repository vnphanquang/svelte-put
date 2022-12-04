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

function getDate() {
  const date = new Date();
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date
    .getDate()
    .toString()
    .padStart(2, '0')}`;
}

const config: UserConfig = {
  plugins: [sveltekit(), rawFonts(['.woff'])],
  optimizeDeps: {
    include: ['highlight.js', 'highlight.js/lib/core'],
  },
  define: {
    'process.env.BUILD_TIMESTAMP': JSON.stringify(getDate()),
  },
};

export default config;
