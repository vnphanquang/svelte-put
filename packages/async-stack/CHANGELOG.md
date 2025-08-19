# Changelog

## 1.2.0

### Minor Changes

- [`7cb4da8`](https://github.com/vnphanquang/svelte-put/commit/7cb4da81038f1013b426d923d116e963afdc727b) Thanks [@vnphanquang](https://github.com/vnphanquang)! - (experimental) `onResolve` now returns callback that removes the listener

- [`a70e65b`](https://github.com/vnphanquang/svelte-put/commit/a70e65b2cf2613dda369831016cc5c985a145c8d) Thanks [@vnphanquang](https://github.com/vnphanquang)! - (experimental) allow cancelling resolution via `StackItem.onResolve` callback

### Patch Changes

- [`139b7da`](https://github.com/vnphanquang/svelte-put/commit/139b7da792d3b9c4603e56193bead1a30ed9853e) Thanks [@vnphanquang](https://github.com/vnphanquang)! - (experimental) use `Set` instead of array for `StackItemResolveListener` to **help** avoid duplicated callbacks

  NOTE: should discourage user from using arrow functions.

## 1.1.5

### Patch Changes

- [`cd7fefc`](https://github.com/vnphanquang/svelte-put/commit/cd7fefc1d7f87936321932fe1ffe283554e468e4) Thanks [@vnphanquang](https://github.com/vnphanquang)! - mark `item.onResolve` as experimental and clarify async behavior

- [`5793e71`](https://github.com/vnphanquang/svelte-put/commit/5793e7139482554d73de30d305b324532df2caec) Thanks [@vnphanquang](https://github.com/vnphanquang)! - use `Set` instead of array for `StackItemResolveListener` to **help** avoid duplicated callbacks (should discourage the usage of arrow functions)

## 1.1.4

### Patch Changes

- [`4f3ee9e`](https://github.com/vnphanquang/svelte-put/commit/4f3ee9e7139186298fb417c5d8c4812fa1105df8) Thanks [@vnphanquang](https://github.com/vnphanquang)! - call `requestClose` if available in enhance-dialog

- [`93c7d99`](https://github.com/vnphanquang/svelte-put/commit/93c7d999ba4bc1ffc78d2e12227a0972e1c5c70c) Thanks [@vnphanquang](https://github.com/vnphanquang)! - correct clickoutside logic in enhance-dialog attachment

## 1.1.3

### Patch Changes

- [`ce47264`](https://github.com/vnphanquang/svelte-put/commit/ce4726424a19767aa307162b942902d0318b6451) Thanks [@vnphanquang](https://github.com/vnphanquang)! - fix issue when using `enhanceDialog` and calling `item.resolve` does not close the dialog

## 1.1.2

### Patch Changes

- [`876690f`](https://github.com/vnphanquang/svelte-put/commit/876690f061f42bbd841113b1777315c297096160) Thanks [@vnphanquang](https://github.com/vnphanquang)! - setting up all event listener within attachment (avoid overriden by user)

## 1.1.1

### Patch Changes

- [`7958699`](https://github.com/vnphanquang/svelte-put/commit/7958699bc3b95cd7fdc104968cbe563ced49f334) Thanks [@vnphanquang](https://github.com/vnphanquang)! - mark `enhanceDialog` as experimental

- [`e28cac7`](https://github.com/vnphanquang/svelte-put/commit/e28cac7dcfc95c1837673f2ee56dd64ca350115a) Thanks [@vnphanquang](https://github.com/vnphanquang)! - perform `delayResolution` setup within attachment for better lifecycle management

- [`d5868dc`](https://github.com/vnphanquang/svelte-put/commit/d5868dcef5934247e0acf3e14affcbc96506f341) Thanks [@vnphanquang](https://github.com/vnphanquang)! - make sure resolution is consistent on timeout

- [`0665b59`](https://github.com/vnphanquang/svelte-put/commit/0665b59f4d591a293d3036ce551471a4cc3fa472) Thanks [@vnphanquang](https://github.com/vnphanquang)! - make sure `unmount` is call for component lifecycle to end gracefully

## 1.1.0

### Minor Changes

- [`165aeea`](https://github.com/vnphanquang/svelte-put/commit/165aeea7b8e890ac1b8ee638f7f5b53c21fcc1a3) Thanks [@vnphanquang](https://github.com/vnphanquang)! - export an `enhanceDialog` helper for convenient usage with `HTMLDialogElement`

- [`951499f`](https://github.com/vnphanquang/svelte-put/commit/951499f8caf3b8101849459c96ed4186177a13d4) Thanks [@vnphanquang](https://github.com/vnphanquang)! - add `onResolve` to listen to (or perform pre steps to) item resolve

### Patch Changes

- [`4d0fa85`](https://github.com/vnphanquang/svelte-put/commit/4d0fa8592903d0a4648393762cf7dfb20f73cd40) Thanks [@vnphanquang](https://github.com/vnphanquang)! - should skip resolution if has already timeouted

## 1.0.3

### Patch Changes

- [`0d1161b`](https://github.com/vnphanquang/svelte-put/commit/0d1161b83e15171f1c1cdf4dd982aa3bc7be4319) Thanks [@vnphanquang](https://github.com/vnphanquang)! - provide explicit d.ts for `StackItem` for greater control

## 1.0.2

### Patch Changes

- [`a9c9fc5`](https://github.com/vnphanquang/svelte-put/commit/a9c9fc5ec05c644360c5e094f1b4e00f2e1151c8) Thanks [@vnphanquang](https://github.com/vnphanquang)! - add JSDocs for `StackItemState`

## 1.0.1

### Patch Changes

- [#355](https://github.com/vnphanquang/svelte-put/pull/355) [`2e1d1cb`](https://github.com/vnphanquang/svelte-put/commit/2e1d1cb8259b96d96e397e8ec0204c3424ac6aef) Thanks [@vnphanquang](https://github.com/vnphanquang)! - define `Stack` interface explicitly for better type inference in overloaded `push` method

## 1.0.0

### Major Changes

- [#327](https://github.com/vnphanquang/svelte-put/pull/327) [`a785b96`](https://github.com/vnphanquang/svelte-put/commit/a785b964407bf3b778de439c66b121e786bb58d4) Thanks [@github-actions](https://github.com/apps/github-actions)! - Extracted from core logic of `@svelte-put/noti` and `@svelte-put/modal`

### Minor Changes

- [`a1588b8`](https://github.com/vnphanquang/svelte-put/commit/a1588b8cb3a3c7642d336555a82d78b6d815a0f5) Thanks [@vnphanquang](https://github.com/vnphanquang)! - add `stackitemunmount` and `stackitemunmount` events on nodes that used `stack.actions.render`

- [#327](https://github.com/vnphanquang/svelte-put/pull/327) [`1526ce0`](https://github.com/vnphanquang/svelte-put/commit/1526ce0ca77efbc069ad7453e832354fd0e189fb) Thanks [@github-actions](https://github.com/apps/github-actions)! - add dedicated docs page

- [#327](https://github.com/vnphanquang/svelte-put/pull/327) [`04131d3`](https://github.com/vnphanquang/svelte-put/commit/04131d3ced6e1e22e0c2f1855a4cad530da25831) Thanks [@github-actions](https://github.com/apps/github-actions)! - simplify generics, `Stack.pop` now returns `StackItem | null`

- [#327](https://github.com/vnphanquang/svelte-put/pull/327) [`eb3a404`](https://github.com/vnphanquang/svelte-put/commit/eb3a404539b381e17b67b82f09822e655bd7b841) Thanks [@github-actions](https://github.com/apps/github-actions)! - allow pause/resume all items by invoking corresponding methods on `Stack`

### Patch Changes

- [#327](https://github.com/vnphanquang/svelte-put/pull/327) [`ca2a0da`](https://github.com/vnphanquang/svelte-put/commit/ca2a0dad7fcf7edd9342ba40b1a88f6c2ad4be82) Thanks [@github-actions](https://github.com/apps/github-actions)! - make Resolved generic param to StackItemProps optional

- [#327](https://github.com/vnphanquang/svelte-put/pull/327) [`5d30599`](https://github.com/vnphanquang/svelte-put/commit/5d3059929a1846fae63e8e35a1423544321f55cc) Thanks [@github-actions](https://github.com/apps/github-actions)! - set up [package provenence](https://docs.npmjs.com/generating-provenance-statements#publishing-packages-with-provenance-via-github-actions)

- [#327](https://github.com/vnphanquang/svelte-put/pull/327) [`896c0ef`](https://github.com/vnphanquang/svelte-put/commit/896c0efef855fc00e95e94db4d854d03394764c4) Thanks [@github-actions](https://github.com/apps/github-actions)! - correct typing for the `custom` variant of generic `push` function

- [#327](https://github.com/vnphanquang/svelte-put/pull/327) [`a376620`](https://github.com/vnphanquang/svelte-put/commit/a3766200e7a5bfe52d25b0f0e674442ec521631f) Thanks [@github-actions](https://github.com/apps/github-actions)! - better public exported API

## 1.0.0-next.4

### Patch Changes

- [`896c0ef`](https://github.com/vnphanquang/svelte-put/commit/896c0efef855fc00e95e94db4d854d03394764c4) Thanks [@vnphanquang](https://github.com/vnphanquang)! - correct typing for the `custom` variant of generic `push` function

## 1.0.0-next.3

### Patch Changes

- [`5d30599`](https://github.com/vnphanquang/svelte-put/commit/5d3059929a1846fae63e8e35a1423544321f55cc) Thanks [@vnphanquang](https://github.com/vnphanquang)! - set up [package provenence](https://docs.npmjs.com/generating-provenance-statements#publishing-packages-with-provenance-via-github-actions)

## 1.0.0-next.2

### Minor Changes

- [`eb3a404`](https://github.com/vnphanquang/svelte-put/commit/eb3a404539b381e17b67b82f09822e655bd7b841) Thanks [@vnphanquang](https://github.com/vnphanquang)! - allow pause/resume all items by invoking corresponding methods on `Stack`

### Patch Changes

- [`ca2a0da`](https://github.com/vnphanquang/svelte-put/commit/ca2a0dad7fcf7edd9342ba40b1a88f6c2ad4be82) Thanks [@vnphanquang](https://github.com/vnphanquang)! - make Resolved generic param to StackItemProps optional

## 1.0.0-next.1

### Minor Changes

- [`1fda791`](https://github.com/vnphanquang/svelte-put/commit/1fda791cc20791b3b654ba7f88a1f8a2b7f4f7bb) Thanks [@vnphanquang](https://github.com/vnphanquang)! - simplify generics, `Stack.pop` now returns `StackItem | null`

### Patch Changes

- [`65b3d02`](https://github.com/vnphanquang/svelte-put/commit/65b3d026d3b26a2fc44ab6debfa142032b275ac5) Thanks [@vnphanquang](https://github.com/vnphanquang)! - better public exported API

## 0.0.0-next.1

### Major Changes

- [`cc74e53`](https://github.com/vnphanquang/svelte-put/commit/cc74e53631ef1eb9968dbe837879552582b6eb01) Thanks [@vnphanquang](https://github.com/vnphanquang)! - Extracted from core logic of `@svelte-put/noti` and `@svelte-put/modal`

### Minor Changes

- [`9d735e0`](https://github.com/vnphanquang/svelte-put/commit/9d735e011ac2735af913b999a1e1b7620dbae65d) Thanks [@vnphanquang](https://github.com/vnphanquang)! - add dedicated docs page
