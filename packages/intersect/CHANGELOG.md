# Changelog

## 4.0.0-next.0

### Major Changes

- [#298](https://github.com/vnphanquang/svelte-put/pull/298) [`4f1d76b`](https://github.com/vnphanquang/svelte-put/commit/4f1d76b6f0b7474c1778d6e73e4401c97babd212) Thanks [@github-actions](https://github.com/apps/github-actions)! - drop support for Svelte 4 and below. `on:intersect` and `on:intersect:once` is now `onintersect` and `onintersectonce`, respectively

## 3.0.1

### Patch Changes

- [`46e675e`](https://github.com/vnphanquang/svelte-put/commit/46e675e05e87ca042af231cd059dc944cd6080d5) Thanks [@vnphanquang](https://github.com/vnphanquang)! - specify Svelte peer dependency to include Svelte 5

## 3.0.0

### Major Changes

- [#204](https://github.com/vnphanquang/svelte-put/pull/204) [`9ffa95d`](https://github.com/vnphanquang/svelte-put/commit/9ffa95d12824d173dfc94be311043e99dd326c4e) Thanks [@vnphanquang](https://github.com/vnphanquang)! - Better naming for action parameter type

- [#204](https://github.com/vnphanquang/svelte-put/pull/204) [`9ffa95d`](https://github.com/vnphanquang/svelte-put/commit/9ffa95d12824d173dfc94be311043e99dd326c4e) Thanks [@vnphanquang](https://github.com/vnphanquang)! - Migrated to vanilla JS (tracked at #203)

## 2.0.0

### Major Changes

- [`22b3b94`](https://github.com/vnphanquang/svelte-put/commit/22b3b94c74d58f5e8f2c826d0d4a9bd15b45fa94) Thanks [@vnphanquang](https://github.com/vnphanquang)! - [BREAKING] move build output from `lib` to `dist` to stay consistent of new changes from [@sveltejs/package@2](https://github.com/sveltejs/kit/releases/tag/%40sveltejs/package%402.0.0). Also fixes some api docs issues

## 1.2.1

### Patch Changes

- [`227e8dc`](https://github.com/vnphanquang/svelte-put/commit/227e8dc11f850787f9f98eb4b24cd23015c9c25c) Thanks [@vnphanquang](https://github.com/vnphanquang)! - add "Quick Start" section in package README

## 1.2.0

### Minor Changes

- [`64283e1`](https://github.com/vnphanquang/svelte-put/commit/64283e10c53985dc9cd99d65274996231c46b9bd) Thanks [@vnphanquang](https://github.com/vnphanquang)! - deprecate global ambient typing in favor of the [new action typings helper](https://github.com/sveltejs/svelte/pull/7805/files)

## 1.1.1

### Patch Changes

- [`ad5ceab`](https://github.com/vnphanquang/svelte-put/commit/ad5ceab52f89adbcd6d4680c247113c96063f395) Thanks [@vnphanquang](https://github.com/vnphanquang)! - Migrate to [svelte check 3.0](https://github.com/sveltejs/language-tools/releases/tag/svelte-check-3.0.1), using `svelteHTML` namespace now instead of `svelte.JSX`

## 1.1.0

### Minor Changes

- [`e496e80`](https://github.com/vnphanquang/svelte-put/commit/e496e80ff36d638051aaa690451c95b61e340c2e) Thanks [@vnphanquang](https://github.com/vnphanquang)! - Complete docs site at https://svelte-put.vnphanquang.com/docs/intersect

### Patch Changes

- [`7a35469`](https://github.com/vnphanquang/svelte-put/commit/7a354692aad20e3dc1365340ed9a134942ac2b6d) Thanks [@vnphanquang](https://github.com/vnphanquang)! - Support the `direction` property in `event.detail` for scrolling direction detection

## 1.0.7

### Patch Changes

- [`7764c7d`](https://github.com/vnphanquang/svelte-put/commit/7764c7d85f8ee12b45cb9eb68a246fcd8e3f8839) Thanks [@vnphanquang](https://github.com/vnphanquang)! - adjust types entry to `src/index.d.ts`

## 1.0.6

### Patch Changes

- [`7657f5f`](https://github.com/vnphanquang/svelte-put/commit/7657f5fe706b247a66f09a39bb5a0b2755c61d28) Thanks [@vnphanquang](https://github.com/vnphanquang)! - provide ambient typings for custom events

## 1.0.5

### Patch Changes

- [`35d6ba5`](https://github.com/vnphanquang/svelte-put/commit/35d6ba53a1d1e1de74ae384743e2299bd033a64a) Thanks [@vnphanquang](https://github.com/vnphanquang)! - add svelte REPL badge to top of README

## 1.0.4

### Patch Changes

- [`cb01113`](https://github.com/vnphanquang/svelte-put/commit/cb0111338eef7c080f3d9ac04303adcb24f1b301) Thanks [@vnphanquang](https://github.com/vnphanquang)! - bump dependencies' version

## 1.0.3

### Patch Changes

- [`1e138bc`](https://github.com/vnphanquang/svelte-put/commit/1e138bce9c925fcae6daab1bcae22110635ba5c3) Thanks [@vnphanquang](https://github.com/vnphanquang)! - Remove github release badge

## [@svelte-put/intersect-v1.0.2](https://github.com/vnphanquang/svelte-put/compare/@svelte-put/intersect-v1.0.1...@svelte-put/intersect-v1.0.2) (2022-05-15)

### Documentation

- **README:** add short description ([32ecf87](https://github.com/vnphanquang/svelte-put/commit/32ecf87dce1a7c6d74fc717c5723304bb6dd5157))

## [@svelte-put/intersect-v1.0.1](https://github.com/vnphanquang/svelte-put/compare/@svelte-put/intersect-v1.0.0...@svelte-put/intersect-v1.0.1) (2022-05-15)

### Documentation

- **README:** intersect - add acknowledgement section ([6c89805](https://github.com/vnphanquang/svelte-put/commit/6c89805ecfd9b488ccdbf8386f43dcc2716f4a43))

## @svelte-put/intersect-v1.0.0 (2022-05-15)

### Features

- **intersect:** new package - @svelte-put/intersect ([2cd6d0f](https://github.com/vnphanquang/svelte-put/commit/2cd6d0fcb2e8b8f1fef1d0f9fffe29999d50d5ab))

### Documentation

- **intersect:** complete example 2 ([ee0db99](https://github.com/vnphanquang/svelte-put/commit/ee0db99e333cb767680bdd69e0a8fceb61994faf))
- **README:** change the demo.gif to match package ([0c58d1f](https://github.com/vnphanquang/svelte-put/commit/0c58d1fdb16a7ae7758bbc8b297b897f2e1aed7c))
- **README:** fix intersect example reflink ([1d45d9e](https://github.com/vnphanquang/svelte-put/commit/1d45d9eb8277839147198b691b9b54df259831d2))
