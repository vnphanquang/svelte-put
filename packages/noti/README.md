<div align="center">

# `@svelte-put/noti`

[![npm.badge]][npm] [![bundlephobia.badge]][bundlephobia] [![docs.badge]][docs] [![repl.badge]][repl]

Type-safe and headless async notification builder

</div>

## `svelte-put`

This package is part of the [@svelte-put][github.monorepo] family. For contributing guideline and more, refer to its [readme][github.monorepo].

## Usage & Documentation

[See the dedicated documentation page here][docs].

## Quick Start

```html
<script lang="ts">
	import { store, portal } from '@svelte-put/noti';

	// any Svelte component to render as notification
	import Notification from './Notification.svelte';

	// define somewhere global, reuse across app
	export const notiStore = store()
		// add a minimalistic variant config
		.variant('info', Notification)
		// add a verbose variant config
		.variant('special', {
			timeout: false,
			id: 'counter',
			component: Notification,
			props: {
				// inferred from Notification component
				special: true,
				content: 'A very special notification',
			},
		})
		// build the actual NotificationStore
		.build();

	onMount(async () => {
		// push a special notification
		const pushed = notiStore.push('special');

		// wait for some user action to resolve (pop) the notification
		const { userAction } = await pushed.resolve();

		// push another notification with custom props
		notiStore.push('info', {
			props: {
				content: 'An example information',
			},
		});
	});
</script>

<div use:portal="{notiStore}">
	<!-- notification instances rendered as direct children -->
</div>
```

## [Changelog][github.changelog]

<!-- github specifics -->

[github.monorepo]: https://github.com/vnphanquang/svelte-put
[github.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/noti/CHANGELOG.md
[github.issues]: https://github.com/vnphanquang/svelte-put/issues?q=

<!-- heading badge -->

[npm.badge]: https://img.shields.io/npm/v/@svelte-put/noti
[npm]: https://www.npmjs.com/package/@svelte-put/noti
[bundlephobia.badge]: https://img.shields.io/bundlephobia/minzip/@svelte-put/noti?label=minzipped
[bundlephobia]: https://bundlephobia.com/package/@svelte-put/noti
[repl]: https://svelte.dev/repl/5beb4357e32e427394f5f6f5ced7b5f1
[repl.badge]: https://img.shields.io/static/v1?label=&message=Svelte+REPL&logo=svelte&logoColor=fff&color=ff3e00
[docs]: https://svelte-put.vnphanquang.com/docs/noti
[docs.badge]: https://img.shields.io/badge/-Docs%20Site-blue
