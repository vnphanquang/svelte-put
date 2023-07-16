# Changelog

## 2.1.3

### Patch Changes

- [#204](https://github.com/vnphanquang/svelte-put/pull/204) [`30d3c21`](https://github.com/vnphanquang/svelte-put/commit/30d3c2165afb7aae582a6d30396344dae19063bf) Thanks [@vnphanquang](https://github.com/vnphanquang)! - bump dependencies

## 2.1.2

### Patch Changes

- [#197](https://github.com/vnphanquang/svelte-put/pull/197) [`4b1fe72`](https://github.com/vnphanquang/svelte-put/commit/4b1fe7223895ce3022b58ef711487af60ba76a76) Thanks [@saadeghi](https://github.com/saadeghi)! - update peerDependencies to support svelte 4

## 2.1.1

### Patch Changes

- [`1bd7028`](https://github.com/vnphanquang/svelte-put/commit/1bd70281741ad393c3e8b99517e23b88ed4f76cf) Thanks [@vnphanquang](https://github.com/vnphanquang)! - default config argument to empty object (resolves #191)

## 2.1.0

### Minor Changes

- [`60e54fa`](https://github.com/vnphanquang/svelte-put/commit/60e54fafdc0e1e216e3934eeffb83b9dfdc1013b) Thanks [@vnphanquang](https://github.com/vnphanquang)! - introduce vite plugin with same functionality

### Patch Changes

- [`592bc62`](https://github.com/vnphanquang/svelte-put/commit/592bc62dc64a024d0c274c5616ee3222a47f2a05) Thanks [@vnphanquang](https://github.com/vnphanquang)! - add relative path to `Source` union type (possible `../` & `./`)

- [`fa9cba7`](https://github.com/vnphanquang/svelte-put/commit/fa9cba7d9b4923a356d9b1e4b593960a426be398) Thanks [@vnphanquang](https://github.com/vnphanquang)! - append attributes instead of updating opening tag (fixing attribute disappearance)

- [`89e9bc1`](https://github.com/vnphanquang/svelte-put/commit/89e9bc1091329b9d392e95a84263c253b85ab7df) Thanks [@vnphanquang](https://github.com/vnphanquang)! - add escape hatch for source typing generation through `config.sourceTypingGeneration` (`boolean`)

- [`d2ec509`](https://github.com/vnphanquang/svelte-put/commit/d2ec50934a5eb796599468a9bf686ed019c54e3a) Thanks [@vnphanquang](https://github.com/vnphanquang)! - directly manipulate source with `magic-string` instead of replacing with parsed svg, to avoid stripping svelte-specific attributes & syntax. Resolves #186

- [`733b41c`](https://github.com/vnphanquang/svelte-put/commit/733b41c2f3a66f409340621debf70582c399ccf5) Thanks [@vnphanquang](https://github.com/vnphanquang)! - provide docs & instructions for setting up typing generation

- [`3f8ebcf`](https://github.com/vnphanquang/svelte-put/commit/3f8ebcfb41d6a6c0d70303ccf6ce5db9d5110fc0) Thanks [@vnphanquang](https://github.com/vnphanquang)! - introduce source typing generation through `import('@svelte-put/preprocess-inline-svg').Source` (rethinking #184)

## 2.0.0

### Major Changes

- [`06c3733`](https://github.com/vnphanquang/svelte-put/commit/06c3733200c407b740d4d98212da1e7b95bc9120) Thanks [@vnphanquang](https://github.com/vnphanquang)! - [BREAKING] deprecate `inlineSrcAttributeName` & `keepInlineSrcAttribute` options for individual source config, use the global `PreprocessConfig` (second arg to preprocess) instead

### Patch Changes

- [`06c3733`](https://github.com/vnphanquang/svelte-put/commit/06c3733200c407b740d4d98212da1e7b95bc9120) Thanks [@vnphanquang](https://github.com/vnphanquang)! - remove experimental source typing: DX is not acceptable. Maybe we can try doing this in a vite plugin instead

## 1.2.1

### Patch Changes

- [`0166fa5`](https://github.com/vnphanquang/svelte-put/commit/0166fa5521c5c99054aa0415977892be6c16d9d3) Thanks [@vnphanquang](https://github.com/vnphanquang)! - remove runtime console.log

## 1.2.0

### Minor Changes

- [`33c9472`](https://github.com/vnphanquang/svelte-put/commit/33c94721534663754cf891aebf3c38c5bc539124) Thanks [@vnphanquang](https://github.com/vnphanquang)! - Export experimental typing generation for `Source` (type inference for the data-inline-src attribute)

## 1.1.1

### Patch Changes

- [`5652c7e`](https://github.com/vnphanquang/svelte-put/commit/5652c7e0c229639c5670db185ad11fb3ad2b8bf4) Thanks [@vnphanquang](https://github.com/vnphanquang)! - rename `InlineSvgOptions` to `InlineSvgPreprocessConfig` (better name, separation from the runtime action package)

## 1.1.0

### Minor Changes

- [`d9a5fe2`](https://github.com/vnphanquang/svelte-put/commit/d9a5fe2d78054fd60a711a489b4ad85461bdcc89) Thanks [@vnphanquang](https://github.com/vnphanquang)! - deprecate `tagName` (no reason to support this); better options vs input naming; more reasonable input resolution and support only one default config

### Patch Changes

- [`80863bd`](https://github.com/vnphanquang/svelte-put/commit/80863bd7a5f396162241bc442cf1cbadc4d7428e) Thanks [@vnphanquang](https://github.com/vnphanquang)! - add option to keep data-inline-src after build (default to `false`)

- [`b8aab08`](https://github.com/vnphanquang/svelte-put/commit/b8aab089301a7ff48d281b596334c46246cbfed4) Thanks [@vnphanquang](https://github.com/vnphanquang)! - complete docs site

- [`54be131`](https://github.com/vnphanquang/svelte-put/commit/54be131c9b2bd7adf3d207e0cb6152abf120d25e) Thanks [@vnphanquang](https://github.com/vnphanquang)! - case input is provide as a single object, search for both local and in `directories` (if provided)

## 1.0.1

### Patch Changes

- [#149](https://github.com/vnphanquang/svelte-put/pull/149) [`e877d88`](https://github.com/vnphanquang/svelte-put/commit/e877d8899f1bb0dc2ca309021610ddb23a73c1e0) Thanks [@vnphanquang](https://github.com/vnphanquang)! - turn on `allowDangerousCharacters` for `hast-util-to-html` to enable parsing quotes

## 1.0.0

### Major Changes

- [`38d7355`](https://github.com/vnphanquang/svelte-put/commit/38d73552a091f7161bcbfc820cb9050f770c7a05) Thanks [@vnphanquang](https://github.com/vnphanquang)! - minimal implementation with optional configuration
