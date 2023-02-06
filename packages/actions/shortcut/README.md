<div align="center">

# `@svelte-put/shortcut`

[![npm.badge]][npm] [![bundlephobia.badge]][bundlephobia] [![docs.badge]][docs]

Svelte action `use:shortcut` - add event listener for keyboard shortcuts

</div>

## `svelte-put`

This package is part of the [@svelte-put][github.monorepo] family. For contributing guideline and more, refer to its [readme][github.monorepo].

## Usage & Documentation

[See the dedicated documentation page here][docs].

## Quick Start

```html
<script lang="ts">
  import { shortcut, type ShortcutEventDetails } from '@svelte-put/shortcut';

  function handleK(detail: ShortcutEventDetails) {
    console.log('attached node:', detail.node);
    console.log('original trigger config:', detail.trigger);
  }
</script>

<svelte:window use:shortcut={{ trigger: { key: 'k', modifier: ['ctrl', 'meta'], callback: handleK,
}, }} />
```

## [Changelog][github.changelog]

<p align="center">
  <a href="https://www.buymeacoffee.com/vnphanquang" target="_blank">
    <img
      src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
      height="60"
      width="217"
      alt="buy vnphanquang a coffee"
    />
  </a>
</p>

<!-- github specifics -->

[github.monorepo]: https://github.com/vnphanquang/svelte-put
[github.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/shortcut/CHANGELOG.md
[github.issues]: https://github.com/vnphanquang/svelte-put/issues?q=

<!-- heading badge -->

[npm.badge]: https://img.shields.io/npm/v/@svelte-put/shortcut
[npm]: https://www.npmjs.com/package/@svelte-put/shortcut
[bundlephobia.badge]: https://img.shields.io/bundlephobia/minzip/@svelte-put/shortcut?label=minzipped
[bundlephobia]: https://bundlephobia.com/package/@svelte-put/shortcut
[docs]: https://svelte-put.vnphanquang.com/docs/shortcut
[docs.badge]: https://img.shields.io/badge/-Docs%20Site-blue
