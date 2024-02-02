<div align="center">

# [@svelte-put][docs]

[![MIT][license.badge]][license] [![MadeWithSvelte.com][madewithsvelte.badge]][madewithsvelte]

Useful svelte stuff to put in your projects

![svelte-put](https://github.com/vnphanquang/svelte-put/blob/main/sites/docs/static/images/og/svelte-put.jpg)

</div>

## Documentation

[See the dedicated documentation page here][docs].

## Packages

`@svelte-put` includes several packages that have self-managed release cycles, listed below. Check out their corresponding README for more details.

| Package                                                           | Short Description                                 | Version                                                         | Changelog                                           | Docs                                        |
| ----------------------------------------------------------------- | ------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------- | ------------------------------------------- |
| [@svelte-put/avatar][github.avatar]                               | component & utilities for avatar                  | [![npm.avatar.badge]][npm.avatar]                               | [Changelog][github.avatar.changelog]                | [![docs.badge]][docs.avatar]                |
| [@svelte-put/clickoutside][github.clickoutside]                   | event for clicking outside node                   | [![npm.clickoutside.badge]][npm.clickoutside]                   | [Changelog][github.clickoutside.changelog]          | [![docs.badge]][docs.clickoutside]          |
| [@svelte-put/cloudflare-turnstile][github.cloudflare-turnstile]   | event for clicking outside node                   | [![npm.cloudflare-turnstile.badge]][npm.cloudflare-turnstile]   | [Changelog][github.cloudflare-turnstile.changelog]  | [![docs.badge]][docs.cloudflare-turnstile]  |
| [@svelte-put/copy][github.copy]                                   | copy text to clipboard                            | [![npm.copy.badge]][npm.copy]                                   | [Changelog][github.copy.changelog]                  | [![docs.badge]][docs.copy]                  |
| [@svelte-put/dragscroll][github.dragscroll]                       | add drag-to-scroll behavior                       | [![npm.dragscroll.badge]][npm.dragscroll]                       | [Changelog][github.dragscroll.changelog]            | [![docs.badge]][docs.dragscroll]            |
| [@svelte-put/intersect][github.intersect]                         | wrapper for IntersectionObserver                  | [![npm.intersect.badge]][npm.intersect]                         | [Changelog][github.intersect.changelog]             | [![docs.badge]][docs.intersect]             |
| [@svelte-put/inline-svg][github.inline-svg]                       | dynamically inline SVGs                           | [![npm.inline-svg.badge]][npm.inline-svg]                       | [Changelog][github.inline-svg.changelog]            | [![docs.badge]][docs.inline-svg]            |
| [@svelte-put/lockscroll][github.lockscroll]                       | lock scroll, hide scrollbar                       | [![npm.lockscroll.badge]][npm.lockscroll]                       | [Changelog][github.lockscroll.changelog]            | [![docs.badge]][docs.lockscroll]            |
| [@svelte-put/modal][github.modal]                                 | type-safe async modal builder                     | [![npm.modal.badge]][npm.modal]                                 | [Changelog][github.modal.changelog]                 | [![docs.badge]][docs.modal]                 |
| [@svelte-put/movable][github.movable]                             | move node on mousedown                            | [![npm.movable.badge]][npm.movable]                             | [Changelog][github.movable.changelog]               | [![docs.badge]][docs.movable]               |
| [@svelte-put/noti][github.noti]                                   | type-safe & headless async notification builder   | [![npm.noti.badge]][npm.noti]                                   | [Changelog][github.noti.changelog]                  | [![docs.badge]][docs.noti]                  |
| [@svelte-put/preprocess-auto-slug][github.preprocess-auto-slug]   | auto add `id` and anchor to selected nodes        | [![npm.preprocess-auto-slug.badge]][npm.preprocess-auto-slug]   | [Changelog][github.preprocess-auto-slug.changelog]  | [![docs.badge]][docs.preprocess-auto-slug]  |
| [@svelte-put/preprocess-inline-svg][github.preprocess-inline-svg] | inline static SVGs at build time                  | [![npm.preprocess-inline-svg.badge]][npm.preprocess-inline-svg] | [Changelog][github.preprocess-inline-svg.changelog] | [![docs.badge]][docs.preprocess-inline-svg] |
| [@svelte-put/qr][github.qr]                                       | render QR as `img` or `svg`                       | [![npm.qr.badge]][npm.qr]                                       | [Changelog][github.qr.changelog]                    | [![docs.badge]][docs.qr]                    |
| [@svelte-put/resize][github.resize]                               | wrapper for ResizeObserver                        | [![npm.resize.badge]][npm.resize]                               | [Changelog][github.resize.changelog]                | [![docs.badge]][docs.resize]                |
| [@svelte-put/shortcut][github.shortcut]                           | add keyboard shortcuts to node                    | [![npm.shortcut.badge]][npm.shortcut]                           | [Changelog][github.shortcut.changelog]              | [![docs.badge]][docs.shortcut]              |
| [@svelte-put/toc][github.toc]                                     | action & utilities for building table of contents | [![npm.toc.badge]][npm.toc]                                     | [Changelog][github.toc.changelog]                   | [![docs.badge]][docs.toc]                   |
| [@svelte-put/tooltip][github.tooltip]                             | type-safe headless tooltip builder                | [![npm.tooltip.badge]][npm.tooltip]                             | [Changelog][github.tooltip.changelog]               | [![docs.badge]][docs.tooltip]               |

### In the Pipeline

These are some packages that will be added in the future (as soon as I find time, and the implementation has matured & become generic enough).

| Package                             | Category  | Short Description             | Status      | Docs        |
| ----------------------------------- | --------- | ----------------------------- | ----------- | ----------- |
| [@svelte-put/select][github.select] | component | minimal & extensible `select` | prototyping | coming soon |

Names for those packages may change.

## Contributing

[Read Contribution Guide][github.contributing]

This project is a monorepo using [turborepo] under the hood. Familiarity with [turborepo] is not required but encouraged.

For a quick start, run the script below at project root to see what commands are available.

```bash
pnpm turbo
```

<!-- github specifics -->

[github.contributing]: ./CONTRIBUTING.md
[github.issues]: https://github.com/vnphanquang/svelte-put/issues?q=
[github.avatar]: https://github.com/vnphanquang/svelte-put/tree/main/packages/misc/avatar
[github.avatar.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/misc/avatar/CHANGELOG.md
[github.clickoutside]: https://github.com/vnphanquang/svelte-put/tree/main/packages/actions/clickoutside
[github.clickoutside.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/clickoutside/CHANGELOG.md
[github.cloudflare-turnstile]: https://github.com/vnphanquang/svelte-put/tree/main/packages/actions/cloudflare-turnstile
[github.cloudflare-turnstile.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/cloudflare-turnstile/CHANGELOG.md
[github.copy]: https://github.com/vnphanquang/svelte-put/tree/main/packages/actions/copy
[github.copy.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/copy/CHANGELOG.md
[github.dragscroll]: https://github.com/vnphanquang/svelte-put/tree/main/packages/actions/dragscroll
[github.dragscroll.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/dragscroll/CHANGELOG.md
[github.intersect]: https://github.com/vnphanquang/svelte-put/tree/main/packages/actions/intersect
[github.intersect.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/intersect/CHANGELOG.md
[github.inline-svg]: https://github.com/vnphanquang/svelte-put/tree/main/packages/actions/inline-svg
[github.inline-svg.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/inline-svg/CHANGELOG.md
[github.lockscroll]: https://github.com/vnphanquang/svelte-put/tree/main/packages/actions/lockscroll
[github.lockscroll.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/lockscroll/CHANGELOG.md
[github.modal]: https://github.com/vnphanquang/svelte-put/tree/main/packages/misc/modal
[github.modal.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/misc/modal/CHANGELOG.md
[github.movable]: https://github.com/vnphanquang/svelte-put/tree/main/packages/actions/movable
[github.movable.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/movable/CHANGELOG.md
[github.noti]: https://github.com/vnphanquang/svelte-put/tree/main/packages/actions/noti
[github.noti.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/noti/CHANGELOG.md
[github.preprocess-auto-slug]: https://github.com/vnphanquang/svelte-put/tree/main/packages/preprocessors/auto-slug
[github.preprocess-auto-slug.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/preprocessors/auto-slug/CHANGELOG.md
[github.preprocess-inline-svg]: https://github.com/vnphanquang/svelte-put/tree/main/packages/preprocessors/inline-svg
[github.preprocess-inline-svg.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/preprocessors/inline-svg/CHANGELOG.md
[github.qr]: https://github.com/vnphanquang/svelte-put/tree/main/packages/misc/qr
[github.qr.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/misc/qr/CHANGELOG.md
[github.resize]: https://github.com/vnphanquang/svelte-put/tree/main/packages/actions/resize
[github.resize.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/resize/CHANGELOG.md
[github.select]: https://github.com/vnphanquang/svelte-put/tree/main/packages/components/select
[github.select.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/components/select/CHANGELOG.md
[github.shortcut]: https://github.com/vnphanquang/svelte-put/tree/main/packages/actions/shortcut
[github.shortcut.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/shortcut/CHANGELOG.md
[github.toc]: https://github.com/vnphanquang/svelte-put/tree/main/packages/actions/toc
[github.toc.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/toc/CHANGELOG.md
[github.tooltip]: https://github.com/vnphanquang/svelte-put/tree/main/packages/actions/tooltip
[github.tooltip.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/tooltip/CHANGELOG.md

<!-- heading badge -->

[license.badge]: https://img.shields.io/badge/license-MIT-blue.svg
[license]: ./LICENSE
[madewithsvelte.badge]: https://madewithsvelte.com/storage/repo-shields/4070-shield.svg
[madewithsvelte]: https://madewithsvelte.com/p/svelte-put/shield-link

<!-- npm -->

[npm.avatar.badge]: https://img.shields.io/npm/v/@svelte-put/avatar
[npm.avatar]: https://www.npmjs.com/package/@svelte-put/avatar
[npm.clickoutside.badge]: https://img.shields.io/npm/v/@svelte-put/clickoutside
[npm.clickoutside]: https://www.npmjs.com/package/@svelte-put/clickoutside
[npm.cloudflare-turnstile.badge]: https://img.shields.io/npm/v/@svelte-put/cloudflare-turnstile
[npm.cloudflare-turnstile]: https://www.npmjs.com/package/@svelte-put/cloudflare-turnstile
[npm.copy.badge]: https://img.shields.io/npm/v/@svelte-put/copy
[npm.copy]: https://www.npmjs.com/package/@svelte-put/copy
[npm.dragscroll.badge]: https://img.shields.io/npm/v/@svelte-put/dragscroll
[npm.dragscroll]: https://www.npmjs.com/package/@svelte-put/dragscroll
[npm.intersect.badge]: https://img.shields.io/npm/v/@svelte-put/intersect
[npm.intersect]: https://www.npmjs.com/package/@svelte-put/intersect
[npm.inline-svg.badge]: https://img.shields.io/npm/v/@svelte-put/inline-svg
[npm.inline-svg]: https://www.npmjs.com/package/@svelte-put/inline-svg
[npm.lockscroll.badge]: https://img.shields.io/npm/v/@svelte-put/lockscroll
[npm.lockscroll]: https://www.npmjs.com/package/@svelte-put/lockscroll
[npm.modal.badge]: https://img.shields.io/npm/v/@svelte-put/modal
[npm.modal]: https://www.npmjs.com/package/@svelte-put/modal
[npm.movable.badge]: https://img.shields.io/npm/v/@svelte-put/movable
[npm.movable]: https://www.npmjs.com/package/@svelte-put/movable
[npm.noti.badge]: https://img.shields.io/npm/v/@svelte-put/noti
[npm.noti]: https://www.npmjs.com/package/@svelte-put/noti
[npm.preprocess-auto-slug.badge]: https://img.shields.io/npm/v/@svelte-put/preprocess-auto-slug
[npm.preprocess-auto-slug]: https://www.npmjs.com/package/@svelte-put/preprocess-auto-slug
[npm.preprocess-inline-svg.badge]: https://img.shields.io/npm/v/@svelte-put/preprocess-inline-svg
[npm.preprocess-inline-svg]: https://www.npmjs.com/package/@svelte-put/preprocess-inline-svg
[npm.qr.badge]: https://img.shields.io/npm/v/@svelte-put/qr
[npm.qr]: https://www.npmjs.com/package/@svelte-put/qr
[npm.resize.badge]: https://img.shields.io/npm/v/@svelte-put/resize
[npm.resize]: https://www.npmjs.com/package/@svelte-put/resize
[npm.shortcut.badge]: https://img.shields.io/npm/v/@svelte-put/shortcut
[npm.shortcut]: https://www.npmjs.com/package/@svelte-put/shortcut
[npm.toc.badge]: https://img.shields.io/npm/v/@svelte-put/toc
[npm.toc]: https://www.npmjs.com/package/@svelte-put/toc
[npm.tooltip.badge]: https://img.shields.io/npm/v/@svelte-put/tooltip
[npm.tooltip]: https://www.npmjs.com/package/@svelte-put/tooltip

<!-- svelte REPL -->

[turborepo]: https://turborepo.org/

<!-- docs linking -->

[docs]: https://svelte-put.vnphanquang.com
[docs.avatar]: https://svelte-put.vnphanquang.com/docs/avatar
[docs.clickoutside]: https://svelte-put.vnphanquang.com/docs/clickoutside
[docs.cloudflare-turnstile]: https://svelte-put.vnphanquang.com/docs/cloudflare-turnstile
[docs.copy]: https://svelte-put.vnphanquang.com/docs/copy
[docs.dragscroll]: https://svelte-put.vnphanquang.com/docs/dragscroll
[docs.intersect]: https://svelte-put.vnphanquang.com/docs/intersect
[docs.inline-svg]: https://svelte-put.vnphanquang.com/docs/inline-svg
[docs.lockscroll]: https://svelte-put.vnphanquang.com/docs/lockscroll
[docs.modal]: https://svelte-put.vnphanquang.com/docs/modal
[docs.movable]: https://svelte-put.vnphanquang.com/docs/movable
[docs.noti]: https://svelte-put.vnphanquang.com/docs/noti
[docs.preprocess-auto-slug]: https://svelte-put.vnphanquang.com/docs/preprocess-auto-slug
[docs.preprocess-inline-svg]: https://svelte-put.vnphanquang.com/docs/preprocess-inline-svg
[docs.qr]: https://svelte-put.vnphanquang.com/docs/qr
[docs.select]: https://svelte-put.vnphanquang.com/docs/select
[docs.resize]: https://svelte-put.vnphanquang.com/docs/resize
[docs.shortcut]: https://svelte-put.vnphanquang.com/docs/shortcut
[docs.toc]: https://svelte-put.vnphanquang.com/docs/toc
[docs.tooltip]: https://svelte-put.vnphanquang.com/docs/tooltip
[docs.badge]: https://img.shields.io/badge/-Docs%20Site-blue
