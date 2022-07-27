<div align="center">

# `@svelte-put/avatar`

[![npm.badge]][npm] [![bundlephobia.badge]][bundlephobia]

Svelte `Avatar` component and utilities for building avatar urls

</div>

## Table of Contents

<details open>
  <summary>Show / hide</summary>

- [`@svelte-put/avatar`](#svelte-putavatar)
  - [Table of Contents](#table-of-contents)
  - [`svelte-put`](#svelte-put)
  - [Installation](#installation)
  - [Changelog](#changelog)
  - [Usage](#usage)
  - [Documentation](#documentation)

</details>

## `svelte-put`

This package is part of the [@svelte-put][github.monorepo] family. For contributing guideline and more, refer to its [readme][github.monorepo].

## Installation

```bash
npm install -D @svelte-put/avatar
```

```bash
yarn add -D @svelte-put/avatar
```

```bash
pnpm add -D @svelte-put/avatar
```

## [Changelog][github.changelog]

## Usage

Currently, [gravatar] and [UIAvatar][uiavatar] are supported. If you find that another avatar server is worth mapping to, please propose through an [issue][github.issues].

<details open>
  <summary>Show / hide</summary>

```svelte
<script>
  import Avatar from '@svelte-put/avatar/Avatar.svelte';
  import { gravatar, uiAvatar } from '@svelte-put/avatar';

  const simpleGravatarUrl = gravatar('johndoe@domain.com');
  const complexGravatarUrl = gravatar({
    email: 'johndoe@domain.com',
    rating: 'r',
    size: 32,
  });

  const simpleUIAvatarUrl = uiAvatar('John+Doe');
  const complexGravatarUrl = uiAvatar({
    name: 'John+Doe',
    rounded: true,
    length: 3,
    bold: true,
    size: 32,
    format: 'svg',
  });
</script>

<!--
  Multiple resolution strategy can be provided as props.
  If one url does not point to a valid resource, the next will
  be used until all are exhausted and an internal fallback (https://www.gravatar.com/avatar?d=mp) is used instead.

  Resolution flow is shown below:

  src -> gravatar -> uiAvatar -> fallback -> internal fallback
-->

<Avatar
  class="rounded-full"
  src="https://johndoe.com/avatar.png"
  gravatar="johndoe@domain.com"
  uiAvatar="John+Doe"
  fallback="https://johndoe.com/fallback.png"
  size={32}
>
</Avatar>

<Avatar
  src="https://johndoe.com/avatar.png"
  gravatar={{ email: 'johndoe@domain.com', rating: 'pg' }}
  uiAvatar={{ name: 'John+Doe', background: '333333', color: 'FFFFFF' }}
  fallback="https://johndoe.com/fallback.png"
  size={32}
>
  <svelte:fragment let:src>
    <img {src} alt="custom" />
  </svelte:fragment>
</Avatar>
```

</details>

## Documentation

For detailed documentation, see the [extracted API][github.api]. It is recommended to skim through at least the [AvatarProps][github.api.AvatarProps] page so that you know what options are available.

<!-- github specifics -->
[github.monorepo]: https://github.com/vnphanquang/svelte-put
[github.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/misc/avatar/CHANGELOG.md
[github.issues]: https://github.com/vnphanquang/svelte-put/issues?q=
[github.api]: https://github.com/vnphanquang/svelte-put/blob/main/packages/misc/avatar/api/docs/index.md
[github.api.AvatarProps]: https://github.com/vnphanquang/svelte-put/blob/main/packages/misc/avatar/api/docs/avatar.avatarprops.md

<!-- heading badge -->
[npm.badge]: https://img.shields.io/npm/v/@svelte-put/avatar
[npm]: https://www.npmjs.com/package/@svelte-put/avatar
[bundlephobia.badge]: https://img.shields.io/bundlephobia/minzip/@svelte-put/avatar?label=minzipped
[bundlephobia]: https://bundlephobia.com/package/@svelte-put/avatar

<!-- external resources -->
[gravatar]: https://en.gravatar.com/site/implement/images
[uiavatar]: https://ui-avatars.com
