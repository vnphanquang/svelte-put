<div align="center">

# `@svelte-put/intersect`

[![npm.badge]][npm] [![bundlephobia.badge]][bundlephobia] [![github.actions.release.badge]][github.actions.release]

Svelte action `use:intersect`

![demo](https://raw.githubusercontent.com/vnphanquang/svelte-put/main/packages/actions/intersect/static/images/demo.gif)

</div>

## Table of Contents

<details open>
  <summary>Show / hide</summary>

- [`@svelte-put/intersect`](#svelte-putintersect)
  - [Table of Contents](#table-of-contents)
  - [`svelte-put`](#svelte-put)
  - [Changelog](#changelog)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Documentation](#documentation)

</details>

## `svelte-put`

This package is part of the [@svelte-put][github.monorepo] family. For contributing guideline and more, refer to its [readme][github.monorepo].

## [Changelog][github.changelog]

## Installation

```bash
npm install -D @svelte-put/intersect
yarn add -D @svelte-put/intersect
pnpm add -D @svelte-put/intersect
```

## Usage

See [example for typical usage here](https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/intersect/api/docs/intersect.intersect.md#example-1).

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
    // on:intersect
    onintersect?: (event: CustomEvent<import('@svelte-put/intersect').IntersectDetail>) => void;
    // on:intersectonce
    onintersectonce?: (event: CustomEvent<import('@svelte-put/intersect').IntersectDetail>) => void;
  }
}
```

</details>

For detailed documentation, see the [extracted API][github.api].

<!-- github specifics -->

[github.monorepo]: https://github.com/vnphanquang/svelte-put
[github.actions.release.badge]: https://github.com/vnphanquang/svelte-put/actions/workflows/intersect.release.yaml/badge.svg
[github.actions.release]: https://github.com/vnphanquang/svelte-put/actions/workflows/intersect.release.yaml
[github.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/intersect/CHANGELOG.md
[github.issues]: https://github.com/vnphanquang/svelte-put/issues?q=
[github.api]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/intersect/api/docs/index.md
[github.api.intersectparameters]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/intersect/api/docs/intersect.intersectparameters.md
[github.api.intersect]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/intersect/api/docs/intersect.intersect.md

<!-- heading badge -->
[npm.badge]: https://img.shields.io/npm/v/@svelte-put/intersect
[npm]: https://www.npmjs.com/package/@svelte-put/intersect
[bundlephobia.badge]: https://img.shields.io/bundlephobia/minzip/@svelte-put/intersect?label=minzipped
[bundlephobia]: https://bundlephobia.com/package/@svelte-put/intersect
