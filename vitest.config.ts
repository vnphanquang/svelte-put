import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		projects: ['packages/*'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'html', 'lcov'],
			exclude: ['**/tests/**/*'],
		},
	},
});
