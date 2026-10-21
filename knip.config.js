import { defineConfig } from 'knip/config';

export default defineConfig({
	workspaces: {
		'.': {
			ignoreBinaries: ['lefthook'],
			ignoreDependencies: ['@changesets/cli', '@vnphanquang/markdown', '@vnphanquang/gach'],
		},
		'internals/docpage': {
			svelte: true,
			ignoreDependencies: ['tailwindcss', 'node-addon-api', 'node-gyp'],
		},
		'packages/inline-svg': {
			sveltekit: true,
			project: 'src/lib/**',
			ignoreDependencies: ['vite'],
		},
		'packages/preprocess-external-link': {
			sveltekit: true,
			project: 'src/lib/**',
			ignoreDependencies: ['vite'],
		},
		'packages/toc': {
			sveltekit: true,
			project: 'src/lib/**',
			ignoreDependencies: ['vite'],
		},
		'packages/*': {
			sveltekit: true,
			project: 'src/lib/**',
		},
		'sites/*': {
			sveltekit: true,
			entry: ['src/env.ts'],
			ignoreDependencies: ['tailwindcss', 'node-addon-api', 'node-gyp'],
		},
	},
});
