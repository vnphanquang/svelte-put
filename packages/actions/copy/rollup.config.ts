import ts from '@rollup/plugin-typescript';
import type { RollupOptions } from 'rollup';
import filesize from 'rollup-plugin-filesize';
import typescript from 'typescript';

const config: RollupOptions = {
  input: {
    index: 'src/index.ts',
    action: 'src/copy.action.ts',
    utils: 'src/copy.utils.ts',
  },
  output: {
    sourcemap: true,
    dir: './lib',
    format: 'esm',
  },
  plugins: [
    ts({
      typescript,
    }),
    filesize(),
  ],
};

export default config;
