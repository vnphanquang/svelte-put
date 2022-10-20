<div align="center">

# `@svelte-put/movable`

[![npm.badge]][npm] [![bundlephobia.badge]][bundlephobia] [![repl.badge]][repl]

Svelte action `use:movable` - make a node move on mousedown & mousemove

![demo](https://raw.githubusercontent.com/vnphanquang/svelte-put/main/packages/actions/movable/static/images/demo.gif)

</div>

## Table of Contents

<details open>
  <summary>Show / hide</summary>

- [`@svelte-put/movable`](#svelte-putmovable)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [`svelte-put`](#svelte-put)
  - [Changelog](#changelog)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Documentation](#documentation)
    - [Typescript support](#typescript-support)

</details>

## Features

- reactive `enabled` option for performance
- `limit` option to restrict movement of node
- custom `trigger` `HTMLElement`
- `ignore` css selectors for excluding children nodes from triggering movement

Customization is documented at [MovableParameters][github.api.movableparameters].

## `svelte-put`

This package is part of the [@svelte-put][github.monorepo] family. For contributing guideline and more, refer to its [readme][github.monorepo].

## [Changelog][github.changelog]

## Installation

```bash
npm install -D @svelte-put/movable
```

```bash
yarn add -D @svelte-put/movable
```

```bash
pnpm add -D @svelte-put/movable
```

## Usage

See [examples here](https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/movable/api/docs/movable.movable.md#example-1). Also check out the [Svelte REPL][repl].

</details>

## Documentation

### Typescript support

Ambient types for custom events should be available automatically where `movable` is imported.

<details open>
  <summary> show / hide </summary>

```html
<script lang="ts">
  import { movable } from '@svelte-put/movable';
</script>

<!-- on:movablestart, on:movableend should be typed -->
<div use:movable on:movablestart on:movableend />
```

</details>

If the above is not working, fall back to this:

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
    onmovablestart?: (
      event: CustomEvent<import('@svelte-put/movable').MovableEventDetails>,
    ) => void;
    // on:movableend
    onmovableend?: (event: CustomEvent<import('@svelte-put/movable').MovableEventDetails>) => void;
  }
}
```

</details>

For detailed documentation, see the [extracted API][github.api].

Quick access to the parameter interface accepted by the action: [MovableParameters][github.api.movableparameters].

**Note**: `MovableParameters` has properties that are all optional. By default you don't need to provide any parameter to the action.

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
[github.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/movable/CHANGELOG.md
[github.issues]: https://github.com/vnphanquang/svelte-put/issues?q=
[github.api]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/movable/api/docs/index.md
[github.api.movableparameters]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/movable/api/docs/movable.movableparameters.md
[github.api.movable]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/movable/api/docs/movable.movable.md

<!-- heading badge -->

[npm.badge]: https://img.shields.io/npm/v/@svelte-put/movable
[npm]: https://www.npmjs.com/package/@svelte-put/movable
[bundlephobia.badge]: https://img.shields.io/bundlephobia/minzip/@svelte-put/movable?label=minzipped
[bundlephobia]: https://bundlephobia.com/package/@svelte-put/movable
[repl]: https://svelte.dev/repl/88a7c1fc2e134db7b58786d5f385fc5d
[repl.badge]: https://img.shields.io/static/v1?label=&message=Svelte+REPL&logo=svelte&logoColor=fff&color=ff3e00
