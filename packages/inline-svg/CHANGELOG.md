# Changelog

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
