<div align="center">

# `@svelte-put/clickoutside`

[![npm.badge]][npm] [![bundlephobia.badge]][bundlephobia] [![docs.badge]][docs] [![repl.badge]][repl]

Svelte action `use:clickoutside` - event for clicking outside a node

![demo](https://raw.githubusercontent.com/vnphanquang/svelte-put/main/packages/clickoutside/static/images/demo.gif)

</div>

## `svelte-put`

This package is part of the [@svelte-put][github.monorepo] family. For contributing guideline and more, refer to its [readme][github.monorepo].

## Usage & Documentation

[See the dedicated documentation page here][docs].

## Quick Start

```html
<script lang="ts">
	import { clickoutside } from '@svelte-put/clickoutside';

	function doSomething(e: CustomEvent<MouseEvent>) {
		console.log(e.target);
	}
</script>

<div use:clickoutside on:clickoutside="{doSomething}" />
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
[repl]: https://svelte.dev/repl/9e5f9ee41c2c45aa8523993e357f6e78
[repl.badge]: https://img.shields.io/static/v1?label=&message=Svelte+REPL&logo=svelte&logoColor=fff&color=ff3e00
[docs]: https://svelte-put.vnphanquang.com/docs/clickoutside
[docs.badge]: https://img.shields.io/badge/-Docs%20Site-blue
