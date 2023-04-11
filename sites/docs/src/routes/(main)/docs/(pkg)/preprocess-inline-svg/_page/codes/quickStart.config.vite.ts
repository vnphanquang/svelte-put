import { inlineSvg } from '@svelte-put/preprocess-inline-svg/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    // make sure inlineSvg comes before `svelte` or `sveltekit` plugin
    inlineSvg(
      [
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
      ],
      {
        inlineSrcAttributeName: 'inline-src',
      },
    ),
    sveltekit(),
  ],
});
