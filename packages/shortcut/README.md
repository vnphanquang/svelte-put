# `@svelte-put/shortcut`

[![Read documentation][docs.badge]][docs]
[![Open on npmx.dev][npmx.version]][npmx]
[![Open on npmx.dev][npmx.vulnerabilities]][npmx]
[![Open on npmx.dev][npmx.size]][npmx]
[![See license][npmx.license]][license]

utilities for managing keyboard shortcuts in Svelte land

## `svelte-put`

This package is part of the [@svelte-put][github.monorepo] family. For contributing guideline and
more, refer to its [readme][github.monorepo].

## Usage & Documentation

[See the dedicated documentation page here][docs].

## Quick Start

```svelte
<script lang="ts">
	import { shortcut, type ShortcutEventDetail } from '@svelte-put/shortcut';

	function handleK(detail: ShortcutEventDetail) {
		console.log('attached node:', detail.node);
		console.log('original trigger config:', detail.trigger);
	}
</script>

<svelte:window
	use:shortcut={{
		trigger: {
			key: 'k',
			modifier: ['ctrl', 'meta'],
			callback: handleK,
		},
	}}
/>
```

## [Changelog][github.changelog]

<!-- github specifics -->

[github.monorepo]: https://github.com/vnphanquang/svelte-put
[github.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/shortcut/CHANGELOG.md
[license]: https://github.com/vnphanquang/svelte-put/blob/main/LICENSE

<!-- others -->

[npmx]: https://npmx.dev/package/@svelte-put/shortcut
[npmx.version]: https://npmx.dev/api/registry/badge/version/@svelte-put/shortcut
[npmx.vulnerabilities]: https://npmx.dev/api/registry/badge/vulnerabilities/@svelte-put/shortcut
[npmx.bundlephobia]: https://npmx.dev/api/registry/badge/size/@svelte-put/shortcut
[npmx.license]: https://npmx.dev/api/registry/badge/license/@svelte-put/shortcut
[npmx.size]: https://npmx.dev/api/registry/badge/size/@svelte-put/shortcut
[docs]: https://svelte-put.vnphanquang.com/packages/shortcut
[docs.badge]: https://img.shields.io/badge/-Docs%20Site-blue
