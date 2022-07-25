import fs__default from 'fs';
import path__default from 'path';
import { $ } from './error.js';

/** @param {string} dir */
function mkdirp(dir) {
	try {
		fs__default.mkdirSync(dir, { recursive: true });
	} catch (/** @type {any} */ e) {
		if (e.code === 'EEXIST') return;
		throw e;
	}
}

/** @param {string} path */
function rimraf(path) {
	fs__default.rmSync(path, { force: true, recursive: true });
}

/**
 * @param {string} source
 * @param {string} target
 * @param {{
 *   filter?: (basename: string) => boolean;
 *   replace?: Record<string, string>;
 * }} opts
 */
function copy(source, target, opts = {}) {
	if (!fs__default.existsSync(source)) return [];

	/** @type {string[]} */
	const files = [];

	const prefix = posixify(target) + '/';

	const regex = opts.replace
		? new RegExp(`\\b(${Object.keys(opts.replace).join('|')})\\b`, 'g')
		: null;

	/**
	 * @param {string} from
	 * @param {string} to
	 */
	function go(from, to) {
		if (opts.filter && !opts.filter(path__default.basename(from))) return;

		const stats = fs__default.statSync(from);

		if (stats.isDirectory()) {
			fs__default.readdirSync(from).forEach((file) => {
				go(path__default.join(from, file), path__default.join(to, file));
			});
		} else {
			mkdirp(path__default.dirname(to));

			if (opts.replace) {
				const data = fs__default.readFileSync(from, 'utf-8');
				fs__default.writeFileSync(
					to,
					data.replace(
						/** @type {RegExp} */ (regex),
						(match, key) => /** @type {Record<string, string>} */ (opts.replace)[key]
					)
				);
			} else {
				fs__default.copyFileSync(from, to);
			}

			files.push(to === target ? posixify(path__default.basename(to)) : posixify(to).replace(prefix, ''));
		}
	}

	go(source, target);

	return files;
}

/**
 * Get a list of all files in a directory
 * @param {string} cwd - the directory to walk
 * @param {boolean} [dirs] - whether to include directories in the result
 */
function walk(cwd, dirs = false) {
	/** @type {string[]} */
	const all_files = [];

	/** @param {string} dir */
	function walk_dir(dir) {
		const files = fs__default.readdirSync(path__default.join(cwd, dir));

		for (const file of files) {
			const joined = path__default.join(dir, file);
			const stats = fs__default.statSync(path__default.join(cwd, joined));
			if (stats.isDirectory()) {
				if (dirs) all_files.push(joined);
				walk_dir(joined);
			} else {
				all_files.push(joined);
			}
		}
	}

	return walk_dir(''), all_files;
}

/** @param {string} str */
function posixify(str) {
	return str.replace(/\\/g, '/');
}

/** @type {Map<string, string>} */
const previous_contents = new Map();

/**
 * @param {string} file
 * @param {string} code
 */
function write_if_changed(file, code) {
	if (code !== previous_contents.get(file)) {
		write(file, code);
	}
}

/**
 * @param {string} file
 * @param {string} code
 */
function write(file, code) {
	previous_contents.set(file, code);
	mkdirp(path__default.dirname(file));
	fs__default.writeFileSync(file, code);
}

/** @param {string} str */
function trim(str) {
	const indentation = /** @type {RegExpExecArray} */ (/\n?(\s*)/.exec(str))[1];
	const pattern = new RegExp(`^${indentation}`, 'gm');
	return str.replace(pattern, '').trim();
}

/** @param {string} file */
const exists = (file) => fs__default.existsSync(file) && file;

/**
 * Writes the tsconfig that the user's tsconfig inherits from.
 * @param {import('types').ValidatedKitConfig} config
 */
function write_tsconfig(config, cwd = process.cwd()) {
	const out = path__default.join(config.outDir, 'tsconfig.json');
	const user_file =
		exists(path__default.resolve(cwd, 'tsconfig.json')) || exists(path__default.resolve(cwd, 'jsconfig.json'));

	if (user_file) validate(config, cwd, out, user_file);

	/** @param {string} file */
	const project_relative = (file) => posixify(path__default.relative('.', file));

	/** @param {string} file */
	const config_relative = (file) => posixify(path__default.relative(config.outDir, file));

	const dirs = new Set([
		project_relative(path__default.dirname(config.files.routes)),
		project_relative(path__default.dirname(config.files.lib))
	]);

	/** @type {string[]} */
	const include = [];
	dirs.forEach((dir) => {
		include.push(config_relative(`${dir}/**/*.js`));
		include.push(config_relative(`${dir}/**/*.ts`));
		include.push(config_relative(`${dir}/**/*.svelte`));
	});

	/** @type {Record<string, string[]>} */
	const paths = {};
	const alias = {
		$lib: project_relative(config.files.lib),
		...config.alias
	};
	for (const [key, value] of Object.entries(alias)) {
		if (fs__default.existsSync(project_relative(value))) {
			paths[key] = [project_relative(value)];
			paths[key + '/*'] = [project_relative(value) + '/*'];
		}
	}

	write_if_changed(
		out,
		JSON.stringify(
			{
				compilerOptions: {
					// generated options
					baseUrl: config_relative('.'),
					paths,
					rootDirs: [config_relative('.'), './types'],

					// essential options
					// svelte-preprocess cannot figure out whether you have a value or a type, so tell TypeScript
					// to enforce using \`import type\` instead of \`import\` for Types.
					importsNotUsedAsValues: 'error',
					// Vite compiles modules one at a time
					isolatedModules: true,
					// TypeScript doesn't know about import usages in the template because it only sees the
					// script of a Svelte file. Therefore preserve all value imports. Requires TS 4.5 or higher.
					preserveValueImports: true,

					// This is required for svelte-kit package to work as expected
					// Can be overwritten
					lib: ['esnext', 'DOM'],
					moduleResolution: 'node',
					module: 'esnext',
					target: 'esnext'
				},
				include,
				exclude: [config_relative('node_modules/**'), './**']
			},
			null,
			'\t'
		)
	);
}

/**
 * @param {import('types').ValidatedKitConfig} config
 * @param {string} cwd
 * @param {string} out
 * @param {string} user_file
 */
function validate(config, cwd, out, user_file) {
	// we have to eval the file, since it's not parseable as JSON (contains comments)
	const user_tsconfig_json = fs__default.readFileSync(user_file, 'utf-8');
	const user_tsconfig = (0, eval)(`(${user_tsconfig_json})`);

	// we need to check that the user's tsconfig extends the framework config
	const extend = user_tsconfig.extends;
	const extends_framework_config = extend && path__default.resolve(cwd, extend) === out;

	const kind = path__default.basename(user_file);

	if (extends_framework_config) {
		const { paths: user_paths } = user_tsconfig.compilerOptions || {};

		if (user_paths && fs__default.existsSync(config.files.lib)) {
			/** @type {string[]} */
			const lib = user_paths['$lib'] || [];
			/** @type {string[]} */
			const lib_ = user_paths['$lib/*'] || [];

			const missing_lib_paths =
				!lib.some((relative) => path__default.resolve(cwd, relative) === config.files.lib) ||
				!lib_.some((relative) => path__default.resolve(cwd, relative) === path__default.join(config.files.lib, '/*'));

			if (missing_lib_paths) {
				console.warn(
					$
						.bold()
						.yellow(`Your compilerOptions.paths in ${kind} should include the following:`)
				);
				const relative = posixify(path__default.relative('.', config.files.lib));
				console.warn(`{\n  "$lib":["${relative}"],\n  "$lib/*":["${relative}/*"]\n}`);
			}
		}
	} else {
		let relative = posixify(path__default.relative('.', out));
		if (!relative.startsWith('./')) relative = './' + relative;

		console.warn(
			$.bold().yellow(`Your ${kind} should extend the configuration generated by SvelteKit:`)
		);
		console.warn(`{\n  "extends": "${relative}"\n}`);
	}
}

export { write_if_changed as a, write as b, copy as c, write_tsconfig as d, mkdirp as m, posixify as p, rimraf as r, trim as t, walk as w };
