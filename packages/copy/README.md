<div align="center">

# `@svelte-put/copy`

[![npm.badge]][npm] [![bundlephobia.badge]][bundlephobia] [![docs.badge]][docs] [![repl.badge]][repl]

Utilities for copying text to clipboard in Svelte land

</div>

## `svelte-put`

This package is part of the [@svelte-put][github.monorepo] family. For contributing guideline and more, refer to its [readme][github.monorepo].

## Usage & Documentation

[See the dedicated documentation page here][docs].

## Quick Start

```svelte
<script lang="ts">
	import { copy, type CopyDetail } from '@svelte-put/copy';

	function handleCopied(e: CustomEvent<CopyDetail>) {
		console.log('Text copied:', e.detail.text);
	}
</script>

<button type="button" use:copy oncopied={handleCopied}>Click to copy this</button>
```

## [Changelog][github.changelog]

<!-- github specifics -->

[github.monorepo]: https://github.com/vnphanquang/svelte-put
[github.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/copy/CHANGELOG.md
[github.issues]: https://github.com/vnphanquang/svelte-put/issues?q=

<!-- heading badge -->

[npm.badge]: https://img.shields.io/npm/v/@svelte-put/copy
[npm]: https://www.npmjs.com/package/@svelte-put/copy
[bundlephobia.badge]: https://img.shields.io/bundlephobia/minzip/@svelte-put/copy?label=minzipped
[bundlephobia]: https://bundlephobia.com/package/@svelte-put/copy
[repl]: https://svelte.dev/repl/9e5f9ee41c2c45aa8523993e357f6e78
[repl.badge]: https://img.shields.io/static/v1?label=&message=Svelte+REPL&logo=svelte&logoColor=fff&color=ff3e00
[docs]: https://svelte-put.vnphanquang.com/packages/copy
[docs.badge]: https://img.shields.io/badge/-Docs%20Site-blue
