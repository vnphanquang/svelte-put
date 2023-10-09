<div align="center">

# `@svelte-put/copy`

[![npm.badge]][npm] [![bundlephobia.badge]][bundlephobia] [![docs.badge]][docs]

Svelte action `use:copy` and utility for copying text to clipboard

</div>

## `svelte-put`

This package is part of the [@svelte-put][github.monorepo] family. For contributing guideline and more, refer to its [readme][github.monorepo].

## Usage & Documentation

[See the dedicated documentation page here][docs].

## Quick Start

```html
<script lang="ts">
  import { copy, type CopyDetail } from '@svelte-put/copy';

  function handleCopied(e: CustomEvent<CopyDetail>) {
    console.log('Text copied:', e.detail.text);
  }
</script>

<button type="button" use:copy on:copied="{handleCopied}">Click to copy this</button>
```

## [Changelog][github.changelog]

<!-- github specifics -->

[github.monorepo]: https://github.com/vnphanquang/svelte-put
[github.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/copy/CHANGELOG.md
[github.issues]: https://github.com/vnphanquang/svelte-put/issues?q=

<!-- heading badge -->

[npm.badge]: https://img.shields.io/npm/v/@svelte-put/copy
[npm]: https://www.npmjs.com/package/@svelte-put/copy
[bundlephobia.badge]: https://img.shields.io/bundlephobia/minzip/@svelte-put/copy?label=minzipped
[bundlephobia]: https://bundlephobia.com/package/@svelte-put/copy
[docs]: https://svelte-put.vnphanquang.com/docs/copy
[docs.badge]: https://img.shields.io/badge/-Docs%20Site-blue
