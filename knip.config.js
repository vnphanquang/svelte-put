import { defineConfig } from 'knip/config';

export default defineConfig({
	workspaces: {
		'.': {
			ignoreBinaries: ['lefthook'],
			ignoreDependencies: ['@changesets/cli'],
		},
		'packages/*': {
			sveltekit: true,
			project: 'src/lib/**',
		},
		'sites/*': {
			sveltekit: true,
			ignoreFiles: ['**/src/env.ts'], // FIXME: is this not detected by the svelte/kit plugin?
		},
	},
});
