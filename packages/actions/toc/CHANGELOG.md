# Changelog

## 2.0.0

### Major Changes

- [#93](https://github.com/vnphanquang/svelte-put/pull/93) [`4d379db`](https://github.com/vnphanquang/svelte-put/commit/4d379db80b7b2a6c8c6c545519fd577448a252be) Thanks [@vnphanquang](https://github.com/vnphanquang)! - [BREAKING] complete overhaul, drier code with scroll-margin-top and more customizable anchor options

### Patch Changes

- [#93](https://github.com/vnphanquang/svelte-put/pull/93) [`84b63f8`](https://github.com/vnphanquang/svelte-put/commit/84b63f8dd3404cbceb5760ac837cfd2cb3ddfc31) Thanks [@vnphanquang](https://github.com/vnphanquang)! - Add global ambient typings for data-toc-... attributes

## 1.0.8

### Patch Changes

- [`4c2db74`](https://github.com/vnphanquang/svelte-put/commit/4c2db742db8d65b6fa4e7d52052e179814e4e194) Thanks [@vnphanquang](https://github.com/vnphanquang)! - provide ambient types for custom event on:toc

## 1.0.7

### Patch Changes

- [`57c5582`](https://github.com/vnphanquang/svelte-put/commit/57c5582d854ba926017aecde0ce5c4b0f96538fc) Thanks [@vnphanquang](https://github.com/vnphanquang)! - Avoid manual d.ts typing, let svelte generates component type

## 1.0.6

### Patch Changes

- [`35d6ba5`](https://github.com/vnphanquang/svelte-put/commit/35d6ba53a1d1e1de74ae384743e2299bd033a64a) Thanks [@vnphanquang](https://github.com/vnphanquang)! - add svelte REPL badge to top of README

## 1.0.5

### Patch Changes

- [`feaf0be`](https://github.com/vnphanquang/svelte-put/commit/feaf0be9e782d54cf0c95385e27149dd40cadfc5) Thanks [@vnphanquang](https://github.com/vnphanquang)! - fix svelte kit migration build step, should use separate svelte-package

## 1.0.4

### Patch Changes

- [`cb01113`](https://github.com/vnphanquang/svelte-put/commit/cb0111338eef7c080f3d9ac04303adcb24f1b301) Thanks [@vnphanquang](https://github.com/vnphanquang)! - bump dependencies' version

## 1.0.3

### Patch Changes

- [`edd30a0`](https://github.com/vnphanquang/svelte-put/commit/edd30a066c52baa62273c8562e26cc58ebc2325a) Thanks [@vnphanquang](https://github.com/vnphanquang)! - add style tag only if not already added

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
