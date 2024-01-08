<div align="center">

# `@svelte-put/qr`

[![npm.badge]][npm] [![bundlephobia.badge]][bundlephobia] [![docs.badge]][docs] [![repl.badge]][repl]

Render QR as `img` or `svg`, optionally with logo

</div>

## `svelte-put`

This package is part of the [@svelte-put][github.monorepo] family. For contributing guideline and more, refer to its [readme][github.monorepo].

## Usage & Documentation

[See the dedicated documentation page here][docs].

## Quick Start

Given one of the following usage

```html
<script>
  // as img
  import { qr as imgQR } from '@svelte-put/qr/img';
  import ImgQR from '@svelte-put/qr/img/QR.svelte';

  // as svg
  import { qr as svgQR } from '@svelte-put/qr/svg';
  import SvgQR from '@svelte-put/qr/svg/QR.svelte';

  const data = 'https://svelte-put.vnphanquang.com/docs/qr';
  const logo = 'https://svelte-put.vnphanquang.com/images/svelte-put-logo.svg';
</script>

<!-- svg using component -->
<SvgQR {data} {logo} />

<!-- svg using action -->
<svg use:svgQR="{{" data, logo }} />

<!-- img using component -->
<ImgQR {data} {logo} />

<!-- img using action -->
<img use:imgQR="{{" data, logo }} />
```

The rendered QR will be similar to this:

<img src="https://raw.githubusercontent.com/vnphanquang/svelte-put/main/packages/misc/qr/static/qr.svg" width="410" height="410" alt="qr">

## [Changelog][github.changelog]

<!-- github specifics -->

[github.monorepo]: https://github.com/vnphanquang/svelte-put
[github.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/qr/CHANGELOG.md
[github.issues]: https://github.com/vnphanquang/svelte-put/issues?q=

<!-- heading badge -->

[npm.badge]: https://img.shields.io/npm/v/@svelte-put/qr
[npm]: https://www.npmjs.com/package/@svelte-put/qr
[bundlephobia.badge]: https://img.shields.io/bundlephobia/minzip/@svelte-put/qr?label=minzipped
[bundlephobia]: https://bundlephobia.com/package/@svelte-put/qr
[repl]: https://svelte.dev/repl/74c053b447e94244833f9c3d73210ae5
[repl.badge]: https://img.shields.io/static/v1?label=&message=Svelte+REPL&logo=svelte&logoColor=fff&color=ff3e00
[docs]: https://svelte-put.vnphanquang.com/docs/qr
[docs.badge]: https://img.shields.io/badge/-Docs%20Site-blue
