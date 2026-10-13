# `@svelte-put/external-link`

[![Read documentation][docs.badge]][docs]
[![Open on npmx.dev][npmx.version]][npmx]
[![Open on npmx.dev][npmx.vulnerabilities]][npmx]
[![See on bundlephobia][npmx.bundlephobia]][bundlephobia]
[![See license][npmx.license]][license]

Vite plugin / Svelte preprocessor to add appropriate attributes to external links at compile-time.

## `svelte-put`

This package is part of the [@svelte-put][github.monorepo] family. For contributing guideline and more, refer to its [readme][github.monorepo].

## Usage & Documentation

[See the dedicated documentation page here][docs].

## Example

Given the following Vite config...

```javascript
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { externalLink } from '@svelte-put/preprocess-external-link'; // [!code ++]

export default defineConfig({
	plugins: [
		svelte(), // or import('@sveltejs/kit/vite').sveltekit
		externalLink(['your-domain.com', 'your-other-domain.com']), // [!code ++]
	],
});
```

...and the following source code...

```svelte
<script>
	let href = 'https://developer.mozilla.org';
</script>

<!-- links that are treated as internal -->
<a href="/internal-path">Internal Path</a>
<a href="https//your-domain.com/some-path">Internal Path</a>
<a href="https//your-other-domain.com/some-path">Internal Path</a>

<!-- links that are treated as external, implicitly -->
<a href="https://svelte.dev/">Svelte</a>

<!-- links that are treated as external, explicitly by specifying data-external -->
<a {href} data-external>Svelte</a>
```

...`preprocess-external-link` will generate the following intermediate **Svelte output**:

```svelte
<script>
	let href = 'https://developer.mozilla.org';
</script>

<!-- links that are treated as internal -->
<a href="/internal-path">Internal Path</a>
<a href="https//your-domain.com/some-path">Internal Path</a>
<a href="https//your-other-domain.com/some-path">Internal Path</a>

<!-- links that are treated as external, implicitly -->
<a href="https://svelte.dev/" target="_blank" rel="noreferrer noopener">Svelte</a>

<!-- links that are treated as external, explicitly by specifying data-external -->
<a {href} data-external target="_blank" rel="noreferrer noopener">Svelte</a>
```

## [Changelog][github.changelog]

<!-- github specifics -->

[github.monorepo]: https://github.com/vnphanquang/svelte-put
[github.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/external-link/CHANGELOG.md
[license]: https://github.com/vnphanquang/svelte-put/blob/main/LICENSE

<!-- heading badges -->

[npmx.version]: https://npmx.dev/api/registry/badge/version/@svelte-put/external-link
[npmx.vulnerabilities]: https://npmx.dev/api/registry/badge/vulnerabilities/@svelte-put/external-link
[npmx.bundlephobia]: https://npmx.dev/api/registry/badge/size/@svelte-put/external-link
[npmx.license]: https://npmx.dev/api/registry/badge/license/@svelte-put/external-link
[docs.badge]: https://img.shields.io/badge/-Docs%20Site-blue

<!-- others -->

[npmx]: https://npmx.dev/package/@svelte-put/external-link
[bundlephobia]: https://bundlephobia.com/package/@svelte-put/external-link
[docs]: https://svelte-put.vnphanquang.com/docs/external-link
