<div align="center">

# `@svelte-put/preprocess-inline-svg`

[![npm.badge]][npm] [![bundlephobia.badge]][bundlephobia] [![docs.badge]][docs]

Svelte preprocessor for inlining static svg at build time

</div>

## `svelte-put`

This package is part of the [@svelte-put][github.monorepo] family. For contributing guideline and more, refer to its [readme][github.monorepo].

## Usage & Documentation

[See the dedicated documentation page here][docs].

## Quick Start

Given this `svelte.config.js`

```javascript
import inlineSvg from '@svelte-put/preprocess-inline-svg';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    inlineSvg([
      {
        directories: 'src/assets/icons',
        attributes: {
          class: 'icon',
          width: '20',
          height: '20',
        },
      },
      {
        directories: 'src/assets/pictograms',
      },
    ]),
    // other preprocessors
  ],
};
export default config;
```

and the asset files as follow

```tree
src/assets
    |
    |-- icons
         |-- svelte.svg
         |
         |-- google
               |-- arrow-right.svg
         |-- simpleicons
               |-- github.svg
    |
    |-- pictograms
         |-- diagram.svg
```

We can now do

```html
<!-- this will have width="20" height="20" as specified in the config -->
<svg data-inline-src="svelte"></svg>

<!-- nested -->
<svg data-inline-src="google/arrow-right.svg"></svg>
<!-- .svg can be omitted -->
<svg data-inline-src="simpleicons/github"></svg>

<!-- with custom attributes -->
<svg data-inline-src="diagram" width="100" height="100"></svg>

<!-- alternatively, you can provide a per-case path that is relative to the current source file -->
<svg data-inline-src="./local-icon.svg"></svg>

<!-- if the source svg is not found for any of the above, an error will be thrown -->
```

## [Changelog][github.changelog]

<!-- github specifics -->

[github.monorepo]: https://github.com/vnphanquang/svelte-put
[github.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/preprocess-inline-svg/CHANGELOG.md
[github.issues]: https://github.com/vnphanquang/svelte-put/issues?q=

<!-- heading badge -->

[npm.badge]: https://img.shields.io/npm/v/@svelte-put/preprocess-inline-svg
[npm]: https://www.npmjs.com/package/@svelte-put/preprocess-inline-svg
[bundlephobia.badge]: https://img.shields.io/bundlephobia/minzip/@svelte-put/preprocess-inline-svg?label=minzipped
[bundlephobia]: https://bundlephobia.com/package/@svelte-put/preprocess-inline-svg
[docs]: https://svelte-put.vnphanquang.com/docs/preprocess-inline-svg
[docs.badge]: https://img.shields.io/badge/-Docs%20Site-blue
