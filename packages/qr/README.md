# `@svelte-put/qr`

[![Read documentation][docs.badge]][docs]
[![Open on npmx.dev][npmx.version]][npmx]
[![Open on npmx.dev][npmx.vulnerabilities]][npmx]
[![Open on npmx.dev][npmx.size]][npmx]
[![See license][npmx.license]][license]

Render QR as `img` or `svg`, optionally with logo

## `svelte-put`

This package is part of the [@svelte-put][github.monorepo] family. For contributing guideline and more, refer to its [readme][github.monorepo].

## Usage & Documentation

[See the dedicated documentation page here][docs].

## Quick Start

Given the following:

```svelte
<script>
	// as img
	import { qr as imgQR } from '@svelte-put/qr/img';
	import ImgQR from '@svelte-put/qr/img/QR.svelte';

	// as svg
	import { qr as svgQR } from '@svelte-put/qr/svg';
	import SvgQR from '@svelte-put/qr/svg/QR.svelte';

	const data = 'https://svelte.dev';
	const logo = 'https://svelte.dev/favicon.png';
</script>

<!-- svg using component -->
<SvgQR {data} {logo} />

<!-- svg using action -->
<svg use:svgQR={{ data, logo }} />

<!-- img using component -->
<ImgQR {data} {logo} />

<!-- img using action -->
<img use:imgQR={{ data, logo }} />
```

The rendered QR will be similar to this:

<img src="https://raw.githubusercontent.com/vnphanquang/svelte-put/main/packages/qr/static/qr.png" width="250" height="250" alt="qr">

## [Changelog][github.changelog]

<!-- github specifics -->

[github.monorepo]: https://github.com/vnphanquang/svelte-put
[github.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/qr/CHANGELOG.md
[license]: https://github.com/vnphanquang/svelte-put/blob/main/LICENSE

<!-- others -->

[npmx]: https://npmx.dev/package/@svelte-put/qr
[npmx.version]: https://npmx.dev/api/registry/badge/version/@svelte-put/qr
[npmx.vulnerabilities]: https://npmx.dev/api/registry/badge/vulnerabilities/@svelte-put/qr
[npmx.bundlephobia]: https://npmx.dev/api/registry/badge/size/@svelte-put/qr
[npmx.license]: https://npmx.dev/api/registry/badge/license/@svelte-put/qr
[npmx.size]: https://npmx.dev/api/registry/badge/size/@svelte-put/qr
[docs]: https://svelte-put.vnphanquang.com/packages/qr
[docs.badge]: https://img.shields.io/badge/-Docs%20Site-blue
