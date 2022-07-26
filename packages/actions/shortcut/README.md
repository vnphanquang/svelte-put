<div align="center">

# `@svelte-put/shortcut`

[![npm.badge]][npm] [![bundlephobia.badge]][bundlephobia]

Svelte action `use:shortcut` - add event listener for keyboard shortcuts

</div>

## Table of Contents

<details open>
  <summary>Show / hide</summary>

- [`@svelte-put/shortcut`](#svelte-putshortcut)
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
npm install -D @svelte-put/shortcut
```

```bash
yarn add -D @svelte-put/shortcut
```

```bash
pnpm add -D @svelte-put/shortcut
```

## Usage

See [examples here](https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/shortcut/api/docs/shortcut.shortcut.md#example)

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
    // on:shortcut
    onshortcut?: (event: CustomEvent<import('@svelte-put/shortcut').ShortcutEventDetails>) => void;
  }
}
```

</details>

For detailed documentation, see the [extracted API][github.api].

Quick access to the parameter interface accepted by the action: [ShortcutParameters][github.api.shortcutparameters].

<!-- github specifics -->

[github.monorepo]: https://github.com/vnphanquang/svelte-put
[github.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/shortcut/CHANGELOG.md
[github.issues]: https://github.com/vnphanquang/svelte-put/issues?q=
[github.api]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/shortcut/api/docs/index.md
[github.api.shortcutparameters]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/shortcut/api/docs/shortcut.shortcutparameters.md
[github.api.shortcut]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/shortcut/api/docs/shortcut.shortcut.md

<!-- heading badge -->
[npm.badge]: https://img.shields.io/npm/v/@svelte-put/shortcut
[npm]: https://www.npmjs.com/package/@svelte-put/shortcut
[bundlephobia.badge]: https://img.shields.io/bundlephobia/minzip/@svelte-put/shortcut?label=minzipped
[bundlephobia]: https://bundlephobia.com/package/@svelte-put/shortcut
