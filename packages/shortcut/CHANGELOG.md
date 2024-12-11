# Changelog

## 4.0.1

### Patch Changes

- [`8baa99c`](https://github.com/vnphanquang/svelte-put/commit/8baa99c251d1acd674b0895b48a04352b65951a6) Thanks [@vnphanquang](https://github.com/vnphanquang)! - implement stricter modifier matching. Now all definitions are mutually exclusive. For example, `[['ctrl', 'alt']]` will no longer trigger `ctrl`, and vice versa

- [`d5f5168`](https://github.com/vnphanquang/svelte-put/commit/d5f51686be10fe4073b3dc2e69edaae6e9376c05) Thanks [@vnphanquang](https://github.com/vnphanquang)! - falsy modifier should mean 'expect no modifier'. Set to `*` if expect **any** modifier.

## 4.0.0

### Major Changes

- [#327](https://github.com/vnphanquang/svelte-put/pull/327) [`7af1455`](https://github.com/vnphanquang/svelte-put/commit/7af1455f9c13de2f08d66a58d98cc0443150393e) Thanks [@github-actions](https://github.com/apps/github-actions)! - drop support for Svelte 4 and below. `on:shortcut` is now `onshortcut`

### Patch Changes

- [#327](https://github.com/vnphanquang/svelte-put/pull/327) [`5d30599`](https://github.com/vnphanquang/svelte-put/commit/5d3059929a1846fae63e8e35a1423544321f55cc) Thanks [@github-actions](https://github.com/apps/github-actions)! - set up [package provenence](https://docs.npmjs.com/generating-provenance-statements#publishing-packages-with-provenance-via-github-actions)

- [#327](https://github.com/vnphanquang/svelte-put/pull/327) [`c559185`](https://github.com/vnphanquang/svelte-put/commit/c55918517ef53fbc07870fa33e1f6c2e13e7c995) Thanks [@github-actions](https://github.com/apps/github-actions)! - sync README.md and installation version in docs page

- [#327](https://github.com/vnphanquang/svelte-put/pull/327) [`2414af5`](https://github.com/vnphanquang/svelte-put/commit/2414af57598bc5e74498831f2b63c78dd3d9971d) Thanks [@github-actions](https://github.com/apps/github-actions)! - re-expose public typedef (following https://github.com/Rich-Harris/dts-buddy/pull/82)

- [#327](https://github.com/vnphanquang/svelte-put/pull/327) [`9a2e375`](https://github.com/vnphanquang/svelte-put/commit/9a2e375915b0654af3f13b1ac4d325507e5e2b98) Thanks [@github-actions](https://github.com/apps/github-actions)! - defer events to Svelte internal delegation system where applicable

## 4.0.0-next.4

### Patch Changes

- [`5d30599`](https://github.com/vnphanquang/svelte-put/commit/5d3059929a1846fae63e8e35a1423544321f55cc) Thanks [@vnphanquang](https://github.com/vnphanquang)! - set up [package provenence](https://docs.npmjs.com/generating-provenance-statements#publishing-packages-with-provenance-via-github-actions)

## 4.0.0-next.3

### Patch Changes

- [`2414af5`](https://github.com/vnphanquang/svelte-put/commit/2414af57598bc5e74498831f2b63c78dd3d9971d) Thanks [@vnphanquang](https://github.com/vnphanquang)! - re-expose public typedef (following https://github.com/Rich-Harris/dts-buddy/pull/82)

## 4.0.0-next.2

### Patch Changes

- [`26bbd81`](https://github.com/vnphanquang/svelte-put/commit/26bbd813c1e65ead04d5d6bcb29b97a34045646b) Thanks [@vnphanquang](https://github.com/vnphanquang)! - sync README.md and installation version in docs page

## 4.0.0-next.1

### Patch Changes

- [#302](https://github.com/vnphanquang/svelte-put/pull/302) [`db35158`](https://github.com/vnphanquang/svelte-put/commit/db351580dfb3eea612be5435be1b6ac466fa6ac5) Thanks [@github-actions](https://github.com/apps/github-actions)! - defer events to Svelte internal delegation system where applicable

## 4.0.0-next.0

### Major Changes

- [#298](https://github.com/vnphanquang/svelte-put/pull/298) [`eb4704f`](https://github.com/vnphanquang/svelte-put/commit/eb4704f6f27c79ee8a6d02d2a8acd338d8385c57) Thanks [@github-actions](https://github.com/apps/github-actions)! - drop support for Svelte 4 and below. `on:shortcut` is now `onshortcut`

## 3.1.1

### Patch Changes

- [`46e675e`](https://github.com/vnphanquang/svelte-put/commit/46e675e05e87ca042af231cd059dc944cd6080d5) Thanks [@vnphanquang](https://github.com/vnphanquang)! - specify Svelte peer dependency to include Svelte 5

## 3.1.0

### Minor Changes

- [#258](https://github.com/vnphanquang/svelte-put/pull/258) [`9c3dae5`](https://github.com/vnphanquang/svelte-put/commit/9c3dae54138b56db5a9af6343801d877bfc997be) Thanks [@vnphanquang](https://github.com/vnphanquang)! - expose original `KeyboardEvent` in `shortcut` `CustomEvent` detail object

## 3.0.0

### Major Changes

- [#204](https://github.com/vnphanquang/svelte-put/pull/204) [`daae196`](https://github.com/vnphanquang/svelte-put/commit/daae196cbe917ac11a7ab105b30e561e0d05f5c6) Thanks [@vnphanquang](https://github.com/vnphanquang)! - Migrated to vanilla JS (tracked at #203)

- [#204](https://github.com/vnphanquang/svelte-put/pull/204) [`daae196`](https://github.com/vnphanquang/svelte-put/commit/daae196cbe917ac11a7ab105b30e561e0d05f5c6) Thanks [@vnphanquang](https://github.com/vnphanquang)! - better naming for types

## 2.0.0

### Major Changes

- [`22b3b94`](https://github.com/vnphanquang/svelte-put/commit/22b3b94c74d58f5e8f2c826d0d4a9bd15b45fa94) Thanks [@vnphanquang](https://github.com/vnphanquang)! - [BREAKING] move build output from `lib` to `dist` to stay consistent of new changes from [@sveltejs/package@2](https://github.com/sveltejs/kit/releases/tag/%40sveltejs/package%402.0.0). Also fixes some api docs issues

## 1.1.1

### Patch Changes

- [`227e8dc`](https://github.com/vnphanquang/svelte-put/commit/227e8dc11f850787f9f98eb4b24cd23015c9c25c) Thanks [@vnphanquang](https://github.com/vnphanquang)! - add "Quick Start" section in package README

## 1.1.0

### Minor Changes

- [`64283e1`](https://github.com/vnphanquang/svelte-put/commit/64283e10c53985dc9cd99d65274996231c46b9bd) Thanks [@vnphanquang](https://github.com/vnphanquang)! - deprecate global ambient typing in favor of the [new action typings helper](https://github.com/sveltejs/svelte/pull/7805/files)

## 1.0.5

### Patch Changes

- [`ad5ceab`](https://github.com/vnphanquang/svelte-put/commit/ad5ceab52f89adbcd6d4680c247113c96063f395) Thanks [@vnphanquang](https://github.com/vnphanquang)! - Migrate to [svelte check 3.0](https://github.com/sveltejs/language-tools/releases/tag/svelte-check-3.0.1), using `svelteHTML` namespace now instead of `svelte.JSX`

## 1.0.4

### Patch Changes

- [`4eae915`](https://github.com/vnphanquang/svelte-put/commit/4eae915a7467e9850eea25ec960aecb0eec8eac2) Thanks [@vnphanquang](https://github.com/vnphanquang)! - add ambient types

## 1.0.3

### Patch Changes

- [`7764c7d`](https://github.com/vnphanquang/svelte-put/commit/7764c7d85f8ee12b45cb9eb68a246fcd8e3f8839) Thanks [@vnphanquang](https://github.com/vnphanquang)! - adjust types entry to `src/index.d.ts`

## 1.0.2

### Patch Changes

- [`cb01113`](https://github.com/vnphanquang/svelte-put/commit/cb0111338eef7c080f3d9ac04303adcb24f1b301) Thanks [@vnphanquang](https://github.com/vnphanquang)! - bump dependencies' version

## 1.0.1

### Patch Changes

- [`1e138bc`](https://github.com/vnphanquang/svelte-put/commit/1e138bce9c925fcae6daab1bcae22110635ba5c3) Thanks [@vnphanquang](https://github.com/vnphanquang)! - Remove github release badge

## @svelte-put/shortcut-v1.0.0 (2022-05-27)

### Features

- **shortcut:** extract shortcut implementation into own package ([77bc0d7](https://github.com/vnphanquang/svelte-put/commit/77bc0d7b158728bc3c8997878b5b729b80acae36))
