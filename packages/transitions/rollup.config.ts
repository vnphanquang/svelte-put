import ts from '@rollup/plugin-typescript';
import type { RollupOptions } from 'rollup';
import typescript from 'typescript';

import pkg from './package.json' assert { type: 'json' };

const config: RollupOptions[] = Object.entries(pkg.exports)
  .filter(([key]) => key !== './package.json')
  .map(([key, file]) => {
    const module = key === '.' ? 'index' : key.slice('./'.length);
    return {
      input: `src/${module}.ts`,
      output: {
        file,
        sourcemap: true,
        format: 'esm',
      },
      plugins: [ts({ typescript, tsconfig: 'tsconfig.json' })],
      external: ['svelte/easing'],
    };
  });

export default config;
