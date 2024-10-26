<div align="center">

# `@svelte-put/cloudflare-turnstile`

[![npm.badge]][npm] [![bundlephobia.badge]][bundlephobia] [![docs.badge]][docs] [![repl.badge]][repl]

Svelte action `use:cloudflare-turnstile` - event for clicking outside a node

</div>

## `svelte-put`

This package is part of the [@svelte-put][github.monorepo] family. For contributing guideline and more, refer to its [readme][github.monorepo].

## Usage & Documentation

[See the dedicated documentation page here][docs].

## Quick Start

```html
<!-- component.svelte -->
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
[github.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/cloudflare-turnstile/CHANGELOG.md
[github.issues]: https://github.com/vnphanquang/svelte-put/issues?q=

<!-- heading badge -->

[npm.badge]: https://img.shields.io/npm/v/@svelte-put/cloudflare-turnstile
[npm]: https://www.npmjs.com/package/@svelte-put/cloudflare-turnstile
[bundlephobia.badge]: https://img.shields.io/bundlephobia/minzip/@svelte-put/cloudflare-turnstile?label=minzipped
[bundlephobia]: https://bundlephobia.com/package/@svelte-put/cloudflare-turnstile
[repl]: https://svelte.dev/repl/9e5f9ee41c2c45aa8523993e357f6e78
[repl.badge]: https://img.shields.io/static/v1?label=&message=Svelte+REPL&logo=svelte&logoColor=fff&color=ff3e00
[docs]: https://svelte-put.vnphanquang.com/docs/cloudflare-turnstile
[docs.badge]: https://img.shields.io/badge/-Docs%20Site-blue
