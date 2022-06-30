<div align="center">

# `@svelte-put/clickoutside`

[![npm.badge]][npm] [![bundlephobia.badge]][bundlephobia] [![github.actions.release.badge]][github.actions.release]

Svelte action `use:clickoutside` - event for clicking outside a node

![demo](https://raw.githubusercontent.com/vnphanquang/svelte-put/main/packages/actions/clickoutside/static/images/demo.gif)

</div>

## Table of Contents

<details open>
  <summary>Show / hide</summary>

- [`@svelte-put/clickoutside`](#svelte-putclickoutside)
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
npm install -D @svelte-put/clickoutside
```

```bash
yarn add -D @svelte-put/clickoutside
```

```bash
pnpm add -D @svelte-put/clickoutside
```

## Usage

See [examples here](https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/clickoutside/api/docs/clickoutside.clickoutside.md#example). Also check out the [Svelte REPL][repl].

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
    // on:clickoutside
    onclickoutside?: (event: CustomEvent<MouseEvent>) => void;
  }
}
```

</details>

For detailed documentation, see the [extracted API][github.api].

<!-- github specifics -->

[github.monorepo]: https://github.com/vnphanquang/svelte-put
[github.actions.release.badge]: https://github.com/vnphanquang/svelte-put/actions/workflows/clickoutside.release.yaml/badge.svg
[github.actions.release]: https://github.com/vnphanquang/svelte-put/actions/workflows/clickoutside.release.yaml
[github.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/clickoutside/CHANGELOG.md
[github.issues]: https://github.com/vnphanquang/svelte-put/issues?q=
[github.api]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/clickoutside/api/docs/index.md
[github.api.clickoutsideparameters]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/clickoutside/api/docs/clickoutside.clickoutsideparameters.md
[github.api.clickoutside]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/clickoutside/api/docs/clickoutside.clickoutside.md

<!-- heading badge -->
[npm.badge]: https://img.shields.io/npm/v/@svelte-put/clickoutside
[npm]: https://www.npmjs.com/package/@svelte-put/clickoutside
[bundlephobia.badge]: https://img.shields.io/bundlephobia/minzip/@svelte-put/clickoutside?label=minzipped
[bundlephobia]: https://bundlephobia.com/package/@svelte-put/intersect

[repl]: https://svelte.dev/repl/9e5f9ee41c2c45aa8523993e357f6e78
