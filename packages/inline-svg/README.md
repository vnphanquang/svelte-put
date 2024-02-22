<div align="center">

# `@svelte-put/inline-svg`

[![npm.badge]][npm] [![bundlephobia.badge]][bundlephobia] [![docs.badge]][docs]

Svelte action `use:inlineSvg` for inlining dynamic SVGs (fetched from network)

</div>

## `svelte-put`

This package is part of the [@svelte-put][github.monorepo] family. For contributing guideline and more, refer to its [readme][github.monorepo].

## Usage & Documentation

[See the dedicated documentation page here][docs].

## Quick Start

```html
<script>
  import { inlineSvg } from '@svelte-put/inline-svg';
</script>

<svg use:inlineSvg={'https://example.com/icon.svg'}></svg>
```

To inline static SVGs during build time, use [@svelte-put/preprocess-inline-svg](https://github.com/vnphanquang/svelte-put/tree/main/packages/preprocessors/inline-svg), which is also conveniently re-exported from this package.

```javascript
// svelte.config.js
import { inlineSvg } from '@svelte-put/inline-svg/preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [inlineSvg()],
};
export default config;
```

See documentation for preprocessor at [@svelte-put/preprocess-inline-svg](https://svelte-put.vnphanquang.com/docs/preprocess-inline-svg).

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
