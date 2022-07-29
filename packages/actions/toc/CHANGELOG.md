# Changelog

## 1.0.2

### Patch Changes

- [`b5133df`](https://github.com/vnphanquang/svelte-put/commit/b5133dfade440e2f279d59709767bf45d945f18b) Thanks [@vnphanquang](https://github.com/vnphanquang)! - Better async handling - remove excessive setTimeout

## 1.0.1

### Patch Changes

- [`6565e46`](https://github.com/vnphanquang/svelte-put/commit/6565e46625dd19cc1c217991ad5e0afaa9965298) Thanks [@vnphanquang](https://github.com/vnphanquang)! - .

  - Fixed broken imports from `Toc.svelte`
  - Better caching: only return cache when parameters are the same
  - Temporarily fix the onMount issue where action doesn't run if page is loaded / navigated to from client side
  - Added playground page for `svelte-put/toc`

## 1.0.0

### Major Changes

- [`b9c2d52`](https://github.com/vnphanquang/svelte-put/commit/b9c2d52773fdf759f95aceabd236208721d9075d) Thanks [@vnphanquang](https://github.com/vnphanquang)! - Introduction of `use:toc` and `<Toc>` component for building table of contents
