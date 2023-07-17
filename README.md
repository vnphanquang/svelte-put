<div align="center">

# [@svelte-put][docs]

[![MIT][license.badge]][license] [![MadeWithSvelte.com][madewithsvelte.badge]][madewithsvelte]

Useful svelte stuff to put in your projects

![svelte-put](https://github.com/vnphanquang/svelte-put/blob/main/sites/docs/static/images/og/svelte-put.jpg)

</div>

## Table of Contents

<details open>
  <summary>Show / hide</summary>

- [@svelte-put](#svelte-put)
  - [Table of Contents](#table-of-contents)
  - [Documentation](#documentation)
  - [Packages](#packages)
    - [Svelte Actions](#svelte-actions)
    - [Miscellaneous](#miscellaneous)
    - [Preprocessors](#preprocessors)
    - [In the Pipeline](#in-the-pipeline)
  - [Contributing](#contributing)

</details>

## Documentation

[See the dedicated documentation page here][docs].

## Packages

`@svelte-put` includes several packages that have self-managed release cycles, listed below. Check out their corresponding README for more details.

### Svelte Actions

| Package                                         | Short Description                                 | Version                                       | Changelog                                  | Docs                               |
| ----------------------------------------------- | ------------------------------------------------- | --------------------------------------------- | ------------------------------------------ | ---------------------------------- |
| [@svelte-put/clickoutside][github.clickoutside] | event for clicking outside node                   | [![npm.clickoutside.badge]][npm.clickoutside] | [Changelog][github.clickoutside.changelog] | [![docs.badge]][docs.clickoutside] |
| [@svelte-put/copy][github.copy]                 | copy text to clipboard                            | [![npm.copy.badge]][npm.copy]                 | [Changelog][github.copy.changelog]         | [![docs.badge]][docs.copy]         |
| [@svelte-put/dragscroll][github.dragscroll]     | add drag-to-scroll behavior                       | [![npm.dragscroll.badge]][npm.dragscroll]     | [Changelog][github.dragscroll.changelog]   | [![docs.badge]][docs.dragscroll]   |
| [@svelte-put/intersect][github.intersect]       | wrapper for IntersectionObserver                  | [![npm.intersect.badge]][npm.intersect]       | [Changelog][github.intersect.changelog]    | [![docs.badge]][docs.intersect]    |
| [@svelte-put/inline-svg][github.inline-svg]     | dynamically inline SVGs                           | [![npm.inline-svg.badge]][npm.inline-svg]     | [Changelog][github.inline-svg.changelog]   | [![docs.badge]][docs.inline-svg]   |
| [@svelte-put/movable][github.movable]           | move node on mousedown                            | [![npm.movable.badge]][npm.movable]           | [Changelog][github.movable.changelog]      | [![docs.badge]][docs.movable]      |
| [@svelte-put/resize][github.resize]             | wrapper for ResizeObserver                        | [![npm.resize.badge]][npm.resize]             | [Changelog][github.resize.changelog]       | [![docs.badge]][docs.resize]       |
| [@svelte-put/shortcut][github.shortcut]         | add keyboard shortcuts to node                    | [![npm.shortcut.badge]][npm.shortcut]         | [Changelog][github.shortcut.changelog]     | [![docs.badge]][docs.shortcut]     |
| [@svelte-put/toc][github.toc]                   | action & utilities for building table of contents | [![npm.toc.badge]][npm.toc]                   | [Changelog][github.toc.changelog]          | [![docs.badge]][docs.toc]          |

### Miscellaneous

| Package                             | Short Description                | Version                           | Changelog                            | Docs                         |
| ----------------------------------- | -------------------------------- | --------------------------------- | ------------------------------------ | ---------------------------- |
| [@svelte-put/avatar][github.avatar] | component & utilities for avatar | [![npm.avatar.badge]][npm.avatar] | [Changelog][github.avatar.changelog] | [![docs.badge]][docs.avatar] |
| [@svelte-put/modal][github.modal]   | type-safe async modal builder    | [![npm.modal.badge]][npm.modal]   | [Changelog][github.modal.changelog]  | [![docs.badge]][docs.modal]  |

### Preprocessors

| Package                                                           | Short Description                          | Version                                                         | Changelog                                           | Docs                                        |
| ----------------------------------------------------------------- | ------------------------------------------ | --------------------------------------------------------------- | --------------------------------------------------- | ------------------------------------------- |
| [@svelte-put/preprocess-auto-slug][github.preprocess-auto-slug]   | auto add `id` and anchor to selected nodes | [![npm.preprocess-auto-slug.badge]][npm.preprocess-auto-slug]   | [Changelog][github.preprocess-auto-slug.changelog]  | [![docs.badge]][docs.preprocess-auto-slug]  |
| [@svelte-put/preprocess-inline-svg][github.preprocess-inline-svg] | inline static SVGs at build time           | [![npm.preprocess-inline-svg.badge]][npm.preprocess-inline-svg] | [Changelog][github.preprocess-inline-svg.changelog] | [![docs.badge]][docs.preprocess-inline-svg] |

### In the Pipeline

These are some packages that will be added in the future (as soon as I find time, and the implementation has matured & become generic enough).

| Package                             | Category  | Short Description                                                            | Status             | Docs        |
| ----------------------------------- | --------- | ---------------------------------------------------------------------------- | ------------------ | ----------- |
| [@svelte-put/select][github.select] | component | minimal & extensible `select`                                                | active development | coming soon |
| @svelte-put/popover                 | action    | trigger tooltip & detailed popover, using [popperjs](https://popper.js.org/) | prototype          |
| @svelte-put/noti                    | utility   | fire async toast-like notification                                           | prototype          |
| @svelte-put/inputcache              | action    | cache & restore value of input into/from local/session storage               | prototype          |
| @svelte-put/form                    | action    | auto collect type-safe input value from form (???)                           | inception          |

Names for those packages may change.

## Contributing

[Read Contribution Guide][github.contributing]

This project is a monorepo using [turborepo] under the hood. Familiarity with [turborepo] is not required but encouraged.

For a quick start, run the script below at project root to see what commands are available.

```bash
pnpm turbo
```

<br />

<p align="center">
  <a href="https://www.buymeacoffee.com/vnphanquang" target="_blank">
    <img
      src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png"
      height="60"
      width="217"
      alt="buy vnphanquang a banh mi"
    />
  </a>
</p>

<!-- github specifics -->

[github.contributing]: ./CONTRIBUTING.md
[github.issues]: https://github.com/vnphanquang/svelte-put/issues?q=
[github.avatar]: https://github.com/vnphanquang/svelte-put/tree/main/packages/misc/avatar
[github.avatar.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/misc/avatar/CHANGELOG.md
[github.clickoutside]: https://github.com/vnphanquang/svelte-put/tree/main/packages/actions/clickoutside
[github.clickoutside.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/clickoutside/CHANGELOG.md
[github.copy]: https://github.com/vnphanquang/svelte-put/tree/main/packages/actions/copy
[github.copy.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/copy/CHANGELOG.md
[github.dragscroll]: https://github.com/vnphanquang/svelte-put/tree/main/packages/actions/dragscroll
[github.dragscroll.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/dragscroll/CHANGELOG.md
[github.intersect]: https://github.com/vnphanquang/svelte-put/tree/main/packages/actions/intersect
[github.intersect.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/intersect/CHANGELOG.md
[github.inline-svg]: https://github.com/vnphanquang/svelte-put/tree/main/packages/actions/inline-svg
[github.inline-svg.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/inline-svg/CHANGELOG.md
[github.modal]: https://github.com/vnphanquang/svelte-put/tree/main/packages/misc/modal
[github.modal.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/misc/modal/CHANGELOG.md
[github.movable]: https://github.com/vnphanquang/svelte-put/tree/main/packages/actions/movable
[github.movable.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/movable/CHANGELOG.md
[github.preprocess-auto-slug]: https://github.com/vnphanquang/svelte-put/tree/main/packages/preprocessors/auto-slug
[github.preprocess-auto-slug.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/preprocessors/auto-slug/CHANGELOG.md
[github.preprocess-inline-svg]: https://github.com/vnphanquang/svelte-put/tree/main/packages/preprocessors/inline-svg
[github.preprocess-inline-svg.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/preprocessors/inline-svg/CHANGELOG.md
[github.resize]: https://github.com/vnphanquang/svelte-put/tree/main/packages/actions/resize
[github.resize.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/resize/CHANGELOG.md
[github.select]: https://github.com/vnphanquang/svelte-put/tree/main/packages/components/select
[github.select.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/components/select/CHANGELOG.md
[github.shortcut]: https://github.com/vnphanquang/svelte-put/tree/main/packages/actions/shortcut
[github.shortcut.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/shortcut/CHANGELOG.md
[github.toc]: https://github.com/vnphanquang/svelte-put/tree/main/packages/actions/toc
[github.toc.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/toc/CHANGELOG.md

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
[npm.copy.badge]: https://img.shields.io/npm/v/@svelte-put/copy
[npm.copy]: https://www.npmjs.com/package/@svelte-put/copy
[npm.dragscroll.badge]: https://img.shields.io/npm/v/@svelte-put/dragscroll
[npm.dragscroll]: https://www.npmjs.com/package/@svelte-put/dragscroll
[npm.intersect.badge]: https://img.shields.io/npm/v/@svelte-put/intersect
[npm.intersect]: https://www.npmjs.com/package/@svelte-put/intersect
[npm.inline-svg.badge]: https://img.shields.io/npm/v/@svelte-put/inline-svg
[npm.inline-svg]: https://www.npmjs.com/package/@svelte-put/inline-svg
[npm.modal.badge]: https://img.shields.io/npm/v/@svelte-put/modal
[npm.modal]: https://www.npmjs.com/package/@svelte-put/modal
[npm.movable.badge]: https://img.shields.io/npm/v/@svelte-put/movable
[npm.movable]: https://www.npmjs.com/package/@svelte-put/movable
[npm.preprocess-auto-slug.badge]: https://img.shields.io/npm/v/@svelte-put/preprocess-auto-slug
[npm.preprocess-auto-slug]: https://www.npmjs.com/package/@svelte-put/preprocess-auto-slug
[npm.preprocess-inline-svg.badge]: https://img.shields.io/npm/v/@svelte-put/preprocess-inline-svg
[npm.preprocess-inline-svg]: https://www.npmjs.com/package/@svelte-put/preprocess-inline-svg
[npm.resize.badge]: https://img.shields.io/npm/v/@svelte-put/resize
[npm.resize]: https://www.npmjs.com/package/@svelte-put/resize
[npm.shortcut.badge]: https://img.shields.io/npm/v/@svelte-put/shortcut
[npm.shortcut]: https://www.npmjs.com/package/@svelte-put/shortcut
[npm.toc.badge]: https://img.shields.io/npm/v/@svelte-put/toc
[npm.toc]: https://www.npmjs.com/package/@svelte-put/toc

<!-- svelte REPL -->

[turborepo]: https://turborepo.org/

<!-- docs linking -->

[docs]: https://svelte-put.vnphanquang.com
[docs.avatar]: https://svelte-put.vnphanquang.com/docs/avatar
[docs.clickoutside]: https://svelte-put.vnphanquang.com/docs/clickoutside
[docs.copy]: https://svelte-put.vnphanquang.com/docs/copy
[docs.dragscroll]: https://svelte-put.vnphanquang.com/docs/dragscroll
[docs.intersect]: https://svelte-put.vnphanquang.com/docs/intersect
[docs.inline-svg]: https://svelte-put.vnphanquang.com/docs/inline-svg
[docs.modal]: https://svelte-put.vnphanquang.com/docs/modal
[docs.movable]: https://svelte-put.vnphanquang.com/docs/movable
[docs.preprocess-auto-slug]: https://svelte-put.vnphanquang.com/docs/preprocess-auto-slug
[docs.preprocess-inline-svg]: https://svelte-put.vnphanquang.com/docs/preprocess-inline-svg
[docs.select]: https://svelte-put.vnphanquang.com/docs/select
[docs.resize]: https://svelte-put.vnphanquang.com/docs/resize
[docs.shortcut]: https://svelte-put.vnphanquang.com/docs/shortcut
[docs.toc]: https://svelte-put.vnphanquang.com/docs/toc
[docs.badge]: https://img.shields.io/badge/-Docs%20Site-blue
