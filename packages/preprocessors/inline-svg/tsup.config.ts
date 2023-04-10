import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/vite.ts'],
  outDir: 'dist',
  format: ['esm'],
  dts: true,
  sourcemap: true,
  splitting: false,
  clean: true,
  external: [],
});
