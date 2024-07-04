<div align="center">

# `@svelte-put/preprocess-auto-slug`

[![npm.badge]][npm] [![bundlephobia.badge]][bundlephobia] [![docs.badge]][docs]

Svelte preprocessor for adding `id` and anchor to nodes

</div>

## `svelte-put`

This package is part of the [@svelte-put][github.monorepo] family. For contributing guideline and more, refer to its [readme][github.monorepo].

## Usage & Documentation

[See the dedicated documentation page here][docs].

## Quick Start

```html
<!-- input.svelte -->
<h2>Quick start</h2>
```

```javascript
// svelte.config.js
import autoSlug from '@svelte-put/preprocess-auto-slug';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [autoSlug()],
};

export default config;
```

```html
<!-- output.html -->
<h2 id="quick-start">
  <a href="#quick-start" aria-hidden="true" tabindex="-1">#</a>
  Quick Start
</h2>
```

## [Changelog][github.changelog]

<!-- github specifics -->

[github.monorepo]: https://github.com/vnphanquang/svelte-put
[github.changelog]: https://github.com/vnphanquang/svelte-put/blob/next/packages/preprocess-auto-slug/CHANGELOG.md
[github.issues]: https://github.com/vnphanquang/svelte-put/issues?q=

<!-- heading badge -->

[npm.badge]: https://img.shields.io/npm/v/@svelte-put/preprocess-auto-slug
[npm]: https://www.npmjs.com/package/@svelte-put/preprocess-auto-slug
[bundlephobia.badge]: https://img.shields.io/bundlephobia/minzip/@svelte-put/preprocess-auto-slug?label=minzipped
[bundlephobia]: https://bundlephobia.com/package/@svelte-put/preprocess-auto-slug
[docs]: https://svelte-put.vnphanquang.com/docs/preprocess-auto-slug
[docs.badge]: https://img.shields.io/badge/-Docs%20Site-blue

