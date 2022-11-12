# Changelog

## 1.0.14

### Patch Changes

- [`3b62c30`](https://github.com/vnphanquang/svelte-put/commit/3b62c30fa7011130598c9d86cd2f13f360ef9591) Thanks [@vnphanquang](https://github.com/vnphanquang)! - Publish dedicated documentation site at https://svelte-put.vnphanquang.com/docs/avatar

## 1.0.13

### Patch Changes

- [`a111a2b`](https://github.com/vnphanquang/svelte-put/commit/a111a2bd0f41fb65d04b9f57cba89bd6635f4d79) Thanks [@vnphanquang](https://github.com/vnphanquang)! - remove `console.log` in `Avatar` img src resolution

## 1.0.12

### Patch Changes

- [`2ae9e6f`](https://github.com/vnphanquang/svelte-put/commit/2ae9e6f79a932bb08509fd421846760d2a83aa92) Thanks [@vnphanquang](https://github.com/vnphanquang)! - remove `object-fit` and `object-position` property for minimal & nonintrusive styling

## 1.0.11

### Patch Changes

- [`9e95881`](https://github.com/vnphanquang/svelte-put/commit/9e958812ee37988c5f6f2e0ddab659aff7c0e5ec) Thanks [@vnphanquang](https://github.com/vnphanquang)! - automatically extract alt from source configs

## 1.0.10

### Patch Changes

- [`da91481`](https://github.com/vnphanquang/svelte-put/commit/da914811c85879d5ac51c8a9568efa2c361e70bc) Thanks [@vnphanquang](https://github.com/vnphanquang)! - avoid fetch (cors) problem, use image `onerror` instead (see https://github.com/vnphanquang/svelte-put/issues/67)

## 1.0.9

### Patch Changes

- [`cd8d66e`](https://github.com/vnphanquang/svelte-put/commit/cd8d66e9d668e058636eb9c4c9d561c83282adb0) Thanks [@vnphanquang](https://github.com/vnphanquang)! - automatically assign size from gravatar and uiAvatar if provided

- [`f64028e`](https://github.com/vnphanquang/svelte-put/commit/f64028ed9b8cfb0547c43c4e5d4b2d8db60809a7) Thanks [@vnphanquang](https://github.com/vnphanquang)! - pass resolved size and alt to default slot

## 1.0.8

### Patch Changes

- [`5245bb7`](https://github.com/vnphanquang/svelte-put/commit/5245bb7fdb0fffa77c2b5adb50bbe3f94cef114e) Thanks [@vnphanquang](https://github.com/vnphanquang)! - use $Props and $Slots instead of manual typings

## 1.0.7

### Patch Changes

- [`35d6ba5`](https://github.com/vnphanquang/svelte-put/commit/35d6ba53a1d1e1de74ae384743e2299bd033a64a) Thanks [@vnphanquang](https://github.com/vnphanquang)! - add svelte REPL badge to top of README

## 1.0.6

### Patch Changes

- [`cb01113`](https://github.com/vnphanquang/svelte-put/commit/cb0111338eef7c080f3d9ac04303adcb24f1b301) Thanks [@vnphanquang](https://github.com/vnphanquang)! - bump dependencies' version

## 1.0.5

### Patch Changes

- [`19fe3e1`](https://github.com/vnphanquang/svelte-put/commit/19fe3e11832fd0895194d2063642f3a46f278b14) Thanks [@vnphanquang](https://github.com/vnphanquang)! - enable cors during avatar fetch

## 1.0.4

### Patch Changes

- [`83c3734`](https://github.com/vnphanquang/svelte-put/commit/83c37341a2a2625fb42604306e6d40cadabd6912) Thanks [@vnphanquang](https://github.com/vnphanquang)! - .

  - setup REPL and playground
  - correctly resolve gravatar url
  - export "class" prop type

## 1.0.3

### Patch Changes

- [`1945ea2`](https://github.com/vnphanquang/svelte-put/commit/1945ea2be178b67c182d1ca40d3d53d15dba2048) Thanks [@vnphanquang](https://github.com/vnphanquang)! - Correct npm homepage

## 1.0.2

### Patch Changes

- [`af07a83`](https://github.com/vnphanquang/svelte-put/commit/af07a8342e514063dd710c4fac8a998529605c14) Thanks [@vnphanquang](https://github.com/vnphanquang)! - Better documentation & README

* [`00b6696`](https://github.com/vnphanquang/svelte-put/commit/00b66966eb44b431be7d9d9ce1365f834f076e96) Thanks [@vnphanquang](https://github.com/vnphanquang)! - .

  - Manual type declaration for `Avatar` svelte component
  - export Avatar component in `index.js` & set "svelte" prop accordingly in `package.json`

## 1.0.1

### Patch Changes

- [`3477c86`](https://github.com/vnphanquang/svelte-put/commit/3477c8630ee2d6a4fe52959a8c4689cde94e97ff) Thanks [@vnphanquang](https://github.com/vnphanquang)! - Explicit "typesVersions" to support subpath exports in typescript

## 1.0.0

### Major Changes

- [`b2df683`](https://github.com/vnphanquang/svelte-put/commit/b2df683115ba48f3778a1daa4be1c05b37b4560c) Thanks [@vnphanquang](https://github.com/vnphanquang)! - Implementation of Avatar component & utility functions to build Gravatar and UIAvatar urls
