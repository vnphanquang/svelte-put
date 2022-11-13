import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
  plugins: [sveltekit()],
  optimizeDeps: {
    include: ['highlight.js', 'highlight.js/lib/core'],
  },
  define: {
    VERCEL_ANALYTICS_ID: JSON.stringify(process.env.VERCEL_ANALYTICS_ID || ''),
  },
};

export default config;
