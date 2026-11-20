# @svelte-put/toc

## 7.0.0

### Major Changes

- [`3dc65fd`](https://github.com/vnphanquang/svelte-put/commit/3dc65fd4bacd17ab308d0eebea72b1b1dcc506bf) Thanks [@vnphanquang](https://github.com/vnphanquang)! - a new compile-time strategy via Vite plugin / Svelte preprocessor

- [`e6d062f`](https://github.com/vnphanquang/svelte-put/commit/e6d062f10a725083751bf8de8d9908421717e32c) Thanks [@vnphanquang](https://github.com/vnphanquang)! - [breaking] a complete rewrite of the runtime engine, with new CSS-only visibility tracking using [Scroll-driven Animation API](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations)

### Minor Changes

- [`af85e00`](https://github.com/vnphanquang/svelte-put/commit/af85e00d2b2e0f60f6ff50287272fce306ba491f) Thanks [@vnphanquang](https://github.com/vnphanquang)! - add `@svelte-put/toc/styles/track-debug.css` for development convenience

- [`d6f3b27`](https://github.com/vnphanquang/svelte-put/commit/d6f3b2705bff8f9c78e943dea63b177477ba5601) Thanks [@vnphanquang](https://github.com/vnphanquang)! - accept an array for `toc.options.items`

- [`0195672`](https://github.com/vnphanquang/svelte-put/commit/0195672024f16414e40e170e5a83e9cd067af4d7) Thanks [@vnphanquang](https://github.com/vnphanquang)! - add `.id` option to support multiple Toc instances on the same page with overlapping indexable content

### Patch Changes

- [`2f789ce`](https://github.com/vnphanquang/svelte-put/commit/2f789ce9da59872e8cd620f8a67479f3b8a374a5) Thanks [@vnphanquang](https://github.com/vnphanquang)! - correct typing of runtime index option

- [`60b2a39`](https://github.com/vnphanquang/svelte-put/commit/60b2a39f467bdf2775ac6ca43e40dafcd15c885f) Thanks [@vnphanquang](https://github.com/vnphanquang)! - set anchor content correctly during `toc.runtime.index()`

- [`6e08a10`](https://github.com/vnphanquang/svelte-put/commit/6e08a10ebd8686e4f6fce21ceaa9d93366ffcfe2) Thanks [@vnphanquang](https://github.com/vnphanquang)! - when injecting anchor tag, if position is set as `'wrap'` or `'content'` but the element already contains some anchor tags, fallback to another strategy instead

- [`b8468ae`](https://github.com/vnphanquang/svelte-put/commit/b8468ae504f0da7668d8a90878ca3215fa4a4781) Thanks [@vnphanquang](https://github.com/vnphanquang)! - remove `boolean` from `toc.options.index`. If no runtime indexing is needed, simply skip `toc.index()`

- [`1b39c89`](https://github.com/vnphanquang/svelte-put/commit/1b39c896defd5b3fda317aa90a71678a90b00772) Thanks [@vnphanquang](https://github.com/vnphanquang)! - bump minor for \`magic-string\`

- [`f0a804f`](https://github.com/vnphanquang/svelte-put/commit/f0a804faa9bdae81fae185ef7aac7bac9dde012e) Thanks [@vnphanquang](https://github.com/vnphanquang)! - update link to new doc page

- [`d0bb212`](https://github.com/vnphanquang/svelte-put/commit/d0bb212d44da23ee952fbefc1c066b22c7b4f72c) Thanks [@vnphanquang](https://github.com/vnphanquang)! - dev quality-of-life maintenance update: rewrite docs, update manifest

- [`40635d9`](https://github.com/vnphanquang/svelte-put/commit/40635d9eeff5493e56ded7d19a93150621c5f8c8) Thanks [@vnphanquang](https://github.com/vnphanquang)! - set `options.index.idAttribute` instead of hardcoding `id`

- [`59525a8`](https://github.com/vnphanquang/svelte-put/commit/59525a88c4b0df136bcf04f30dec3d4305defc8e) Thanks [@vnphanquang](https://github.com/vnphanquang)! - make sure `options.index.tags` are case-insensitive

- [`97b1704`](https://github.com/vnphanquang/svelte-put/commit/97b1704534666756aec444b8c358af5e26a577c4) Thanks [@vnphanquang](https://github.com/vnphanquang)! - correctly resolve `toc.options` at runtime

- [`4837fd2`](https://github.com/vnphanquang/svelte-put/commit/4837fd24dc4f065ba1f16341728cdc8dac2c6f01) Thanks [@vnphanquang](https://github.com/vnphanquang)! - correctly extract text content of indexed tags at runtime

- [`1a6657b`](https://github.com/vnphanquang/svelte-put/commit/1a6657b55d16c50a6ae47892e9c01fad6fced4ad) Thanks [@vnphanquang](https://github.com/vnphanquang)! - don't publish documentation artifacts (`src/routes` & `src/docs`)

## 7.0.0-next.0

### Major Changes

- [`3dc65fd`](https://github.com/vnphanquang/svelte-put/commit/3dc65fd4bacd17ab308d0eebea72b1b1dcc506bf) Thanks [@vnphanquang](https://github.com/vnphanquang)! - a new compile-time strategy via Vite plugin / Svelte preprocessor

- [`e6d062f`](https://github.com/vnphanquang/svelte-put/commit/e6d062f10a725083751bf8de8d9908421717e32c) Thanks [@vnphanquang](https://github.com/vnphanquang)! - [breaking] a complete rewrite of the runtime engine, with new CSS-only visibility tracking using [Scroll-driven Animation API](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations)
