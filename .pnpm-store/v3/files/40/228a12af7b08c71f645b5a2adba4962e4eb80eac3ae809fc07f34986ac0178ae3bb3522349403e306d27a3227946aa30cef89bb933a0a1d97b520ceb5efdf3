import { readFile as origReadFile } from "fs";
import { promisify } from "util";
import { dirname, resolve as pathResolve, join } from "path";

import fileSize from "filesize";
import gzip from "gzip-size";
import terser from "terser";
import brotli from "brotli-size";
import pacote from "pacote";

const readFile = promisify(origReadFile);

const isWindows = process.platform === "win32";

function fixWindowsPath(path) {
	return path.slice(
		// istanbul ignore next
		isWindows ? 1 : 0
	);
}

// Node should be ok with this, but transpiling
//  to `require` doesn't work, so detect Windows
//  to remove slash instead
// "file://" +
const thisDirectory = fixWindowsPath(
	dirname(
		decodeURI(
			new URL(
				// `import.meta.url` is giving backslashes in Windows currently
				//  (at least in how it is compiled to CJS) which makes for an
				//  invalid URL
				import.meta.url.replace(/\\/g, "/")
			).pathname
		)
	)
);

export default function filesize(options = {}, env) {
	let {
		render,
		format = {},
		theme = "dark",
		showBeforeSizes = "none",
		showGzippedSize = true,
		showBrotliSize = false,
		showMinifiedSize = true,
	} = options;

	const getLoggingData = async function (outputOptions, bundle) {
		const { code, fileName } = bundle;
		const info = {};

		let codeBefore;
		if (showBeforeSizes !== "none") {
			let file = outputOptions.file || outputOptions.dest;
			if (showBeforeSizes !== "build") {
				const { name } = await import(join(process.cwd(), "./package.json"));
				try {
					const output = join(thisDirectory, "../.cache");

					const { resolved } = await pacote.extract(`${name}@latest`, output);
					const idx = resolved.lastIndexOf(name);
					const lastVersion = resolved.slice(
						idx + name.length + 1,
						-".tgz".length
					);
					info.lastVersion = lastVersion;

					file = pathResolve(output, file);
				} catch (err) {
					// Package might not exist
					console.log(`Package, "${name}", was not found.`);
					file = null;
				}
			}

			if (file) {
				try {
					codeBefore = await readFile(file, "utf8");
				} catch (err) {
					console.log(`File, "${file}", was not found.`);
					// File might not exist
				}
			}
		}

		info.fileName = fileName;

		info.bundleSize = fileSize(Buffer.byteLength(code), format);

		info.brotliSize = showBrotliSize
			? fileSize(await brotli(code), format)
			: "";

		if (showMinifiedSize || showGzippedSize) {
			const minifiedCode = (await terser.minify(code)).code;
			info.minSize = showMinifiedSize
				? fileSize(minifiedCode.length, format)
				: "";
			info.gzipSize = showGzippedSize
				? fileSize(gzip.sync(minifiedCode), format)
				: "";
		}

		if (codeBefore) {
			info.bundleSizeBefore = fileSize(Buffer.byteLength(codeBefore), format);
			info.brotliSizeBefore = showBrotliSize
				? fileSize(await brotli(codeBefore), format)
				: "";
			if (showMinifiedSize || showGzippedSize) {
				const minifiedCode = (await terser.minify(codeBefore)).code;
				info.minSizeBefore = showMinifiedSize
					? fileSize(minifiedCode.length, format)
					: "";
				info.gzipSizeBefore = showGzippedSize
					? fileSize(gzip.sync(minifiedCode), format)
					: "";
			}
		}

		const opts = {
			format,
			theme,
			render,
			showBeforeSizes,
			showGzippedSize,
			showBrotliSize,
			showMinifiedSize,
		};

		if (render) {
			console.warn(
				"`render` is now deprecated. Please use `reporter` instead."
			);
			return opts.render(opts, outputOptions, info);
		}

		const reporters = options.reporter
			? Array.isArray(options.reporter)
				? options.reporter
				: [options.reporter]
			: ["boxen"];

		return (
			await Promise.all(
				reporters.map(async (reporter) => {
					if (typeof reporter === "string") {
						let p;
						if (reporter === "boxen") {
							p = import(join(thisDirectory, "/reporters/boxen.js"));
						} else {
							p = import(pathResolve(process.cwd(), reporter));
						}
						reporter = (await p).default;
					}

					return reporter(opts, outputOptions, info);
				})
			)
		).join("");
	};

	if (env === "test") {
		return getLoggingData;
	}

	return {
		name: "filesize",
		async generateBundle(outputOptions, bundle /* , isWrite */) {
			const dataStrs = await Promise.all(
				Object.keys(bundle)
					.map((fileName) => bundle[fileName])
					.filter((currentBundle) => {
						if ({}.hasOwnProperty.call(currentBundle, "type")) {
							return currentBundle.type !== "asset";
						}
						return !currentBundle.isAsset;
					})
					.map((currentBundle) => {
						return getLoggingData(outputOptions, currentBundle);
					})
			);
			dataStrs.forEach((str) => {
				if (str) {
					console.log(str);
				}
			});
		},
	};
}
