import { createBundle } from 'dts-buddy';

await createBundle({
  project: 'tsconfig.json',
  output: 'types/index.d.ts',
  modules: {
    '@svelte-put/toc': 'src/index.js',
    '@svelte-put/toc/attributes': 'src/attributes/index.js',
    '@svelte-put/toc/events': 'src/events/index.js',
    '@svelte-put/toc/internal': 'src/internal/index.js',
    '@svelte-put/toc/parameter': 'src/parameter/index.js',
    '@svelte-put/toc/store': 'src/store/index.js',
    '@svelte-put/toc/utils': 'src/utils/index.js',
  },
});
