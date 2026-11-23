import { defineConfig } from 'knip/config';

export default defineConfig({
	ignoreIssues: {
		'packages/*/tsconfig.json': ['unlisted'],
		'sites/*/tsconfig.json': ['unlisted'],
	},
	workspaces: {
		'.': {
			ignoreBinaries: ['lefthook'],
			ignoreDependencies: ['@changesets/cli'],
		},
		'internals/docpage': {
			ignoreDependencies: ['tailwindcss', 'node-addon-api', 'node-gyp'],
		},
		'packages/inline-svg': {
			project: 'src/lib/**',
			ignoreDependencies: ['vite'],
		},
		'packages/preprocess-external-link': {
			project: 'src/lib/**',
			ignoreDependencies: ['vite'],
		},
		'packages/toc': {
			project: 'src/lib/**',
			ignoreDependencies: ['vite'],
		},
		'packages/*': {
			project: 'src/lib/**',
		},
		'sites/*': {
			entry: ['src/env.ts', 'src/params.ts'],
			ignoreDependencies: ['tailwindcss', 'node-addon-api', 'node-gyp', '@svelte-put/*'],
		},
	},
});
