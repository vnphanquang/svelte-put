# Changelog

## 1.0.0

### Major Changes

- [#327](https://github.com/vnphanquang/svelte-put/pull/327) [`1ac028f`](https://github.com/vnphanquang/svelte-put/commit/1ac028f00569e9182d02eab1e8aa9ec95baf33db) Thanks [@github-actions](https://github.com/apps/github-actions)! - a markdown preprocessor, with shiki for syntax highlight, and a custom `enhance-code-block` Svelte preprocessor

### Minor Changes

- [#327](https://github.com/vnphanquang/svelte-put/pull/327) [`b137385`](https://github.com/vnphanquang/svelte-put/commit/b1373858ae97bd0ce360ee4591e896651e60ad17) Thanks [@github-actions](https://github.com/apps/github-actions)! - drop the deprecated `SvelteComponent` and use `Component` for typing

- [#327](https://github.com/vnphanquang/svelte-put/pull/327) [`bfdc515`](https://github.com/vnphanquang/svelte-put/commit/bfdc51556e4b1b7ca5382570f7ae29cd775447df) Thanks [@github-actions](https://github.com/apps/github-actions)! - better fullscreen using [Fullscreen API](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API/Guide#things_your_users_want_to_know), but fall back to `display: fixed` for progressive enhancement

### Patch Changes

- [#327](https://github.com/vnphanquang/svelte-put/pull/327) [`007b6cf`](https://github.com/vnphanquang/svelte-put/commit/007b6cf6b83cd96de9ab45afc36c48c2b3609c0d) Thanks [@github-actions](https://github.com/apps/github-actions)! - put back `@svelte-put/copy` as a runtime dependencies`

- [#327](https://github.com/vnphanquang/svelte-put/pull/327) [`03c7b7e`](https://github.com/vnphanquang/svelte-put/commit/03c7b7e8ef097b421762a4181985e4e716b59138) Thanks [@github-actions](https://github.com/apps/github-actions)! - escape special svelte-y characters in `code` block instead of `pre`

- [#327](https://github.com/vnphanquang/svelte-put/pull/327) [`f71bec8`](https://github.com/vnphanquang/svelte-put/commit/f71bec8424483f6758e5f59da9b4726f19110964) Thanks [@github-actions](https://github.com/apps/github-actions)! - ensure two way binding working for `title` prop of `EnhancedCodeBlockGroup`

- [#327](https://github.com/vnphanquang/svelte-put/pull/327) [`3eb49ce`](https://github.com/vnphanquang/svelte-put/commit/3eb49cec59af9e9e036bf86a1dca7fae0cb12ba3) Thanks [@github-actions](https://github.com/apps/github-actions)! - set `title` prop of `EnhancedCodeBlockGroup` as bindable

- [#327](https://github.com/vnphanquang/svelte-put/pull/327) [`9f7b9c0`](https://github.com/vnphanquang/svelte-put/commit/9f7b9c02dc2ec09928f1eceae24ead73179bed54) Thanks [@github-actions](https://github.com/apps/github-actions)! - should continue to exhaust AST in zimmerframew walk (calling next())

- [#327](https://github.com/vnphanquang/svelte-put/pull/327) [`867819a`](https://github.com/vnphanquang/svelte-put/commit/867819a387eca4243c3da0a5fbee2c78ac110995) Thanks [@github-actions](https://github.com/apps/github-actions)! - support Svelte logic blocks (`#if`, `#each`, ...)

- [#327](https://github.com/vnphanquang/svelte-put/pull/327) [`8745198`](https://github.com/vnphanquang/svelte-put/commit/874519803cc04f1124d7d028ab5029937bf921f3) Thanks [@github-actions](https://github.com/apps/github-actions)! - update typing to Svelte AST (following [svelte@5.0.0-next.243](https://github.com/sveltejs/svelte/releases/tag/svelte%405.0.0-next.243) where AST has been exposed back to public typedef)

- [#327](https://github.com/vnphanquang/svelte-put/pull/327) [`5d30599`](https://github.com/vnphanquang/svelte-put/commit/5d3059929a1846fae63e8e35a1423544321f55cc) Thanks [@github-actions](https://github.com/apps/github-actions)! - set up [package provenence](https://docs.npmjs.com/generating-provenance-statements#publishing-packages-with-provenance-via-github-actions)

- [#327](https://github.com/vnphanquang/svelte-put/pull/327) [`68d61c6`](https://github.com/vnphanquang/svelte-put/commit/68d61c6c63efb477d3db8ba6d664476a3dd10c9d) Thanks [@github-actions](https://github.com/apps/github-actions)! - docs for props, fallback for crypto

- [#327](https://github.com/vnphanquang/svelte-put/pull/327) [`477a590`](https://github.com/vnphanquang/svelte-put/commit/477a590261eeb8384ad64edbb5e706a022665601) Thanks [@github-actions](https://github.com/apps/github-actions)! - better manage state synchronization between title prop and groupContext

- [#327](https://github.com/vnphanquang/svelte-put/pull/327) [`e7a276c`](https://github.com/vnphanquang/svelte-put/commit/e7a276c0613d16d1becf7f2d8cae65f205317614) Thanks [@github-actions](https://github.com/apps/github-actions)! - export component type as default

- [#327](https://github.com/vnphanquang/svelte-put/pull/327) [`1aa41e7`](https://github.com/vnphanquang/svelte-put/commit/1aa41e7df984d0d246e611de45bec9d1f76e3277) Thanks [@github-actions](https://github.com/apps/github-actions)! - rehype negate `{@...}` pattern

- [#327](https://github.com/vnphanquang/svelte-put/pull/327) [`5052261`](https://github.com/vnphanquang/svelte-put/commit/5052261bcf44768bc1823cc8df500a94a4602e15) Thanks [@github-actions](https://github.com/apps/github-actions)! - correctly escape special characters to avoid conflict with svelte copmiler (`{`, `}`, ```)

- [#327](https://github.com/vnphanquang/svelte-put/pull/327) [`3c4c79d`](https://github.com/vnphanquang/svelte-put/commit/3c4c79d8543862cf36945c6d8b8029afc70f5610) Thanks [@github-actions](https://github.com/apps/github-actions)! - shiki custom transformer - should correctly check `__skipMetaBlock`

- [#327](https://github.com/vnphanquang/svelte-put/pull/327) [`d31aaea`](https://github.com/vnphanquang/svelte-put/commit/d31aaea666cdbe62aea9011d9f08f2e893cf7ee2) Thanks [@github-actions](https://github.com/apps/github-actions)! - bump shiki, rename deprecated `getHighlighter` to `createHighlighter`

- Updated dependencies [[`4a048b1`](https://github.com/vnphanquang/svelte-put/commit/4a048b13a5230947d5b073ddcf0846bbca46ff64), [`b0ab530`](https://github.com/vnphanquang/svelte-put/commit/b0ab5304e4b355c8f8c93d0feae13779dbd36d5a), [`5d30599`](https://github.com/vnphanquang/svelte-put/commit/5d3059929a1846fae63e8e35a1423544321f55cc), [`c559185`](https://github.com/vnphanquang/svelte-put/commit/c55918517ef53fbc07870fa33e1f6c2e13e7c995), [`9a2e375`](https://github.com/vnphanquang/svelte-put/commit/9a2e375915b0654af3f13b1ac4d325507e5e2b98)]:
  - @svelte-put/copy@4.0.0

## 1.0.0-next.7

### Patch Changes

- [`8745198`](https://github.com/vnphanquang/svelte-put/commit/874519803cc04f1124d7d028ab5029937bf921f3) Thanks [@vnphanquang](https://github.com/vnphanquang)! - update typing to Svelte AST (following [svelte@5.0.0-next.243](https://github.com/sveltejs/svelte/releases/tag/svelte%405.0.0-next.243) where AST has been exposed back to public typedef)

## 1.0.0-next.6

### Patch Changes

- [`5d30599`](https://github.com/vnphanquang/svelte-put/commit/5d3059929a1846fae63e8e35a1423544321f55cc) Thanks [@vnphanquang](https://github.com/vnphanquang)! - set up [package provenence](https://docs.npmjs.com/generating-provenance-statements#publishing-packages-with-provenance-via-github-actions)

- Updated dependencies [[`5d30599`](https://github.com/vnphanquang/svelte-put/commit/5d3059929a1846fae63e8e35a1423544321f55cc)]:
  - @svelte-put/copy@4.0.0-next.4

## 1.0.0-next.5

### Patch Changes

- [`68d61c6`](https://github.com/vnphanquang/svelte-put/commit/68d61c6c63efb477d3db8ba6d664476a3dd10c9d) Thanks [@vnphanquang](https://github.com/vnphanquang)! - docs for props, fallback for crypto

- Updated dependencies [[`b0ab530`](https://github.com/vnphanquang/svelte-put/commit/b0ab5304e4b355c8f8c93d0feae13779dbd36d5a)]:
  - @svelte-put/copy@4.0.0-next.3

## 1.0.0-next.4

### Minor Changes

- [`f87d286`](https://github.com/vnphanquang/svelte-put/commit/f87d2866b39641d0087ff79b3d1b04ad35f9e17b) Thanks [@vnphanquang](https://github.com/vnphanquang)! - better fullscreen using [Fullscreen API](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API/Guide#things_your_users_want_to_know), but fall back to `display: fixed` for progressive enhancement

### Patch Changes

- [`7a2700f`](https://github.com/vnphanquang/svelte-put/commit/7a2700f0546ab1239a6961e2145d041d03715697) Thanks [@vnphanquang](https://github.com/vnphanquang)! - better manage state synchronization between title prop and groupContext

## 1.0.0-next.3

### Patch Changes

- [`fcb6102`](https://github.com/vnphanquang/svelte-put/commit/fcb610254c0fe6e892c2882e0a1e8e4800030c2b) Thanks [@vnphanquang](https://github.com/vnphanquang)! - bump shiki, rename deprecated `getHighlighter` to `createHighlighter`

## 1.0.0-next.2

### Patch Changes

- [`73738a1`](https://github.com/vnphanquang/svelte-put/commit/73738a1efe70eb6b03248e5b3dc4797a05042e0d) Thanks [@vnphanquang](https://github.com/vnphanquang)! - escape special svelte-y characters in `code` block instead of `pre`

- [`f61c8ca`](https://github.com/vnphanquang/svelte-put/commit/f61c8ca5476bb9eb96bf347818859137dc8c4d54) Thanks [@vnphanquang](https://github.com/vnphanquang)! - export component type as default

## 1.0.0-next.1

### Patch Changes

- [`b7bcccb`](https://github.com/vnphanquang/svelte-put/commit/b7bcccb3eb728bc69bd4dce1a895a9b5301a4536) Thanks [@vnphanquang](https://github.com/vnphanquang)! - put back `@svelte-put/copy` as a runtime dependencies`

## 1.0.0-next.0

### Major Changes

- [#302](https://github.com/vnphanquang/svelte-put/pull/302) [`17e76ac`](https://github.com/vnphanquang/svelte-put/commit/17e76ac26d1d93a9d246d0fd011bf339ac29efa1) Thanks [@github-actions](https://github.com/apps/github-actions)! - a markdown preprocessor, with shiki for syntax highlight, and a custom `enhance-code-block` Svelte preprocessor

### Minor Changes

- [#302](https://github.com/vnphanquang/svelte-put/pull/302) [`11a6526`](https://github.com/vnphanquang/svelte-put/commit/11a65266527bf42e735cf4ee29facedb80de2c41) Thanks [@github-actions](https://github.com/apps/github-actions)! - drop the deprecated `SvelteComponent` and use `Component` for typing

### Patch Changes

- [#302](https://github.com/vnphanquang/svelte-put/pull/302) [`4198fa0`](https://github.com/vnphanquang/svelte-put/commit/4198fa0524a8926088036994ef424b4104c8e668) Thanks [@github-actions](https://github.com/apps/github-actions)! - ensure two way binding working for `title` prop of `EnhancedCodeBlockGroup`

- [#302](https://github.com/vnphanquang/svelte-put/pull/302) [`517328e`](https://github.com/vnphanquang/svelte-put/commit/517328e5f8428b5b06c15c9979b9f0cae1bcb91d) Thanks [@github-actions](https://github.com/apps/github-actions)! - set `title` prop of `EnhancedCodeBlockGroup` as bindable

- [#302](https://github.com/vnphanquang/svelte-put/pull/302) [`77c8e27`](https://github.com/vnphanquang/svelte-put/commit/77c8e279e9d80e015f67a779b32c85e53de73a63) Thanks [@github-actions](https://github.com/apps/github-actions)! - should continue to exhaust AST in zimmerframew walk (calling next())

- [#302](https://github.com/vnphanquang/svelte-put/pull/302) [`6af78f4`](https://github.com/vnphanquang/svelte-put/commit/6af78f449c3da57df9cd8f3bd1355185b1fd885a) Thanks [@github-actions](https://github.com/apps/github-actions)! - support Svelte logic blocks (`#if`, `#each`, ...)

- [#302](https://github.com/vnphanquang/svelte-put/pull/302) [`f0791db`](https://github.com/vnphanquang/svelte-put/commit/f0791db8ae205dd3fe215d2a82b47506aa9efbb2) Thanks [@github-actions](https://github.com/apps/github-actions)! - rehype negate `{@...}` pattern

- [#302](https://github.com/vnphanquang/svelte-put/pull/302) [`403a8c6`](https://github.com/vnphanquang/svelte-put/commit/403a8c6bba8a800c9401a44d9ea57de60d34de8f) Thanks [@github-actions](https://github.com/apps/github-actions)! - correctly escape special characters to avoid conflict with svelte copmiler (`{`, `}`, ```)

- [#302](https://github.com/vnphanquang/svelte-put/pull/302) [`f361fa5`](https://github.com/vnphanquang/svelte-put/commit/f361fa55469851d1c3a64324d8aab8b50938f819) Thanks [@github-actions](https://github.com/apps/github-actions)! - shiki custom transformer - should correctly check `__skipMetaBlock`
