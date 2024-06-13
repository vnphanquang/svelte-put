# Changelog

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
