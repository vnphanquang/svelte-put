# Changelog

## 1.2.1

### Patch Changes

- [`46e675e`](https://github.com/vnphanquang/svelte-put/commit/46e675e05e87ca042af231cd059dc944cd6080d5) Thanks [@vnphanquang](https://github.com/vnphanquang)! - specify Svelte peer dependency to include Svelte 5

## 1.2.0

### Minor Changes

- [`0c8dc62`](https://github.com/vnphanquang/svelte-put/commit/0c8dc62afc595a9b882d43e85d38ecc6371f349d) Thanks [@vnphanquang](https://github.com/vnphanquang)! - now render `img` as base64 png (previously base64 svg)

- [`0c8dc62`](https://github.com/vnphanquang/svelte-put/commit/0c8dc62afc595a9b882d43e85d38ecc6371f349d) Thanks [@vnphanquang](https://github.com/vnphanquang)! - export top-level headless helpers `createQrSvgString` and `createQrSvgDataUrl` for svg (browser & server), and `createQrPngDataUrl` for png (browser only)

## 1.1.0

### Minor Changes

- [`6094725`](https://github.com/vnphanquang/svelte-put/commit/6094725fd4a60e9243e2f6d319dd5038f5f03b8e) Thanks [@vnphanquang](https://github.com/vnphanquang)! - allow configuring `typeNumber` and `errorCorrectionLevel` (parameters to [qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator))

## 1.0.5

### Patch Changes

- [`19e7fbf`](https://github.com/vnphanquang/svelte-put/commit/19e7fbffb291216f7a876ce083446f6534af7011) Thanks [@vnphanquang](https://github.com/vnphanquang)! - correct logo alignment, especially when margin is specified (#280)

- [`54d21ac`](https://github.com/vnphanquang/svelte-put/commit/54d21ac91c03978bee9e96ec24432bba7659fb65) Thanks [@vnphanquang](https://github.com/vnphanquang)! - QR img component - track logo change

## 1.0.4

### Patch Changes

- [`81bd6aa`](https://github.com/vnphanquang/svelte-put/commit/81bd6aa03a22c54041da72602c6046e6eb477104) Thanks [@vnphanquang](https://github.com/vnphanquang)! - remove `data-qr` attribute on rendered svg

- [`965b50b`](https://github.com/vnphanquang/svelte-put/commit/965b50be68e78c2ae18f02e7ffe01da9aa3a39f0) Thanks [@vnphanquang](https://github.com/vnphanquang)! - only pass necessary props onto element attributes (SVG & Img)

## 1.0.3

### Patch Changes

- [`0a58955`](https://github.com/vnphanquang/svelte-put/commit/0a589550a792c4489c009fc85ba79cf1714a3670) Thanks [@vnphanquang](https://github.com/vnphanquang)! - correct QRConfig `shape` type docs

## 1.0.2

### Patch Changes

- [`994133a`](https://github.com/vnphanquang/svelte-put/commit/994133a1f450271142798b2b77a689e00d220d30) Thanks [@vnphanquang](https://github.com/vnphanquang)! - Add `logo` to the `image` element

## 1.0.1

### Patch Changes

- [`530e6b2`](https://github.com/vnphanquang/svelte-put/commit/530e6b247ffb45e89414958aa7dd8d5449dab486) Thanks [@vnphanquang](https://github.com/vnphanquang)! - correctly position logo to center

- [`ef16c88`](https://github.com/vnphanquang/svelte-put/commit/ef16c88c9975a3e2a702edb6afe7260d58b24e41) Thanks [@vnphanquang](https://github.com/vnphanquang)! - correct github links in `qr` docs page

## 1.0.0

### Major Changes

- [#236](https://github.com/vnphanquang/svelte-put/pull/236) [`8871fbf`](https://github.com/vnphanquang/svelte-put/commit/8871fbf371330acc24710126525d41f0bf71600c) Thanks [@vnphanquang](https://github.com/vnphanquang)! - first release of `@svelte-put/qr`, with documentation

## 1.0.0

### Major Changes

- [#212](https://github.com/vnphanquang/svelte-put/pull/212) [`6abadbf`](https://github.com/vnphanquang/svelte-put/commit/6abadbf3d013120291f5290f60f5accef32fa6b1) Thanks [@vnphanquang](https://github.com/vnphanquang)! - first generalized api, here be dragons
