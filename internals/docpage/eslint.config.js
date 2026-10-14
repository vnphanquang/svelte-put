import { defineConfig } from '@vnphanquang/eslint-config';

import { configs } from './src/eslint/index.js';

export default await defineConfig({ svelte: 'configless' }, ...configs);
