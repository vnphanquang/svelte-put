<div align="center">

# `@svelte-put/noti`

[![npm.badge]][npm] [![bundlephobia.badge]][bundlephobia] [![docs.badge]][docs] [![repl.badge]][repl]

Async notification via Svelte store & action

![demo](https://raw.githubusercontent.com/vnphanquang/svelte-put/main/packages/actions/noti/static/images/demo.gif)

</div>

## `svelte-put`

This package is part of the [@svelte-put][github.monorepo] family. For contributing guideline and more, refer to its [readme][github.monorepo].

## Usage & Documentation

[See the dedicated documentation page here][docs].

## Quick Start

```html
<script lang="ts">
  import { toastPortal, prepare } from '@svelte-put/noti';
  import Toast from '$lib/components/Toast.svelte';

  const toastStore = prepare({
    info: {
      component: Toast,
      props: { kind: 'info' },
    },
    warning: {
      component: Toast,
      props: { kind: 'warning' },
    },
    success: {
      component: Toast,
      props: { kind: 'success' },
    },
    error: {
      component: Toast,
      props: { kind: 'error' },
    },
  });

  onMount(() => {
    toastStore.push('success', {
      message: 'An example success',
    });
  });
</script>

<div use:portal="{toastStore}" />
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
[github.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/noti/CHANGELOG.md
[github.issues]: https://github.com/vnphanquang/svelte-put/issues?q=

<!-- heading badge -->

[npm.badge]: https://img.shields.io/npm/v/@svelte-put/noti
[npm]: https://www.npmjs.com/package/@svelte-put/noti
[bundlephobia.badge]: https://img.shields.io/bundlephobia/minzip/@svelte-put/noti?label=minzipped
[bundlephobia]: https://bundlephobia.com/package/@svelte-put/noti
[repl]: https://svelte.dev/repl/9e5f9ee41c2c45aa8523993e357f6e78
[repl.badge]: https://img.shields.io/static/v1?label=&message=Svelte+REPL&logo=svelte&logoColor=fff&color=ff3e00
[docs]: https://svelte-put.vnphanquang.com/docs/noti
[docs.badge]: https://img.shields.io/badge/-Docs%20Site-blue
