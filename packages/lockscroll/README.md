<div align="center">

# `@svelte-put/lockscroll`

[![npm.badge]][npm] [![bundlephobia.badge]][bundlephobia] [![docs.badge]][docs] [![repl.badge]][repl]

Svelte action `use:lockscroll` - locking scroll within an HTML element

</div>

## `svelte-put`

This package is part of the [@svelte-put][github.monorepo] family. For contributing guideline and more, refer to its [readme][github.monorepo].

## Usage & Documentation

[See the dedicated documentation page here][docs].

## Quick Start

```html
<script lang="ts">
	import { lockscroll, createLockScrollStore } from '@svelte-put/lockscroll';

	const locked = createLockScrollStore();
	// ... later
	locked.toggle();
</script>

<svelte:body use:lockscroll="{locked}" />
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
[repl]: https://svelte.dev/repl/8bfbdc1af58e43b2af4d625f63358a35
[repl.badge]: https://img.shields.io/static/v1?label=&message=Svelte+REPL&logo=svelte&logoColor=fff&color=ff3e00
[docs]: https://svelte-put.vnphanquang.com/docs/lockscroll
[docs.badge]: https://img.shields.io/badge/-Docs%20Site-blue
