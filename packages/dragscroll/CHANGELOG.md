# Changelog

## 4.0.0-next.4

### Patch Changes

- [`5d30599`](https://github.com/vnphanquang/svelte-put/commit/5d3059929a1846fae63e8e35a1423544321f55cc) Thanks [@vnphanquang](https://github.com/vnphanquang)! - set up [package provenence](https://docs.npmjs.com/generating-provenance-statements#publishing-packages-with-provenance-via-github-actions)

## 4.0.0-next.3

### Patch Changes

- [`dab2ff5`](https://github.com/vnphanquang/svelte-put/commit/dab2ff5ecadd16270feff8e92c2f31e5f400d6c0) Thanks [@vnphanquang](https://github.com/vnphanquang)! - re-expose public typedef (following https://github.com/Rich-Harris/dts-buddy/pull/82)

## 4.0.0-next.2

### Patch Changes

- [`26bbd81`](https://github.com/vnphanquang/svelte-put/commit/26bbd813c1e65ead04d5d6bcb29b97a34045646b) Thanks [@vnphanquang](https://github.com/vnphanquang)! - sync README.md and installation version in docs page

## 4.0.0-next.1

### Patch Changes

- [#302](https://github.com/vnphanquang/svelte-put/pull/302) [`db35158`](https://github.com/vnphanquang/svelte-put/commit/db351580dfb3eea612be5435be1b6ac466fa6ac5) Thanks [@github-actions](https://github.com/apps/github-actions)! - defer events to Svelte internal delegation system where applicable

## 4.0.0-next.0

### Major Changes

- [#298](https://github.com/vnphanquang/svelte-put/pull/298) [`15b262c`](https://github.com/vnphanquang/svelte-put/commit/15b262cd30e52a906cef6080ff5838e66b0dc515) Thanks [@github-actions](https://github.com/apps/github-actions)! - drop support for svelte 4 and below

## 3.0.1

### Patch Changes

- [`46e675e`](https://github.com/vnphanquang/svelte-put/commit/46e675e05e87ca042af231cd059dc944cd6080d5) Thanks [@vnphanquang](https://github.com/vnphanquang)! - specify Svelte peer dependency to include Svelte 5

## 3.0.0

### Major Changes

- [#204](https://github.com/vnphanquang/svelte-put/pull/204) [`939c81c`](https://github.com/vnphanquang/svelte-put/commit/939c81c8ae5cb4aec577ed9cd3d7f105fa5fa979) Thanks [@vnphanquang](https://github.com/vnphanquang)! - Migrated to vanilla JS (tracked at #203)

- [#204](https://github.com/vnphanquang/svelte-put/pull/204) [`939c81c`](https://github.com/vnphanquang/svelte-put/commit/939c81c8ae5cb4aec577ed9cd3d7f105fa5fa979) Thanks [@vnphanquang](https://github.com/vnphanquang)! - Better naming for action parameter type

## 2.0.0

### Major Changes

- [`22b3b94`](https://github.com/vnphanquang/svelte-put/commit/22b3b94c74d58f5e8f2c826d0d4a9bd15b45fa94) Thanks [@vnphanquang](https://github.com/vnphanquang)! - [BREAKING] move build output from `lib` to `dist` to stay consistent of new changes from [@sveltejs/package@2](https://github.com/sveltejs/kit/releases/tag/%40sveltejs/package%402.0.0). Also fixes some api docs issues

## 1.1.1

### Patch Changes

- [`227e8dc`](https://github.com/vnphanquang/svelte-put/commit/227e8dc11f850787f9f98eb4b24cd23015c9c25c) Thanks [@vnphanquang](https://github.com/vnphanquang)! - add "Quick Start" section in package README

## 1.1.0

### Minor Changes

- [`64283e1`](https://github.com/vnphanquang/svelte-put/commit/64283e10c53985dc9cd99d65274996231c46b9bd) Thanks [@vnphanquang](https://github.com/vnphanquang)! - deprecate global ambient typing in favor of the [new action typings helper](https://github.com/sveltejs/svelte/pull/7805/files)

## 1.0.4

### Patch Changes

- [`ad5ceab`](https://github.com/vnphanquang/svelte-put/commit/ad5ceab52f89adbcd6d4680c247113c96063f395) Thanks [@vnphanquang](https://github.com/vnphanquang)! - Migrate to [svelte check 3.0](https://github.com/sveltejs/language-tools/releases/tag/svelte-check-3.0.1), using `svelteHTML` namespace now instead of `svelte.JSX`

## 1.0.3

### Patch Changes

- [`4d36311`](https://github.com/vnphanquang/svelte-put/commit/4d36311a2f6b3f307b7d8bc2cc97c97406baac53) Thanks [@vnphanquang](https://github.com/vnphanquang)! - correctly remove property cursor when cursor is false

## 1.0.2

### Patch Changes

- [`7764c7d`](https://github.com/vnphanquang/svelte-put/commit/7764c7d85f8ee12b45cb9eb68a246fcd8e3f8839) Thanks [@vnphanquang](https://github.com/vnphanquang)! - adjust types entry to `src/index.d.ts`

## 1.0.1

### Patch Changes

- [`d909b13`](https://github.com/vnphanquang/svelte-put/commit/d909b138df5aa65c87ecd9c17c5dab350972055f) Thanks [@vnphanquang](https://github.com/vnphanquang)! - add docs about limitation with scroll-snap

- [`261dd8a`](https://github.com/vnphanquang/svelte-put/commit/261dd8af2f9071ead52c7ea28b62ac83ed712f60) Thanks [@vnphanquang](https://github.com/vnphanquang)! - automatically set `cursor` to `grab` and `grabbing`, allow customization for this `cursor` parameter

## 1.0.0

### Major Changes

- [`6ff6d79`](https://github.com/vnphanquang/svelte-put/commit/6ff6d798de5d9ac03949d3dd3792cba383856ffb) Thanks [@vnphanquang](https://github.com/vnphanquang)! - mature implementation, dedicated docs page at https://svelte-put.vnphanquang.com/docs/dragscroll

### Minor Changes

- [`81375e2`](https://github.com/vnphanquang/svelte-put/commit/81375e2ed55849bac20f0776f4b5b5c78c13086a) Thanks [@vnphanquang](https://github.com/vnphanquang)! - add support for both axes and choosing mouse vs pointer events

### Patch Changes

- [`2dc599a`](https://github.com/vnphanquang/svelte-put/commit/2dc599a523a81200e2fc65b0090250663d3c323f) Thanks [@vnphanquang](https://github.com/vnphanquang)! - complete tsdocs and regenerate api

## 0.1.0

### Minor Changes

- [`2f0fd71`](https://github.com/vnphanquang/svelte-put/commit/2f0fd7109469e7f6812ce74359536e269edd1d48) Thanks [@vnphanquang](https://github.com/vnphanquang)! - initial, minimal implementation
