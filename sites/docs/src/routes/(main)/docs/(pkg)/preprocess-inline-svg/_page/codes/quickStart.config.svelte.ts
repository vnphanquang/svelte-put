import inlineSvg from '@svelte-put/preprocess-inline-svg';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    // input to `inlineSvg` can be either a single object or an array of such
    inlineSvg([
      {
        directories: 'src/assets/icons',
        attributes: {
          class: 'icon',
          width: '20',
          height: '20',
        },
      },
      {
        directories: 'src/assets/pictograms',
      },
    ]),
    // other preprocessors
  ],
};
export default config;
