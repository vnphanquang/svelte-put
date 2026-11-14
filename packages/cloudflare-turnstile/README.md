<div align="center">

# `@svelte-put/copy`

[![npm.badge]][npm] [![bundlephobia.badge]][bundlephobia] [![docs.badge]][docs]

Utilities for setting up [Cloudflare
Turnstile](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/) in Svelte
land

</div>

## `svelte-put`

This package is part of the [@svelte-put][github.monorepo] family. For contributing guideline and more, refer to its [readme][github.monorepo].

## Usage & Documentation

[See the dedicated documentation page here][docs].

## Quick Start

```svelte
<script>
	import { turnstile } from '@svelte-put/cloudflare-turnstile';
</script>

<div
	use:turnstile
	turnstile-sitekey="1x00000000000000000000AA"
	turnstile-theme="dark"
	turnstile-size="normal"
></div>
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
[docs]: https://svelte-put.vnphanquang.com/packages/copy
[docs.badge]: https://img.shields.io/badge/-Docs%20Site-blue
