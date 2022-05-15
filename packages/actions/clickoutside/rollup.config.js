import { resolve } from 'path';

import ts from '@rollup/plugin-typescript';
import filesize from 'rollup-plugin-filesize';
import typescript from 'typescript';

/** @type {import('rollup').RollupOptions} */
const config = {
  input: resolve(__dirname, 'src/index.ts'),
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
