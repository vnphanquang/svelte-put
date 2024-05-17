# Changelog

## 3.2.1

### Patch Changes

- [`46e675e`](https://github.com/vnphanquang/svelte-put/commit/46e675e05e87ca042af231cd059dc944cd6080d5) Thanks [@vnphanquang](https://github.com/vnphanquang)! - specify Svelte peer dependency to include Svelte 5

## 3.2.0

### Minor Changes

- [`22cfa9a`](https://github.com/vnphanquang/svelte-put/commit/22cfa9aef74c3bfbd4dcf3d5006427dd0ad6e0f3) Thanks [@vnphanquang](https://github.com/vnphanquang)! - support limit movement to a single axis (setting `limit.delta[axis]` to `0` or `'0px'`)

## 3.1.0

### Minor Changes

- [`11a42e2`](https://github.com/vnphanquang/svelte-put/commit/11a42e22ba7c5df23050e8807666eb008ca0bc1f) Thanks [@vnphanquang](https://github.com/vnphanquang)! - Support touch devices by switching `MouseEvent` to `PointerEvent` and forcing `touch-action: none` on `handle` (prevent touch events from being registered as scroll) (#242)

## 3.0.0

### Major Changes

- [#204](https://github.com/vnphanquang/svelte-put/pull/204) [`a0cba7f`](https://github.com/vnphanquang/svelte-put/commit/a0cba7fd8f77a4d92a15887503a2349a8dc6fa9b) Thanks [@vnphanquang](https://github.com/vnphanquang)! - change `MovableEventDetails` to `MovableEventDetail` (better naming that goes along with `event.detail` api)

- [#204](https://github.com/vnphanquang/svelte-put/pull/204) [`cd6ba44`](https://github.com/vnphanquang/svelte-put/commit/cd6ba4480fdc2eb4469f8af5abe983c070471257) Thanks [@vnphanquang](https://github.com/vnphanquang)! - Migrated to vanilla JS (tracked at #203)

- [#204](https://github.com/vnphanquang/svelte-put/pull/204) [`cd6ba44`](https://github.com/vnphanquang/svelte-put/commit/cd6ba4480fdc2eb4469f8af5abe983c070471257) Thanks [@vnphanquang](https://github.com/vnphanquang)! - Better naming for action parameter type

## 2.0.1

### Patch Changes

- [`028ef5d`](https://github.com/vnphanquang/svelte-put/commit/028ef5d7a2c8f078aa95eeb8a6ff0a8607df4783) Thanks [@vnphanquang](https://github.com/vnphanquang)! - Defer `ignore` element searching until runtime (support dynmaically-rendered children) - #178

## 2.0.0

### Major Changes

- [`22b3b94`](https://github.com/vnphanquang/svelte-put/commit/22b3b94c74d58f5e8f2c826d0d4a9bd15b45fa94) Thanks [@vnphanquang](https://github.com/vnphanquang)! - [BREAKING] move build output from `lib` to `dist` to stay consistent of new changes from [@sveltejs/package@2](https://github.com/sveltejs/kit/releases/tag/%40sveltejs/package%402.0.0). Also fixes some api docs issues

## 1.4.1

### Patch Changes

- [`227e8dc`](https://github.com/vnphanquang/svelte-put/commit/227e8dc11f850787f9f98eb4b24cd23015c9c25c) Thanks [@vnphanquang](https://github.com/vnphanquang)! - add "Quick Start" section in package README

## 1.4.0

### Minor Changes

- [`64283e1`](https://github.com/vnphanquang/svelte-put/commit/64283e10c53985dc9cd99d65274996231c46b9bd) Thanks [@vnphanquang](https://github.com/vnphanquang)! - deprecate global ambient typing in favor of the [new action typings helper](https://github.com/sveltejs/svelte/pull/7805/files)

## 1.3.1

### Patch Changes

- [`ad5ceab`](https://github.com/vnphanquang/svelte-put/commit/ad5ceab52f89adbcd6d4680c247113c96063f395) Thanks [@vnphanquang](https://github.com/vnphanquang)! - Migrate to [svelte check 3.0](https://github.com/sveltejs/language-tools/releases/tag/svelte-check-3.0.1), using `svelteHTML` namespace now instead of `svelte.JSX`

## 1.3.0

### Minor Changes

- [`d429763`](https://github.com/vnphanquang/svelte-put/commit/d429763e722bdfc6bec1d3c80f7a195833eb6548) Thanks [@vnphanquang](https://github.com/vnphanquang)! - deprecate `trigger` parameter in favor of the more sensible `handle`

### Patch Changes

- [`cd027ed`](https://github.com/vnphanquang/svelte-put/commit/cd027ed46117d760539166ef3512fe3068b86c49) Thanks [@vnphanquang](https://github.com/vnphanquang)! - add `cusor` parameter for changing cursor to grab & grabbing

## 1.2.3

### Patch Changes

- [`7764c7d`](https://github.com/vnphanquang/svelte-put/commit/7764c7d85f8ee12b45cb9eb68a246fcd8e3f8839) Thanks [@vnphanquang](https://github.com/vnphanquang)! - adjust types entry to `src/index.d.ts`

## 1.2.2

### Patch Changes

- [`94b844f`](https://github.com/vnphanquang/svelte-put/commit/94b844ff230a4ddaf48025962d3d14073c418394) Thanks [@vnphanquang](https://github.com/vnphanquang)! - provide amibent types for custom events (attributes)

## 1.2.1

### Patch Changes

- [`53b9606`](https://github.com/vnphanquang/svelte-put/commit/53b96065e28c2c0c77930d0048639990129cf5aa) Thanks [@vnphanquang](https://github.com/vnphanquang)! - fix: skip ignore step if not provided

## 1.2.0

### Minor Changes

- [`0b69be1`](https://github.com/vnphanquang/svelte-put/commit/0b69be1334f54664f2be5ad9420639d6a9772aed) Thanks [@vnphanquang](https://github.com/vnphanquang)! - Add 'screen' variant for limit parent

- [`0582876`](https://github.com/vnphanquang/svelte-put/commit/05828766f109109a990e00a4a52436c0f45e3992) Thanks [@vnphanquang](https://github.com/vnphanquang)! - add 'ignore' option (css selector within `trigger` node)

## 1.1.10

### Patch Changes

- [`35d6ba5`](https://github.com/vnphanquang/svelte-put/commit/35d6ba53a1d1e1de74ae384743e2299bd033a64a) Thanks [@vnphanquang](https://github.com/vnphanquang)! - add svelte REPL badge to top of README

## 1.1.9

### Patch Changes

- [`cb01113`](https://github.com/vnphanquang/svelte-put/commit/cb0111338eef7c080f3d9ac04303adcb24f1b301) Thanks [@vnphanquang](https://github.com/vnphanquang)! - bump dependencies' version

## 1.1.8

### Patch Changes

- [`1e138bc`](https://github.com/vnphanquang/svelte-put/commit/1e138bce9c925fcae6daab1bcae22110635ba5c3) Thanks [@vnphanquang](https://github.com/vnphanquang)! - Remove github release badge

## 1.1.7

### Patch Changes

- [`53dd3c0`](https://github.com/vnphanquang/svelte-put/commit/53dd3c05e5613086b9923ed5021bab7780e5718f) Thanks [@vnphanquang](https://github.com/vnphanquang)! - Better documentation

## [@svelte-put/movable-v1.1.6](https://github.com/vnphanquang/svelte-put/compare/@svelte-put/movable-v1.1.5...@svelte-put/movable-v1.1.6) (2022-05-15)

### Documentation

- **movable:** adjust some docs styling ([4c19434](https://github.com/vnphanquang/svelte-put/commit/4c19434c8f5a97c4a1bf3cba4bbfc9563fdb8e9a))
- **README:** add short description ([32ecf87](https://github.com/vnphanquang/svelte-put/commit/32ecf87dce1a7c6d74fc717c5723304bb6dd5157))
- remove badge github release for movable ([e485549](https://github.com/vnphanquang/svelte-put/commit/e485549754c9088937d4efd1937ce60c0027055b))

## [@svelte-put/movable-v1.1.5](https://github.com/vnphanquang/svelte-put/compare/@svelte-put/movable-v1.1.4...@svelte-put/movable-v1.1.5) (2022-05-13)

### Documentation

- **README:** fix ref link to example ([52866ac](https://github.com/vnphanquang/svelte-put/commit/52866ac225a0a84f0f95ea81e7c83ba018c2597e))

## [@svelte-put/movable-v1.1.4](https://github.com/vnphanquang/svelte-put/compare/@svelte-put/movable-v1.1.3...@svelte-put/movable-v1.1.4) (2022-05-13)

### Documentation

- **README:** fix ref links ([2536104](https://github.com/vnphanquang/svelte-put/commit/2536104b7e84493d76d4e398b365d2713ba20957))

## [@svelte-put/movable-v1.1.3](https://github.com/vnphanquang/svelte-put/compare/@svelte-put/movable-v1.1.2...@svelte-put/movable-v1.1.3) (2022-05-13)

### Documentation

- **README:** migration from svelte-action-movable to @svelte-put/movable ([50cc819](https://github.com/vnphanquang/svelte-put/commit/50cc8198eb39a5ba845ea46358c16b77ae522396))

### [1.1.2](https://github.com/vnphanquang/svelte-action-movable/compare/v1.1.1...v1.1.2) (2022-05-11)

### Documentation

- **README:** example link should href to correct section ([897bcec](https://github.com/vnphanquang/svelte-action-movable/commit/897bcecc6fdb1b22fc89f917c80ef5f0814da7a9))
- **README:** fix link to CONTRIBUTING.md ([65847ee](https://github.com/vnphanquang/svelte-action-movable/commit/65847eee6049d385398a6f38e6d43466ae5b4908))

### Development

- add svelte-kit dev environment ([5f233a9](https://github.com/vnphanquang/svelte-action-movable/commit/5f233a9730968d3b90761603a779be8535217e7e))

### [1.1.1](https://github.com/vnphanquang/svelte-action-movable/compare/v1.1.0...v1.1.1) (2022-05-09)

### Bug Fixes

- **README:** reflect typescript event declaration ([1103ef8](https://github.com/vnphanquang/svelte-action-movable/commit/1103ef8ad6d3634f92a0959c43ad161e2a5d2f3b))

### Documentation

- **README:** add ##installation ([e5d817d](https://github.com/vnphanquang/svelte-action-movable/commit/e5d817dc32a2040008caa70df8cb65d299950e58))

## [1.1.0](https://github.com/vnphanquang/svelte-action-movable/compare/v1.0.4...v1.1.0) (2022-05-09)

### Features

- **movable:** exapand event detail to object, include last known position ([97fd0e2](https://github.com/vnphanquang/svelte-action-movable/commit/97fd0e28f392e8ae9c5792a2645c23a6588102e9))

### Code Refactoring

- **types:** remove cache option and make consistent interface declarations ([48a78a8](https://github.com/vnphanquang/svelte-action-movable/commit/48a78a820987ff496f49c9666b0161044bbb707e))

### Documentation

- **MovableEventDetails:** generate docs for event detail output ([b10a51c](https://github.com/vnphanquang/svelte-action-movable/commit/b10a51c032984b70f6c5ff0a8d1a3a0d30dff5d9))
- **README:** add demo gif ([050db2a](https://github.com/vnphanquang/svelte-action-movable/commit/050db2ae21b69725df7691222e54fd213117fe47))

### [1.0.4](https://github.com/vnphanquang/svelte-action-movable/compare/v1.0.3...v1.0.4) (2022-05-08)

### Bug Fixes

- **normalizeDelta:** correctly extract px unit ([9e57f65](https://github.com/vnphanquang/svelte-action-movable/commit/9e57f655efb022165698ecf9a01a6420d42ae34e))

### [1.0.3](https://github.com/vnphanquang/svelte-action-movable/compare/v1.0.2...v1.0.3) (2022-05-08)

### Bug Fixes

- **build:** use rollup for consistency ([37e1a2a](https://github.com/vnphanquang/svelte-action-movable/commit/37e1a2a712a45956b4c505dba5a1c31558bfc73f))

### [1.0.2](https://github.com/vnphanquang/svelte-action-movable/compare/v1.0.1...v1.0.2) (2022-05-08)

### Bug Fixes

- **build:** tsc target es6 for better compatibility ([f57102b](https://github.com/vnphanquang/svelte-action-movable/commit/f57102b6167b8452feb06e39545ce23f79aeaf46))

### [1.0.1](https://github.com/vnphanquang/svelte-action-movable/compare/v1.0.0...v1.0.1) (2022-05-08)

### Bug Fixes

- **release:** set semantic-release to publish to npm ([a21fe70](https://github.com/vnphanquang/svelte-action-movable/commit/a21fe70a21009e6ff88bb53475f35f0cc430c30c))

# 1.0.0 (2022-05-08)

### Features

- movable - basic options ([8c17ac4](https://github.com/vnphanquang/svelte-action-movable/commit/8c17ac4ccd6a98bdfd5da7ab13b44c12af61aaa5))
