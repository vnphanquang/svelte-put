<div align="center">

# `@svelte-put/inline-svg`

[![npm.badge]][npm] [![bundlephobia.badge]][bundlephobia] [![docs.badge]][docs]

Svelte action `use:inlineSvg` for inlining dynamic SVGs (fetched from network)

</div>

## `svelte-put`

This package is part of the [@svelte-put][github.monorepo] family. For contributing guideline and more, refer to its [readme][github.monorepo].

## Usage & Documentation

[See the dedicated documentation page here][docs].

## Dynamic SVGs - Svelte Action

```html
<script>
  import { inlineSvg } from '@svelte-put/inline-svg';
</script>

<svg use:inlineSvg={'https://example.com/icon.svg'}></svg>
```

## Static SVGs - Vite Plugin / Svelte Preprocessor

### Vite Plugin

To inline static SVGs during build time, use the exported Vite plugin:

```javascript
// vite.config.js
import path from 'path';
import { inlineSvg } from '@svelte-put/inline-svg/vite';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [
    inlineSvg(),
    sveltekit(),
  ],
};
export default config;
```

### Bare Preprocessor

The Svelte preprocessor is what is used internally by the aforementioned Vite plugin, which is the recommended. However, if your setup requires using the preprocessor directly, you can do so:

```javascript
// svelte.config.js
import { inlineSvg } from '@svelte-put/inline-svg/preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [inlineSvg()],
};
export default config;
```

## [Changelog][github.changelog]

<!-- github specifics -->

[github.monorepo]: https://github.com/vnphanquang/svelte-put
[github.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/inline-svg/CHANGELOG.md
[github.issues]: https://github.com/vnphanquang/svelte-put/issues?q=

<!-- heading badge -->

[npm.badge]: https://img.shields.io/npm/v/@svelte-put/inline-svg
[npm]: https://www.npmjs.com/package/@svelte-put/inline-svg
[bundlephobia.badge]: https://img.shields.io/bundlephobia/minzip/@svelte-put/inline-svg?label=minzipped
[bundlephobia]: https://bundlephobia.com/package/@svelte-put/inline-svg
[docs]: https://svelte-put.vnphanquang.com/docs/inline-svg
[docs.badge]: https://img.shields.io/badge/-Docs%20Site-blue
