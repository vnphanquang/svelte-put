import { defineConfig } from 'knip/config';

export default defineConfig({
	workspaces: {
		'.': {
			ignoreBinaries: ['lefthook'],
			ignoreDependencies: ['@changesets/cli'],
		},
		'internals/docpage': {
			svelte: true,
			ignoreDependencies: ['tailwindcss', 'node-addon-api', 'node-gyp', '@vnphanquang/markdown'],
		},
		'packages/preprocess-external-link': {
			sveltekit: true,
			project: 'src/lib/**',
			ignoreBinaries: ['svelte-kit'],
			ignoreDependencies: ['vite'],
		},
		'packages/*': {
			sveltekit: true,
			project: 'src/lib/**',
			ignoreBinaries: ['svelte-kit'],
		},
		'sites/*': {
			sveltekit: true,
			entry: ['src/env.ts'],
			ignoreDependencies: ['tailwindcss', 'node-addon-api', 'node-gyp', '@vnphanquang/markdown'],
		},
	},
});
