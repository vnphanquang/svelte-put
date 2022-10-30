<div align="center">

# `@svelte-put/copy`

[![npm.badge]][npm] [![bundlephobia.badge]][bundlephobia] [![repl.badge]][repl]

Svelte action `use:copy` and utility for copying text inside nodes

</div>

## Table of Contents

<details open>
  <summary>Show / hide</summary>

- [`@svelte-put/copy`](#svelte-putcopy)
  - [Table of Contents](#table-of-contents)
  - [`svelte-put`](#svelte-put)
  - [Changelog](#changelog)
  - [Installation](#installation)
  - [Documentation](#documentation)
    - [Typescript support](#typescript-support)

</details>

## `svelte-put`

This package is part of the [@svelte-put][github.monorepo] family. For contributing guideline and more, refer to its [readme][github.monorepo].

## [Changelog][github.changelog]

## Installation

```bash
npm install -D @svelte-put/copy
```

```bash
yarn add -D @svelte-put/copy
```

```bash
pnpm add -D @svelte-put/copy
```

</details>

## Documentation

### Typescript support

Ambient types for custom events should be available automatically where `copy` is imported.

<details open>
  <summary> show / hide </summary>

```html
<script lang="ts">
  import { copy } from '@svelte-put/copy';
  let trigger: HTMLElement;
</script>

<!-- on:copy, on:copyonce should be typed -->
<div use:copy="{{" trigger }} on:copy />
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
    // on:copy
    oncopy?: (event: CustomEvent<import('@svelte-put/copy').CopyDetail>) => void;
  }
}
```

</details>

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
[github.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/copy/CHANGELOG.md
[github.issues]: https://github.com/vnphanquang/svelte-put/issues?q=
[github.api]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/copy/api/docs/index.md

<!-- heading badge -->

[npm.badge]: https://img.shields.io/npm/v/@svelte-put/copy
[npm]: https://www.npmjs.com/package/@svelte-put/copy
[bundlephobia.badge]: https://img.shields.io/bundlephobia/minzip/@svelte-put/copy?label=minzipped
[bundlephobia]: https://bundlephobia.com/package/@svelte-put/copy
[repl]: https://svelte.dev/repl/835eacce6ac44aff95a7cb0bb5ca200d
[repl.badge]: https://img.shields.io/static/v1?label=&message=Svelte+REPL&logo=svelte&logoColor=fff&color=ff3e00
