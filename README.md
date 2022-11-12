<div align="center">

# [@svelte-put][docs]

[![MIT][license.badge]][license]

Useful svelte stuff to put in your projects

</div>

## Table of Contents

<details open>
  <summary>Show / hide</summary>

- [@svelte-put](#svelte-put)
  - [Table of Contents](#table-of-contents)
  - [Packages](#packages)
    - [Svelte Actions](#svelte-actions)
    - [In the Pipeline](#in-the-pipeline)
  - [Playground](#playground)
  - [Inspiration & Acknowledgement](#inspiration--acknowledgement)
  - [Contributing](#contributing)
  - [Todos](#todos)

</details>

## Documentation

[See the dedicated documentation page here][docs].

## Packages

`@svelte-put` includes several packages that have self-managed release cycles, listed below. Check out their corresponding README for more details.

### Svelte Actions

| Package                                         | Short Description                                 | Version                                       | Changelog                                  | API                             | Docs                               |
| ----------------------------------------------- | ------------------------------------------------- | --------------------------------------------- | ------------------------------------------ | ------------------------------- | ---------------------------------- |
| [@svelte-put/clickoutside][github.clickoutside] | event for clicking outside node                   | [![npm.clickoutside.badge]][npm.clickoutside] | [Changelog][github.clickoutside.changelog] | [API][github.clickoutside.docs] | [![docs.badge]][docs.clickoutside] |
| [@svelte-put/intersect][github.intersect]       | wrapper for IntersectionObserver                  | [![npm.intersect.badge]][npm.intersect]       | [Changelog][github.intersect.changelog]    | [API][github.intersect.docs]    | coming soon                        |
| [@svelte-put/movable][github.movable]           | move node on mousedown                            | [![npm.movable.badge]][npm.movable]           | [Changelog][github.movable.changelog]      | [API][github.movable.docs]      | coming soon                        |
| [@svelte-put/shortcut][github.shortcut]         | add keyboard shortcuts to node                    | [![npm.shortcut.badge]][npm.shortcut]         | [Changelog][github.shortcut.changelog]     | [API][github.shortcut.docs]     | coming soon                        |
| [@svelte-put/toc][github.toc]                   | action & component for building table of contents | [![npm.toc.badge]][npm.toc]                   | [Changelog][github.toc.changelog]          | [API][github.toc.docs]          | coming soon                        |

### Miscellaneous

| Package                             | Short Description                | Version                           | Changelog                            | API                       | Docs                         |
| ----------------------------------- | -------------------------------- | --------------------------------- | ------------------------------------ | ------------------------- | ---------------------------- |
| [@svelte-put/avatar][github.avatar] | component & utilities for avatar | [![npm.avatar.badge]][npm.avatar] | [Changelog][github.avatar.changelog] | [API][github.avatar.docs] | [![docs.badge]][docs.avatar] |
| [@svelte-put/modal][github.modal]   | type-safe async modal builder    | [![npm.modal.badge]][npm.modal]   | [Changelog][github.modal.changelog]  | [API][github.modal.docs]  | coming soon                  |

Note:

- REPLs are copies from playground code. See the [Playground](#playground) section for more info.
- Documentation markdowns are generated with [@microsoft/api-extractor] & [@microsoft/api-documenter].

### In the Pipeline

These are some packages that will be added in the future (as soon as I find time, and the implementation has matured & become generic enough).

| Package                                                         | Category     | Short Description                                                            | Status             | Docs        |
| --------------------------------------------------------------- | ------------ | ---------------------------------------------------------------------------- | ------------------ | ----------- |
| [@svelte-put/copy][github.copy]                                 | action       | copy text to clipboard                                                       | beta               | coming soon |
| [@svelte-put/dragscroll][github.dragscroll]                     | action       | drag-to-scroll behavior                                                      | beta               | coming soon |
| [@svelte-put/preprocess-auto-slug][github.preprocess-auto-slug] | preprocessor | auto add `id` and `anchor` to headings                                       | beta               | coming soon |
| [@svelte-put/select][github.select]                             | component    | minimal & extensible `select`                                                | active development | coming soon |
| @svelte-put/popover                                             | action       | trigger tooltip & detailed popover, using [popperjs](https://popper.js.org/) | prototype          |
| @svelte-put/noti                                                | utility      | fire async toast-like notification                                           | prototype          |
| @svelte-put/inputcache                                          | action       | cache & restore value of input into/from local/session storage               | prototype          |
| @svelte-put/form                                                | action       | auto collect type-safe input value from form (???)                           | inception          |

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
      src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
      height="60"
      width="217"
      alt="buy vnphanquang a coffee"
    />
  </a>
</p>

<!-- github specifics -->

[github.contributing]: ./CONTRIBUTING.md
[github.issues]: https://github.com/vnphanquang/svelte-put/issues?q=
[github.avatar]: https://github.com/vnphanquang/svelte-put/tree/main/packages/misc/avatar
[github.avatar.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/misc/avatar/CHANGELOG.md
[github.avatar.docs]: https://github.com/vnphanquang/svelte-put/blob/main/packages/misc/avatar/api/docs/index.md
[github.clickoutside]: https://github.com/vnphanquang/svelte-put/tree/main/packages/actions/clickoutside
[github.clickoutside.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/clickoutside/CHANGELOG.md
[github.clickoutside.docs]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/clickoutside/api/docs/index.md
[github.copy]: https://github.com/vnphanquang/svelte-put/tree/main/packages/actions/copy
[github.copy.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/copy/CHANGELOG.md
[github.copy.docs]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/copy/api/docs/index.md
[github.dragscroll]: https://github.com/vnphanquang/svelte-put/tree/main/packages/actions/dragscroll
[github.dragscroll.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/dragscroll/CHANGELOG.md
[github.dragscroll.docs]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/dragscroll/api/docs/index.md
[github.intersect]: https://github.com/vnphanquang/svelte-put/tree/main/packages/actions/intersect
[github.intersect.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/intersect/CHANGELOG.md
[github.intersect.docs]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/intersect/api/docs/index.md
[github.modal]: https://github.com/vnphanquang/svelte-put/tree/main/packages/misc/modal
[github.modal.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/misc/modal/CHANGELOG.md
[github.modal.docs]: https://github.com/vnphanquang/svelte-put/blob/main/packages/misc/modal/api/docs/index.md
[github.movable]: https://github.com/vnphanquang/svelte-put/tree/main/packages/actions/movable
[github.movable.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/movable/CHANGELOG.md
[github.movable.docs]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/movable/api/docs/index.md
[github.preprocess-auto-slug]: https://github.com/vnphanquang/svelte-put/tree/main/packages/preprocessors/auto-slug
[github.preprocess-auto-slug.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/preprocessors/auto-slug/CHANGELOG.md
[github.preprocess-auto-slug.docs]: https://github.com/vnphanquang/svelte-put/blob/main/packages/preprocessors/auto-slug/api/docs/index.md
[github.select]: https://github.com/vnphanquang/svelte-put/tree/main/packages/components/select
[github.select.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/components/select/CHANGELOG.md
[github.select.docs]: https://github.com/vnphanquang/svelte-put/blob/main/packages/components/select/api/docs/index.md
[github.shortcut]: https://github.com/vnphanquang/svelte-put/tree/main/packages/actions/shortcut
[github.shortcut.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/shortcut/CHANGELOG.md
[github.shortcut.docs]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/shortcut/api/docs/index.md
[github.toc]: https://github.com/vnphanquang/svelte-put/tree/main/packages/actions/toc
[github.toc.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/toc/CHANGELOG.md
[github.toc.docs]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/toc/api/docs/index.md

<!-- heading badge -->

[license.badge]: https://img.shields.io/badge/license-MIT-blue.svg
[license]: ./LICENSE

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
[npm.modal.badge]: https://img.shields.io/npm/v/@svelte-put/modal
[npm.modal]: https://www.npmjs.com/package/@svelte-put/modal
[npm.movable.badge]: https://img.shields.io/npm/v/@svelte-put/movable
[npm.movable]: https://www.npmjs.com/package/@svelte-put/movable
[npm.preprocess-auto-slug.badge]: https://img.shields.io/npm/v/@svelte-put/preprocess-auto-slug
[npm.preprocess-auto-slug]: https://www.npmjs.com/package/@svelte-put/preprocess-auto-slug
[npm.shortcut.badge]: https://img.shields.io/npm/v/@svelte-put/shortcut
[npm.shortcut]: https://www.npmjs.com/package/@svelte-put/shortcut
[npm.toc.badge]: https://img.shields.io/npm/v/@svelte-put/toc
[npm.toc]: https://www.npmjs.com/package/@svelte-put/toc

<!-- svelte REPL -->

[@microsoft/api-extractor]: https://www.npmjs.com/package/@microsoft/api-extractor
[@microsoft/api-documenter]: https://www.npmjs.com/package/@microsoft/api-documenter
[pnpm]: https://pnpm.io/
[pnpm.env]: https://pnpm.io/cli/env
[turborepo]: https://turborepo.org/
[nvm]: https://github.com/nvm-sh/nvm

<!-- docs linking -->

[docs]: https://svelte-put.vnphanquang.com
[docs.avatar]: https://svelte-put.vnphanquang.com/docs/avatar
[docs.clickoutside]: https://svelte-put.vnphanquang.com/docs/clickoutside
[docs.copy]: https://svelte-put.vnphanquang.com/docs/copy
[docs.dragscroll]: https://svelte-put.vnphanquang.com/docs/dragscroll
[docs.intersect]: https://svelte-put.vnphanquang.com/docs/intersect
[docs.modal]: https://svelte-put.vnphanquang.com/docs/modal
[docs.movable]: https://svelte-put.vnphanquang.com/docs/movable
[docs.preprocess-auto-slug]: https://svelte-put.vnphanquang.com/docs/preprocess-auto-slug
[docs.select]: https://svelte-put.vnphanquang.com/docs/select
[docs.shortcut]: https://svelte-put.vnphanquang.com/docs/shortcut
[docs.toc]: https://svelte-put.vnphanquang.com/docs/toc
[docs.badge]: https://img.shields.io/badge/-Docs%20Site-blue
