# Changelog

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
