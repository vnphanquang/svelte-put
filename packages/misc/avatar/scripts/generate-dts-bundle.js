import { createBundle } from 'dts-buddy';

await createBundle({
  project: 'tsconfig.json',
  output: 'types/index.d.ts',
  modules: {
    '@svelte-put/avatar': 'src/index.js',
    '@svelte-put/avatar/helpers': 'src/avatar.helpers.js',
  },
});
