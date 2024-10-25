# Changelog

## 4.0.0

### Major Changes

- [#327](https://github.com/vnphanquang/svelte-put/pull/327) [`64df701`](https://github.com/vnphanquang/svelte-put/commit/64df701eb57bfcc85b5dd6fffab3591b48df42ca) Thanks [@github-actions](https://github.com/apps/github-actions)! - merge `@svelte-put/preprocess-inline-svg` into `@svelte-put/inline-svg/vite`, now a vite plugin

- [#327](https://github.com/vnphanquang/svelte-put/pull/327) [`82ca10e`](https://github.com/vnphanquang/svelte-put/commit/82ca10eb72f204b3b55c3b55474ca35371df0392) Thanks [@github-actions](https://github.com/apps/github-actions)! - revert default `inlineSrcAttributeName` to `inline-src` for more convenient typing setup

- [#327](https://github.com/vnphanquang/svelte-put/pull/327) [`5e11772`](https://github.com/vnphanquang/svelte-put/commit/5e11772245ba9eedf3cf0a2326892c885175ebdf) Thanks [@github-actions](https://github.com/apps/github-actions)! - drop support for Svelte 4 and below

### Minor Changes

- [#327](https://github.com/vnphanquang/svelte-put/pull/327) [`6809556`](https://github.com/vnphanquang/svelte-put/commit/6809556097c17737f63787dfc041678e5dac6296) Thanks [@github-actions](https://github.com/apps/github-actions)! - implement optional typedef generation to user-defined path

- [#327](https://github.com/vnphanquang/svelte-put/pull/327) [`16b5eb6`](https://github.com/vnphanquang/svelte-put/commit/16b5eb64be59c00d700ea7f4accee842f3c38b24) Thanks [@github-actions](https://github.com/apps/github-actions)! - simplify `typedef` generation with default path and no setup required

- [#327](https://github.com/vnphanquang/svelte-put/pull/327) [`6d1d953`](https://github.com/vnphanquang/svelte-put/commit/6d1d953da50711e114c9a24b351577b999275c72) Thanks [@github-actions](https://github.com/apps/github-actions)! - allow independent usage of Svelte preprocessor without Vite plugin

### Patch Changes

- [#327](https://github.com/vnphanquang/svelte-put/pull/327) [`8745198`](https://github.com/vnphanquang/svelte-put/commit/874519803cc04f1124d7d028ab5029937bf921f3) Thanks [@github-actions](https://github.com/apps/github-actions)! - update typing to Svelte AST (following [svelte@5.0.0-next.243](https://github.com/sveltejs/svelte/releases/tag/svelte%405.0.0-next.243) where AST has been exposed back to public typedef)

- [#327](https://github.com/vnphanquang/svelte-put/pull/327) [`5d30599`](https://github.com/vnphanquang/svelte-put/commit/5d3059929a1846fae63e8e35a1423544321f55cc) Thanks [@github-actions](https://github.com/apps/github-actions)! - set up [package provenence](https://docs.npmjs.com/generating-provenance-statements#publishing-packages-with-provenance-via-github-actions)

- [#327](https://github.com/vnphanquang/svelte-put/pull/327) [`8990206`](https://github.com/vnphanquang/svelte-put/commit/89902067a60ebe05a18b34c6fbb0eb8ba1a965a1) Thanks [@github-actions](https://github.com/apps/github-actions)! - start source typing union with `|` for consistency

- [#327](https://github.com/vnphanquang/svelte-put/pull/327) [`6f6a363`](https://github.com/vnphanquang/svelte-put/commit/6f6a3630a94cad849d5b43b33765549d337b288c) Thanks [@github-actions](https://github.com/apps/github-actions)! - correct watcher logics to use directories instead of glob patterns

- [#327](https://github.com/vnphanquang/svelte-put/pull/327) [`c559185`](https://github.com/vnphanquang/svelte-put/commit/c55918517ef53fbc07870fa33e1f6c2e13e7c995) Thanks [@github-actions](https://github.com/apps/github-actions)! - sync README.md and installation version in docs page

- [#327](https://github.com/vnphanquang/svelte-put/pull/327) [`0c84c64`](https://github.com/vnphanquang/svelte-put/commit/0c84c644c3c4d34adaec89c5d7a73a6223cbf004) Thanks [@github-actions](https://github.com/apps/github-actions)! - allow single source definition as parameter

- [#327](https://github.com/vnphanquang/svelte-put/pull/327) [`b7e69fe`](https://github.com/vnphanquang/svelte-put/commit/b7e69fe31946fe875454f764ec4a81f377ad7603) Thanks [@github-actions](https://github.com/apps/github-actions)! - make sure path separator is in POSIX format when generating source typings (fixes 320)

## 4.0.0-next.5

### Patch Changes

- [`8745198`](https://github.com/vnphanquang/svelte-put/commit/874519803cc04f1124d7d028ab5029937bf921f3) Thanks [@vnphanquang](https://github.com/vnphanquang)! - update typing to Svelte AST (following [svelte@5.0.0-next.243](https://github.com/sveltejs/svelte/releases/tag/svelte%405.0.0-next.243) where AST has been exposed back to public typedef)

## 4.0.0-next.4

### Patch Changes

- [`8990206`](https://github.com/vnphanquang/svelte-put/commit/89902067a60ebe05a18b34c6fbb0eb8ba1a965a1) Thanks [@vnphanquang](https://github.com/vnphanquang)! - start source typing union with `|` for consistency

- [`b7e69fe`](https://github.com/vnphanquang/svelte-put/commit/b7e69fe31946fe875454f764ec4a81f377ad7603) Thanks [@vnphanquang](https://github.com/vnphanquang)! - make sure path separator is in POSIX format when generating source typings (fixes 320)

## 4.0.0-next.3

### Patch Changes

- [`5d30599`](https://github.com/vnphanquang/svelte-put/commit/5d3059929a1846fae63e8e35a1423544321f55cc) Thanks [@vnphanquang](https://github.com/vnphanquang)! - set up [package provenence](https://docs.npmjs.com/generating-provenance-statements#publishing-packages-with-provenance-via-github-actions)

## 4.0.0-next.2

### Patch Changes

- [`26bbd81`](https://github.com/vnphanquang/svelte-put/commit/26bbd813c1e65ead04d5d6bcb29b97a34045646b) Thanks [@vnphanquang](https://github.com/vnphanquang)! - sync README.md and installation version in docs page

## 4.0.0-next.1

### Major Changes

- [#302](https://github.com/vnphanquang/svelte-put/pull/302) [`16a0d74`](https://github.com/vnphanquang/svelte-put/commit/16a0d744b28d1a9c9f2d50328d84c90432b1946e) Thanks [@github-actions](https://github.com/apps/github-actions)! - merge `@svelte-put/preprocess-inline-svg` into `@svelte-put/inline-svg/vite`, now a vite plugin

- [#302](https://github.com/vnphanquang/svelte-put/pull/302) [`e802e0e`](https://github.com/vnphanquang/svelte-put/commit/e802e0ede6c22186c33a57b052114087a0433585) Thanks [@github-actions](https://github.com/apps/github-actions)! - revert default `inlineSrcAttributeName` to `inline-src` for more convenient typing setup

### Minor Changes

- [#302](https://github.com/vnphanquang/svelte-put/pull/302) [`ffe537f`](https://github.com/vnphanquang/svelte-put/commit/ffe537fc9296c11a5782e8e34d6a746658be6226) Thanks [@github-actions](https://github.com/apps/github-actions)! - implement optional typedef generation to user-defined path

- [#302](https://github.com/vnphanquang/svelte-put/pull/302) [`dd8c9b3`](https://github.com/vnphanquang/svelte-put/commit/dd8c9b34fd360f37a47217b6b69409a5b288c490) Thanks [@github-actions](https://github.com/apps/github-actions)! - simplify `typedef` generation with default path and no setup required

- [#302](https://github.com/vnphanquang/svelte-put/pull/302) [`b1493e4`](https://github.com/vnphanquang/svelte-put/commit/b1493e418200a70b29a250048d2ab131887ac671) Thanks [@github-actions](https://github.com/apps/github-actions)! - allow independent usage of Svelte preprocessor without Vite plugin

### Patch Changes

- [#302](https://github.com/vnphanquang/svelte-put/pull/302) [`db135dd`](https://github.com/vnphanquang/svelte-put/commit/db135dd83a183115c98a462d525b5cae4ca55474) Thanks [@github-actions](https://github.com/apps/github-actions)! - correct watcher logics to use directories instead of glob patterns

- [#302](https://github.com/vnphanquang/svelte-put/pull/302) [`e3efe26`](https://github.com/vnphanquang/svelte-put/commit/e3efe260d8c909b530bf5f5b024fbebdf1fb2b6c) Thanks [@github-actions](https://github.com/apps/github-actions)! - allow single source definition as parameter

## 4.0.0-next.0

### Major Changes

- [#298](https://github.com/vnphanquang/svelte-put/pull/298) [`021df69`](https://github.com/vnphanquang/svelte-put/commit/021df69843737226e4a147ff963df54463d81a77) Thanks [@github-actions](https://github.com/apps/github-actions)! - drop support for Svelte 4 and below

## 3.0.1

### Patch Changes

- [`46e675e`](https://github.com/vnphanquang/svelte-put/commit/46e675e05e87ca042af231cd059dc944cd6080d5) Thanks [@vnphanquang](https://github.com/vnphanquang)! - specify Svelte peer dependency to include Svelte 5

## 3.0.0

### Major Changes

- [#204](https://github.com/vnphanquang/svelte-put/pull/204) [`cbb3c95`](https://github.com/vnphanquang/svelte-put/commit/cbb3c95408971b114edcf22ef3f930912f3144f5) Thanks [@vnphanquang](https://github.com/vnphanquang)! - Migrated to vanilla JS (tracked at #203)

- [#204](https://github.com/vnphanquang/svelte-put/pull/204) [`cbb3c95`](https://github.com/vnphanquang/svelte-put/commit/cbb3c95408971b114edcf22ef3f930912f3144f5) Thanks [@vnphanquang](https://github.com/vnphanquang)! - Better naming for typing

- [#204](https://github.com/vnphanquang/svelte-put/pull/204) [`f9ff596`](https://github.com/vnphanquang/svelte-put/commit/f9ff5968a9ffdfbdcb4988afcb6068fbe6069f07) Thanks [@vnphanquang](https://github.com/vnphanquang)! - internal utils are no longer exposed (reduce pacakge pollution)

## 2.0.0

### Major Changes

- [`1179376`](https://github.com/vnphanquang/svelte-put/commit/11793763c6579ed092a114eea0e8fc6f56f3a845) Thanks [@vnphanquang](https://github.com/vnphanquang)! - [breaking] deprecate re-export of [@svelte-put/preprocess-inline-svg](https://svelte-put.vnphanquang.com/docs/preprocess-inline-svg) following its introduction of vite plugin, please install it separately (sorry)

## 1.0.0

### Major Changes

- [`b66beaf`](https://github.com/vnphanquang/svelte-put/commit/b66beaf82a936b5d94cac6b81854bf3cce4f0586) Thanks [@vnphanquang](https://github.com/vnphanquang)! - Initial implementation & rexporting @svelte-put/preprocess-inline-svg

### Patch Changes

- [`6e4cf18`](https://github.com/vnphanquang/svelte-put/commit/6e4cf18abb09f1194f030763631747e521514912) Thanks [@vnphanquang](https://github.com/vnphanquang)! - complete docs page
