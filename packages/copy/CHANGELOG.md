# Changelog

## 4.0.0

### Major Changes

- [#327](https://github.com/vnphanquang/svelte-put/pull/327) [`4a048b1`](https://github.com/vnphanquang/svelte-put/commit/4a048b13a5230947d5b073ddcf0846bbca46ff64) Thanks [@github-actions](https://github.com/apps/github-actions)! - drop support for Svelte 4 and below. `on:copied` is now `oncopied`

### Patch Changes

- [#327](https://github.com/vnphanquang/svelte-put/pull/327) [`b0ab530`](https://github.com/vnphanquang/svelte-put/commit/b0ab5304e4b355c8f8c93d0feae13779dbd36d5a) Thanks [@github-actions](https://github.com/apps/github-actions)! - re-expose public typedef (following https://github.com/Rich-Harris/dts-buddy/pull/82)

- [#327](https://github.com/vnphanquang/svelte-put/pull/327) [`5d30599`](https://github.com/vnphanquang/svelte-put/commit/5d3059929a1846fae63e8e35a1423544321f55cc) Thanks [@github-actions](https://github.com/apps/github-actions)! - set up [package provenence](https://docs.npmjs.com/generating-provenance-statements#publishing-packages-with-provenance-via-github-actions)

- [#327](https://github.com/vnphanquang/svelte-put/pull/327) [`c559185`](https://github.com/vnphanquang/svelte-put/commit/c55918517ef53fbc07870fa33e1f6c2e13e7c995) Thanks [@github-actions](https://github.com/apps/github-actions)! - sync README.md and installation version in docs page

- [#327](https://github.com/vnphanquang/svelte-put/pull/327) [`9a2e375`](https://github.com/vnphanquang/svelte-put/commit/9a2e375915b0654af3f13b1ac4d325507e5e2b98) Thanks [@github-actions](https://github.com/apps/github-actions)! - defer events to Svelte internal delegation system where applicable

## 4.0.0-next.4

### Patch Changes

- [`5d30599`](https://github.com/vnphanquang/svelte-put/commit/5d3059929a1846fae63e8e35a1423544321f55cc) Thanks [@vnphanquang](https://github.com/vnphanquang)! - set up [package provenence](https://docs.npmjs.com/generating-provenance-statements#publishing-packages-with-provenance-via-github-actions)

## 4.0.0-next.3

### Patch Changes

- [`b0ab530`](https://github.com/vnphanquang/svelte-put/commit/b0ab5304e4b355c8f8c93d0feae13779dbd36d5a) Thanks [@vnphanquang](https://github.com/vnphanquang)! - re-expose public typedef (following https://github.com/Rich-Harris/dts-buddy/pull/82)

## 4.0.0-next.2

### Patch Changes

- [`26bbd81`](https://github.com/vnphanquang/svelte-put/commit/26bbd813c1e65ead04d5d6bcb29b97a34045646b) Thanks [@vnphanquang](https://github.com/vnphanquang)! - sync README.md and installation version in docs page

## 4.0.0-next.1

### Patch Changes

- [#302](https://github.com/vnphanquang/svelte-put/pull/302) [`db35158`](https://github.com/vnphanquang/svelte-put/commit/db351580dfb3eea612be5435be1b6ac466fa6ac5) Thanks [@github-actions](https://github.com/apps/github-actions)! - defer events to Svelte internal delegation system where applicable

## 4.0.0-next.0

### Major Changes

- [#298](https://github.com/vnphanquang/svelte-put/pull/298) [`7e7d42d`](https://github.com/vnphanquang/svelte-put/commit/7e7d42d938f78dee8a01fc28a04fdaad6fe1a529) Thanks [@github-actions](https://github.com/apps/github-actions)! - drop support for Svelte 4 and below. `on:copied` is now `oncopied`

## 3.0.2

### Patch Changes

- [`c7813d7`](https://github.com/vnphanquang/svelte-put/commit/c7813d7caf9bac19edfed1e0cf6778e1c9c607d5) Thanks [@vnphanquang](https://github.com/vnphanquang)! - fix typo in publishOnly script - should generate and ship types folder

## 3.0.1

### Patch Changes

- [`46e675e`](https://github.com/vnphanquang/svelte-put/commit/46e675e05e87ca042af231cd059dc944cd6080d5) Thanks [@vnphanquang](https://github.com/vnphanquang)! - specify Svelte peer dependency to include Svelte 5

## 3.0.0

### Major Changes

- [#204](https://github.com/vnphanquang/svelte-put/pull/204) [`52a7b75`](https://github.com/vnphanquang/svelte-put/commit/52a7b75532d921593365548cae1e7536cfa8e830) Thanks [@vnphanquang](https://github.com/vnphanquang)! - Better naming for parameter types

- [#204](https://github.com/vnphanquang/svelte-put/pull/204) [`fbf2642`](https://github.com/vnphanquang/svelte-put/commit/fbf2642ed298a67408177d78c283d226d94c7e45) Thanks [@vnphanquang](https://github.com/vnphanquang)! - Migrated to vanilla JS (tracked at #203)

## 2.0.0

### Major Changes

- [`22b3b94`](https://github.com/vnphanquang/svelte-put/commit/22b3b94c74d58f5e8f2c826d0d4a9bd15b45fa94) Thanks [@vnphanquang](https://github.com/vnphanquang)! - [BREAKING] move build output from `lib` to `dist` to stay consistent of new changes from [@sveltejs/package@2](https://github.com/sveltejs/kit/releases/tag/%40sveltejs/package%402.0.0). Also fixes some api docs issues

## 1.1.1

### Patch Changes

- [`227e8dc`](https://github.com/vnphanquang/svelte-put/commit/227e8dc11f850787f9f98eb4b24cd23015c9c25c) Thanks [@vnphanquang](https://github.com/vnphanquang)! - add "Quick Start" section in package README

## 1.1.0

### Minor Changes

- [`193c0c5`](https://github.com/vnphanquang/svelte-put/commit/193c0c5c9525ade0ec4e9a512c21e96a26139238) Thanks [@vnphanquang](https://github.com/vnphanquang)! - [BREAKING] deprecate `on:copy` in favor of `on:copied` to avoid conflict with default `copy` event

- [`193c0c5`](https://github.com/vnphanquang/svelte-put/commit/193c0c5c9525ade0ec4e9a512c21e96a26139238) Thanks [@vnphanquang](https://github.com/vnphanquang)! - allow simulate the `copy` event by setting `sythetic: true`

### Patch Changes

- [`193c0c5`](https://github.com/vnphanquang/svelte-put/commit/193c0c5c9525ade0ec4e9a512c21e96a26139238) Thanks [@vnphanquang](https://github.com/vnphanquang)! - deprecate ambient typing in favor of [new action type helper](https://github.com/sveltejs/svelte/pull/7805)

## 1.0.2

### Patch Changes

- [`ad5ceab`](https://github.com/vnphanquang/svelte-put/commit/ad5ceab52f89adbcd6d4680c247113c96063f395) Thanks [@vnphanquang](https://github.com/vnphanquang)! - Migrate to [svelte check 3.0](https://github.com/sveltejs/language-tools/releases/tag/svelte-check-3.0.1), using `svelteHTML` namespace now instead of `svelte.JSX`

## 1.0.1

### Patch Changes

- [`7764c7d`](https://github.com/vnphanquang/svelte-put/commit/7764c7d85f8ee12b45cb9eb68a246fcd8e3f8839) Thanks [@vnphanquang](https://github.com/vnphanquang)! - adjust types entry to `src/index.d.ts`

## 1.0.0

### Major Changes

- [`9b19f15`](https://github.com/vnphanquang/svelte-put/commit/9b19f1565f84c9ec98e051943ebfc7bc3ce17357) Thanks [@vnphanquang](https://github.com/vnphanquang)! - Mature implementation, dedicated docs site, regenerated api

### Patch Changes

- [`c36a663`](https://github.com/vnphanquang/svelte-put/commit/c36a66324003b6011d6f0d9d590e81ab4f65dca5) Thanks [@vnphanquang](https://github.com/vnphanquang)! - pass additional to `TextResolver` function (`text` parameter callback variant)

- [`77a428c`](https://github.com/vnphanquang/svelte-put/commit/77a428c64e22925c4b6d1d123aaa4e1489c6dd28) Thanks [@vnphanquang](https://github.com/vnphanquang)! - allow cusomtizing event types for `addEventListener`

- [`42cbcf5`](https://github.com/vnphanquang/svelte-put/commit/42cbcf5d66e028cec7c4a358ec696f7fcc1d12d8) Thanks [@vnphanquang](https://github.com/vnphanquang)! - set parameters to optional, allow using just `use:copy`

- [`91dbee1`](https://github.com/vnphanquang/svelte-put/commit/91dbee1bd8f4b797f12cbec60569d36434dfacac) Thanks [@vnphanquang](https://github.com/vnphanquang)! - link to dedicated docs site at https://svelte-put.vnphanquang.com/docs/copy

## 0.1.0

### Minor Changes

- [#64](https://github.com/vnphanquang/svelte-put/pull/64) [`6a78268`](https://github.com/vnphanquang/svelte-put/commit/6a78268235d03a1c218df50aefb823315c1c104a) Thanks [@vnphanquang](https://github.com/vnphanquang)! - initial implementation
