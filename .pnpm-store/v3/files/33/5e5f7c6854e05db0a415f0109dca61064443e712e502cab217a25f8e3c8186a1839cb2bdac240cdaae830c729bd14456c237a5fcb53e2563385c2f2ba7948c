import fs__default from 'fs';
import { l as load_config, $, c as coalesce_to_error } from './chunks/error.js';
import sade from 'sade';
import 'path';
import 'url';

/** @param {unknown} e */
function handle_error(e) {
	const error = coalesce_to_error(e);

	if (error.name === 'SyntaxError') throw error;

	console.error($.bold().red(`> ${error.message}`));
	if (error.stack) {
		console.error($.gray(error.stack.split('\n').slice(1).join('\n')));
	}

	process.exit(1);
}

const prog = sade('svelte-kit').version('1.0.0-next.392');

prog
	.command('package')
	.describe('Create a package')
	.option('-w, --watch', 'Rerun when files change', false)
	.action(async ({ watch }) => {
		try {
			const config = await load_config();
			const packaging = await import('./chunks/index.js');

			await (watch ? packaging.watch(config) : packaging.build(config));
		} catch (error) {
			handle_error(error);
		}
	});

prog
	.command('sync')
	.describe('Synchronise generated files')
	.action(async () => {
		if (!fs__default.existsSync('svelte.config.js')) {
			console.warn('Missing svelte.config.js — skipping');
			return;
		}

		try {
			const config = await load_config();
			const sync = await import('./chunks/sync.js').then(function (n) { return n.d; });
			sync.all(config);
		} catch (error) {
			handle_error(error);
		}
	});

// TODO remove for 1.0
replace('dev');
replace('build');
replace('preview');

prog.parse(process.argv, { unknown: (arg) => `Unknown option: ${arg}` });

/** @param {string} command */
function replace(command) {
	prog
		.command(command)
		.describe(`No longer available — use vite ${command} instead`)
		.action(async () => {
			const message = `\n> svelte-kit ${command} is no longer available — use vite ${command} instead`;
			console.error($.bold().red(message));

			const steps = [
				'Install vite as a devDependency with npm/pnpm/etc',
				'Create a vite.config.js with the @sveltejs/kit/vite plugin (see below)',
				`Update your package.json scripts to reference \`vite ${command}\` instead of \`svelte-kit ${command}\``
			];

			steps.forEach((step, i) => {
				console.error(`  ${i + 1}. ${$.cyan(step)}`);
			});

			console.error(
				`
				${$.grey('// vite.config.js')}
				import { sveltekit } from '@sveltejs/kit/vite';

				/** @type {import('vite').UserConfig} */
				const config = {
					plugins: [sveltekit()]
				};

				export default config;

				`.replace(/^\t{4}/gm, '')
			);
			process.exit(1);
		});
}
