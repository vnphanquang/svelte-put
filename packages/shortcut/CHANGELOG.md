# Changelog

## 3.1.2

### Patch Changes

- [`80cbbdd`](https://github.com/vnphanquang/svelte-put/commit/80cbbdd7dbf4003a8f9d337300b8b60652bbe229) Thanks [@vnphanquang](https://github.com/vnphanquang)! - implement stricter modifier matching. Now all definitions are mutually exclusive. For example, `[['ctrl', 'alt']]` will no longer trigger `ctrl`, and vice versa

- [`c5cc32b`](https://github.com/vnphanquang/svelte-put/commit/c5cc32b2f153fbfd8a2e193ee24c651cc93024d6) Thanks [@vnphanquang](https://github.com/vnphanquang)! - falsy modifier should mean 'expect no modifier'. Set to `*` if expect **any** modifier.

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
