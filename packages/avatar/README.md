# `@svelte-put/avatar`

[![Read documentation][docs.badge]][docs]
[![Open on npmx.dev][npmx.version]][npmx]
[![Open on npmx.dev][npmx.vulnerabilities]][npmx]
[![Open on npmx.dev][npmx.size]][npmx]
[![See license][npmx.license]][license]

Minimal component and utilities for building avatars in Svelte land, with support for [Gravatar] and [UI Avatar]

## `svelte-put`

This package is part of the [@svelte-put][github.monorepo] family. For contributing guideline and more, refer to its [readme][github.monorepo].

## Usage & Documentation

[See the dedicated documentation page here][docs].

## Quick Start

```svelte
<!-- my-avatar.svelte -->
<script>
	import Avatar from '@svelte-put/avatar/Avatar.svelte';

	let { id, email, firstName, lastName } = $props();
</script>

<Avatar
	src="https://your.api/avatar/{id}"
	gravatar={email}
	uiAvatar="{firstName}+{lastName}"
	fallback="https://your.api/avatar/default"
/>
```

## [Changelog][github.changelog]

<!-- github specifics -->

[github.monorepo]: https://github.com/vnphanquang/svelte-put
[github.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/avatar/CHANGELOG.md
[license]: https://github.com/vnphanquang/svelte-put/blob/main/LICENSE

<!-- others -->

[npmx]: https://npmx.dev/package/@svelte-put/avatar
[npmx.version]: https://npmx.dev/api/registry/badge/version/@svelte-put/avatar
[npmx.vulnerabilities]: https://npmx.dev/api/registry/badge/vulnerabilities/@svelte-put/avatar
[npmx.bundlephobia]: https://npmx.dev/api/registry/badge/size/@svelte-put/avatar
[npmx.license]: https://npmx.dev/api/registry/badge/license/@svelte-put/avatar
[npmx.size]: https://npmx.dev/api/registry/badge/size/@svelte-put/avatar
[docs]: https://svelte-put.vnphanquang.com/packages/avatar
[docs.badge]: https://img.shields.io/badge/-Docs%20Site-blue
