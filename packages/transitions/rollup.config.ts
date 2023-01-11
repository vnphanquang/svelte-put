import ts from '@rollup/plugin-typescript';
import type { RollupOptions } from 'rollup';
import typescript from 'typescript';

import pkg from './package.json' assert { type: 'json' };

const config: RollupOptions[] = Object.keys(pkg.exports).map((key) => {
  const module = key === '.' ? 'index' : key.slice('./'.length);
  return {
    input: `src/${module}.ts`,
    output: {
      dir: 'lib',
      sourcemap: true,
      format: 'esm',
    },
    plugins: [ts({ typescript })],
    external: ['svelte/easing'],
  };
});

export default config;
