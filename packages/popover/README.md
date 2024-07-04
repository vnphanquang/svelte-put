<div align="center">

# `@svelte-put/popover`

[![npm.badge]][npm] [![bundlephobia.badge]][bundlephobia] [![docs.badge]][docs]

Idiomatic Svelte enhancements to [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)

</div>

## `svelte-put`

This package is part of the [@svelte-put][github.monorepo] family. For contributing guideline and more, refer to its [readme][github.monorepo].

## Usage & Documentation

[See the dedicated documentation page here][docs].

## Quick Start

```html
<script>
	import { Popover } from '@svelte-put/popover';

	const popover = new Popover();
</script>

<button {...popover.control.attributes} use:popover.control.actions>
	Open me Popover
</button>

<div {...popover.target.attributes} use:popover.target.actions>
	<p>Popover content. Click backdrop to dismiss</p>
</div>
```

## [Changelog][github.changelog]

<!-- github specifics -->

[github.monorepo]: https://github.com/vnphanquang/svelte-put
[github.changelog]: https://github.com/vnphanquang/svelte-put/blob/next/packages/popover/CHANGELOG.md
[github.issues]: https://github.com/vnphanquang/svelte-put/issues?q=

<!-- heading badge -->

[npm.badge]: https://img.shields.io/npm/v/@svelte-put/popover
[npm]: https://www.npmjs.com/package/@svelte-put/popover
[bundlephobia.badge]: https://img.shields.io/bundlephobia/minzip/@svelte-put/popover?label=minzipped
[bundlephobia]: https://bundlephobia.com/package/@svelte-put/popover
[repl]: https://svelte.dev/repl/9e5f9ee41c2c45aa8523993e357f6e78
[repl.badge]: https://img.shields.io/static/v1?label=&message=Svelte+REPL&logo=svelte&logoColor=fff&color=ff3e00
[docs]: https://svelte-put.vnphanquang.com/docs/popover
[docs.badge]: https://img.shields.io/badge/-Docs%20Site-blue

