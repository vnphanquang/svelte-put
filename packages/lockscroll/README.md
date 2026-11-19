# `@svelte-put/lockscroll`

[![Read documentation][docs.badge]][docs]
[![Open on npmx.dev][npmx.version]][npmx]
[![Open on npmx.dev][npmx.vulnerabilities]][npmx]
[![Open on npmx.dev][npmx.size]][npmx]
[![See license][npmx.license]][license]

Utilities for locking scroll globally or within an HTML element

## `svelte-put`

This package is part of the [@svelte-put][github.monorepo] family. For contributing guideline and more, refer to its [readme][github.monorepo].

## Usage & Documentation

[See the dedicated documentation page here][docs].

## Quick Start

```svelte
<script>
	import { lockscroll } from '@svelte-put/lockscroll';

	let locked = $state(false);
</script>

<svelte:body use:lockscroll={locked} />

<button onclick={() => (locked = !locked)}>Toggle lock scroll on body</button>
```

## [Changelog][github.changelog]

<!-- github specifics -->

[github.monorepo]: https://github.com/vnphanquang/svelte-put
[github.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/lockscroll/CHANGELOG.md
[license]: https://github.com/vnphanquang/svelte-put/blob/main/LICENSE

<!-- others -->

[npmx]: https://npmx.dev/package/@svelte-put/lockscroll
[npmx.version]: https://npmx.dev/api/registry/badge/version/@svelte-put/lockscroll
[npmx.vulnerabilities]: https://npmx.dev/api/registry/badge/vulnerabilities/@svelte-put/lockscroll
[npmx.bundlephobia]: https://npmx.dev/api/registry/badge/size/@svelte-put/lockscroll
[npmx.license]: https://npmx.dev/api/registry/badge/license/@svelte-put/lockscroll
[npmx.size]: https://npmx.dev/api/registry/badge/size/@svelte-put/lockscroll
[docs]: https://svelte-put.vnphanquang.com/packages/lockscroll
[docs.badge]: https://img.shields.io/badge/-Docs%20Site-blue
