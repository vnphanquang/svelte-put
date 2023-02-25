import inlineSvg from '@svelte-put/inline-svg/preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [inlineSvg()],
};
export default config;
