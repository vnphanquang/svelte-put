<div align="center">

# `@svelte-put/clickoutside`

[![npm.badge]][npm] [![bundlephobia.badge]][bundlephobia] [![repl.badge]][repl]

Svelte action `use:clickoutside` - event for clicking outside a node

![demo](https://raw.githubusercontent.com/vnphanquang/svelte-put/main/packages/actions/clickoutside/static/images/demo.gif)

</div>

## Table of Contents

<details open>
  <summary>Show / hide</summary>

- [`@svelte-put/clickoutside`](#svelte-putclickoutside)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [`svelte-put`](#svelte-put)
  - [Changelog](#changelog)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Documentation](#documentation)

</details>

## Features

- reactive `enabled` option for performance improvement
- `limit` option for limiting `clickoutside` to a parent `HTMLElement`

Customization is documented at [ClickOutsideParameters][github.api.clickoutsideparameters].

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

## Documentation

For detailed documentation, see the [extracted API][github.api].

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
[github.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/clickoutside/CHANGELOG.md
[github.issues]: https://github.com/vnphanquang/svelte-put/issues?q=
[github.api]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/clickoutside/api/docs/index.md
[github.api.clickoutsideparameters]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/clickoutside/api/docs/clickoutside.clickoutsideparameters.md
[github.api.clickoutside]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/clickoutside/api/docs/clickoutside.clickoutside.md

<!-- heading badge -->

[npm.badge]: https://img.shields.io/npm/v/@svelte-put/clickoutside
[npm]: https://www.npmjs.com/package/@svelte-put/clickoutside
[bundlephobia.badge]: https://img.shields.io/bundlephobia/minzip/@svelte-put/clickoutside?label=minzipped
[bundlephobia]: https://bundlephobia.com/package/@svelte-put/clickoutside
[repl]: https://svelte.dev/repl/9e5f9ee41c2c45aa8523993e357f6e78
[repl.badge]: https://img.shields.io/static/v1?label=&message=Svelte+REPL&logo=svelte&logoColor=fff&color=ff3e00
