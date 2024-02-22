<div align="center">

# `@svelte-put/resize`

[![npm.badge]][npm] [![bundlephobia.badge]][bundlephobia] [![docs.badge]][docs]

Svelte action `use:resize` for pointer drag-to-scroll behavior

</div>

## `svelte-put`

This package is part of the [@svelte-put][github.monorepo] family. For contributing guideline and more, refer to its [readme][github.monorepo].

## Usage & Documentation

[See the dedicated documentation page here][docs].

## Quick Start

```html
<script lang="ts">
	import { resize } from '@svelte-put/resize';
	import type { ResizeDetail } from '@svelte-put/resize';

	function onResized(e: CustomEvent<ResizeDetail>) {
		console.log(e.detail);
	}
</script>

<div use:resize on:resized="{onResized}" />
```

## [Changelog][github.changelog]

<!-- github specifics -->

[github.monorepo]: https://github.com/vnphanquang/svelte-put
[github.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/resize/CHANGELOG.md
[github.issues]: https://github.com/vnphanquang/svelte-put/issues?q=

<!-- heading badge -->

[npm.badge]: https://img.shields.io/npm/v/@svelte-put/resize
[npm]: https://www.npmjs.com/package/@svelte-put/resize
[bundlephobia.badge]: https://img.shields.io/bundlephobia/minzip/@svelte-put/resize?label=minzipped
[bundlephobia]: https://bundlephobia.com/package/@svelte-put/resize
[docs]: https://svelte-put.vnphanquang.com/docs/resize
[docs.badge]: https://img.shields.io/badge/-Docs%20Site-blue
