import { inlineSvg } from '@svelte-put/preprocess-inline-svg/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    inlineSvg(
      [
        // ... sources as in Quick Start section
      ],
      {
        inlineSrcAttributeName: 'inline-src',
      },
    ),
    // ...
  ],
});
