'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

function _interopNamespace(e) {
	if (e && e.__esModule) { return e; } else {
		var n = {};
		if (e) {
			Object.keys(e).forEach(function (k) {
				var d = Object.getOwnPropertyDescriptor(e, k);
				Object.defineProperty(n, k, d.get ? d : {
					enumerable: true,
					get: function () {
						return e[k];
					}
				});
			});
		}
		n['default'] = e;
		return n;
	}
}

var fs = require('fs');
var util = require('util');
var path = require('path');
var fileSize = _interopDefault(require('filesize'));
var gzip = _interopDefault(require('gzip-size'));
var terser = _interopDefault(require('terser'));
var brotli = _interopDefault(require('brotli-size'));
var pacote = _interopDefault(require('pacote'));

const readFile = util.promisify(fs.readFile);
const isWindows = process.platform === "win32";

function fixWindowsPath(path) {
  return path.slice( // istanbul ignore next
  isWindows ? 1 : 0);
} // Node should be ok with this, but transpiling
//  to `require` doesn't work, so detect Windows
//  to remove slash instead
// "file://" +


const thisDirectory = fixWindowsPath(path.dirname(decodeURI(new URL( // `import.meta.url` is giving backslashes in Windows currently
//  (at least in how it is compiled to CJS) which makes for an
//  invalid URL
(typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('index.js', document.baseURI).href)).replace(/\\/g, "/")).pathname)));
function filesize(options = {}, env) {
  let {
    render,
    format = {},
    theme = "dark",
    showBeforeSizes = "none",
    showGzippedSize = true,
    showBrotliSize = false,
    showMinifiedSize = true
  } = options;

  const getLoggingData = async function (outputOptions, bundle) {
    const {
      code,
      fileName
    } = bundle;
    const info = {};
    let codeBefore;

    if (showBeforeSizes !== "none") {
      let file = outputOptions.file || outputOptions.dest;

      if (showBeforeSizes !== "build") {
        const {
          name
        } = await Promise.resolve().then(function () { return _interopNamespace(require(path.join(process.cwd(), "./package.json"))); });

        try {
          const output = path.join(thisDirectory, "../.cache");
          const {
            resolved
          } = await pacote.extract(`${name}@latest`, output);
          const idx = resolved.lastIndexOf(name);
          const lastVersion = resolved.slice(idx + name.length + 1, -".tgz".length);
          info.lastVersion = lastVersion;
          file = path.resolve(output, file);
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
          console.log(`File, "${file}", was not found.`); // File might not exist
        }
      }
    }

    info.fileName = fileName;
    info.bundleSize = fileSize(Buffer.byteLength(code), format);
    info.brotliSize = showBrotliSize ? fileSize(await brotli(code), format) : "";

    if (showMinifiedSize || showGzippedSize) {
      const minifiedCode = (await terser.minify(code)).code;
      info.minSize = showMinifiedSize ? fileSize(minifiedCode.length, format) : "";
      info.gzipSize = showGzippedSize ? fileSize(gzip.sync(minifiedCode), format) : "";
    }

    if (codeBefore) {
      info.bundleSizeBefore = fileSize(Buffer.byteLength(codeBefore), format);
      info.brotliSizeBefore = showBrotliSize ? fileSize(await brotli(codeBefore), format) : "";

      if (showMinifiedSize || showGzippedSize) {
        const minifiedCode = (await terser.minify(codeBefore)).code;
        info.minSizeBefore = showMinifiedSize ? fileSize(minifiedCode.length, format) : "";
        info.gzipSizeBefore = showGzippedSize ? fileSize(gzip.sync(minifiedCode), format) : "";
      }
    }

    const opts = {
      format,
      theme,
      render,
      showBeforeSizes,
      showGzippedSize,
      showBrotliSize,
      showMinifiedSize
    };

    if (render) {
      console.warn("`render` is now deprecated. Please use `reporter` instead.");
      return opts.render(opts, outputOptions, info);
    }

    const reporters = options.reporter ? Array.isArray(options.reporter) ? options.reporter : [options.reporter] : ["boxen"];
    return (await Promise.all(reporters.map(async reporter => {
      if (typeof reporter === "string") {
        let p;

        if (reporter === "boxen") {
          p = Promise.resolve().then(function () { return _interopNamespace(require(path.join(thisDirectory, "/reporters/boxen.js"))); });
        } else {
          p = Promise.resolve().then(function () { return _interopNamespace(require(path.resolve(process.cwd(), reporter))); });
        }

        reporter = (await p).default;
      }

      return reporter(opts, outputOptions, info);
    }))).join("");
  };

  if (env === "test") {
    return getLoggingData;
  }

  return {
    name: "filesize",

    async generateBundle(outputOptions, bundle
    /* , isWrite */
    ) {
      const dataStrs = await Promise.all(Object.keys(bundle).map(fileName => bundle[fileName]).filter(currentBundle => {
        if ({}.hasOwnProperty.call(currentBundle, "type")) {
          return currentBundle.type !== "asset";
        }

        return !currentBundle.isAsset;
      }).map(currentBundle => {
        return getLoggingData(outputOptions, currentBundle);
      }));
      dataStrs.forEach(str => {
        if (str) {
          console.log(str);
        }
      });
    }

  };
}

module.exports = filesize;
//# sourceMappingURL=index.js.map
