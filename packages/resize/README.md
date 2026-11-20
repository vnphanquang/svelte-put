# `@svelte-put/resize`

[![Read documentation][docs.badge]][docs]
[![Open on npmx.dev][npmx.version]][npmx]
[![Open on npmx.dev][npmx.vulnerabilities]][npmx]
[![Open on npmx.dev][npmx.size]][npmx]
[![See license][npmx.license]][license]

wrapper for [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) in
Svelte land

## `svelte-put`

This package is part of the [@svelte-put][github.monorepo] family. For contributing guideline and more, refer to its [readme][github.monorepo].

## Usage & Documentation

[See the dedicated documentation page here][docs].

## Quick Start

```svelte
<script lang="ts">
	import { resize } from '@svelte-put/resize';
	import type { ResizeDetail } from '@svelte-put/resize';

	function onResized(e: CustomEvent<ResizeDetail>) {
		console.log(e.detail);
	}
</script>

<div use:resize onresized={onResized} />
```

## [Changelog][github.changelog]

<!-- github specifics -->

[github.monorepo]: https://github.com/vnphanquang/svelte-put
[github.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/resize/CHANGELOG.md
[license]: https://github.com/vnphanquang/svelte-put/blob/main/LICENSE

<!-- others -->

[npmx]: https://npmx.dev/package/@svelte-put/resize
[npmx.version]: https://npmx.dev/api/registry/badge/version/@svelte-put/resize
[npmx.vulnerabilities]: https://npmx.dev/api/registry/badge/vulnerabilities/@svelte-put/resize
[npmx.bundlephobia]: https://npmx.dev/api/registry/badge/size/@svelte-put/resize
[npmx.license]: https://npmx.dev/api/registry/badge/license/@svelte-put/resize
[npmx.size]: https://npmx.dev/api/registry/badge/size/@svelte-put/resize
[docs]: https://vnphanquang.com/projects/svelte-put/packages/resize
[docs.badge]: https://img.shields.io/badge/-Docs%20Site-blue
