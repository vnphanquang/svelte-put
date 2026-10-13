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
	},
});
