import { createBundle } from 'dts-buddy';

await createBundle({
  project: 'tsconfig.json',
  output: 'types/index.d.ts',
  modules: {
    '@svelte-put/inline-svg': 'src/index.js',
  },
});
