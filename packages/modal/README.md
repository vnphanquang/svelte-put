<div align="center">

# `@svelte-put/modal`

[![npm.badge]][npm] [![bundlephobia.badge]][bundlephobia] [![docs.badge]][docs] [![repl.badge]][repl]

Solution to async & type-safe modals in Svelte.

</div>

This solution employs [svelte store][svelte.store] for handling stack-able modals in an async manner. That is, you can open a modal programmatically and await for it to be "resolved".

## `svelte-put`

This package is part of the [@svelte-put][github.monorepo] family. For contributing guideline and more, refer to its [readme][github.monorepo].

## Usage & Documentation

[See the dedicated documentation page here][docs].

## Quick Start

```typescript
// setup modal store
import { createModalStore } from '@svelte-put/modal';
export const modalStore = createModalStore();
```

```html
<!-- setup ModalPortal -->
<script lang="ts">
	import ModalPortal from '@svelte-put/modal/ModalPortal.svelte';

	import { modalStore } from './modal.store';
</script>

<slot />

<ModalPortal store="{modalStore}" />
```

```typescript
// load compatible modal & push/pop
import { modalStore } from './modal.store';
import MyModal from './MyModal.svelte';

const pushed = modal.push(MyModal, {
	/* props */
});
modal.pop(pushed);
```

## [Changelog][github.changelog]

<!-- github specifics -->

[github.monorepo]: https://github.com/vnphanquang/svelte-put
[github.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/modal/CHANGELOG.md
[github.issues]: https://github.com/vnphanquang/svelte-put/issues?q=

<!-- heading badge -->

[npm.badge]: https://img.shields.io/npm/v/@svelte-put/modal
[npm]: https://www.npmjs.com/package/@svelte-put/modal
[bundlephobia.badge]: https://img.shields.io/bundlephobia/minzip/@svelte-put/modal?label=minzipped
[bundlephobia]: https://bundlephobia.com/package/@svelte-put/modal
[repl]: https://svelte.dev/repl/0a68001337544b8ab55995fb3d02d1f6
[repl.badge]: https://img.shields.io/static/v1?label=&message=Svelte+REPL&logo=svelte&logoColor=fff&color=ff3e00
[docs]: https://svelte-put.vnphanquang.com/docs/modal
[docs.badge]: https://img.shields.io/badge/-Docs%20Site-blue

<!-- external resources -->

[svelte.store]: https://svelte.dev/docs#run-time-svelte-store
