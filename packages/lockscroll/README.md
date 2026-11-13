<div align="center">

# `@svelte-put/lockscroll`

[![npm.badge]][npm] [![bundlephobia.badge]][bundlephobia] [![docs.badge]][docs]

Utilities for locking scroll globally or within an HTML element

</div>

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
[github.issues]: https://github.com/vnphanquang/svelte-put/issues?q=

<!-- heading badge -->

[npm.badge]: https://img.shields.io/npm/v/@svelte-put/lockscroll
[npm]: https://www.npmjs.com/package/@svelte-put/lockscroll
[bundlephobia.badge]: https://img.shields.io/bundlephobia/minzip/@svelte-put/lockscroll?label=minzipped
[bundlephobia]: https://bundlephobia.com/package/@svelte-put/lockscroll
[docs]: https://svelte-put.vnphanquang.com/packages/lockscroll
[docs.badge]: https://img.shields.io/badge/-Docs%20Site-blue
