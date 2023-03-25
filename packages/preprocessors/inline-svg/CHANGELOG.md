# Changelog

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
