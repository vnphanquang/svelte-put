# rollup-plugin-filesize

> A rollup plugin to show filesize in the cli

![](screen.png)

## Installation

```
npm install rollup-plugin-filesize
```

## Usage

```js
import { rollup } from 'rollup';
import filesize from 'rollup-plugin-filesize';

rollup({
  entry: 'main.js',
  plugins: [
    filesize()
  ]
}).then(...)
```

## options

#### showMinifiedSize

type: `boolean`
default: true

Whether to show minified size or not

#### showGzippedSize

type: `boolean`
default: true

Whether to show Gzipped size or not

#### showBrotliSize

type: `boolean`
default: false

Whether to show [Brotli](https://www.wikiwand.com/en/Brotli) size or not

#### showBeforeSizes

**Note: this feature is experimental and may be changed in a future release.**

type: `"release"`, `"build"`, or `"none"`
default: `"none"`

Indicates how, if any, comparisons will be shown between the
`output.file` file size as it was and as it is now being written.

If set to `"release"`, will compare the file size at present to that of
the last npm release.

If set to `"build"`, the size of the file that is now being built will
be compared to the immediately previous build. This means that if you run
Rollup multiple times with this option, the info on the previous package
size will be lost (since Rollup will have overwritten your copy), so with
this option, you will need to consult your terminal history to see what the
file size was prior to your changes. This option may be useful if you wish
to compare size changes incrementally as you are developing rather than
comparing to your last release.

#### format

type : `object`

default : {}

See the options [here](https://github.com/avoidwork/filesize.js#optional-settings)

#### reporter

(Note that this replaces the deprecated optional `render` function option.)

type : A reporter string (currently "boxen" only), a function, or an array thereof.

Defaults to "boxen".

After rendering occurs, you may wish to pass on the collected file data,
e.g., to build a badge for filesizes (as does [filesize-badger](https://github.com/brettz9/filesize-badger)).

You can use `reporter` to do so:

```js
filesize({
	reporter: [
		function (options, bundle, {
			minSize, gzipSize, brotliSize, bundleSize,
			fileName,
			// "showBeforeSizes: release"
			lastVersion,
			// "showBeforeSizes: "release" or "showBeforeSizes": "build"
			bundleSizeBefore, brotliSizeBefore, minSizeBefore, gzipSizeBefore
		}) {
			// If a promise is returned, it will be awaited before rendering.
			return promise;
		},
	],
});
```

#### theme

type: `string`

default : 'dark'

options : 'dark'/'light'

choose based on your terminal theme.

## License

MIT
