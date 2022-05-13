<div align="center">

# `@svelte-put/movable`

[![npm.badge]][npm] [![bundlephobia.badge]][bundlephobia] [![github.release.badge]][github.release]

[![github.actions.release.badge]][github.actions.release]

Svelte action `use:movable`

![demo](https://raw.githubusercontent.com/vnphanquang/svelte-put/main/packages/actions/movable/static/images/demo.gif)

</div>

## Table of Contents

<details open>
  <summary>Show / hide</summary>

- [`@svelte-put/movable`](#svelte-putmovable)
  - [Table of Contents](#table-of-contents)
  - [`svelte-put`](#svelte-put)
  - [Changelog](#changelog)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Documentation](#documentation)
    - [Typescript support](#typescript-support)

</details>

## `svelte-put`

This package is part of the [@svelte-put][github.monorepo] family. For contributing guideline and more, refer to its [readme][github.monorepo].

## [Changelog][github.changelog]

## Installation

```bash
npm install -D @svelte-put/movable
yarn add -D @svelte-put/movable
pnpm add -D @svelte-put/movable
```

## Usage

See [example for typical usage here](./api/docs/movable.movable.md#example).

</details>

## Documentation

### Typescript support

<details open>
  <summary> app.d.ts: show / hide </summary>

```typescript
/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />

// Typescript support in svelte-kit, see
// https://github.com/sveltejs/language-tools/blob/master/docs/preprocessors/typescript.md#im-using-an-attributeevent-on-a-dom-element-and-it-throws-a-type-error

declare namespace svelte.JSX {
  interface HTMLAttributes<T> {
    // on:movablestart
    onmovablestart?: (event: CustomEvent<import('@svelte-put/movable').MovableEventDetails>) => void;
    // on:movableend
    onmovableend?: (event: CustomEvent<import('@svelte-put/movable').MovableEventDetails>) => void;
  }
}
```

</details>

For detailed documentation, see the [extracted API][github.api].

Quick access to the parameter interface accepted by the action: [MovableParameters][github.api.movableparameters].

**Note**: `MovableParameters` has properties that are all optional. By default you don't need to provide any parameter to the action.

<!-- github specifics -->

[github.monorepo]: https://github.com/vnphanquang/svelte-put
[github.actions.release.badge]: https://github.com/vnphanquang/svelte-put/actions/workflows/movable.release.yaml/badge.svg
[github.actions.release]: https://github.com/vnphanquang/svelte-put/actions/workflows/movable.release.yaml
[github.release.badge]: https://img.shields.io/github/v/release/vnphanquang/svelte-put
[github.release]: https://github.com/vnphanquang/svelte-put/releases
[github.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/movable/CHANGELOG.md
[github.issues]: https://github.com/vnphanquang/svelte-put/issues?q=
[github.api]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/movable/api/docs/index.md
[github.api.movableparameters]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/movable/api/docs//movable.movableparameters.md
[github.api.movable]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/movable/api/docs/movable.movable.md

<!-- heading badge -->
[npm.badge]: https://img.shields.io/npm/v/@svelte-put/movable
[npm]: https://www.npmjs.com/package/@svelte-put/movable
[bundlephobia.badge]: https://img.shields.io/bundlephobia/minzip/@svelte-put/movable?label=minzipped
[bundlephobia]: https://bundlephobia.com/package/@svelte-put/movable
