<div align="center">

# `@svelte-put/avatar`

[![npm.badge]][npm] [![bundlephobia.badge]][bundlephobia] [![docs.badge]][docs] [![repl.badge]][repl]

Svelte `Avatar` component and utilities for building avatars with builtin supports [Gravatar] and [UI Avatar][uiavatar].

</div>

## `svelte-put`

This package is part of the [@svelte-put][github.monorepo] family. For contributing guideline and more, refer to its [readme][github.monorepo].

## Usage & Documentation

[See the dedicated documentation page here][docs].

## Quick Start

```html
<script lang="ts">
  import Avatar from '@svelte-put/avatar/Avatar.svelte';

  export let id: string;
  export let email = '';
  export let firstName = '';
  export let lastName = '';
</script>

<Avatar
  src="https://your.api/avatar/{id}"
  gravatar="{email}"
  uiAvatar="{firstName}+{lastName}"
  fallback="https://your.api/avatar/default"
/>
```

## [Changelog][github.changelog]

<!-- github specifics -->

[github.monorepo]: https://github.com/vnphanquang/svelte-put
[github.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/misc/avatar/CHANGELOG.md

<!-- heading badge -->

[npm.badge]: https://img.shields.io/npm/v/@svelte-put/avatar
[npm]: https://www.npmjs.com/package/@svelte-put/avatar
[bundlephobia.badge]: https://img.shields.io/bundlephobia/minzip/@svelte-put/avatar?label=minzipped
[bundlephobia]: https://bundlephobia.com/package/@svelte-put/avatar

<!-- external resources -->

[gravatar]: https://en.gravatar.com/site/implement/images
[uiavatar]: https://ui-avatars.com

<!-- repl -->

[repl]: https://svelte.dev/repl/d54381946b1c4ebd8e612e4568fbbbd0
[repl.badge]: https://img.shields.io/static/v1?label=&message=Svelte+REPL&logo=svelte&logoColor=fff&color=ff3e00
[docs]: https://svelte-put.vnphanquang.com/docs/avatar
[docs.badge]: https://img.shields.io/badge/-Docs%20Site-blue
