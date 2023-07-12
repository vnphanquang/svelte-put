// scripts/generate-dts-bundle.js
import { createBundle } from 'dts-buddy';

await createBundle({
  project: 'tsconfig.json',
  output: 'types/index.d.ts',
  modules: {
    '@svelte-put/clickoutside': 'src/index.js',
  },
});
