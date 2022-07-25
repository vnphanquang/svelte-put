import * as fs from 'fs';
import fs__default, { readFileSync, existsSync, writeFileSync, readdirSync, statSync } from 'fs';
import path__default, { join, dirname, resolve as resolve$1, normalize } from 'path';
import { a as load_template, $, c as coalesce_to_error, l as load_config } from './chunks/error.js';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import * as vite from 'vite';
import { loadConfigFromFile } from 'vite';
import { p as posixify, m as mkdirp, w as walk, r as rimraf } from './chunks/write_tsconfig.js';
import { g as get_runtime_directory, s, i as init, a as get_runtime_prefix, u as update, b as get_mime_lookup, p as parse_route_id, c as all, l as logger } from './chunks/sync.js';
import { URL as URL$1, pathToFileURL } from 'url';
import { installPolyfills } from './node/polyfills.js';
import * as qs from 'querystring';
import { getRequest, setResponse } from './node.js';
import 'assert';
import 'net';
import 'http';
import 'stream';
import 'buffer';
import 'util';
import 'stream/web';
import 'perf_hooks';
import 'util/types';
import 'events';
import 'tls';
import 'async_hooks';
import 'console';
import 'zlib';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:fs';
import 'node:path';
import 'crypto';

/**
 * @param {import('vite').ConfigEnv} config_env
 * @return {Promise<import('vite').UserConfig>}
 */
async function get_vite_config(config_env) {
	const config = (await loadConfigFromFile(config_env))?.config;
	if (!config) {
		throw new Error('Could not load Vite config');
	}
	return { ...config, mode: config_env.mode };
}

/**
 * @param {...import('vite').UserConfig} configs
 * @returns {import('vite').UserConfig}
 */
function merge_vite_configs(...configs) {
	return deep_merge(
		...configs.map((config) => ({
			...config,
			resolve: {
				...config.resolve,
				alias: normalize_alias(config.resolve?.alias || {})
			}
		}))
	);
}

/**
 * Takes zero or more objects and returns a new object that has all the values
 * deeply merged together. None of the original objects will be mutated at any
 * level, and the returned object will have no references to the original
 * objects at any depth. If there's a conflict the last one wins, except for
 * arrays which will be combined.
 * @param {...Object} objects
 * @returns {Record<string, any>} the merged object
 */
function deep_merge(...objects) {
	const result = {};
	/** @type {string[]} */
	objects.forEach((o) => merge_into(result, o));
	return result;
}

/**
 * normalize kit.vite.resolve.alias as an array
 * @param {import('vite').AliasOptions} o
 * @returns {import('vite').Alias[]}
 */
function normalize_alias(o) {
	if (Array.isArray(o)) return o;
	return Object.entries(o).map(([find, replacement]) => ({ find, replacement }));
}

/**
 * Merges b into a, recursively, mutating a.
 * @param {Record<string, any>} a
 * @param {Record<string, any>} b
 */
function merge_into(a, b) {
	/**
	 * Checks for "plain old Javascript object", typically made as an object
	 * literal. Excludes Arrays and built-in types like Buffer.
	 * @param {any} x
	 */
	const is_plain_object = (x) => typeof x === 'object' && x.constructor === Object;

	for (const prop in b) {
		if (is_plain_object(b[prop])) {
			if (!is_plain_object(a[prop])) {
				a[prop] = {};
			}
			merge_into(a[prop], b[prop]);
		} else if (Array.isArray(b[prop])) {
			if (!Array.isArray(a[prop])) {
				a[prop] = [];
			}
			a[prop].push(...b[prop]);
		} else {
			a[prop] = b[prop];
		}
	}
}

/** @param {import('types').ValidatedKitConfig} config */
function get_aliases(config) {
	/** @type {Record<string, string>} */
	const alias = {
		__GENERATED__: path__default.posix.join(config.outDir, 'generated'),
		$app: `${get_runtime_directory(config)}/app`,

		// For now, we handle `$lib` specially here rather than make it a default value for
		// `config.kit.alias` since it has special meaning for packaging, etc.
		$lib: config.files.lib
	};

	for (const [key, value] of Object.entries(config.alias)) {
		alias[key] = path__default.resolve(value);
	}

	return alias;
}

/**
 * Given an entry point like [cwd]/src/hooks, returns a filename like [cwd]/src/hooks.js or [cwd]/src/hooks/index.js
 * @param {string} entry
 * @returns {string|null}
 */
function resolve_entry(entry) {
	if (fs__default.existsSync(entry)) {
		const stats = fs__default.statSync(entry);
		if (stats.isDirectory()) {
			return resolve_entry(path__default.join(entry, 'index'));
		}

		return entry;
	} else {
		const dir = path__default.dirname(entry);

		if (fs__default.existsSync(dir)) {
			const base = path__default.basename(entry);
			const files = fs__default.readdirSync(dir);

			const found = files.find((file) => file.replace(/\.[^.]+$/, '') === base);

			if (found) return path__default.join(dir, found);
		}
	}

	return null;
}

/**
 * @typedef {import('rollup').RollupOutput} RollupOutput
 * @typedef {import('rollup').OutputChunk} OutputChunk
 * @typedef {import('rollup').OutputAsset} OutputAsset
 */

/**
 * Invokes Vite.
 * @param {import('vite').UserConfig} config
 */
async function create_build(config) {
	const { output } = /** @type {RollupOutput} */ (
		await vite.build({ ...config, configFile: false })
	);

	const chunks = output.filter(
		/** @returns {output is OutputChunk} */ (output) => output.type === 'chunk'
	);

	const assets = output.filter(
		/** @returns {output is OutputAsset} */ (output) => output.type === 'asset'
	);

	return { chunks, assets };
}

/**
 * Adds transitive JS and CSS dependencies to the js and css inputs.
 * @param {import('vite').Manifest} manifest
 * @param {string} entry
 * @param {boolean} add_dynamic_css
 */
function find_deps$1(manifest, entry, add_dynamic_css) {
	/** @type {Set<string>} */
	const seen = new Set();

	/** @type {Set<string>} */
	const imports = new Set();

	/** @type {Set<string>} */
	const stylesheets = new Set();

	/**
	 * @param {string} file
	 * @param {boolean} add_js
	 */
	function traverse(file, add_js) {
		if (seen.has(file)) return;
		seen.add(file);

		const chunk = manifest[file];

		if (add_js) imports.add(chunk.file);

		if (chunk.css) {
			chunk.css.forEach((file) => stylesheets.add(file));
		}

		if (chunk.imports) {
			chunk.imports.forEach((file) => traverse(file, add_js));
		}

		if (add_dynamic_css && chunk.dynamicImports) {
			chunk.dynamicImports.forEach((file) => traverse(file, false));
		}
	}

	traverse(entry, true);

	return {
		file: manifest[entry].file,
		imports: Array.from(imports),
		stylesheets: Array.from(stylesheets)
	};
}

/**
 * The Vite configuration that we use by default.
 * @param {{
 *   config: import('types').ValidatedConfig;
 *   input: Record<string, string>;
 *   ssr: boolean;
 *   outDir: string;
 * }} options
 * @return {import('vite').UserConfig}
 */
const get_default_config = function ({ config, input, ssr, outDir }) {
	return {
		appType: 'custom',
		base: assets_base(config.kit),
		build: {
			cssCodeSplit: true,
			manifest: true,
			outDir,
			polyfillModulePreload: false,
			rollupOptions: {
				input,
				output: {
					format: 'esm',
					entryFileNames: ssr ? '[name].js' : `${config.kit.appDir}/immutable/[name]-[hash].js`,
					chunkFileNames: `${config.kit.appDir}/immutable/chunks/[name]-[hash].js`,
					assetFileNames: `${config.kit.appDir}/immutable/assets/[name]-[hash][extname]`
				},
				preserveEntrySignatures: 'strict'
			},
			ssr,
			target: ssr ? 'node14.8' : undefined
		},
		define: {
			__SVELTEKIT_ADAPTER_NAME__: JSON.stringify(config.kit.adapter?.name),
			__SVELTEKIT_APP_VERSION__: JSON.stringify(config.kit.version.name),
			__SVELTEKIT_APP_VERSION_FILE__: JSON.stringify(`${config.kit.appDir}/version.json`),
			__SVELTEKIT_APP_VERSION_POLL_INTERVAL__: JSON.stringify(config.kit.version.pollInterval),
			__SVELTEKIT_DEV__: 'false'
		},
		// prevent Vite copying the contents of `config.kit.files.assets`,
		// if it happens to be 'public' instead of 'static'
		publicDir: false,
		resolve: {
			alias: get_aliases(config.kit)
		},
		ssr: {
			// when developing against the Kit src code, we want to ensure that
			// our dependencies are bundled so that apps don't need to install
			// them as peerDependencies
			noExternal: []
				
		}
	};
};

/**
 * @param {import('types').ValidatedKitConfig} config
 * @returns {string}
 */
function assets_base(config) {
	// TODO this is so that Vite's preloading works. Unfortunately, it fails
	// during `svelte-kit preview`, because we use a local asset path. This
	// may be fixed in Vite 3: https://github.com/vitejs/vite/issues/2009
	const { base, assets } = config.paths;
	return `${assets || base}/`;
}

/**
 * vite.config.js will contain vite-plugin-svelte-kit, which kicks off the server and service
 * worker builds in a hook. When running the server and service worker builds we must remove
 * the SvelteKit plugin so that we do not kick off additional instances of these builds.
 * @param {import('vite').UserConfig} config
 */
function remove_svelte_kit(config) {
	// TODO i feel like there's a more elegant way to do this
	// @ts-expect-error - it can't handle infinite type expansion
	config.plugins = (config.plugins || [])
		.flat(Infinity)
		.filter((plugin) => plugin.name !== 'vite-plugin-svelte-kit');
}

const method_names = new Set(['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH']);

// If we'd written this in TypeScript, it could be easy...
/**
 * @param {string} str
 * @returns {str is import('types').HttpMethod}
 */
function is_http_method(str) {
	return method_names.has(str);
}

/**
 * @param {{
 *   hooks: string;
 *   config: import('types').ValidatedConfig;
 *   has_service_worker: boolean;
 *   runtime: string;
 *   template: string;
 * }} opts
 */
const server_template = ({ config, hooks, has_service_worker, runtime, template }) => `
import root from '__GENERATED__/root.svelte';
import { respond } from '${runtime}/server/index.js';
import { set_paths, assets, base } from '${runtime}/paths.js';
import { set_prerendering } from '${runtime}/env.js';

const template = ({ head, body, assets, nonce }) => ${s(template)
	.replace('%sveltekit.head%', '" + head + "')
	.replace('%sveltekit.body%', '" + body + "')
	.replace(/%sveltekit\.assets%/g, '" + assets + "')
	.replace(/%sveltekit\.nonce%/g, '" + nonce + "')};

let read = null;

set_paths(${s(config.kit.paths)});

let default_protocol = 'https';

// allow paths to be globally overridden
// in svelte-kit preview and in prerendering
export function override(settings) {
	default_protocol = settings.protocol || default_protocol;
	set_paths(settings.paths);
	set_prerendering(settings.prerendering);
	read = settings.read;
}

export class Server {
	constructor(manifest) {
		this.options = {
			csp: ${s(config.kit.csp)},
			dev: false,
			get_stack: error => String(error), // for security
			handle_error: (error, event) => {
				this.options.hooks.handleError({
					error,
					event,

					// TODO remove for 1.0
					// @ts-expect-error
					get request() {
						throw new Error('request in handleError has been replaced with event. See https://github.com/sveltejs/kit/pull/3384 for details');
					}
				});
				error.stack = this.options.get_stack(error);
			},
			hooks: null,
			hydrate: ${s(config.kit.browser.hydrate)},
			manifest,
			method_override: ${s(config.kit.methodOverride)},
			paths: { base, assets },
			prefix: assets + '/',
			prerender: {
				default: ${config.kit.prerender.default},
				enabled: ${config.kit.prerender.enabled}
			},
			read,
			root,
			service_worker: ${has_service_worker ? "base + '/service-worker.js'" : 'null'},
			router: ${s(config.kit.browser.router)},
			template,
			template_contains_nonce: ${template.includes('%sveltekit.nonce%')},
			trailing_slash: ${s(config.kit.trailingSlash)}
		};
	}

	async respond(request, options = {}) {
		if (!(request instanceof Request)) {
			throw new Error('The first argument to server.respond must be a Request object. See https://github.com/sveltejs/kit/pull/3384 for details');
		}

		if (!this.options.hooks) {
			const module = await import(${s(hooks)});
			this.options.hooks = {
				getSession: module.getSession || (() => ({})),
				handle: module.handle || (({ event, resolve }) => resolve(event)),
				handleError: module.handleError || (({ error }) => console.error(error.stack)),
				externalFetch: module.externalFetch || fetch
			};
		}

		return respond(request, this.options, options);
	}
}
`;

/**
 * @param {{
 *   cwd: string;
 *   config: import('types').ValidatedConfig;
 *   vite_config_env: import('vite').ConfigEnv;
 *   manifest_data: import('types').ManifestData;
 *   build_dir: string;
 *   output_dir: string;
 *   service_worker_entry_file: string | null;
 * }} options
 * @param {{ vite_manifest: import('vite').Manifest, assets: import('rollup').OutputAsset[] }} client
 */
async function build_server(options, client) {
	const {
		cwd,
		config,
		vite_config_env,
		manifest_data,
		build_dir,
		output_dir,
		service_worker_entry_file
	} = options;

	let hooks_file = resolve_entry(config.kit.files.hooks);
	if (!hooks_file || !fs__default.existsSync(hooks_file)) {
		hooks_file = path__default.join(config.kit.outDir, 'build/hooks.js');
		fs__default.writeFileSync(hooks_file, '');
	}

	/** @type {Record<string, string>} */
	const input = {
		index: `${build_dir}/index.js`
	};

	// add entry points for every endpoint...
	manifest_data.routes.forEach((route) => {
		const file = route.type === 'endpoint' ? route.file : route.shadow;

		if (file) {
			const resolved = path__default.resolve(cwd, file);
			const relative = decodeURIComponent(path__default.relative(config.kit.files.routes, resolved));
			const name = posixify(path__default.join('entries/endpoints', relative.replace(/\.js$/, '')));
			input[name] = resolved;
		}
	});

	// ...and every component used by pages...
	manifest_data.components.forEach((file) => {
		const resolved = path__default.resolve(cwd, file);
		const relative = decodeURIComponent(path__default.relative(config.kit.files.routes, resolved));

		const name = relative.startsWith('..')
			? posixify(path__default.join('entries/fallbacks', path__default.basename(file)))
			: posixify(path__default.join('entries/pages', relative));
		input[name] = resolved;
	});

	// ...and every matcher
	Object.entries(manifest_data.matchers).forEach(([key, file]) => {
		const name = posixify(path__default.join('entries/matchers', key));
		input[name] = path__default.resolve(cwd, file);
	});

	/** @type {(file: string) => string} */
	const app_relative = (file) => {
		const relative_file = path__default.relative(build_dir, path__default.resolve(cwd, file));
		return relative_file[0] === '.' ? relative_file : `./${relative_file}`;
	};

	fs__default.writeFileSync(
		input.index,
		server_template({
			config,
			hooks: app_relative(hooks_file),
			has_service_worker: config.kit.serviceWorker.register && !!service_worker_entry_file,
			runtime: posixify(path__default.relative(build_dir, get_runtime_directory(config.kit))),
			template: load_template(cwd, config)
		})
	);

	const vite_config = await get_vite_config(vite_config_env);

	const merged_config = merge_vite_configs(
		get_default_config({ config, input, ssr: true, outDir: `${output_dir}/server` }),
		vite_config
	);

	remove_svelte_kit(merged_config);

	const { chunks } = await create_build(merged_config);

	/** @type {import('vite').Manifest} */
	const vite_manifest = JSON.parse(fs__default.readFileSync(`${output_dir}/server/manifest.json`, 'utf-8'));

	mkdirp(`${output_dir}/server/nodes`);
	mkdirp(`${output_dir}/server/stylesheets`);

	const stylesheet_lookup = new Map();

	client.assets.forEach((asset) => {
		if (asset.fileName.endsWith('.css')) {
			if (asset.source.length < config.kit.inlineStyleThreshold) {
				const index = stylesheet_lookup.size;
				const file = `${output_dir}/server/stylesheets/${index}.js`;

				fs__default.writeFileSync(file, `// ${asset.fileName}\nexport default ${s(asset.source)};`);
				stylesheet_lookup.set(asset.fileName, index);
			}
		}
	});

	manifest_data.components.forEach((component, i) => {
		const entry = find_deps$1(client.vite_manifest, component, true);

		const imports = [`import * as module from '../${vite_manifest[component].file}';`];

		const exports = [
			'export { module };',
			`export const index = ${i};`,
			`export const file = '${entry.file}';`,
			`export const imports = ${s(entry.imports)};`,
			`export const stylesheets = ${s(entry.stylesheets)};`
		];

		/** @type {string[]} */
		const styles = [];

		entry.stylesheets.forEach((file) => {
			if (stylesheet_lookup.has(file)) {
				const index = stylesheet_lookup.get(file);
				const name = `stylesheet_${index}`;
				imports.push(`import ${name} from '../stylesheets/${index}.js';`);
				styles.push(`\t${s(file)}: ${name}`);
			}
		});

		if (styles.length > 0) {
			exports.push(`export const inline_styles = () => ({\n${styles.join(',\n')}\n});`);
		}

		const out = `${output_dir}/server/nodes/${i}.js`;
		fs__default.writeFileSync(out, `${imports.join('\n')}\n\n${exports.join('\n')}\n`);
	});

	return {
		chunks,
		vite_manifest,
		methods: get_methods(cwd, chunks, manifest_data)
	};
}

/**
 * @param {string} cwd
 * @param {import('rollup').OutputChunk[]} output
 * @param {import('types').ManifestData} manifest_data
 */
function get_methods(cwd, output, manifest_data) {
	/** @type {Record<string, string[]>} */
	const lookup = {};
	output.forEach((chunk) => {
		if (!chunk.facadeModuleId) return;
		const id = chunk.facadeModuleId.slice(cwd.length + 1);
		lookup[id] = chunk.exports;
	});

	/** @type {Record<string, import('types').HttpMethod[]>} */
	const methods = {};
	manifest_data.routes.forEach((route) => {
		const file = route.type === 'endpoint' ? route.file : route.shadow;

		if (file && lookup[file]) {
			methods[file] = lookup[file].filter(is_http_method);
		}
	});

	return methods;
}

/**
 * @param {{
 *   config: import('types').ValidatedConfig;
 *   vite_config_env: import('vite').ConfigEnv;
 *   manifest_data: import('types').ManifestData;
 *   output_dir: string;
 *   service_worker_entry_file: string | null;
 * }} options
 * @param {import('types').Prerendered} prerendered
 * @param {import('vite').Manifest} client_manifest
 */
async function build_service_worker(
	{ config, vite_config_env, manifest_data, output_dir, service_worker_entry_file },
	prerendered,
	client_manifest
) {
	const build = new Set();
	for (const key in client_manifest) {
		const { file, css = [], assets = [] } = client_manifest[key];
		build.add(file);
		css.forEach((file) => build.add(file));
		assets.forEach((file) => build.add(file));
	}

	const service_worker = `${config.kit.outDir}/generated/service-worker.js`;

	fs__default.writeFileSync(
		service_worker,
		`
			// TODO remove for 1.0
			export const timestamp = {
				toString: () => {
					throw new Error('\`timestamp\` has been removed from $service-worker. Use \`version\` instead');
				}
			};

			export const build = [
				${Array.from(build)
					.map((file) => `${s(`${config.kit.paths.base}/${file}`)}`)
					.join(',\n\t\t\t\t')}
			];

			export const files = [
				${manifest_data.assets
					.filter((asset) => config.kit.serviceWorker.files(asset.file))
					.map((asset) => `${s(`${config.kit.paths.base}/${asset.file}`)}`)
					.join(',\n\t\t\t\t')}
			];

			export const prerendered = [
				${prerendered.paths.map((path) => s(path)).join(',\n\t\t\t\t')}
			];

			export const version = ${s(config.kit.version.name)};
		`
			.replace(/^\t{3}/gm, '')
			.trim()
	);

	const vite_config = await get_vite_config(vite_config_env);
	const merged_config = merge_vite_configs(vite_config, {
		base: assets_base(config.kit),
		build: {
			lib: {
				entry: /** @type {string} */ (service_worker_entry_file),
				name: 'app',
				formats: ['es']
			},
			rollupOptions: {
				output: {
					entryFileNames: 'service-worker.js'
				}
			},
			outDir: `${output_dir}/client`,
			emptyOutDir: false
		},
		// @ts-expect-error
		configFile: false,
		resolve: {
			alias: {
				'$service-worker': service_worker,
				$lib: config.kit.files.lib
			}
		}
	});

	remove_svelte_kit(merged_config);

	await vite.build(merged_config);
}

const absolute = /^([a-z]+:)?\/?\//;
const scheme = /^[a-z]+:/;

/**
 * @param {string} base
 * @param {string} path
 */
function resolve(base, path) {
	if (scheme.test(path)) return path;

	const base_match = absolute.exec(base);
	const path_match = absolute.exec(path);

	if (!base_match) {
		throw new Error(`bad base path: "${base}"`);
	}

	const baseparts = path_match ? [] : base.slice(base_match[0].length).split('/');
	const pathparts = path_match ? path.slice(path_match[0].length).split('/') : path.split('/');

	baseparts.pop();

	for (let i = 0; i < pathparts.length; i += 1) {
		const part = pathparts[i];
		if (part === '.') continue;
		else if (part === '..') baseparts.pop();
		else baseparts.push(part);
	}

	const prefix = (path_match && path_match[0]) || (base_match && base_match[0]) || '';

	return `${prefix}${baseparts.join('/')}`;
}

/** @param {string} path */
function is_root_relative(path) {
	return path[0] === '/' && path[1] !== '/';
}

/**
 * @typedef {{
 *   fn: () => Promise<any>,
 *   fulfil: (value: any) => void,
 *   reject: (error: Error) => void
 * }} Task
 */

/** @param {number} concurrency */
function queue(concurrency) {
	/** @type {Task[]} */
	const tasks = [];

	let current = 0;

	/** @type {(value?: any) => void} */
	let fulfil;

	/** @type {(error: Error) => void} */
	let reject;

	let closed = false;

	const done = new Promise((f, r) => {
		fulfil = f;
		reject = r;
	});

	done.catch(() => {
		// this is necessary in case a catch handler is never added
		// to the done promise by the user
	});

	function dequeue() {
		if (current < concurrency) {
			const task = tasks.shift();

			if (task) {
				current += 1;
				const promise = Promise.resolve(task.fn());

				promise
					.then(task.fulfil, (err) => {
						task.reject(err);
						reject(err);
					})
					.then(() => {
						current -= 1;
						dequeue();
					});
			} else if (current === 0) {
				closed = true;
				fulfil();
			}
		}
	}

	return {
		/** @param {() => any} fn */
		add: (fn) => {
			if (closed) throw new Error('Cannot add tasks to a queue that has ended');

			const promise = new Promise((fulfil, reject) => {
				tasks.push({ fn, fulfil, reject });
			});

			dequeue();
			return promise;
		},

		done: () => {
			if (current === 0) {
				closed = true;
				fulfil();
			}

			return done;
		}
	};
}

const DOCTYPE = 'DOCTYPE';
const CDATA_OPEN = '[CDATA[';
const CDATA_CLOSE = ']]>';
const COMMENT_OPEN = '--';
const COMMENT_CLOSE = '-->';

const TAG_OPEN = /[a-zA-Z]/;
const TAG_CHAR = /[a-zA-Z0-9]/;
const ATTRIBUTE_NAME = /[^\t\n\f />"'=]/;

const WHITESPACE = /[\s\n\r]/;

/** @param {string} html */
function crawl(html) {
	/** @type {string[]} */
	const hrefs = [];

	let i = 0;
	main: while (i < html.length) {
		const char = html[i];

		if (char === '<') {
			if (html[i + 1] === '!') {
				i += 2;

				if (html.slice(i, i + DOCTYPE.length).toUpperCase() === DOCTYPE) {
					i += DOCTYPE.length;
					while (i < html.length) {
						if (html[i++] === '>') {
							continue main;
						}
					}
				}

				// skip cdata
				if (html.slice(i, i + CDATA_OPEN.length) === CDATA_OPEN) {
					i += CDATA_OPEN.length;
					while (i < html.length) {
						if (html.slice(i, i + CDATA_CLOSE.length) === CDATA_CLOSE) {
							i += CDATA_CLOSE.length;
							continue main;
						}

						i += 1;
					}
				}

				// skip comments
				if (html.slice(i, i + COMMENT_OPEN.length) === COMMENT_OPEN) {
					i += COMMENT_OPEN.length;
					while (i < html.length) {
						if (html.slice(i, i + COMMENT_CLOSE.length) === COMMENT_CLOSE) {
							i += COMMENT_CLOSE.length;
							continue main;
						}

						i += 1;
					}
				}
			}

			// parse opening tags
			const start = ++i;
			if (TAG_OPEN.test(html[start])) {
				while (i < html.length) {
					if (!TAG_CHAR.test(html[i])) {
						break;
					}

					i += 1;
				}

				const tag = html.slice(start, i).toUpperCase();

				if (tag === 'SCRIPT' || tag === 'STYLE') {
					while (i < html.length) {
						if (
							html[i] === '<' &&
							html[i + 1] === '/' &&
							html.slice(i + 2, i + 2 + tag.length).toUpperCase() === tag
						) {
							continue main;
						}

						i += 1;
					}
				}

				let href = '';
				let rel = '';

				while (i < html.length) {
					const start = i;

					const char = html[start];
					if (char === '>') break;

					if (ATTRIBUTE_NAME.test(char)) {
						i += 1;

						while (i < html.length) {
							if (!ATTRIBUTE_NAME.test(html[i])) {
								break;
							}

							i += 1;
						}

						const name = html.slice(start, i).toLowerCase();

						while (WHITESPACE.test(html[i])) i += 1;

						if (html[i] === '=') {
							i += 1;
							while (WHITESPACE.test(html[i])) i += 1;

							let value;

							if (html[i] === "'" || html[i] === '"') {
								const quote = html[i++];

								const start = i;
								let escaped = false;

								while (i < html.length) {
									if (!escaped) {
										const char = html[i];

										if (html[i] === quote) {
											break;
										}

										if (char === '\\') {
											escaped = true;
										}
									}

									i += 1;
								}

								value = html.slice(start, i);
							} else {
								const start = i;
								while (html[i] !== '>' && !WHITESPACE.test(html[i])) i += 1;
								value = html.slice(start, i);

								i -= 1;
							}

							if (name === 'href') {
								href = value;
							} else if (name === 'rel') {
								rel = value;
							} else if (name === 'src') {
								hrefs.push(value);
							} else if (name === 'srcset') {
								const candidates = [];
								let insideURL = true;
								value = value.trim();
								for (let i = 0; i < value.length; i++) {
									if (value[i] === ',' && (!insideURL || (insideURL && value[i + 1] === ' '))) {
										candidates.push(value.slice(0, i));
										value = value.substring(i + 1).trim();
										i = 0;
										insideURL = true;
									} else if (value[i] === ' ') {
										insideURL = false;
									}
								}
								candidates.push(value);
								for (const candidate of candidates) {
									const src = candidate.split(WHITESPACE)[0];
									hrefs.push(src);
								}
							}
						} else {
							i -= 1;
						}
					}

					i += 1;
				}

				if (href && !/\bexternal\b/i.test(rel)) {
					hrefs.push(href);
				}
			}
		}

		i += 1;
	}

	return hrefs;
}

/**
 * Inside a script element, only `</script` and `<!--` hold special meaning to the HTML parser.
 *
 * The first closes the script element, so everything after is treated as raw HTML.
 * The second disables further parsing until `-->`, so the script element might be unexpectedly
 * kept open until until an unrelated HTML comment in the page.
 *
 * U+2028 LINE SEPARATOR and U+2029 PARAGRAPH SEPARATOR are escaped for the sake of pre-2018
 * browsers.
 *
 * @see tests for unsafe parsing examples.
 * @see https://html.spec.whatwg.org/multipage/scripting.html#restrictions-for-contents-of-script-elements
 * @see https://html.spec.whatwg.org/multipage/syntax.html#cdata-rcdata-restrictions
 * @see https://html.spec.whatwg.org/multipage/parsing.html#script-data-state
 * @see https://html.spec.whatwg.org/multipage/parsing.html#script-data-double-escaped-state
 * @see https://github.com/tc39/proposal-json-superset
 * @type {Record<string, string>}
 */
const render_json_payload_script_dict = {
	'<': '\\u003C',
	'\u2028': '\\u2028',
	'\u2029': '\\u2029'
};

new RegExp(
	`[${Object.keys(render_json_payload_script_dict).join('')}]`,
	'g'
);

/**
 * When inside a double-quoted attribute value, only `&` and `"` hold special meaning.
 * @see https://html.spec.whatwg.org/multipage/parsing.html#attribute-value-(double-quoted)-state
 * @type {Record<string, string>}
 */
const escape_html_attr_dict = {
	'&': '&amp;',
	'"': '&quot;'
};

const escape_html_attr_regex = new RegExp(
	// special characters
	`[${Object.keys(escape_html_attr_dict).join('')}]|` +
		// high surrogate without paired low surrogate
		'[\\ud800-\\udbff](?![\\udc00-\\udfff])|' +
		// a valid surrogate pair, the only match with 2 code units
		// we match it so that we can match unpaired low surrogates in the same pass
		// TODO: use lookbehind assertions once they are widely supported: (?<![\ud800-udbff])[\udc00-\udfff]
		'[\\ud800-\\udbff][\\udc00-\\udfff]|' +
		// unpaired low surrogate (see previous match)
		'[\\udc00-\\udfff]',
	'g'
);

/**
 * Formats a string to be used as an attribute's value in raw HTML.
 *
 * It escapes unpaired surrogates (which are allowed in js strings but invalid in HTML), escapes
 * characters that are special in attributes, and surrounds the whole string in double-quotes.
 *
 * @param {string} str
 * @returns {string} Escaped string surrounded by double-quotes.
 * @example const html = `<tag data-value=${escape_html_attr('value')}>...</tag>`;
 */
function escape_html_attr(str) {
	const escaped_str = str.replace(escape_html_attr_regex, (match) => {
		if (match.length === 2) {
			// valid surrogate pair
			return match;
		}

		return escape_html_attr_dict[match] ?? `&#${match.charCodeAt(0)};`;
	});

	return `"${escaped_str}"`;
}

/**
 * @typedef {import('types').PrerenderErrorHandler} PrerenderErrorHandler
 * @typedef {import('types').Logger} Logger
 */

/**
 * @param {Parameters<PrerenderErrorHandler>[0]} details
 * @param {import('types').ValidatedKitConfig} config
 */
function format_error({ status, path, referrer, referenceType }, config) {
	const message =
		status === 404 && !path.startsWith(config.paths.base)
			? `${path} does not begin with \`base\`, which is configured in \`paths.base\` and can be imported from \`$app/paths\``
			: path;

	return `${status} ${message}${referrer ? ` (${referenceType} from ${referrer})` : ''}`;
}

/**
 * @param {Logger} log
 * @param {import('types').ValidatedKitConfig} config
 * @returns {PrerenderErrorHandler}
 */
function normalise_error_handler(log, config) {
	switch (config.prerender.onError) {
		case 'continue':
			return (details) => {
				log.error(format_error(details, config));
			};
		case 'fail':
			return (details) => {
				throw new Error(format_error(details, config));
			};
		default:
			return config.prerender.onError;
	}
}

const OK = 2;
const REDIRECT = 3;

/**
 * @param {{
 *   config: import('types').ValidatedKitConfig;
 *   client_out_dir: string;
 *   manifest_path: string;
 *   log: Logger;
 * }} opts
 */
async function prerender({ config, client_out_dir, manifest_path, log }) {
	/** @type {import('types').Prerendered} */
	const prerendered = {
		pages: new Map(),
		assets: new Map(),
		redirects: new Map(),
		paths: []
	};

	if (!config.prerender.enabled) {
		return prerendered;
	}

	installPolyfills();
	const { fetch } = globalThis;
	globalThis.fetch = async (info, init) => {
		/** @type {string} */
		let url;

		/** @type {RequestInit} */
		let opts = {};

		if (info instanceof Request) {
			url = info.url;

			opts = {
				method: info.method,
				headers: info.headers,
				body: info.body,
				mode: info.mode,
				credentials: info.credentials,
				cache: info.cache,
				redirect: info.redirect,
				referrer: info.referrer,
				integrity: info.integrity
			};
		} else {
			url = info.toString();
		}

		if (url.startsWith(config.prerender.origin + '/')) {
			const request = new Request(url, opts);
			const response = await server.respond(request, {
				getClientAddress,
				prerendering: {
					dependencies: new Map()
				}
			});

			const decoded = new URL$1(url).pathname;

			save(
				'dependencies',
				response,
				Buffer.from(await response.clone().arrayBuffer()),
				decoded,
				encodeURI(decoded),
				null,
				'fetched'
			);

			return response;
		}

		return fetch(info, init);
	};

	const server_root = join(config.outDir, 'output');

	/** @type {import('types').ServerModule} */
	const { Server, override } = await import(pathToFileURL(`${server_root}/server/index.js`).href);

	/** @type {import('types').SSRManifest} */
	const manifest = (await import(pathToFileURL(`${server_root}/server/manifest.js`).href)).manifest;

	override({
		paths: config.paths,
		prerendering: true,
		read: (file) => readFileSync(join(config.files.assets, file))
	});

	const server = new Server(manifest);

	const error = normalise_error_handler(log, config);

	const q = queue(config.prerender.concurrency);

	/**
	 * @param {string} path
	 * @param {boolean} is_html
	 */
	function output_filename(path, is_html) {
		const file = path.slice(config.paths.base.length + 1) || 'index.html';

		if (is_html && !file.endsWith('.html')) {
			return file + (file.endsWith('/') ? 'index.html' : '.html');
		}

		return file;
	}

	const files = new Set([
		...walk(client_out_dir).map(posixify),
		...(existsSync(config.files.assets) ? walk(config.files.assets).map(posixify) : []) // TODO remove this if we use Vite publicDir option
	]);
	const seen = new Set();
	const written = new Set();

	/**
	 * @param {string | null} referrer
	 * @param {string} decoded
	 * @param {string} [encoded]
	 */
	function enqueue(referrer, decoded, encoded) {
		if (seen.has(decoded)) return;
		seen.add(decoded);

		const file = decoded.slice(config.paths.base.length + 1);
		if (files.has(file)) return;

		return q.add(() => visit(decoded, encoded || encodeURI(decoded), referrer));
	}

	/**
	 * @param {string} decoded
	 * @param {string} encoded
	 * @param {string?} referrer
	 */
	async function visit(decoded, encoded, referrer) {
		if (!decoded.startsWith(config.paths.base)) {
			error({ status: 404, path: decoded, referrer, referenceType: 'linked' });
			return;
		}

		/** @type {Map<string, import('types').PrerenderDependency>} */
		const dependencies = new Map();

		const response = await server.respond(new Request(config.prerender.origin + encoded), {
			getClientAddress,
			prerendering: {
				dependencies
			}
		});

		const body = Buffer.from(await response.arrayBuffer());

		save('pages', response, body, decoded, encoded, referrer, 'linked');

		for (const [dependency_path, result] of dependencies) {
			// this seems circuitous, but using new URL allows us to not care
			// whether dependency_path is encoded or not
			const encoded_dependency_path = new URL$1(dependency_path, 'http://localhost').pathname;
			const decoded_dependency_path = decodeURI(encoded_dependency_path);

			const body = result.body ?? new Uint8Array(await result.response.arrayBuffer());
			save(
				'dependencies',
				result.response,
				body,
				decoded_dependency_path,
				encoded_dependency_path,
				decoded,
				'fetched'
			);
		}

		if (config.prerender.crawl && response.headers.get('content-type') === 'text/html') {
			for (const href of crawl(body.toString())) {
				if (href.startsWith('data:') || href.startsWith('#')) continue;

				const resolved = resolve(encoded, href);
				if (!is_root_relative(resolved)) continue;

				const { pathname, search } = new URL$1(resolved, 'http://localhost');

				enqueue(decoded, decodeURI(pathname), pathname);
			}
		}
	}

	/**
	 * @param {'pages' | 'dependencies'} category
	 * @param {Response} response
	 * @param {string | Uint8Array} body
	 * @param {string} decoded
	 * @param {string} encoded
	 * @param {string | null} referrer
	 * @param {'linked' | 'fetched'} referenceType
	 */
	function save(category, response, body, decoded, encoded, referrer, referenceType) {
		const response_type = Math.floor(response.status / 100);
		const type = /** @type {string} */ (response.headers.get('content-type'));
		const is_html = response_type === REDIRECT || type === 'text/html';

		const file = output_filename(decoded, is_html);
		const dest = `${config.outDir}/output/prerendered/${category}/${file}`;

		if (written.has(file)) return;

		if (response_type === REDIRECT) {
			const location = response.headers.get('location');

			if (location) {
				const resolved = resolve(encoded, location);
				if (is_root_relative(resolved)) {
					enqueue(decoded, decodeURI(resolved), resolved);
				}

				if (!response.headers.get('x-sveltekit-normalize')) {
					mkdirp(dirname(dest));

					log.warn(`${response.status} ${decoded} -> ${location}`);

					writeFileSync(
						dest,
						`<meta http-equiv="refresh" content=${escape_html_attr(`0;url=${location}`)}>`
					);

					written.add(file);

					if (!prerendered.redirects.has(decoded)) {
						prerendered.redirects.set(decoded, {
							status: response.status,
							location: resolved
						});

						prerendered.paths.push(decoded);
					}
				}
			} else {
				log.warn(`location header missing on redirect received from ${decoded}`);
			}

			return;
		}

		if (response.status === 200) {
			mkdirp(dirname(dest));

			log.info(`${response.status} ${decoded}`);
			writeFileSync(dest, body);
			written.add(file);

			if (is_html) {
				prerendered.pages.set(decoded, {
					file
				});
			} else {
				prerendered.assets.set(decoded, {
					type
				});
			}

			prerendered.paths.push(decoded);
		} else if (response_type !== OK) {
			error({ status: response.status, path: decoded, referrer, referenceType });
		}
	}

	if (config.prerender.enabled) {
		for (const entry of config.prerender.entries) {
			if (entry === '*') {
				/** @type {import('types').ManifestData} */
				const { routes } = (await import(pathToFileURL(manifest_path).href)).manifest._;
				const entries = routes
					.map((route) => (route.type === 'page' ? route.path : ''))
					.filter(Boolean);

				for (const entry of entries) {
					enqueue(null, config.paths.base + entry); // TODO can we pre-normalize these?
				}
			} else {
				enqueue(null, config.paths.base + entry);
			}
		}

		await q.done();
	}

	const rendered = await server.respond(new Request(config.prerender.origin + '/[fallback]'), {
		getClientAddress,
		prerendering: {
			fallback: true,
			dependencies: new Map()
		}
	});

	const file = `${config.outDir}/output/prerendered/fallback.html`;
	mkdirp(dirname(file));
	writeFileSync(file, await rendered.text());

	return prerendered;
}

/** @return {string} */
function getClientAddress() {
	throw new Error('Cannot read clientAddress during prerendering');
}

function totalist(dir, callback, pre='') {
	dir = resolve$1('.', dir);
	let arr = readdirSync(dir);
	let i=0, abs, stats;
	for (; i < arr.length; i++) {
		abs = join(dir, arr[i]);
		stats = statSync(abs);
		stats.isDirectory()
			? totalist(abs, callback, join(pre, arr[i]))
			: callback(join(pre, arr[i]), abs, stats);
	}
}

/**
 * @typedef ParsedURL
 * @type {import('.').ParsedURL}
 */

/**
 * @typedef Request
 * @property {string} url
 * @property {ParsedURL} _parsedUrl
 */

/**
 * @param {Request} req
 * @returns {ParsedURL|void}
 */
function parse(req) {
	let raw = req.url;
	if (raw == null) return;

	let prev = req._parsedUrl;
	if (prev && prev.raw === raw) return prev;

	let pathname=raw, search='', query;

	if (raw.length > 1) {
		let idx = raw.indexOf('?', 1);

		if (idx !== -1) {
			search = raw.substring(idx);
			pathname = raw.substring(0, idx);
			if (search.length > 1) {
				query = qs.parse(search.substring(1));
			}
		}
	}

	return req._parsedUrl = { pathname, search, query, raw };
}

const mimes = {
  "ez": "application/andrew-inset",
  "aw": "application/applixware",
  "atom": "application/atom+xml",
  "atomcat": "application/atomcat+xml",
  "atomdeleted": "application/atomdeleted+xml",
  "atomsvc": "application/atomsvc+xml",
  "dwd": "application/atsc-dwd+xml",
  "held": "application/atsc-held+xml",
  "rsat": "application/atsc-rsat+xml",
  "bdoc": "application/bdoc",
  "xcs": "application/calendar+xml",
  "ccxml": "application/ccxml+xml",
  "cdfx": "application/cdfx+xml",
  "cdmia": "application/cdmi-capability",
  "cdmic": "application/cdmi-container",
  "cdmid": "application/cdmi-domain",
  "cdmio": "application/cdmi-object",
  "cdmiq": "application/cdmi-queue",
  "cu": "application/cu-seeme",
  "mpd": "application/dash+xml",
  "davmount": "application/davmount+xml",
  "dbk": "application/docbook+xml",
  "dssc": "application/dssc+der",
  "xdssc": "application/dssc+xml",
  "es": "application/ecmascript",
  "ecma": "application/ecmascript",
  "emma": "application/emma+xml",
  "emotionml": "application/emotionml+xml",
  "epub": "application/epub+zip",
  "exi": "application/exi",
  "fdt": "application/fdt+xml",
  "pfr": "application/font-tdpfr",
  "geojson": "application/geo+json",
  "gml": "application/gml+xml",
  "gpx": "application/gpx+xml",
  "gxf": "application/gxf",
  "gz": "application/gzip",
  "hjson": "application/hjson",
  "stk": "application/hyperstudio",
  "ink": "application/inkml+xml",
  "inkml": "application/inkml+xml",
  "ipfix": "application/ipfix",
  "its": "application/its+xml",
  "jar": "application/java-archive",
  "war": "application/java-archive",
  "ear": "application/java-archive",
  "ser": "application/java-serialized-object",
  "class": "application/java-vm",
  "js": "application/javascript",
  "mjs": "application/javascript",
  "json": "application/json",
  "map": "application/json",
  "json5": "application/json5",
  "jsonml": "application/jsonml+json",
  "jsonld": "application/ld+json",
  "lgr": "application/lgr+xml",
  "lostxml": "application/lost+xml",
  "hqx": "application/mac-binhex40",
  "cpt": "application/mac-compactpro",
  "mads": "application/mads+xml",
  "webmanifest": "application/manifest+json",
  "mrc": "application/marc",
  "mrcx": "application/marcxml+xml",
  "ma": "application/mathematica",
  "nb": "application/mathematica",
  "mb": "application/mathematica",
  "mathml": "application/mathml+xml",
  "mbox": "application/mbox",
  "mscml": "application/mediaservercontrol+xml",
  "metalink": "application/metalink+xml",
  "meta4": "application/metalink4+xml",
  "mets": "application/mets+xml",
  "maei": "application/mmt-aei+xml",
  "musd": "application/mmt-usd+xml",
  "mods": "application/mods+xml",
  "m21": "application/mp21",
  "mp21": "application/mp21",
  "mp4s": "application/mp4",
  "m4p": "application/mp4",
  "doc": "application/msword",
  "dot": "application/msword",
  "mxf": "application/mxf",
  "nq": "application/n-quads",
  "nt": "application/n-triples",
  "cjs": "application/node",
  "bin": "application/octet-stream",
  "dms": "application/octet-stream",
  "lrf": "application/octet-stream",
  "mar": "application/octet-stream",
  "so": "application/octet-stream",
  "dist": "application/octet-stream",
  "distz": "application/octet-stream",
  "pkg": "application/octet-stream",
  "bpk": "application/octet-stream",
  "dump": "application/octet-stream",
  "elc": "application/octet-stream",
  "deploy": "application/octet-stream",
  "exe": "application/octet-stream",
  "dll": "application/octet-stream",
  "deb": "application/octet-stream",
  "dmg": "application/octet-stream",
  "iso": "application/octet-stream",
  "img": "application/octet-stream",
  "msi": "application/octet-stream",
  "msp": "application/octet-stream",
  "msm": "application/octet-stream",
  "buffer": "application/octet-stream",
  "oda": "application/oda",
  "opf": "application/oebps-package+xml",
  "ogx": "application/ogg",
  "omdoc": "application/omdoc+xml",
  "onetoc": "application/onenote",
  "onetoc2": "application/onenote",
  "onetmp": "application/onenote",
  "onepkg": "application/onenote",
  "oxps": "application/oxps",
  "relo": "application/p2p-overlay+xml",
  "xer": "application/patch-ops-error+xml",
  "pdf": "application/pdf",
  "pgp": "application/pgp-encrypted",
  "asc": "application/pgp-signature",
  "sig": "application/pgp-signature",
  "prf": "application/pics-rules",
  "p10": "application/pkcs10",
  "p7m": "application/pkcs7-mime",
  "p7c": "application/pkcs7-mime",
  "p7s": "application/pkcs7-signature",
  "p8": "application/pkcs8",
  "ac": "application/pkix-attr-cert",
  "cer": "application/pkix-cert",
  "crl": "application/pkix-crl",
  "pkipath": "application/pkix-pkipath",
  "pki": "application/pkixcmp",
  "pls": "application/pls+xml",
  "ai": "application/postscript",
  "eps": "application/postscript",
  "ps": "application/postscript",
  "provx": "application/provenance+xml",
  "cww": "application/prs.cww",
  "pskcxml": "application/pskc+xml",
  "raml": "application/raml+yaml",
  "rdf": "application/rdf+xml",
  "owl": "application/rdf+xml",
  "rif": "application/reginfo+xml",
  "rnc": "application/relax-ng-compact-syntax",
  "rl": "application/resource-lists+xml",
  "rld": "application/resource-lists-diff+xml",
  "rs": "application/rls-services+xml",
  "rapd": "application/route-apd+xml",
  "sls": "application/route-s-tsid+xml",
  "rusd": "application/route-usd+xml",
  "gbr": "application/rpki-ghostbusters",
  "mft": "application/rpki-manifest",
  "roa": "application/rpki-roa",
  "rsd": "application/rsd+xml",
  "rss": "application/rss+xml",
  "rtf": "application/rtf",
  "sbml": "application/sbml+xml",
  "scq": "application/scvp-cv-request",
  "scs": "application/scvp-cv-response",
  "spq": "application/scvp-vp-request",
  "spp": "application/scvp-vp-response",
  "sdp": "application/sdp",
  "senmlx": "application/senml+xml",
  "sensmlx": "application/sensml+xml",
  "setpay": "application/set-payment-initiation",
  "setreg": "application/set-registration-initiation",
  "shf": "application/shf+xml",
  "siv": "application/sieve",
  "sieve": "application/sieve",
  "smi": "application/smil+xml",
  "smil": "application/smil+xml",
  "rq": "application/sparql-query",
  "srx": "application/sparql-results+xml",
  "gram": "application/srgs",
  "grxml": "application/srgs+xml",
  "sru": "application/sru+xml",
  "ssdl": "application/ssdl+xml",
  "ssml": "application/ssml+xml",
  "swidtag": "application/swid+xml",
  "tei": "application/tei+xml",
  "teicorpus": "application/tei+xml",
  "tfi": "application/thraud+xml",
  "tsd": "application/timestamped-data",
  "toml": "application/toml",
  "trig": "application/trig",
  "ttml": "application/ttml+xml",
  "ubj": "application/ubjson",
  "rsheet": "application/urc-ressheet+xml",
  "td": "application/urc-targetdesc+xml",
  "vxml": "application/voicexml+xml",
  "wasm": "application/wasm",
  "wgt": "application/widget",
  "hlp": "application/winhlp",
  "wsdl": "application/wsdl+xml",
  "wspolicy": "application/wspolicy+xml",
  "xaml": "application/xaml+xml",
  "xav": "application/xcap-att+xml",
  "xca": "application/xcap-caps+xml",
  "xdf": "application/xcap-diff+xml",
  "xel": "application/xcap-el+xml",
  "xns": "application/xcap-ns+xml",
  "xenc": "application/xenc+xml",
  "xhtml": "application/xhtml+xml",
  "xht": "application/xhtml+xml",
  "xlf": "application/xliff+xml",
  "xml": "application/xml",
  "xsl": "application/xml",
  "xsd": "application/xml",
  "rng": "application/xml",
  "dtd": "application/xml-dtd",
  "xop": "application/xop+xml",
  "xpl": "application/xproc+xml",
  "xslt": "application/xml",
  "xspf": "application/xspf+xml",
  "mxml": "application/xv+xml",
  "xhvml": "application/xv+xml",
  "xvml": "application/xv+xml",
  "xvm": "application/xv+xml",
  "yang": "application/yang",
  "yin": "application/yin+xml",
  "zip": "application/zip",
  "3gpp": "video/3gpp",
  "adp": "audio/adpcm",
  "amr": "audio/amr",
  "au": "audio/basic",
  "snd": "audio/basic",
  "mid": "audio/midi",
  "midi": "audio/midi",
  "kar": "audio/midi",
  "rmi": "audio/midi",
  "mxmf": "audio/mobile-xmf",
  "mp3": "audio/mpeg",
  "m4a": "audio/mp4",
  "mp4a": "audio/mp4",
  "mpga": "audio/mpeg",
  "mp2": "audio/mpeg",
  "mp2a": "audio/mpeg",
  "m2a": "audio/mpeg",
  "m3a": "audio/mpeg",
  "oga": "audio/ogg",
  "ogg": "audio/ogg",
  "spx": "audio/ogg",
  "opus": "audio/ogg",
  "s3m": "audio/s3m",
  "sil": "audio/silk",
  "wav": "audio/wav",
  "weba": "audio/webm",
  "xm": "audio/xm",
  "ttc": "font/collection",
  "otf": "font/otf",
  "ttf": "font/ttf",
  "woff": "font/woff",
  "woff2": "font/woff2",
  "exr": "image/aces",
  "apng": "image/apng",
  "avif": "image/avif",
  "bmp": "image/bmp",
  "cgm": "image/cgm",
  "drle": "image/dicom-rle",
  "emf": "image/emf",
  "fits": "image/fits",
  "g3": "image/g3fax",
  "gif": "image/gif",
  "heic": "image/heic",
  "heics": "image/heic-sequence",
  "heif": "image/heif",
  "heifs": "image/heif-sequence",
  "hej2": "image/hej2k",
  "hsj2": "image/hsj2",
  "ief": "image/ief",
  "jls": "image/jls",
  "jp2": "image/jp2",
  "jpg2": "image/jp2",
  "jpeg": "image/jpeg",
  "jpg": "image/jpeg",
  "jpe": "image/jpeg",
  "jph": "image/jph",
  "jhc": "image/jphc",
  "jpm": "image/jpm",
  "jpx": "image/jpx",
  "jpf": "image/jpx",
  "jxr": "image/jxr",
  "jxra": "image/jxra",
  "jxrs": "image/jxrs",
  "jxs": "image/jxs",
  "jxsc": "image/jxsc",
  "jxsi": "image/jxsi",
  "jxss": "image/jxss",
  "ktx": "image/ktx",
  "ktx2": "image/ktx2",
  "png": "image/png",
  "btif": "image/prs.btif",
  "pti": "image/prs.pti",
  "sgi": "image/sgi",
  "svg": "image/svg+xml",
  "svgz": "image/svg+xml",
  "t38": "image/t38",
  "tif": "image/tiff",
  "tiff": "image/tiff",
  "tfx": "image/tiff-fx",
  "webp": "image/webp",
  "wmf": "image/wmf",
  "disposition-notification": "message/disposition-notification",
  "u8msg": "message/global",
  "u8dsn": "message/global-delivery-status",
  "u8mdn": "message/global-disposition-notification",
  "u8hdr": "message/global-headers",
  "eml": "message/rfc822",
  "mime": "message/rfc822",
  "3mf": "model/3mf",
  "gltf": "model/gltf+json",
  "glb": "model/gltf-binary",
  "igs": "model/iges",
  "iges": "model/iges",
  "msh": "model/mesh",
  "mesh": "model/mesh",
  "silo": "model/mesh",
  "mtl": "model/mtl",
  "obj": "model/obj",
  "stpz": "model/step+zip",
  "stpxz": "model/step-xml+zip",
  "stl": "model/stl",
  "wrl": "model/vrml",
  "vrml": "model/vrml",
  "x3db": "model/x3d+fastinfoset",
  "x3dbz": "model/x3d+binary",
  "x3dv": "model/x3d-vrml",
  "x3dvz": "model/x3d+vrml",
  "x3d": "model/x3d+xml",
  "x3dz": "model/x3d+xml",
  "appcache": "text/cache-manifest",
  "manifest": "text/cache-manifest",
  "ics": "text/calendar",
  "ifb": "text/calendar",
  "coffee": "text/coffeescript",
  "litcoffee": "text/coffeescript",
  "css": "text/css",
  "csv": "text/csv",
  "html": "text/html",
  "htm": "text/html",
  "shtml": "text/html",
  "jade": "text/jade",
  "jsx": "text/jsx",
  "less": "text/less",
  "markdown": "text/markdown",
  "md": "text/markdown",
  "mml": "text/mathml",
  "mdx": "text/mdx",
  "n3": "text/n3",
  "txt": "text/plain",
  "text": "text/plain",
  "conf": "text/plain",
  "def": "text/plain",
  "list": "text/plain",
  "log": "text/plain",
  "in": "text/plain",
  "ini": "text/plain",
  "dsc": "text/prs.lines.tag",
  "rtx": "text/richtext",
  "sgml": "text/sgml",
  "sgm": "text/sgml",
  "shex": "text/shex",
  "slim": "text/slim",
  "slm": "text/slim",
  "spdx": "text/spdx",
  "stylus": "text/stylus",
  "styl": "text/stylus",
  "tsv": "text/tab-separated-values",
  "t": "text/troff",
  "tr": "text/troff",
  "roff": "text/troff",
  "man": "text/troff",
  "me": "text/troff",
  "ms": "text/troff",
  "ttl": "text/turtle",
  "uri": "text/uri-list",
  "uris": "text/uri-list",
  "urls": "text/uri-list",
  "vcard": "text/vcard",
  "vtt": "text/vtt",
  "yaml": "text/yaml",
  "yml": "text/yaml",
  "3gp": "video/3gpp",
  "3g2": "video/3gpp2",
  "h261": "video/h261",
  "h263": "video/h263",
  "h264": "video/h264",
  "m4s": "video/iso.segment",
  "jpgv": "video/jpeg",
  "jpgm": "image/jpm",
  "mj2": "video/mj2",
  "mjp2": "video/mj2",
  "ts": "video/mp2t",
  "mp4": "video/mp4",
  "mp4v": "video/mp4",
  "mpg4": "video/mp4",
  "mpeg": "video/mpeg",
  "mpg": "video/mpeg",
  "mpe": "video/mpeg",
  "m1v": "video/mpeg",
  "m2v": "video/mpeg",
  "ogv": "video/ogg",
  "qt": "video/quicktime",
  "mov": "video/quicktime",
  "webm": "video/webm"
};

function lookup(extn) {
	let tmp = ('' + extn).trim().toLowerCase();
	let idx = tmp.lastIndexOf('.');
	return mimes[!~idx ? tmp : tmp.substring(++idx)];
}

const noop = () => {};

function isMatch(uri, arr) {
	for (let i=0; i < arr.length; i++) {
		if (arr[i].test(uri)) return true;
	}
}

function toAssume(uri, extns) {
	let i=0, x, len=uri.length - 1;
	if (uri.charCodeAt(len) === 47) {
		uri = uri.substring(0, len);
	}

	let arr=[], tmp=`${uri}/index`;
	for (; i < extns.length; i++) {
		x = extns[i] ? `.${extns[i]}` : '';
		if (uri) arr.push(uri + x);
		arr.push(tmp + x);
	}

	return arr;
}

function viaCache(cache, uri, extns) {
	let i=0, data, arr=toAssume(uri, extns);
	for (; i < arr.length; i++) {
		if (data = cache[arr[i]]) return data;
	}
}

function viaLocal(dir, isEtag, uri, extns) {
	let i=0, arr=toAssume(uri, extns);
	let abs, stats, name, headers;
	for (; i < arr.length; i++) {
		abs = normalize(join(dir, name=arr[i]));
		if (abs.startsWith(dir) && fs.existsSync(abs)) {
			stats = fs.statSync(abs);
			if (stats.isDirectory()) continue;
			headers = toHeaders(name, stats, isEtag);
			headers['Cache-Control'] = isEtag ? 'no-cache' : 'no-store';
			return { abs, stats, headers };
		}
	}
}

function is404(req, res) {
	return (res.statusCode=404,res.end());
}

function send(req, res, file, stats, headers) {
	let code=200, tmp, opts={};
	headers = { ...headers };

	for (let key in headers) {
		tmp = res.getHeader(key);
		if (tmp) headers[key] = tmp;
	}

	if (tmp = res.getHeader('content-type')) {
		headers['Content-Type'] = tmp;
	}

	if (req.headers.range) {
		code = 206;
		let [x, y] = req.headers.range.replace('bytes=', '').split('-');
		let end = opts.end = parseInt(y, 10) || stats.size - 1;
		let start = opts.start = parseInt(x, 10) || 0;

		if (start >= stats.size || end >= stats.size) {
			res.setHeader('Content-Range', `bytes */${stats.size}`);
			res.statusCode = 416;
			return res.end();
		}

		headers['Content-Range'] = `bytes ${start}-${end}/${stats.size}`;
		headers['Content-Length'] = (end - start + 1);
		headers['Accept-Ranges'] = 'bytes';
	}

	res.writeHead(code, headers);
	fs.createReadStream(file, opts).pipe(res);
}

const ENCODING = {
	'.br': 'br',
	'.gz': 'gzip',
};

function toHeaders(name, stats, isEtag) {
	let enc = ENCODING[name.slice(-3)];

	let ctype = lookup(name.slice(0, enc && -3)) || '';
	if (ctype === 'text/html') ctype += ';charset=utf-8';

	let headers = {
		'Content-Length': stats.size,
		'Content-Type': ctype,
		'Last-Modified': stats.mtime.toUTCString(),
	};

	if (enc) headers['Content-Encoding'] = enc;
	if (isEtag) headers['ETag'] = `W/"${stats.size}-${stats.mtime.getTime()}"`;

	return headers;
}

function sirv (dir, opts={}) {
	dir = resolve$1(dir || '.');

	let isNotFound = opts.onNoMatch || is404;
	let setHeaders = opts.setHeaders || noop;

	let extensions = opts.extensions || ['html', 'htm'];
	let gzips = opts.gzip && extensions.map(x => `${x}.gz`).concat('gz');
	let brots = opts.brotli && extensions.map(x => `${x}.br`).concat('br');

	const FILES = {};

	let fallback = '/';
	let isEtag = !!opts.etag;
	let isSPA = !!opts.single;
	if (typeof opts.single === 'string') {
		let idx = opts.single.lastIndexOf('.');
		fallback += !!~idx ? opts.single.substring(0, idx) : opts.single;
	}

	let ignores = [];
	if (opts.ignores !== false) {
		ignores.push(/[/]([A-Za-z\s\d~$._-]+\.\w+){1,}$/); // any extn
		if (opts.dotfiles) ignores.push(/\/\.\w/);
		else ignores.push(/\/\.well-known/);
		[].concat(opts.ignores || []).forEach(x => {
			ignores.push(new RegExp(x, 'i'));
		});
	}

	let cc = opts.maxAge != null && `public,max-age=${opts.maxAge}`;
	if (cc && opts.immutable) cc += ',immutable';
	else if (cc && opts.maxAge === 0) cc += ',must-revalidate';

	if (!opts.dev) {
		totalist(dir, (name, abs, stats) => {
			if (/\.well-known[\\+\/]/.test(name)) ; // keep
			else if (!opts.dotfiles && /(^\.|[\\+|\/+]\.)/.test(name)) return;

			let headers = toHeaders(name, stats, isEtag);
			if (cc) headers['Cache-Control'] = cc;

			FILES['/' + name.normalize().replace(/\\+/g, '/')] = { abs, stats, headers };
		});
	}

	let lookup = opts.dev ? viaLocal.bind(0, dir, isEtag) : viaCache.bind(0, FILES);

	return function (req, res, next) {
		let extns = [''];
		let pathname = parse(req).pathname;
		let val = req.headers['accept-encoding'] || '';
		if (gzips && val.includes('gzip')) extns.unshift(...gzips);
		if (brots && /(br|brotli)/i.test(val)) extns.unshift(...brots);
		extns.push(...extensions); // [...br, ...gz, orig, ...exts]

		if (pathname.indexOf('%') !== -1) {
			try { pathname = decodeURIComponent(pathname); }
			catch (err) { /* malform uri */ }
		}

		let data = lookup(pathname, extns) || isSPA && !isMatch(pathname, ignores) && lookup(fallback, extns);
		if (!data) return next ? next() : isNotFound(req, res);

		if (isEtag && req.headers['if-none-match'] === data.headers['ETag']) {
			res.writeHead(304);
			return res.end();
		}

		if (gzips || brots) {
			res.setHeader('Vary', 'Accept-Encoding');
		}

		setHeaders(res, pathname, data.stats);
		send(req, res, data.abs, data.stats, data.headers);
	};
}

// in `vite dev` and `vite preview`, we use a fake asset path so that we can
// serve local assets while verifying that requests are correctly prefixed
const SVELTE_KIT_ASSETS = '/_svelte_kit_assets';

// Vite doesn't expose this so we just copy the list for now
// https://github.com/vitejs/vite/blob/3edd1af56e980aef56641a5a51cf2932bb580d41/packages/vite/src/node/plugins/css.ts#L96
const style_pattern = /\.(css|less|sass|scss|styl|stylus|pcss|postcss)$/;

const cwd$1 = process.cwd();

/**
 * @param {import('vite').ViteDevServer} vite
 * @param {import('vite').ResolvedConfig} vite_config
 * @param {import('types').ValidatedConfig} svelte_config
 * @return {Promise<Promise<() => void>>}
 */
async function dev(vite, vite_config, svelte_config) {
	installPolyfills();

	init(svelte_config);

	const runtime = get_runtime_prefix(svelte_config.kit);

	/** @type {import('types').Respond} */
	const respond = (await import(`${runtime}/server/index.js`)).respond;

	/** @type {import('types').SSRManifest} */
	let manifest;

	function update_manifest() {
		const { manifest_data } = update(svelte_config);

		manifest = {
			appDir: svelte_config.kit.appDir,
			assets: new Set(manifest_data.assets.map((asset) => asset.file)),
			mimeTypes: get_mime_lookup(manifest_data),
			_: {
				entry: {
					file: `/@fs${runtime}/client/start.js`,
					imports: [],
					stylesheets: []
				},
				nodes: manifest_data.components.map((id, index) => {
					return async () => {
						const url = id.startsWith('..') ? `/@fs${path__default.posix.resolve(id)}` : `/${id}`;

						const module = /** @type {import('types').SSRComponent} */ (
							await vite.ssrLoadModule(url)
						);

						return {
							module,
							index,
							file: url.endsWith('.svelte') ? url : url + '?import',
							imports: [],
							stylesheets: [],
							// in dev we inline all styles to avoid FOUC
							inline_styles: async () => {
								const node = await vite.moduleGraph.getModuleByUrl(url);

								if (!node) throw new Error(`Could not find node for ${url}`);

								const deps = new Set();
								await find_deps(vite, node, deps);

								/** @type {Record<string, string>} */
								const styles = {};

								for (const dep of deps) {
									const parsed = new URL$1(dep.url, 'http://localhost/');
									const query = parsed.searchParams;

									if (
										style_pattern.test(dep.file) ||
										(query.has('svelte') && query.get('type') === 'style')
									) {
										try {
											const mod = await vite.ssrLoadModule(dep.url);
											styles[dep.url] = mod.default;
										} catch {
											// this can happen with dynamically imported modules, I think
											// because the Vite module graph doesn't distinguish between
											// static and dynamic imports? TODO investigate, submit fix
										}
									}
								}

								return styles;
							}
						};
					};
				}),
				routes: manifest_data.routes.map((route) => {
					const { pattern, names, types } = parse_route_id(route.id);

					if (route.type === 'page') {
						return {
							type: 'page',
							id: route.id,
							pattern,
							names,
							types,
							shadow: route.shadow
								? async () => {
										const url = path__default.resolve(cwd$1, /** @type {string} */ (route.shadow));
										return await vite.ssrLoadModule(url);
								  }
								: null,
							a: route.a.map((id) => (id ? manifest_data.components.indexOf(id) : undefined)),
							b: route.b.map((id) => (id ? manifest_data.components.indexOf(id) : undefined))
						};
					}

					return {
						type: 'endpoint',
						id: route.id,
						pattern,
						names,
						types,
						load: async () => {
							const url = path__default.resolve(cwd$1, route.file);
							return await vite.ssrLoadModule(url);
						}
					};
				}),
				matchers: async () => {
					/** @type {Record<string, import('types').ParamMatcher>} */
					const matchers = {};

					for (const key in manifest_data.matchers) {
						const file = manifest_data.matchers[key];
						const url = path__default.resolve(cwd$1, file);
						const module = await vite.ssrLoadModule(url);

						if (module.match) {
							matchers[key] = module.match;
						} else {
							throw new Error(`${file} does not export a \`match\` function`);
						}
					}

					return matchers;
				}
			}
		};
	}

	/** @param {Error} error */
	function fix_stack_trace(error) {
		return error.stack ? vite.ssrRewriteStacktrace(error.stack) : error.stack;
	}

	update_manifest();

	for (const event of ['add', 'unlink']) {
		vite.watcher.on(event, (file) => {
			if (file.startsWith(svelte_config.kit.files.routes + path__default.sep)) {
				update_manifest();
			}
		});
	}

	const assets = svelte_config.kit.paths.assets ? SVELTE_KIT_ASSETS : svelte_config.kit.paths.base;
	const asset_server = sirv(svelte_config.kit.files.assets, {
		dev: true,
		etag: true,
		maxAge: 0,
		extensions: []
	});

	return () => {
		const serve_static_middleware = vite.middlewares.stack.find(
			(middleware) =>
				/** @type {function} */ (middleware.handle).name === 'viteServeStaticMiddleware'
		);

		remove_html_middlewares(vite.middlewares);

		vite.middlewares.use(async (req, res) => {
			try {
				if (!req.url || !req.method) throw new Error('Incomplete request');

				const base = `${vite.config.server.https ? 'https' : 'http'}://${
					req.headers[':authority'] || req.headers.host
				}`;

				const decoded = decodeURI(new URL$1(base + req.url).pathname);

				if (decoded.startsWith(assets)) {
					const pathname = decoded.slice(assets.length);
					const file = svelte_config.kit.files.assets + pathname;

					if (fs__default.existsSync(file) && !fs__default.statSync(file).isDirectory()) {
						if (has_correct_case(file, svelte_config.kit.files.assets)) {
							req.url = encodeURI(pathname); // don't need query/hash
							asset_server(req, res);
							return;
						}
					}
				}

				const file = posixify(path__default.resolve(decoded.slice(1)));
				const is_file = fs__default.existsSync(file) && !fs__default.statSync(file).isDirectory();
				const allowed =
					!vite_config.server.fs.strict ||
					vite_config.server.fs.allow.some((dir) => file.startsWith(dir));

				if (is_file && allowed) {
					// @ts-expect-error
					serve_static_middleware.handle(req, res);
					return;
				}

				if (!decoded.startsWith(svelte_config.kit.paths.base)) {
					return not_found(
						res,
						`Not found (did you mean ${svelte_config.kit.paths.base + req.url}?)`
					);
				}

				/** @type {Partial<import('types').Hooks>} */
				const user_hooks = resolve_entry(svelte_config.kit.files.hooks)
					? await vite.ssrLoadModule(`/${svelte_config.kit.files.hooks}`)
					: {};

				const handle = user_hooks.handle || (({ event, resolve }) => resolve(event));

				/** @type {import('types').Hooks} */
				const hooks = {
					getSession: user_hooks.getSession || (() => ({})),
					handle,
					handleError:
						user_hooks.handleError ||
						(({ /** @type {Error & { frame?: string }} */ error }) => {
							console.error($.bold().red(error.message));
							if (error.frame) {
								console.error($.gray(error.frame));
							}
							if (error.stack) {
								console.error($.gray(error.stack));
							}
						}),
					externalFetch: user_hooks.externalFetch || fetch
				};

				if (/** @type {any} */ (hooks).getContext) {
					// TODO remove this for 1.0
					throw new Error(
						'The getContext hook has been removed. See https://kit.svelte.dev/docs/hooks'
					);
				}

				if (/** @type {any} */ (hooks).serverFetch) {
					// TODO remove this for 1.0
					throw new Error('The serverFetch hook has been renamed to externalFetch.');
				}

				// TODO the / prefix will probably fail if outDir is outside the cwd (which
				// could be the case in a monorepo setup), but without it these modules
				// can get loaded twice via different URLs, which causes failures. Might
				// require changes to Vite to fix
				const { default: root } = await vite.ssrLoadModule(
					`/${posixify(path__default.relative(cwd$1, `${svelte_config.kit.outDir}/generated/root.svelte`))}`
				);

				const paths = await vite.ssrLoadModule(
					true
						? `/${posixify(path__default.relative(cwd$1, `${svelte_config.kit.outDir}/runtime/paths.js`))}`
						: `/@fs${runtime}/paths.js`
				);

				paths.set_paths({
					base: svelte_config.kit.paths.base,
					assets
				});

				let request;

				try {
					request = await getRequest(base, req);
				} catch (/** @type {any} */ err) {
					res.statusCode = err.status || 400;
					return res.end(err.reason || 'Invalid request body');
				}

				const template = load_template(cwd$1, svelte_config);

				const rendered = await respond(
					request,
					{
						csp: svelte_config.kit.csp,
						dev: true,
						get_stack: (error) => fix_stack_trace(error),
						handle_error: (error, event) => {
							hooks.handleError({
								error: new Proxy(error, {
									get: (target, property) => {
										if (property === 'stack') {
											return fix_stack_trace(error);
										}

										return Reflect.get(target, property, target);
									}
								}),
								event,

								// TODO remove for 1.0
								// @ts-expect-error
								get request() {
									throw new Error(
										'request in handleError has been replaced with event. See https://github.com/sveltejs/kit/pull/3384 for details'
									);
								}
							});
						},
						hooks,
						hydrate: svelte_config.kit.browser.hydrate,
						manifest,
						method_override: svelte_config.kit.methodOverride,
						paths: {
							base: svelte_config.kit.paths.base,
							assets
						},
						prefix: '',
						prerender: {
							default: svelte_config.kit.prerender.default,
							enabled: svelte_config.kit.prerender.enabled
						},
						read: (file) => fs__default.readFileSync(path__default.join(svelte_config.kit.files.assets, file)),
						root,
						router: svelte_config.kit.browser.router,
						template: ({ head, body, assets, nonce }) => {
							return (
								template
									.replace(/%sveltekit\.assets%/g, assets)
									.replace(/%sveltekit\.nonce%/g, nonce)
									// head and body must be replaced last, in case someone tries to sneak in %sveltekit.assets% etc
									.replace('%sveltekit.head%', () => head)
									.replace('%sveltekit.body%', () => body)
							);
						},
						template_contains_nonce: template.includes('%sveltekit.nonce%'),
						trailing_slash: svelte_config.kit.trailingSlash
					},
					{
						getClientAddress: () => {
							const { remoteAddress } = req.socket;
							if (remoteAddress) return remoteAddress;
							throw new Error('Could not determine clientAddress');
						}
					}
				);

				if (rendered.status === 404) {
					// @ts-expect-error
					serve_static_middleware.handle(req, res, () => {
						setResponse(res, rendered);
					});
				} else {
					setResponse(res, rendered);
				}
			} catch (e) {
				const error = coalesce_to_error(e);
				res.statusCode = 500;
				res.end(fix_stack_trace(error));
			}
		});
	};
}

/** @param {import('http').ServerResponse} res */
function not_found(res, message = 'Not found') {
	res.statusCode = 404;
	res.end(message);
}

/**
 * @param {import('connect').Server} server
 */
function remove_html_middlewares(server) {
	const html_middlewares = ['viteServeStaticMiddleware'];
	for (let i = server.stack.length - 1; i > 0; i--) {
		// @ts-expect-error using internals until https://github.com/vitejs/vite/pull/4640 is merged
		if (html_middlewares.includes(server.stack[i].handle.name)) {
			server.stack.splice(i, 1);
		}
	}
}

/**
 * @param {import('vite').ViteDevServer} vite
 * @param {import('vite').ModuleNode} node
 * @param {Set<import('vite').ModuleNode>} deps
 */
async function find_deps(vite, node, deps) {
	// since `ssrTransformResult.deps` contains URLs instead of `ModuleNode`s, this process is asynchronous.
	// instead of using `await`, we resolve all branches in parallel.
	/** @type {Promise<void>[]} */
	const branches = [];

	/** @param {import('vite').ModuleNode} node */
	async function add(node) {
		if (!deps.has(node)) {
			deps.add(node);
			await find_deps(vite, node, deps);
		}
	}

	/** @param {string} url */
	async function add_by_url(url) {
		const node = await vite.moduleGraph.getModuleByUrl(url);

		if (node) {
			await add(node);
		}
	}

	if (node.ssrTransformResult) {
		if (node.ssrTransformResult.deps) {
			node.ssrTransformResult.deps.forEach((url) => branches.push(add_by_url(url)));
		}

		if (node.ssrTransformResult.dynamicDeps) {
			node.ssrTransformResult.dynamicDeps.forEach((url) => branches.push(add_by_url(url)));
		}
	} else {
		node.importedModules.forEach((node) => branches.push(add(node)));
	}

	await Promise.all(branches);
}

/**
 * Determine if a file is being requested with the correct case,
 * to ensure consistent behaviour between dev and prod and across
 * operating systems. Note that we can't use realpath here,
 * because we don't want to follow symlinks
 * @param {string} file
 * @param {string} assets
 * @returns {boolean}
 */
function has_correct_case(file, assets) {
	if (file === assets) return true;

	const parent = path__default.dirname(file);

	if (fs__default.readdirSync(parent).includes(path__default.basename(file))) {
		return has_correct_case(parent, assets);
	}

	return false;
}

/**
 * Generates the data used to write the server-side manifest.js file. This data is used in the Vite
 * build process, to power routing, etc.
 * @param {{
 *   build_data: import('types').BuildData;
 *   relative_path: string;
 *   routes: import('types').RouteData[];
 *   format?: 'esm' | 'cjs'
 * }} opts
 */
function generate_manifest({ build_data, relative_path, routes, format = 'esm' }) {
	/** @typedef {{ index: number, path: string }} LookupEntry */
	/** @type {Map<string, LookupEntry>} */
	const bundled_nodes = new Map();

	// 0 and 1 are special, they correspond to the root layout and root error nodes
	bundled_nodes.set(build_data.manifest_data.components[0], {
		path: `${relative_path}/nodes/0.js`,
		index: 0
	});

	bundled_nodes.set(build_data.manifest_data.components[1], {
		path: `${relative_path}/nodes/1.js`,
		index: 1
	});

	routes.forEach((route) => {
		if (route.type === 'page') {
			[...route.a, ...route.b].forEach((component) => {
				if (component && !bundled_nodes.has(component)) {
					const i = build_data.manifest_data.components.indexOf(component);

					bundled_nodes.set(component, {
						path: `${relative_path}/nodes/${i}.js`,
						index: bundled_nodes.size
					});
				}
			});
		}
	});

	/** @type {(path: string) => string} */
	const load =
		format === 'esm'
			? (path) => `import('${path}')`
			: (path) => `Promise.resolve().then(() => require('${path}'))`;

	/** @type {(path: string) => string} */
	const loader = (path) => `() => ${load(path)}`;

	const assets = build_data.manifest_data.assets.map((asset) => asset.file);
	if (build_data.service_worker) {
		assets.push(build_data.service_worker);
	}

	/** @param {string | undefined} id */
	const get_index = (id) => id && /** @type {LookupEntry} */ (bundled_nodes.get(id)).index;

	const matchers = new Set();

	// prettier-ignore
	return `{
		appDir: ${s(build_data.app_dir)},
		assets: new Set(${s(assets)}),
		mimeTypes: ${s(get_mime_lookup(build_data.manifest_data))},
		_: {
			entry: ${s(build_data.client.entry)},
			nodes: [
				${Array.from(bundled_nodes.values()).map(node => loader(node.path)).join(',\n\t\t\t\t')}
			],
			routes: [
				${routes.map(route => {
					const { pattern, names, types } = parse_route_id(route.id);

					types.forEach(type => {
						if (type) matchers.add(type);
					});

					if (route.type === 'page') {
						return `{
							type: 'page',
							id: ${s(route.id)},
							pattern: ${pattern},
							names: ${s(names)},
							types: ${s(types)},
							path: ${route.path ? s(route.path) : null},
							shadow: ${route.shadow ? loader(`${relative_path}/${build_data.server.vite_manifest[route.shadow].file}`) : null},
							a: ${s(route.a.map(get_index))},
							b: ${s(route.b.map(get_index))}
						}`.replace(/^\t\t/gm, '');
					} else {
						if (!build_data.server.vite_manifest[route.file]) {
							// this is necessary in cases where a .css file snuck in —
							// perhaps it would be better to disallow these (and others?)
							return null;
						}

						return `{
							type: 'endpoint',
							id: ${s(route.id)},
							pattern: ${pattern},
							names: ${s(names)},
							types: ${s(types)},
							load: ${loader(`${relative_path}/${build_data.server.vite_manifest[route.file].file}`)}
						}`.replace(/^\t\t/gm, '');
					}
				}).filter(Boolean).join(',\n\t\t\t\t')}
			],
			matchers: async () => {
				${Array.from(matchers).map(type => `const { match: ${type} } = await ${load(`${relative_path}/entries/matchers/${type}.js`)}`).join('\n\t\t\t\t')}
				return { ${Array.from(matchers).join(', ')} };
			}
		}
	}`.replace(/^\t/gm, '');
}

/** @typedef {import('http').IncomingMessage} Req */
/** @typedef {import('http').ServerResponse} Res */
/** @typedef {(req: Req, res: Res, next: () => void) => void} Handler */

/**
 * @param {{
 *   middlewares: import('connect').Server;
 *   httpServer: import('http').Server;
 * }} vite
 * @param {import('types').ValidatedConfig} config
 * @param {'http' | 'https'} protocol
 */
async function preview(vite, config, protocol) {
	installPolyfills();

	const { paths } = config.kit;
	const base = paths.base;
	const assets = paths.assets ? SVELTE_KIT_ASSETS : paths.base;

	const etag = `"${Date.now()}"`;

	const index_file = join(config.kit.outDir, 'output/server/index.js');
	const manifest_file = join(config.kit.outDir, 'output/server/manifest.js');

	/** @type {import('types').ServerModule} */
	const { Server, override } = await import(pathToFileURL(index_file).href);
	const { manifest } = await import(pathToFileURL(manifest_file).href);

	override({
		paths: { base, assets },
		prerendering: false,
		protocol,
		read: (file) => fs__default.readFileSync(join(config.kit.files.assets, file))
	});

	const server = new Server(manifest);

	return () => {
		// files in `static`
		vite.middlewares.use(scoped(assets, mutable(config.kit.files.assets)));

		// immutable generated client assets
		vite.middlewares.use(
			scoped(
				assets,
				sirv(join(config.kit.outDir, 'output/client'), {
					setHeaders: (res, pathname) => {
						// only apply to build directory, not e.g. version.json
						if (pathname.startsWith(`/${config.kit.appDir}/immutable`)) {
							res.setHeader('cache-control', 'public,max-age=31536000,immutable');
						}
					}
				})
			)
		);

		vite.middlewares.use((req, res, next) => {
			const original_url = /** @type {string} */ (req.url);
			const { pathname } = new URL(original_url, 'http://dummy');

			if (pathname.startsWith(base)) {
				next();
			} else {
				res.statusCode = 404;
				res.end(`Not found (did you mean ${base + pathname}?)`);
			}
		});

		// prerendered dependencies
		vite.middlewares.use(
			scoped(base, mutable(join(config.kit.outDir, 'output/prerendered/dependencies')))
		);

		// prerendered pages (we can't just use sirv because we need to
		// preserve the correct trailingSlash behaviour)
		vite.middlewares.use(
			scoped(base, (req, res, next) => {
				let if_none_match_value = req.headers['if-none-match'];

				if (if_none_match_value?.startsWith('W/"')) {
					if_none_match_value = if_none_match_value.substring(2);
				}

				if (if_none_match_value === etag) {
					res.statusCode = 304;
					res.end();
					return;
				}

				const { pathname } = new URL(/** @type {string} */ (req.url), 'http://dummy');

				// only treat this as a page if it doesn't include an extension
				if (pathname === '/' || /\/[^./]+\/?$/.test(pathname)) {
					const file = join(
						config.kit.outDir,
						'output/prerendered/pages' +
							pathname +
							(pathname.endsWith('/') ? 'index.html' : '.html')
					);

					if (fs__default.existsSync(file)) {
						res.writeHead(200, {
							'content-type': 'text/html',
							etag
						});

						fs__default.createReadStream(file).pipe(res);
						return;
					}
				}

				next();
			})
		);

		// SSR
		vite.middlewares.use(async (req, res) => {
			const host = req.headers['host'];

			let request;

			try {
				request = await getRequest(`${protocol}://${host}`, req);
			} catch (/** @type {any} */ err) {
				res.statusCode = err.status || 400;
				return res.end(err.reason || 'Invalid request body');
			}

			setResponse(
				res,
				await server.respond(request, {
					getClientAddress: () => {
						const { remoteAddress } = req.socket;
						if (remoteAddress) return remoteAddress;
						throw new Error('Could not determine clientAddress');
					}
				})
			);
		});
	};
}

/**
 * @param {string} dir
 * @returns {Handler}
 */
const mutable = (dir) =>
	fs__default.existsSync(dir)
		? sirv(dir, {
				etag: true,
				maxAge: 0
		  })
		: (req, res, next) => next();

/**
 * @param {string} scope
 * @param {Handler} handler
 * @returns {Handler}
 */
function scoped(scope, handler) {
	if (scope === '') return handler;

	return (req, res, next) => {
		if (req.url?.startsWith(scope)) {
			const original_url = req.url;
			req.url = req.url.slice(scope.length);
			handler(req, res, () => {
				req.url = original_url;
				next();
			});
		} else {
			next();
		}
	};
}

const cwd = process.cwd();

/** @type {import('./types').EnforcedConfig} */
const enforced_config = {
	appType: true,
	base: true,
	build: {
		cssCodeSplit: true,
		emptyOutDir: true,
		lib: {
			entry: true,
			name: true,
			formats: true
		},
		manifest: true,
		outDir: true,
		polyfillModulePreload: true,
		rollupOptions: {
			input: true,
			output: {
				format: true,
				entryFileNames: true,
				chunkFileNames: true,
				assetFileNames: true
			},
			preserveEntrySignatures: true
		},
		ssr: true
	},
	publicDir: true,
	resolve: {
		alias: {
			$app: true,
			$lib: true,
			'$service-worker': true
		}
	},
	root: true
};

/**
 * @return {import('vite').Plugin[]}
 */
function sveltekit() {
	return [...svelte(), kit()];
}

/**
 * Returns the SvelteKit Vite plugin. Vite executes Rollup hooks as well as some of its own.
 * Background reading is available at:
 * - https://vitejs.dev/guide/api-plugin.html
 * - https://rollupjs.org/guide/en/#plugin-development
 *
 * You can get an idea of the lifecycle by looking at the flow charts here:
 * - https://rollupjs.org/guide/en/#build-hooks
 * - https://rollupjs.org/guide/en/#output-generation-hooks
 *
 * @return {import('vite').Plugin}
 */
function kit() {
	/** @type {import('types').ValidatedConfig} */
	let svelte_config;

	/** @type {import('vite').ResolvedConfig} */
	let vite_config;

	/** @type {import('vite').ConfigEnv} */
	let vite_config_env;

	/** @type {import('types').ManifestData} */
	let manifest_data;

	/** @type {boolean} */
	let is_build;

	/** @type {import('types').Logger} */
	let log;

	/** @type {import('types').Prerendered} */
	let prerendered;

	/** @type {import('types').BuildData} */
	let build_data;

	/** @type {string | undefined} */
	let deferred_warning;

	/**
	 * @type {{
	 *   build_dir: string;
	 *   output_dir: string;
	 *   client_out_dir: string;
	 * }}
	 */
	let paths;

	let completed_build = false;

	function vite_client_build_config() {
		/** @type {Record<string, string>} */
		const input = {
			// Put unchanging assets in immutable directory. We don't set that in the
			// outDir so that other plugins can add mutable assets to the bundle
			start: `${get_runtime_directory(svelte_config.kit)}/client/start.js`
		};

		// This step is optional — Vite/Rollup will create the necessary chunks
		// for everything regardless — but it means that entry chunks reflect
		// their location in the source code, which is helpful for debugging
		manifest_data.components.forEach((file) => {
			const resolved = path__default.resolve(cwd, file);
			const relative = decodeURIComponent(path__default.relative(svelte_config.kit.files.routes, resolved));

			const name = relative.startsWith('..')
				? path__default.basename(file)
				: posixify(path__default.join('pages', relative));
			input[name] = resolved;
		});

		return get_default_config({
			config: svelte_config,
			input,
			ssr: false,
			outDir: `${paths.client_out_dir}`
		});
	}

	/**
	 * @param {import('rollup').OutputAsset[]} assets
	 * @param {import('rollup').OutputChunk[]} chunks
	 */
	function client_build_info(assets, chunks) {
		/** @type {import('vite').Manifest} */
		const vite_manifest = JSON.parse(
			fs__default.readFileSync(`${paths.client_out_dir}/manifest.json`, 'utf-8')
		);

		const entry_id = posixify(
			path__default.relative(cwd, `${get_runtime_directory(svelte_config.kit)}/client/start.js`)
		);

		return {
			assets,
			chunks,
			entry: find_deps$1(vite_manifest, entry_id, false),
			vite_manifest
		};
	}

	// TODO remove this for 1.0
	check_vite_version();

	return {
		name: 'vite-plugin-svelte-kit',

		/**
		 * Build the SvelteKit-provided Vite config to be merged with the user's vite.config.js file.
		 * @see https://vitejs.dev/guide/api-plugin.html#config
		 */
		async config(config, config_env) {
			vite_config_env = config_env;
			svelte_config = await load_config();
			is_build = config_env.command === 'build';

			paths = {
				build_dir: `${svelte_config.kit.outDir}/build`,
				output_dir: `${svelte_config.kit.outDir}/output`,
				client_out_dir: `${svelte_config.kit.outDir}/output/client/`
			};

			if (is_build) {
				manifest_data = all(svelte_config).manifest_data;

				const new_config = vite_client_build_config();

				const warning = warn_overridden_config(config, new_config);
				if (warning) console.error(warning + '\n');

				return new_config;
			}

			// dev and preview config can be shared
			/** @type {import('vite').UserConfig} */
			const result = {
				appType: 'custom',
				base: '/',
				build: {
					rollupOptions: {
						// Vite dependency crawler needs an explicit JS entry point
						// eventhough server otherwise works without it
						input: `${get_runtime_directory(svelte_config.kit)}/client/start.js`
					}
				},
				define: {
					__SVELTEKIT_DEV__: 'true',
					__SVELTEKIT_APP_VERSION_POLL_INTERVAL__: '0'
				},
				resolve: {
					alias: get_aliases(svelte_config.kit)
				},
				root: cwd,
				server: {
					fs: {
						allow: [
							...new Set([
								svelte_config.kit.files.lib,
								svelte_config.kit.files.routes,
								svelte_config.kit.outDir,
								path__default.resolve(cwd, 'src'),
								path__default.resolve(cwd, 'node_modules'),
								path__default.resolve(vite.searchForWorkspaceRoot(cwd), 'node_modules')
							])
						]
					},
					watch: {
						ignored: [
							// Ignore all siblings of config.kit.outDir/generated
							`${posixify(svelte_config.kit.outDir)}/!(generated)`
						]
					}
				}
			};

			deferred_warning = warn_overridden_config(config, result);
			return result;
		},

		/**
		 * Stores the final config.
		 */
		configResolved(config) {
			vite_config = config;
		},

		/**
		 * Clears the output directories.
		 */
		buildStart() {
			// Reset for new build. Goes here because `build --watch` calls buildStart but not config
			completed_build = false;

			if (is_build) {
				rimraf(paths.build_dir);
				mkdirp(paths.build_dir);

				rimraf(paths.output_dir);
				mkdirp(paths.output_dir);
			}
		},

		/**
		 * Vite builds a single bundle. We need three bundles: client, server, and service worker.
		 * The user's package.json scripts will invoke the Vite CLI to execute the client build. We
		 * then use this hook to kick off builds for the server and service worker.
		 */
		async writeBundle(_options, bundle) {
			log = logger({
				verbose: vite_config.logLevel === 'info'
			});

			fs__default.writeFileSync(
				`${paths.client_out_dir}/${svelte_config.kit.appDir}/version.json`,
				JSON.stringify({ version: svelte_config.kit.version.name })
			);

			const { assets, chunks } = collect_output(bundle);
			log.info(`Client build completed. Wrote ${chunks.length} chunks and ${assets.length} assets`);

			log.info('Building server');
			const options = {
				cwd,
				config: svelte_config,
				vite_config_env,
				build_dir: paths.build_dir, // TODO just pass `paths`
				manifest_data,
				output_dir: paths.output_dir,
				service_worker_entry_file: resolve_entry(svelte_config.kit.files.serviceWorker)
			};
			const client = client_build_info(assets, chunks);
			const server = await build_server(options, client);

			/** @type {import('types').BuildData} */
			build_data = {
				app_dir: svelte_config.kit.appDir,
				manifest_data,
				service_worker: options.service_worker_entry_file ? 'service-worker.js' : null, // TODO make file configurable?
				client,
				server
			};

			const manifest_path = `${paths.output_dir}/server/manifest.js`;
			fs__default.writeFileSync(
				manifest_path,
				`export const manifest = ${generate_manifest({
					build_data,
					relative_path: '.',
					routes: manifest_data.routes
				})};\n`
			);

			process.env.SVELTEKIT_SERVER_BUILD_COMPLETED = 'true';
			log.info('Prerendering');

			prerendered = await prerender({
				config: svelte_config.kit,
				client_out_dir: vite_config.build.outDir,
				manifest_path,
				log
			});

			if (options.service_worker_entry_file) {
				if (svelte_config.kit.paths.assets) {
					throw new Error('Cannot use service worker alongside config.kit.paths.assets');
				}

				log.info('Building service worker');

				await build_service_worker(options, prerendered, client.vite_manifest);
			}

			console.log(
				`\nRun ${$.bold().cyan('npm run preview')} to preview your production build locally.`
			);

			completed_build = true;
		},

		/**
		 * Runs the adapter.
		 */
		async closeBundle() {
			if (!completed_build) {
				// vite calls closeBundle when dev-server restarts, ignore that,
				// and only adapt when build successfully completes.
				return;
			}

			if (svelte_config.kit.adapter) {
				const { adapt } = await import('./chunks/index2.js');
				await adapt(svelte_config, build_data, prerendered, { log });
			} else {
				console.log($.bold().yellow('\nNo adapter specified'));
				// prettier-ignore
				console.log(
					`See ${$.bold().cyan('https://kit.svelte.dev/docs/adapters')} to learn how to configure your app to run on the platform of your choosing`
				);
			}

			if (svelte_config.kit.prerender.enabled) {
				// this is necessary to close any open db connections, etc.
				// TODO: prerender in a subprocess so we can exit in isolation and then remove this
				// https://github.com/sveltejs/kit/issues/5306
				process.exit(0);
			}
		},

		/**
		 * Adds the SvelteKit middleware to do SSR in dev mode.
		 * @see https://vitejs.dev/guide/api-plugin.html#configureserver
		 */
		async configureServer(vite) {
			// This method is called by Vite after clearing the screen.
			// This patch ensures we can log any important messages afterwards for the user to see.
			const print_urls = vite.printUrls;
			vite.printUrls = function () {
				print_urls.apply(this);
				if (deferred_warning) console.error('\n' + deferred_warning);
			};

			return await dev(vite, vite_config, svelte_config);
		},

		/**
		 * Adds the SvelteKit middleware to do SSR in preview mode.
		 * @see https://vitejs.dev/guide/api-plugin.html#configurepreviewserver
		 */
		configurePreviewServer(vite) {
			return preview(vite, svelte_config, vite_config.preview.https ? 'https' : 'http');
		}
	};
}

function check_vite_version() {
	// TODO parse from kit peer deps and maybe do a full semver compare if we ever require feature releases a min
	const min_required_vite_major = 3;
	const vite_version = vite.version ?? '2.x'; // vite started exporting it's version in 3.0
	const current_vite_major = parseInt(vite_version.split('.')[0], 10);

	if (current_vite_major < min_required_vite_major) {
		throw new Error(
			`Vite version ${current_vite_major} is no longer supported. Please upgrade to version ${min_required_vite_major}`
		);
	}
}

/** @param {import('rollup').OutputBundle} bundle */
function collect_output(bundle) {
	/** @type {import('rollup').OutputChunk[]} */
	const chunks = [];
	/** @type {import('rollup').OutputAsset[]} */
	const assets = [];
	for (const value of Object.values(bundle)) {
		// collect asset and output chunks
		if (value.type === 'asset') {
			assets.push(value);
		} else {
			chunks.push(value);
		}
	}
	return { assets, chunks };
}

/**
 * @param {Record<string, any>} config
 * @param {Record<string, any>} resolved_config
 */
function warn_overridden_config(config, resolved_config) {
	const overridden = find_overridden_config(config, resolved_config, enforced_config, '', []);

	if (overridden.length > 0) {
		return (
			$.bold().red('The following Vite config options will be overridden by SvelteKit:') +
			overridden.map((key) => `\n  - ${key}`).join('')
		);
	}
}

/**
 * @param {Record<string, any>} config
 * @param {Record<string, any>} resolved_config
 * @param {import('./types').EnforcedConfig} enforced_config
 * @param {string} path
 * @param {string[]} out used locally to compute the return value
 */
function find_overridden_config(config, resolved_config, enforced_config, path, out) {
	for (const key in enforced_config) {
		if (typeof config === 'object' && config !== null && key in config) {
			const enforced = enforced_config[key];

			if (enforced === true) {
				if (config[key] !== resolved_config[key]) {
					out.push(path + key);
				}
			} else {
				find_overridden_config(config[key], resolved_config[key], enforced, path + key + '.', out);
			}
		}
	}

	return out;
}

export { generate_manifest as g, sveltekit };
