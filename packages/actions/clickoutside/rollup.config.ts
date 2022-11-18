import ts from '@rollup/plugin-typescript';
import type { RollupOptions } from 'rollup';
import typescript from 'typescript';

const config: RollupOptions = {
  input: 'src/index.ts',
  output: {
    sourcemap: true,
    dir: './lib',
    format: 'esm',
  },
  plugins: [
    ts({
      typescript,
    }),
  ],
};

export default config;
