# Changelog

## 0.5.3

### Patch Changes

- [`e7018b8`](https://github.com/vnphanquang/svelte-put/commit/e7018b8a24a6c9abd6eefa977d992fe07dddd1f4) Thanks [@vnphanquang](https://github.com/vnphanquang)! - use transform in place of translate and scale for wider browser support

## 0.5.2

### Patch Changes

- [`8d3f44f`](https://github.com/vnphanquang/svelte-put/commit/8d3f44f41672d18dc63722f3b4e74883dfaad9c6) Thanks [@vnphanquang](https://github.com/vnphanquang)! - bump @svelte-put/movable version

## 0.5.1

### Patch Changes

- [`0d37ceb`](https://github.com/vnphanquang/svelte-put/commit/0d37ceb26a719e3910bdcd52f16e1b7dfc093118) Thanks [@vnphanquang](https://github.com/vnphanquang)! - fallback in case `crypto.randomUUID` is not available (ex. non HTTPS context)

## 0.5.0

### Minor Changes

- [`c5de673`](https://github.com/vnphanquang/svelte-put/commit/c5de6733c3c7df21d8232b59e2bd3560ea1ada24) Thanks [@vnphanquang](https://github.com/vnphanquang)! - add minimal accessbility support and docs

### Patch Changes

- [`eb6fb23`](https://github.com/vnphanquang/svelte-put/commit/eb6fb23b643720b20b64e714e65d49f1073b10a9) Thanks [@vnphanquang](https://github.com/vnphanquang)! - increase specificity of x button with `button` to override browser default

- [`5901994`](https://github.com/vnphanquang/svelte-put/commit/59019948662c9403c3acb79a8d70c22af7f884dd) Thanks [@vnphanquang](https://github.com/vnphanquang)! - fix unmount transition by always displaying ModalPortal aside element

## 0.4.1

### Patch Changes

- [`037c3bd`](https://github.com/vnphanquang/svelte-put/commit/037c3bdba6fa75ddcc4409e21ffac83090bf6ab2) Thanks [@vnphanquang](https://github.com/vnphanquang)! - republish to npm

## 0.4.0

### Minor Changes

- [`870f156`](https://github.com/vnphanquang/svelte-put/commit/870f156a8e3d5564691886c4dab0053ea15e0d93) Thanks [@vnphanquang](https://github.com/vnphanquang)! - - set default `clickoutside` to false in favor of backdrop
  - better typing for modal store `pop`
  - consistent typing of `push` output and modal stack item, merge `PushedModal` into `ModalPushOutput`
  - add `resolved` to `ModalPushOutput`
  - let the `ModalPortal` fixed container click-through-able with `pointer-events` set to `none`

### Patch Changes

- [`35d6ba5`](https://github.com/vnphanquang/svelte-put/commit/35d6ba53a1d1e1de74ae384743e2299bd033a64a) Thanks [@vnphanquang](https://github.com/vnphanquang)! - add svelte REPL badge to top of README

- [#37](https://github.com/vnphanquang/svelte-put/pull/37) [`78f5837`](https://github.com/vnphanquang/svelte-put/commit/78f5837940dec5582af080e7d21b872cbdea4c14) Thanks [@vnphanquang](https://github.com/vnphanquang)! - - forward `xBtn` prop to the `x` slot template

  - better typing for the internal promise resolve function
  - fix: manual `pop` invocation should have trigger set to `pop`

- [#37](https://github.com/vnphanquang/svelte-put/pull/37) [`6821ef9`](https://github.com/vnphanquang/svelte-put/commit/6821ef97536b9360831457234729094b353af017) Thanks [@vnphanquang](https://github.com/vnphanquang)! - avoid using ul and li in ModalPortal because they might have some unexpected built-in styling

- [#37](https://github.com/vnphanquang/svelte-put/pull/37) [`18a52c0`](https://github.com/vnphanquang/svelte-put/commit/18a52c0a955105aceeaeb5b0833caaf5cd062a31) Thanks [@vnphanquang](https://github.com/vnphanquang)! - full documentation

- Updated dependencies [[`35d6ba5`](https://github.com/vnphanquang/svelte-put/commit/35d6ba53a1d1e1de74ae384743e2299bd033a64a)]:
  - @svelte-put/clickoutside@1.0.3
  - @svelte-put/movable@1.1.10

## 0.3.0

### Minor Changes

- [`02d97df`](https://github.com/vnphanquang/svelte-put/commit/02d97df0ff1b1552f837574f3c72ea2b8b63bd89) Thanks [@vnphanquang](https://github.com/vnphanquang)! - more typesafety for custom events and props

## 0.2.1

### Patch Changes

- [`95a20ab`](https://github.com/vnphanquang/svelte-put/commit/95a20abb6858c74959d7c15bb70acfff7760047b) Thanks [@vnphanquang](https://github.com/vnphanquang)! - allow push input to be either object or the component itself

## 0.2.0

### Minor Changes

- [`0eb3dee`](https://github.com/vnphanquang/svelte-put/commit/0eb3deea4f30d432f9c7edf981ee8188196c2660) Thanks [@vnphanquang](https://github.com/vnphanquang)! - simplify push output and pop mechanism

### Patch Changes

- [`866c520`](https://github.com/vnphanquang/svelte-put/commit/866c520a59a2cf4db22e802d4eb839dc9c97b9a6) Thanks [@vnphanquang](https://github.com/vnphanquang)! - bootstrap documentation

## 0.1.2

### Patch Changes

- [`37b2867`](https://github.com/vnphanquang/svelte-put/commit/37b286748f9ad8887b39eee003d1e4efed5ccee2) Thanks [@vnphanquang](https://github.com/vnphanquang)! - style(modal): use where to reduce specificity for easier customization

## 0.1.1

### Patch Changes

- [`9af62e8`](https://github.com/vnphanquang/svelte-put/commit/9af62e87621ca93def91dee05e760c621229b1e9) Thanks [@vnphanquang](https://github.com/vnphanquang)! - add svelte-put dependencies as main deps

## 0.1.0

### Minor Changes

- [#25](https://github.com/vnphanquang/svelte-put/pull/25) [`ab1f27c`](https://github.com/vnphanquang/svelte-put/commit/ab1f27c01d564cd8580a6fe557d30a44a6c41ab7) Thanks [@vnphanquang](https://github.com/vnphanquang)! - beta implementation
