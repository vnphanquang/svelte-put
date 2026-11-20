# `@svelte-put/async-stack`

[![Read documentation][docs.badge]][docs]
[![Open on npmx.dev][npmx.version]][npmx]
[![Open on npmx.dev][npmx.vulnerabilities]][npmx]
[![Open on npmx.dev][npmx.size]][npmx]
[![See license][npmx.license]][license]

Type-safe and headless async builder for async component stack (notification and modal/dialog systems, for example)

## `svelte-put`

This package is part of the [@svelte-put][github.monorepo] family. For contributing guideline and more, refer to its [readme][github.monorepo].

## Usage & Documentation

[See the dedicated documentation page here][docs].

## Quick Start

```svelte
<script lang="ts">
	import { onMount } from 'svelte';
	import { stack } from '@svelte-put/async-stack';

	// any Svelte component to render as
	import Notification from './Notification.svelte';

	// define somewhere global, reuse across app
	export const notiStack = stack()
		// add a minimalistic variant config
		.addVariant('my', Notification)
		// add a verbose variant config
		.addVariant('special', {
			timeout: false,
			id: 'counter',
			component: Notification,
			props: {
				// inferred from Notification component
				special: true,
				content: 'A very special thing',
			},
		})
		// build the actual stack
		.build();

	onMount(async () => {
		// push a special item
		const pushed = notiStack.push('special');

		// wait for some user action for the item
		// to be resolved (popped) from within the component
		const { userAction } = await pushed.resolution;

		// push another item with custom props
		notiStack.push('info', {
			props: {
				content: 'An example information',
			},
		});
	});
</script>

<!-- portal -->
<aside class="applicable class">
	{#each notiStack.items as item (item.config.id)}
		<div use:notiStack.actions.render={item}>
			<!-- StackItem instances rendered as direct children -->
		</div>
	{/each}
</aside>
```

## [Changelog][github.changelog]

<!-- github specifics -->

[github.monorepo]: https://github.com/vnphanquang/svelte-put
[github.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/async-stack/CHANGELOG.md
[license]: https://github.com/vnphanquang/svelte-put/blob/main/LICENSE

<!-- others -->

[npmx]: https://npmx.dev/package/@svelte-put/async-stack
[npmx.version]: https://npmx.dev/api/registry/badge/version/@svelte-put/async-stack
[npmx.vulnerabilities]: https://npmx.dev/api/registry/badge/vulnerabilities/@svelte-put/async-stack
[npmx.bundlephobia]: https://npmx.dev/api/registry/badge/size/@svelte-put/async-stack
[npmx.license]: https://npmx.dev/api/registry/badge/license/@svelte-put/async-stack
[npmx.size]: https://npmx.dev/api/registry/badge/size/@svelte-put/async-stack
[docs]: https://vnphanquang.com/projects/svelte-put/packages/async-stack
[docs.badge]: https://img.shields.io/badge/-Docs%20Site-blue
