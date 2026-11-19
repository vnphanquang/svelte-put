# `@svelte-put/cloudflare-turnstile`

[![Read documentation][docs.badge]][docs]
[![Open on npmx.dev][npmx.version]][npmx]
[![Open on npmx.dev][npmx.vulnerabilities]][npmx]
[![Open on npmx.dev][npmx.size]][npmx]
[![See license][npmx.license]][license]

Utilities for setting up [Cloudflare
Turnstile](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/) in Svelte
land

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
[github.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/cloudflare-turnstile/CHANGELOG.md
[license]: https://github.com/vnphanquang/svelte-put/blob/main/LICENSE

<!-- others -->

[npmx]: https://npmx.dev/package/@svelte-put/cloudflare-turnstile
[npmx.version]: https://npmx.dev/api/registry/badge/version/@svelte-put/cloudflare-turnstile
[npmx.vulnerabilities]: https://npmx.dev/api/registry/badge/vulnerabilities/@svelte-put/cloudflare-turnstile
[npmx.bundlephobia]: https://npmx.dev/api/registry/badge/size/@svelte-put/cloudflare-turnstile
[npmx.license]: https://npmx.dev/api/registry/badge/license/@svelte-put/cloudflare-turnstile
[npmx.size]: https://npmx.dev/api/registry/badge/size/@svelte-put/cloudflare-turnstile
[docs]: https://svelte-put.vnphanquang.com/packages/cloudflare-turnstile
[docs.badge]: https://img.shields.io/badge/-Docs%20Site-blue
