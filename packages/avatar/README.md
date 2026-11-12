<div align="center">

# `@svelte-put/avatar`

[![npm.badge]][npm] [![bundlephobia.badge]][bundlephobia] [![docs.badge]][docs] [![repl.badge]][repl]

Minimal component and utilities for building avatars in Svelte land, with support for [Gravatar] and [UI Avatar]

</div>

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
[github.issues]: https://github.com/vnphanquang/svelte-put/issues?q=

<!-- external resources -->

[Gravatar]: https://en.gravatar.com/site/implement/images
[UI Avatar]: https://ui-avatars.com

<!-- heading badge -->

[npm.badge]: https://img.shields.io/npm/v/@svelte-put/avatar
[npm]: https://www.npmjs.com/package/@svelte-put/avatar
[bundlephobia.badge]: https://img.shields.io/bundlephobia/minzip/@svelte-put/avatar?label=minzipped
[bundlephobia]: https://bundlephobia.com/package/@svelte-put/avatar
[repl]: https://svelte.dev/repl/9e5f9ee41c2c45aa8523993e357f6e78
[repl.badge]: https://img.shields.io/static/v1?label=&message=Svelte+REPL&logo=svelte&logoColor=fff&color=ff3e00
[docs]: https://svelte-put.vnphanquang.com/packages/avatar
[docs.badge]: https://img.shields.io/badge/-Docs%20Site-blue
