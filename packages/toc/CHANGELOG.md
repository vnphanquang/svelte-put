# Changelog

## 6.0.0-next.5

### Patch Changes

- [`50834e6`](https://github.com/vnphanquang/svelte-put/commit/50834e6129256ff4483dc2e226ed702737c038b1) Thanks [@vnphanquang](https://github.com/vnphanquang)! - re-expose public typedef (following https://github.com/Rich-Harris/dts-buddy/pull/82)

## 6.0.0-next.4

### Patch Changes

- [`bb1269e`](https://github.com/vnphanquang/svelte-put/commit/bb1269e1d5102df6e57c6745b5daf05f32a53428) Thanks [@vnphanquang](https://github.com/vnphanquang)! - relax type of parameter for link action

## 6.0.0-next.3

### Major Changes

- [`fa5c475`](https://github.com/vnphanquang/svelte-put/commit/fa5c475df4c68ab48c88f1c0fc16a81249977526) Thanks [@vnphanquang](https://github.com/vnphanquang)! - bump Svelte peer dependency, `Map` is now `SvelteMap` from `svelte/reactivity`

## 6.0.0-next.2

### Patch Changes

- [`26bbd81`](https://github.com/vnphanquang/svelte-put/commit/26bbd813c1e65ead04d5d6bcb29b97a34045646b) Thanks [@vnphanquang](https://github.com/vnphanquang)! - sync README.md and installation version in docs page

## 6.0.0-next.1

### Patch Changes

- [#302](https://github.com/vnphanquang/svelte-put/pull/302) [`3744bfd`](https://github.com/vnphanquang/svelte-put/commit/3744bfd44c7f9ae2798949ff305656c4fdef96e7) Thanks [@github-actions](https://github.com/apps/github-actions)! - reset when toc root change

- [#302](https://github.com/vnphanquang/svelte-put/pull/302) [`db35158`](https://github.com/vnphanquang/svelte-put/commit/db351580dfb3eea612be5435be1b6ac466fa6ac5) Thanks [@github-actions](https://github.com/apps/github-actions)! - defer events to Svelte internal delegation system where applicable

## 6.0.0-next.0

### Major Changes

- [#298](https://github.com/vnphanquang/svelte-put/pull/298) [`6b85cc2`](https://github.com/vnphanquang/svelte-put/commit/6b85cc22ddaa6ba540e39a390a7597acf3188317) Thanks [@github-actions](https://github.com/apps/github-actions)! - drop support for Svelte 4 and below; rework public API with `Toc` class, now powered by Svelte runes. See [docs page](https://svelte-put.vnphanquang.com/docs/toc) for more information.

## 5.0.2

### Patch Changes

- [`46e675e`](https://github.com/vnphanquang/svelte-put/commit/46e675e05e87ca042af231cd059dc944cd6080d5) Thanks [@vnphanquang](https://github.com/vnphanquang)! - specify Svelte peer dependency to include Svelte 5

## 5.0.1

### Patch Changes

- [#281](https://github.com/vnphanquang/svelte-put/pull/281) [`8242e63`](https://github.com/vnphanquang/svelte-put/commit/8242e63801709266966ab6ed1053a822fa08b8d8) Thanks [@vnphanquang](https://github.com/vnphanquang)! - add comprehensive type definitions for data attributes

## 5.0.0

### Major Changes

- [#270](https://github.com/vnphanquang/svelte-put/pull/270) [`a49ca6c`](https://github.com/vnphanquang/svelte-put/commit/a49ca6ca1065390acfcf6910593b4635407b96c3) Thanks [@nicholascostadev](https://github.com/nicholascostadev)! - [BREAKING] using Map for items instead of POJO for better performance and insertion order preservation (#269)

## 4.0.0

### Major Changes

- [#204](https://github.com/vnphanquang/svelte-put/pull/204) [`52b4677`](https://github.com/vnphanquang/svelte-put/commit/52b467750edf6ae93e93ad3218a1b7a41bfb66f1) Thanks [@vnphanquang](https://github.com/vnphanquang)! - Migrated to vanilla JS (tracked at #203)

- [#204](https://github.com/vnphanquang/svelte-put/pull/204) [`52b4677`](https://github.com/vnphanquang/svelte-put/commit/52b467750edf6ae93e93ad3218a1b7a41bfb66f1) Thanks [@vnphanquang](https://github.com/vnphanquang)! - `DEFAULT_TOC_PARAMETERS` & `DEFAULT_TOC_LINK_PARAMETERS` are no longer exxported

## 3.0.3

### Patch Changes

- [#197](https://github.com/vnphanquang/svelte-put/pull/197) [`4b1fe72`](https://github.com/vnphanquang/svelte-put/commit/4b1fe7223895ce3022b58ef711487af60ba76a76) Thanks [@saadeghi](https://github.com/saadeghi)! - update peerDependencies to support svelte 4

## 3.0.2

### Patch Changes

- [#160](https://github.com/vnphanquang/svelte-put/pull/160) [`2ab1c3e`](https://github.com/vnphanquang/svelte-put/commit/2ab1c3ed3f1f72d479993c31393c5d9d0f69bed4) Thanks [@vnphanquang](https://github.com/vnphanquang)! - Logic correction to correctly cache & reset operations when toc is used in layout and across page navigation

## 3.0.1

### Patch Changes

- [`b2e3f02`](https://github.com/vnphanquang/svelte-put/commit/b2e3f023f24f30ef52bd39d6af10140dd0792dcf) Thanks [@vnphanquang](https://github.com/vnphanquang)! - support reactive attribute update for elements using `toclink`. This fixes issue where toclink is reused (in layouts, for example) across page transitions.

## 3.0.0

### Major Changes

- [`22b3b94`](https://github.com/vnphanquang/svelte-put/commit/22b3b94c74d58f5e8f2c826d0d4a9bd15b45fa94) Thanks [@vnphanquang](https://github.com/vnphanquang)! - [BREAKING] move build output from `lib` to `dist` to stay consistent of new changes from [@sveltejs/package@2](https://github.com/sveltejs/kit/releases/tag/%40sveltejs/package%402.0.0). Also fixes some api docs issues

## 2.1.3

### Patch Changes

- [#135](https://github.com/vnphanquang/svelte-put/pull/135) [`a86347a`](https://github.com/vnphanquang/svelte-put/commit/a86347a4fe6c189fe2d6005bbf82138a1956ed4a) Thanks [@vnphanquang](https://github.com/vnphanquang)! - execute toclink operation on mount, and remove rerun on update, resolves #133

## 2.1.2

### Patch Changes

- [`227e8dc`](https://github.com/vnphanquang/svelte-put/commit/227e8dc11f850787f9f98eb4b24cd23015c9c25c) Thanks [@vnphanquang](https://github.com/vnphanquang)! - add "Quick Start" section in package README

## 2.1.1

### Patch Changes

- [`87d94df`](https://github.com/vnphanquang/svelte-put/commit/87d94dfc584061f7ad846752d7845c64095a8ca0) Thanks [@vnphanquang](https://github.com/vnphanquang)! - expose `toclink` parameters types in build output

## 2.1.0

### Minor Changes

- [`8d02c83`](https://github.com/vnphanquang/svelte-put/commit/8d02c832ee9c61f6edf913fc29e75020db286497) Thanks [@vnphanquang](https://github.com/vnphanquang)! - add idiomatic support with complementary action `toclink` for anchor tags that link to toc items (typically those in a table of contents)

### Patch Changes

- [`8d02c83`](https://github.com/vnphanquang/svelte-put/commit/8d02c832ee9c61f6edf913fc29e75020db286497) Thanks [@vnphanquang](https://github.com/vnphanquang)! - undefined `anchor` & `observe` should correctly take default options

- [`80730b4`](https://github.com/vnphanquang/svelte-put/commit/80730b40ede5c48138cb81da2d5a49441357a29e) Thanks [@vnphanquang](https://github.com/vnphanquang)! - refator to `toggleAttribute` in favor of `setAttribute` for markers

## 2.0.4

### Patch Changes

- [`07ccc5b`](https://github.com/vnphanquang/svelte-put/commit/07ccc5b4547e0afe4650af7e958792e5ac0410b4) Thanks [@vnphanquang](https://github.com/vnphanquang)! - refactor for better logics organization and only export necessary things at index

## 2.0.3

### Patch Changes

- [`2a34159`](https://github.com/vnphanquang/svelte-put/commit/2a341590573671a27748776111ce6c49eb2d2ad2) Thanks [@vnphanquang](https://github.com/vnphanquang)! - set extracted `tocId` to `element.id` (bugfix)

## 2.0.2

### Patch Changes

- [`d04d44e`](https://github.com/vnphanquang/svelte-put/commit/d04d44e010cbe74f63c5304451524902c68036c7) Thanks [@vnphanquang](https://github.com/vnphanquang)! - deprecate internal svelte store (for tracking active item within action operations, no effect on the user-provided `store` parameter) in favor of simple callback for smaller bundle size

- [`a8cd5c2`](https://github.com/vnphanquang/svelte-put/commit/a8cd5c2dce7af3aa382a38e69d3c357381e7087b) Thanks [@vnphanquang](https://github.com/vnphanquang)! - add docs about lack of dynamic update support

- [`a8cd5c2`](https://github.com/vnphanquang/svelte-put/commit/a8cd5c2dce7af3aa382a38e69d3c357381e7087b) Thanks [@vnphanquang](https://github.com/vnphanquang)! - improve perf by making observe operation async (prioritize `tocinit` for initial rendering)

- [`60c2029`](https://github.com/vnphanquang/svelte-put/commit/60c2029db21ba6b6a478bff25fd4a8d39c07038f) Thanks [@vnphanquang](https://github.com/vnphanquang)! - use as few IntersectionObserver as possible, only create for each new threshold, otherwise reuse

- [`6058f0c`](https://github.com/vnphanquang/svelte-put/commit/6058f0cc8ea68a844f574dcb957443590d9dff67) Thanks [@vnphanquang](https://github.com/vnphanquang)! - add additional export entry `internal` for use within docs

## 2.0.1

### Patch Changes

- [`94e3b25`](https://github.com/vnphanquang/svelte-put/commit/94e3b2553ddd5326f5113f077b0134125afd6b07) Thanks [@vnphanquang](https://github.com/vnphanquang)! - slice textContent to 100 max length before passing to slugify

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
