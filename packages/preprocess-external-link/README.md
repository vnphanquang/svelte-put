<div align="center">

# `@svelte-put/preprocess-external-link`

[![npm.badge]][npm] [![bundlephobia.badge]][bundlephobia] [![docs.badge]][docs]

Svelte preprocessor for adding attributes to anchor tags that point to external domains.

</div>

## `svelte-put`

This package is part of the [@svelte-put][github.monorepo] family. For contributing guideline and more, refer to its [readme][github.monorepo].

## Usage & Documentation

[See the dedicated documentation page here][docs].

## Quick Start

Given this `svelte.config.js`...

```javascript
// svelte.config.js
import externalLink from '@svelte-put/preprocess-external-link';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		externalLink(['your-domain.com', 'your-other-domain.com']),
		// other preprocessors
	],
};
export default config;
```

..the following input markup...

```html
<!-- input.svelte -->
<script>
	let href = 'https://developer.mozilla.org';
</script>

<!-- links that are treated as internal -->
<a href="/internal-path">Internal Path</a>
<a href="https//your-domain.com/some-path">Internal Path</a>
<a href="https//your-other-domain.com/some-path">Internal Path</a>

<!-- links that are treated as external -->
<a href="https://svelte.dev/">Svelte</a>
<a {href} data-external>Svelte</a>
```

...will output

```html
<!-- output.html -->

<!-- links that are treated as internal -->
<a href="/internal-path">Internal Path</a>
<a href="https//your-domain.com/some-path">Internal Path</a>
<a href="https//your-other-domain.com/some-path">Internal Path</a>

<!-- links that are treated as external -->
<a href="https://svelte.dev/" target="_blank" rel="noreferrer noopener">Svelte</a>
<a {href} data-external target="_blank" rel="noreferrer noopener">Svelte</a>
```

## [Changelog][github.changelog]

<!-- github specifics -->

[github.monorepo]: https://github.com/vnphanquang/svelte-put
[github.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/preprocess-external-link/CHANGELOG.md
[github.issues]: https://github.com/vnphanquang/svelte-put/issues?q=

<!-- heading badge -->

[npm.badge]: https://img.shields.io/npm/v/@svelte-put/preprocess-external-link
[npm]: https://www.npmjs.com/package/@svelte-put/preprocess-external-link
[bundlephobia.badge]: https://img.shields.io/bundlephobia/minzip/@svelte-put/preprocess-external-link?label=minzipped
[bundlephobia]: https://bundlephobia.com/package/@svelte-put/preprocess-external-link
[docs]: https://svelte-put.vnphanquang.com/docs/preprocess-external-link
[docs.badge]: https://img.shields.io/badge/-Docs%20Site-blue
