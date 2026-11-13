import { configs } from '@internals/docpage/eslint';
import { defineConfig } from '@vnphanquang/eslint-config';

export default await defineConfig({ jsdoc: true, svelte: true }, ...configs);
