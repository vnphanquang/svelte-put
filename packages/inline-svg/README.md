# `@svelte-put/inline-svg`

[![Read documentation][docs.badge]][docs]
[![Open on npmx.dev][npmx.version]][npmx]
[![Open on npmx.dev][npmx.vulnerabilities]][npmx]
[![See on bundlephobia][npmx.bundlephobia]][bundlephobia]
[![See license][npmx.license]][license]

Strategies to inline SVGs in Svelte land. Features include:

- Vite plugin / Svelte preprocessor for inlining static SVGs at compile-time
- Svelte action for inlining dynamic SVGs at runtime

## `svelte-put`

This package is part of the [@svelte-put][github.monorepo] family. For contributing guideline and more, refer to its [readme][github.monorepo].

## Usage & Documentation

[See the dedicated documentation page here][docs].

## Examples

### Runtime - Dymamic SVGs - Svelte Action

```html
<script>
  import { inlineSvg } from '@svelte-put/inline-svg';
</script>

<svg use:inlineSvg={'https://example.com/icon.svg'}></svg>
```

### Compile-time - Static SVGs - Svelte Preprocessor

Given the following directory setup...

```
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

...and this Vite config:

```typescript
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

import { inlineSvg } from '@svelte-put/inline-svg/vite';

export default defineConfig({
	plugins: [
		svelte(), // or import('@sveltejs/kit/vite').sveltekit
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
	],
});
```

...we can now do...

```svelte
<!-- this will have width="20" height="20" as specified in the config -->
<svg inline-src="svelte" />

<!-- nested -->
<svg inline-src="google/arrow-right.svg" />
<!-- .svg can be omitted -->
<svg inline-src="simpleicons/github" />

<!-- with custom attributes -->
<svg inline-src="diagram" width="100" height="100" />

<!-- alternatively, you can provide a per-case path that is relative to the current source file -->
<svg inline-src="./local-icon.svg" />

<!-- if the source svg is not found for any of the above, an error will be thrown -->
```

## [Changelog][github.changelog]

<!-- github specifics -->

[github.monorepo]: https://github.com/vnphanquang/svelte-put
[github.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/inline-svg/CHANGELOG.md
[license]: https://github.com/vnphanquang/svelte-put/blob/main/LICENSE

<!-- heading badges -->

[npmx.version]: https://npmx.dev/api/registry/badge/version/@svelte-put/inline-svg
[npmx.vulnerabilities]: https://npmx.dev/api/registry/badge/vulnerabilities/@svelte-put/inline-svg
[npmx.bundlephobia]: https://npmx.dev/api/registry/badge/size/@svelte-put/inline-svg
[npmx.license]: https://npmx.dev/api/registry/badge/license/@svelte-put/inline-svg
[docs.badge]: https://img.shields.io/badge/-Docs%20Site-blue

<!-- others -->

[npmx]: https://npmx.dev/package/@svelte-put/inline-svg
[bundlephobia]: https://bundlephobia.com/package/@svelte-put/inline-svg
[docs]: https://svelte-put.vnphanquang.com/docs/inline-svg
