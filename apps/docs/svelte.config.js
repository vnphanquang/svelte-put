import adapter from '@sveltejs/adapter-vercel';
import { mdsvex } from 'mdsvex';
import link from 'rehype-autolink-headings';
import slug from 'rehype-slug';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.md.svelte', '.svelte'],
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    mdsvex({
      extensions: ['.md', '.md.svelte'],
      highlight: false,
      rehypePlugins: [slug, [link, { behavior: 'wrap' }]],
    }),
    preprocess({ postcss: true }),
  ],

  kit: {
    adapter: adapter(),
  },
};

export default config;
