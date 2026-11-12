<div align="center">

# `@svelte-put/clickoutside`

[![npm.badge]][npm] [![bundlephobia.badge]][bundlephobia] [![docs.badge]][docs]

Svelte action `use:clickoutside` - event for clicking outside a node

</div>

## `svelte-put`

This package is part of the [@svelte-put][github.monorepo] family. For contributing guideline and more, refer to its [readme][github.monorepo].

## Usage & Documentation

[See the dedicated documentation page here][docs].

## Quick Start

```svelte
<script lang="ts">
	import { clickoutside } from '@svelte-put/clickoutside';

	function doSomething(e: CustomEvent<MouseEvent>) {
		console.log(e.target);
	}
</script>

<div use:clickoutside onclickoutside={doSomething} />
```

## [Changelog][github.changelog]

<!-- github specifics -->

[github.monorepo]: https://github.com/vnphanquang/svelte-put
[github.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/clickoutside/CHANGELOG.md
[github.issues]: https://github.com/vnphanquang/svelte-put/issues?q=

<!-- heading badge -->

[npm.badge]: https://img.shields.io/npm/v/@svelte-put/clickoutside
[npm]: https://www.npmjs.com/package/@svelte-put/clickoutside
[bundlephobia.badge]: https://img.shields.io/bundlephobia/minzip/@svelte-put/clickoutside?label=minzipped
[bundlephobia]: https://bundlephobia.com/package/@svelte-put/clickoutside
[docs]: https://svelte-put.vnphanquang.com/packages/clickoutside
[docs.badge]: https://img.shields.io/badge/-Docs%20Site-blue
