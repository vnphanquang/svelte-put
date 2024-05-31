# Changelog

## 2.0.0-next.0

### Major Changes

- [#298](https://github.com/vnphanquang/svelte-put/pull/298) [`439bced`](https://github.com/vnphanquang/svelte-put/commit/439bced3cbd115780d0b13bcbf92f4d1ac87995c) Thanks [@github-actions](https://github.com/apps/github-actions)! - [BREAKING] drop support for Svelte 4 and lower, now using Svelte modern AST and witten in JS with JSDocs

## 1.0.1

### Patch Changes

- [#197](https://github.com/vnphanquang/svelte-put/pull/197) [`4b1fe72`](https://github.com/vnphanquang/svelte-put/commit/4b1fe7223895ce3022b58ef711487af60ba76a76) Thanks [@saadeghi](https://github.com/saadeghi)! - update peerDependencies to support svelte 4

## 1.0.0

### Major Changes

- [`22b3b94`](https://github.com/vnphanquang/svelte-put/commit/22b3b94c74d58f5e8f2c826d0d4a9bd15b45fa94) Thanks [@vnphanquang](https://github.com/vnphanquang)! - [BREAKING] move build output from `lib` to `dist` to stay consistent of new changes from [@sveltejs/package@2](https://github.com/sveltejs/kit/releases/tag/%40sveltejs/package%402.0.0). Also fixes some api docs issues

## 0.3.3

### Patch Changes

- [`227e8dc`](https://github.com/vnphanquang/svelte-put/commit/227e8dc11f850787f9f98eb4b24cd23015c9c25c) Thanks [@vnphanquang](https://github.com/vnphanquang)! - add "Quick Start" section in package README

## 0.3.2

### Patch Changes

- [`8e4168a`](https://github.com/vnphanquang/svelte-put/commit/8e4168a6bb3904245e7b28b83828632d09a06cad) Thanks [@vnphanquang](https://github.com/vnphanquang)! - when `anchor` is enabled, add attribute `data-auto-slug-anchor-position` for quick retrieve the anchor element at runtime (used by `@svelte-put/toc`)

## 0.3.1

### Patch Changes

- [`dbeecf8`](https://github.com/vnphanquang/svelte-put/commit/dbeecf88701d4e25186757d5e05515f44e0e4968) Thanks [@vnphanquang](https://github.com/vnphanquang)! - fix: duplication in slug from `getTextContent`; should only walk node once

- [`abb54f6`](https://github.com/vnphanquang/svelte-put/commit/abb54f6fbeb2ad0f6e0ba99f85240befa071d684) Thanks [@vnphanquang](https://github.com/vnphanquang)! - allow skipping processing with `<!-- ignore @svelte-put/preprocess-auto-slug -->`

## 0.3.0

### Minor Changes

- [#93](https://github.com/vnphanquang/svelte-put/pull/93) [`3377f8d`](https://github.com/vnphanquang/svelte-put/commit/3377f8d2e546483848b955db7938fa671aeaf3b2) Thanks [@vnphanquang](https://github.com/vnphanquang)! - add `data-autoslug` and `data-autoslug-anchor` attributes to mark that these elements have been processed by `preprocess-auto-slug`

- [#93](https://github.com/vnphanquang/svelte-put/pull/93) [`8c89776`](https://github.com/vnphanquang/svelte-put/commit/8c89776b133d94a29183f391a7fdaa5148d53ebb) Thanks [@vnphanquang](https://github.com/vnphanquang)! - add option to filter which files to process

## 0.2.2

### Patch Changes

- [`af949ec`](https://github.com/vnphanquang/svelte-put/commit/af949ecf08a69861f3b5de8fb0824480fe5d8644) Thanks [@vnphanquang](https://github.com/vnphanquang)! - mature enough implementation with complelte docs page

## 0.2.1

### Patch Changes

- [`a01c7db`](https://github.com/vnphanquang/svelte-put/commit/a01c7db5cd83320a33aa702ce8f6db4be61836dc) Thanks [@vnphanquang](https://github.com/vnphanquang)! - fix typo `tab-index` attribute should be `tabindex`

## 0.2.0

### Minor Changes

- [#64](https://github.com/vnphanquang/svelte-put/pull/64) [`7d476c9`](https://github.com/vnphanquang/svelte-put/commit/7d476c9d15a05346c3a4c138ea75f08fd6b67565) Thanks [@vnphanquang](https://github.com/vnphanquang)! - separate two steps: slug generation & anchor inserting. If id already exists skip and still do anchor inserting

- [#64](https://github.com/vnphanquang/svelte-put/pull/64) [`cb2cd7f`](https://github.com/vnphanquang/svelte-put/commit/cb2cd7f5e74d5d2e26620beb1688fbdff63af534) Thanks [@vnphanquang](https://github.com/vnphanquang)! - more mature options and ability to customization

- [#64](https://github.com/vnphanquang/svelte-put/pull/64) [`7d476c9`](https://github.com/vnphanquang/svelte-put/commit/7d476c9d15a05346c3a4c138ea75f08fd6b67565) Thanks [@vnphanquang](https://github.com/vnphanquang)! - support node with dynamic text content (MustacheTag)

- [#64](https://github.com/vnphanquang/svelte-put/pull/64) [`1efc395`](https://github.com/vnphanquang/svelte-put/commit/1efc395b08d41471083f4ab69b565aafeff6a787) Thanks [@vnphanquang](https://github.com/vnphanquang)! - initial implementation
