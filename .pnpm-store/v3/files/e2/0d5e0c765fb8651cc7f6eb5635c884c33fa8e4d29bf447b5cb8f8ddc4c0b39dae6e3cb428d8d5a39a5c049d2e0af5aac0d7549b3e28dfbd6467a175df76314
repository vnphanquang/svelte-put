import fs__default from 'fs';
import path__default, { join } from 'path';
import * as url from 'url';

let FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM, isTTY=true;
if (typeof process !== 'undefined') {
	({ FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM } = process.env || {});
	isTTY = process.stdout && process.stdout.isTTY;
}

const $ = {
	enabled: !NODE_DISABLE_COLORS && NO_COLOR == null && TERM !== 'dumb' && (
		FORCE_COLOR != null && FORCE_COLOR !== '0' || isTTY
	),

	// modifiers
	reset: init(0, 0),
	bold: init(1, 22),
	dim: init(2, 22),
	italic: init(3, 23),
	underline: init(4, 24),
	inverse: init(7, 27),
	hidden: init(8, 28),
	strikethrough: init(9, 29),

	// colors
	black: init(30, 39),
	red: init(31, 39),
	green: init(32, 39),
	yellow: init(33, 39),
	blue: init(34, 39),
	magenta: init(35, 39),
	cyan: init(36, 39),
	white: init(37, 39),
	gray: init(90, 39),
	grey: init(90, 39),

	// background colors
	bgBlack: init(40, 49),
	bgRed: init(41, 49),
	bgGreen: init(42, 49),
	bgYellow: init(43, 49),
	bgBlue: init(44, 49),
	bgMagenta: init(45, 49),
	bgCyan: init(46, 49),
	bgWhite: init(47, 49)
};

function run(arr, str) {
	let i=0, tmp, beg='', end='';
	for (; i < arr.length; i++) {
		tmp = arr[i];
		beg += tmp.open;
		end += tmp.close;
		if (!!~str.indexOf(tmp.close)) {
			str = str.replace(tmp.rgx, tmp.close + tmp.open);
		}
	}
	return beg + str + end;
}

function chain(has, keys) {
	let ctx = { has, keys };

	ctx.reset = $.reset.bind(ctx);
	ctx.bold = $.bold.bind(ctx);
	ctx.dim = $.dim.bind(ctx);
	ctx.italic = $.italic.bind(ctx);
	ctx.underline = $.underline.bind(ctx);
	ctx.inverse = $.inverse.bind(ctx);
	ctx.hidden = $.hidden.bind(ctx);
	ctx.strikethrough = $.strikethrough.bind(ctx);

	ctx.black = $.black.bind(ctx);
	ctx.red = $.red.bind(ctx);
	ctx.green = $.green.bind(ctx);
	ctx.yellow = $.yellow.bind(ctx);
	ctx.blue = $.blue.bind(ctx);
	ctx.magenta = $.magenta.bind(ctx);
	ctx.cyan = $.cyan.bind(ctx);
	ctx.white = $.white.bind(ctx);
	ctx.gray = $.gray.bind(ctx);
	ctx.grey = $.grey.bind(ctx);

	ctx.bgBlack = $.bgBlack.bind(ctx);
	ctx.bgRed = $.bgRed.bind(ctx);
	ctx.bgGreen = $.bgGreen.bind(ctx);
	ctx.bgYellow = $.bgYellow.bind(ctx);
	ctx.bgBlue = $.bgBlue.bind(ctx);
	ctx.bgMagenta = $.bgMagenta.bind(ctx);
	ctx.bgCyan = $.bgCyan.bind(ctx);
	ctx.bgWhite = $.bgWhite.bind(ctx);

	return ctx;
}

function init(open, close) {
	let blk = {
		open: `\x1b[${open}m`,
		close: `\x1b[${close}m`,
		rgx: new RegExp(`\\x1b\\[${close}m`, 'g')
	};
	return function (txt) {
		if (this !== void 0 && this.has !== void 0) {
			!!~this.has.indexOf(open) || (this.has.push(open),this.keys.push(blk));
			return txt === void 0 ? this : $.enabled ? run(this.keys, txt+'') : txt+'';
		}
		return txt === void 0 ? chain([open], [blk]) : $.enabled ? run([blk], txt+'') : txt+'';
	};
}

/** @typedef {import('./types').Validator} Validator */

const directives = object({
	'child-src': string_array(),
	'default-src': string_array(),
	'frame-src': string_array(),
	'worker-src': string_array(),
	'connect-src': string_array(),
	'font-src': string_array(),
	'img-src': string_array(),
	'manifest-src': string_array(),
	'media-src': string_array(),
	'object-src': string_array(),
	'prefetch-src': string_array(),
	'script-src': string_array(),
	'script-src-elem': string_array(),
	'script-src-attr': string_array(),
	'style-src': string_array(),
	'style-src-elem': string_array(),
	'style-src-attr': string_array(),
	'base-uri': string_array(),
	sandbox: string_array(),
	'form-action': string_array(),
	'frame-ancestors': string_array(),
	'navigate-to': string_array(),
	'report-uri': string_array(),
	'report-to': string_array(),
	'require-trusted-types-for': string_array(),
	'trusted-types': string_array(),
	'upgrade-insecure-requests': boolean(false),
	'require-sri-for': string_array(),
	'block-all-mixed-content': boolean(false),
	'plugin-types': string_array(),
	referrer: string_array()
});

/** @type {Validator} */
const options = object(
	{
		extensions: validate(['.svelte'], (input, keypath) => {
			if (!Array.isArray(input) || !input.every((page) => typeof page === 'string')) {
				throw new Error(`${keypath} must be an array of strings`);
			}

			input.forEach((extension) => {
				if (extension[0] !== '.') {
					throw new Error(`Each member of ${keypath} must start with '.' — saw '${extension}'`);
				}

				if (!/^(\.[a-z0-9]+)+$/i.test(extension)) {
					throw new Error(`File extensions must be alphanumeric — saw '${extension}'`);
				}
			});

			return input;
		}),

		kit: object({
			adapter: validate(null, (input, keypath) => {
				if (typeof input !== 'object' || !input.adapt) {
					let message = `${keypath} should be an object with an "adapt" method`;

					if (Array.isArray(input) || typeof input === 'string') {
						// for the early adapter adopters
						message += ', rather than the name of an adapter';
					}

					throw new Error(`${message}. See https://kit.svelte.dev/docs/adapters`);
				}

				return input;
			}),

			alias: validate({}, (input, keypath) => {
				if (typeof input !== 'object') {
					throw new Error(`${keypath} should be an object`);
				}

				for (const key in input) {
					assert_string(input[key], `${keypath}.${key}`);
				}

				return input;
			}),

			// TODO: remove this for the 1.0 release
			amp: error(
				(keypath) =>
					`${keypath} has been removed. See https://kit.svelte.dev/docs/seo#amp for details on how to support AMP`
			),

			appDir: validate('_app', (input, keypath) => {
				assert_string(input, keypath);

				if (input) {
					if (input.startsWith('/') || input.endsWith('/')) {
						throw new Error(
							"config.kit.appDir cannot start or end with '/'. See https://kit.svelte.dev/docs/configuration"
						);
					}
				} else {
					throw new Error(`${keypath} cannot be empty`);
				}

				return input;
			}),

			browser: object({
				hydrate: boolean(true),
				router: boolean(true)
			}),

			csp: object({
				mode: list(['auto', 'hash', 'nonce']),
				directives,
				reportOnly: directives
			}),

			// TODO: remove this for the 1.0 release
			endpointExtensions: error(
				(keypath) => `${keypath} has been renamed to config.kit.moduleExtensions`
			),

			files: object({
				assets: string('static'),
				hooks: string(join('src', 'hooks')),
				lib: string(join('src', 'lib')),
				params: string(join('src', 'params')),
				routes: string(join('src', 'routes')),
				serviceWorker: string(join('src', 'service-worker')),
				template: string(join('src', 'app.html'))
			}),

			// TODO: remove this for the 1.0 release
			headers: error(
				(keypath) =>
					`${keypath} has been removed. See https://github.com/sveltejs/kit/pull/3384 for details`
			),

			// TODO: remove this for the 1.0 release
			host: error(
				(keypath) =>
					`${keypath} has been removed. See https://github.com/sveltejs/kit/pull/3384 for details`
			),

			// TODO remove for 1.0
			hydrate: error((keypath) => `${keypath} has been moved to config.kit.browser.hydrate`),

			inlineStyleThreshold: number(0),

			methodOverride: object({
				parameter: string('_method'),
				allowed: validate([], (input, keypath) => {
					if (!Array.isArray(input) || !input.every((method) => typeof method === 'string')) {
						throw new Error(`${keypath} must be an array of strings`);
					}

					if (input.map((i) => i.toUpperCase()).includes('GET')) {
						throw new Error(`${keypath} cannot contain "GET"`);
					}

					return input;
				})
			}),

			moduleExtensions: string_array(['.js', '.ts']),

			outDir: string('.svelte-kit'),

			package: object({
				dir: string('package'),
				// excludes all .d.ts and filename starting with _
				exports: fun((filepath) => !/^_|\/_|\.d\.ts$/.test(filepath)),
				files: fun(() => true),
				emitTypes: boolean(true)
			}),

			paths: object({
				base: validate('', (input, keypath) => {
					assert_string(input, keypath);

					if (input !== '' && (input.endsWith('/') || !input.startsWith('/'))) {
						throw new Error(
							`${keypath} option must either be the empty string or a root-relative path that starts but doesn't end with '/'. See https://kit.svelte.dev/docs/configuration#paths`
						);
					}

					return input;
				}),
				assets: validate('', (input, keypath) => {
					assert_string(input, keypath);

					if (input) {
						if (!/^[a-z]+:\/\//.test(input)) {
							throw new Error(
								`${keypath} option must be an absolute path, if specified. See https://kit.svelte.dev/docs/configuration#paths`
							);
						}

						if (input.endsWith('/')) {
							throw new Error(
								`${keypath} option must not end with '/'. See https://kit.svelte.dev/docs/configuration#paths`
							);
						}
					}

					return input;
				})
			}),

			prerender: object({
				concurrency: number(1),
				crawl: boolean(true),
				createIndexFiles: error(
					(keypath) =>
						`${keypath} has been removed — it is now controlled by the trailingSlash option. See https://kit.svelte.dev/docs/configuration#trailingslash`
				),
				default: boolean(false),
				enabled: boolean(true),
				entries: validate(['*'], (input, keypath) => {
					if (!Array.isArray(input) || !input.every((page) => typeof page === 'string')) {
						throw new Error(`${keypath} must be an array of strings`);
					}

					input.forEach((page) => {
						if (page !== '*' && page[0] !== '/') {
							throw new Error(
								`Each member of ${keypath} must be either '*' or an absolute path beginning with '/' — saw '${page}'`
							);
						}
					});

					return input;
				}),

				// TODO: remove this for the 1.0 release
				force: validate(undefined, (input, keypath) => {
					if (typeof input !== 'undefined') {
						const newSetting = input ? 'continue' : 'fail';
						const needsSetting = newSetting === 'continue';
						throw new Error(
							`${keypath} has been removed in favor of \`onError\`. In your case, set \`onError\` to "${newSetting}"${
								needsSetting ? '' : ' (or leave it undefined)'
							} to get the same behavior as you would with \`force: ${JSON.stringify(input)}\``
						);
					}
				}),

				onError: validate('fail', (input, keypath) => {
					if (typeof input === 'function') return input;
					if (['continue', 'fail'].includes(input)) return input;
					throw new Error(
						`${keypath} should be either a custom function or one of "continue" or "fail"`
					);
				}),

				origin: validate('http://sveltekit-prerender', (input, keypath) => {
					assert_string(input, keypath);

					let origin;

					try {
						origin = new URL(input).origin;
					} catch (e) {
						throw new Error(`${keypath} must be a valid origin`);
					}

					if (input !== origin) {
						throw new Error(`${keypath} must be a valid origin (${origin} rather than ${input})`);
					}

					return origin;
				}),

				// TODO: remove this for the 1.0 release
				pages: error((keypath) => `${keypath} has been renamed to \`entries\`.`)
			}),

			// TODO: remove this for the 1.0 release
			protocol: error(
				(keypath) =>
					`${keypath} has been removed. See https://github.com/sveltejs/kit/pull/3384 for details`
			),

			// TODO remove for 1.0
			router: error((keypath) => `${keypath} has been moved to config.kit.browser.router`),

			routes: fun((filepath) => !/(?:(?:^_|\/_)|(?:^\.|\/\.)(?!well-known))/.test(filepath)),

			serviceWorker: object({
				register: boolean(true),
				files: fun((filename) => !/\.DS_Store/.test(filename))
			}),

			// TODO remove this for 1.0
			ssr: error(
				(keypath) =>
					`${keypath} has been removed — use the handle hook instead: https://kit.svelte.dev/docs/hooks#handle`
			),

			// TODO remove this for 1.0
			target: error((keypath) => `${keypath} is no longer required, and should be removed`),

			trailingSlash: list(['never', 'always', 'ignore']),

			version: object({
				name: string(Date.now().toString()),
				pollInterval: number(0)
			}),

			// TODO remove this for 1.0
			vite: error((keypath) => `${keypath} has been removed — use vite.config.js instead`)
		})
	},
	true
);

/**
 * @param {Record<string, Validator>} children
 * @param {boolean} [allow_unknown]
 * @returns {Validator}
 */
function object(children, allow_unknown = false) {
	return (input, keypath) => {
		/** @type {Record<string, any>} */
		const output = {};

		if ((input && typeof input !== 'object') || Array.isArray(input)) {
			throw new Error(`${keypath} should be an object`);
		}

		for (const key in input) {
			if (!(key in children)) {
				if (allow_unknown) {
					output[key] = input[key];
				} else {
					let message = `Unexpected option ${keypath}.${key}`;

					// special case
					if (keypath === 'config.kit' && key in options) {
						message += ` (did you mean config.${key}?)`;
					}

					throw new Error(message);
				}
			}
		}

		for (const key in children) {
			const validator = children[key];
			output[key] = validator(input && input[key], `${keypath}.${key}`);
		}

		return output;
	};
}

/**
 * @param {any} fallback
 * @param {(value: any, keypath: string) => any} fn
 * @returns {Validator}
 */
function validate(fallback, fn) {
	return (input, keypath) => {
		return input === undefined ? fallback : fn(input, keypath);
	};
}

/**
 * @param {string | null} fallback
 * @param {boolean} allow_empty
 * @returns {Validator}
 */
function string(fallback, allow_empty = true) {
	return validate(fallback, (input, keypath) => {
		assert_string(input, keypath);

		if (!allow_empty && input === '') {
			throw new Error(`${keypath} cannot be empty`);
		}

		return input;
	});
}

/**
 * @param {string[] | undefined} [fallback]
 * @returns {Validator}
 */
function string_array(fallback) {
	return validate(fallback, (input, keypath) => {
		if (input === undefined) return input;

		if (!Array.isArray(input) || input.some((value) => typeof value !== 'string')) {
			throw new Error(`${keypath} must be an array of strings, if specified`);
		}

		return input;
	});
}

/**
 * @param {number} fallback
 * @returns {Validator}
 */
function number(fallback) {
	return validate(fallback, (input, keypath) => {
		if (typeof input !== 'number') {
			throw new Error(`${keypath} should be a number, if specified`);
		}
		return input;
	});
}

/**
 * @param {boolean} fallback
 * @returns {Validator}
 */
function boolean(fallback) {
	return validate(fallback, (input, keypath) => {
		if (typeof input !== 'boolean') {
			throw new Error(`${keypath} should be true or false, if specified`);
		}
		return input;
	});
}

/**
 * @param {string[]} options
 * @returns {Validator}
 */
function list(options, fallback = options[0]) {
	return validate(fallback, (input, keypath) => {
		if (!options.includes(input)) {
			// prettier-ignore
			const msg = options.length > 2
				? `${keypath} should be one of ${options.slice(0, -1).map(input => `"${input}"`).join(', ')} or "${options[options.length - 1]}"`
				: `${keypath} should be either "${options[0]}" or "${options[1]}"`;

			throw new Error(msg);
		}
		return input;
	});
}

/**
 * @param {(filename: string) => boolean} fallback
 * @returns {Validator}
 */
function fun(fallback) {
	return validate(fallback, (input, keypath) => {
		if (typeof input !== 'function') {
			throw new Error(`${keypath} should be a function, if specified`);
		}
		return input;
	});
}

/**
 * @param {string} input
 * @param {string} keypath
 */
function assert_string(input, keypath) {
	if (typeof input !== 'string') {
		throw new Error(`${keypath} should be a string, if specified`);
	}
}

/** @param {(keypath?: string) => string} fn */
function error(fn) {
	return validate(undefined, (input, keypath) => {
		if (input !== undefined) {
			throw new Error(fn(keypath));
		}
	});
}

/**
 * Loads the template (src/app.html by default) and validates that it has the
 * required content.
 * @param {string} cwd
 * @param {import('types').ValidatedConfig} config
 */
function load_template(cwd, config) {
	const { template } = config.kit.files;
	const relative = path__default.relative(cwd, template);

	if (fs__default.existsSync(template)) {
		const contents = fs__default.readFileSync(template, 'utf8');

		// TODO remove this for 1.0
		const match = /%svelte\.([a-z]+)%/.exec(contents);
		if (match) {
			throw new Error(
				`%svelte.${match[1]}% in ${relative} should be replaced with %sveltekit.${match[1]}%`
			);
		}

		const expected_tags = ['%sveltekit.head%', '%sveltekit.body%'];
		expected_tags.forEach((tag) => {
			if (contents.indexOf(tag) === -1) {
				throw new Error(`${relative} is missing ${tag}`);
			}
		});
	} else {
		throw new Error(`${relative} does not exist`);
	}

	return fs__default.readFileSync(template, 'utf-8');
}

/**
 * Loads and validates svelte.config.js
 * @param {{ cwd?: string }} options
 * @returns {Promise<import('types').ValidatedConfig>}
 */
async function load_config({ cwd = process.cwd() } = {}) {
	const config_file = path__default.join(cwd, 'svelte.config.js');

	if (!fs__default.existsSync(config_file)) {
		return process_config({}, { cwd });
	}

	const config = await import(`${url.pathToFileURL(config_file).href}?ts=${Date.now()}`);

	return process_config(config.default, { cwd });
}

/**
 * @param {import('types').Config} config
 * @returns {import('types').ValidatedConfig}
 */
function process_config(config, { cwd = process.cwd() } = {}) {
	const validated = validate_config(config);

	validated.kit.outDir = path__default.resolve(cwd, validated.kit.outDir);

	for (const key in validated.kit.files) {
		// @ts-expect-error this is typescript at its stupidest
		validated.kit.files[key] = path__default.resolve(cwd, validated.kit.files[key]);
	}

	return validated;
}

/**
 * @param {import('types').Config} config
 * @returns {import('types').ValidatedConfig}
 */
function validate_config(config) {
	if (typeof config !== 'object') {
		throw new Error(
			'svelte.config.js must have a configuration object as its default export. See https://kit.svelte.dev/docs/configuration'
		);
	}

	return options(config, 'config');
}

/**
 * @param {unknown} err
 * @return {Error}
 */
function coalesce_to_error(err) {
	return err instanceof Error ||
		(err && /** @type {any} */ (err).name && /** @type {any} */ (err).message)
		? /** @type {Error} */ (err)
		: new Error(JSON.stringify(err));
}

export { $, load_template as a, coalesce_to_error as c, load_config as l };
