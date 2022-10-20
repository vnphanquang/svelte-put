import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    mdsvex({
      extensions: ['.svelte.md', '.md', '.svelte'],
    }),
    preprocess({ postcss: true }),
  ],

  kit: {
    adapter: adapter(),
  },
};

export default config;
