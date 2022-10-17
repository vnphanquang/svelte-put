<div align="center">

# @svelte-put

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

## Packages

`@svelte-put` includes several packages that have self-managed release cycles, listed below. Check out their corresponding README for more details.

### Svelte Actions

| Package | Short Description | Version | Changelog | API | REPL |
| --- | --- | --- | --- | --- | --- |
| [@svelte-put/movable][github.movable] | move node on mousedown | [![npm.movable.badge]][npm.movable] | [Changelog][github.movable.changelog] | [API][github.movable.docs] | [![repl.badge]][repl.movable] |
| [@svelte-put/intersect][github.intersect] | wrapper for IntersectionObserver | [![npm.intersect.badge]][npm.intersect] | [Changelog][github.intersect.changelog] | [API][github.intersect.docs] | [![repl.badge]][repl.intersect] |
| [@svelte-put/clickoutside][github.clickoutside] | event for clicking outside node | [![npm.clickoutside.badge]][npm.clickoutside] | [Changelog][github.clickoutside.changelog] | [API][github.clickoutside.docs] | [![repl.badge]][repl.clickoutside] |
| [@svelte-put/shortcut][github.shortcut] | add keyboard shortcuts to node | [![npm.shortcut.badge]][npm.shortcut] | [Changelog][github.shortcut.changelog] | [API][github.shortcut.docs] |
| [@svelte-put/toc][github.toc] | action & component for building table of contents | [![npm.toc.badge]][npm.toc] | [Changelog][github.toc.changelog] | [API][github.toc.docs] | [![repl.badge]][repl.toc] |

### Miscellaneous

| Package | Short Description | Version | Changelog | API | REPL |
| --- | --- | --- | --- | --- | --- |
| [@svelte-put/avatar][github.avatar] | component & utilities for avatar | [![npm.avatar.badge]][npm.avatar] | [Changelog][github.avatar.changelog] | [API][github.avatar.docs] | [![repl.badge]][repl.avatar] |
| [@svelte-put/modal][github.modal] | type-safe async modal builder | [![npm.modal.badge]][npm.modal] | [Changelog][github.modal.changelog] | [API][github.modal.docs] | [![repl.badge]][repl.modal] |

Note:

- REPLs are copies from playground code. See the [Playground](#playground) section for more info.
- Documentation markdowns are generated with [@microsoft/api-extractor] & [@microsoft/api-documenter].

### In the Pipeline

These are some packages that will be added in the future (as soon as I find time, and the implementation has matured & become generic enough).

| Package | Category | Short Description | Status | REPL
| --- | --- | --- | --- | --- |
| [@svelte-put/select][github.select] | component | minimal & extensible `select` | active development | [![repl.badge]][repl.select] |
| @svelte-put/popover | action | trigger tooltip & detailed popover, using [popperjs](https://popper.js.org/) | in flux |
| @svelte-put/noti | utility | fire async toast-like notification | in flux |
| @svelte-put/inputcache | action | cache & restore value of input into/from local/session storage | in flux |
| @svelte-put/form | action | auto collect type-safe input value from form (???) | inception |

Names for those packages may change.

## Playground

If you want to play around to see what's available. Follow these steps:

1. Clone repo

    ```bash
    git clone https://github.com/vnphanquang/svelte-put.git
    ```

    or with ssh

    ```bash
    git clone git@github.com:vnphanquang/svelte-put.git
    ```

2. Make sure you have [pnpm] and node compatible with what is specified in the `engines` section of the root [package.json](./package.json#engines). Node version can also be [managed with pnpm][pnpm.env] instead of [nvm] in single-node-version environment.

    ```bash
    pnpm env use --global lts
    ```

3. Install dependencies

    ```bash
    pnpm install
    ```

4. Build all packages

    run at root:

    ```bash
    pnpm build
    ```

5. Run playground (svelte-kit)

    run at root:

    ```bash
    pnpm dev --filter=@svelte-put/svelte-kit
    ```

    or run at project directory

    ```bash
    cd apps/svelte-kit
    pnpm dev
    ```

6. See playground at `localhost:3000`

## Inspiration & Acknowledgement

This is a collection of useful svelte utilities extracted from my real world projects that might be helpful for yours too.

There is already a great pool of [svelte actions collected by Shawn and other contributors](https://github.com/sw-yx/svelte-actions) that you should check out. There might be some duplication here and there. However:

- Shawn's project aims to be a source for RFCs into `svelte`; I believe the stuff I am putting here should stay in user land.
- I prefer having separate packages for their dedicated purposes (instead of one package that exports everything).
- I want to incrementally include more than just actions in this collection.

For those reasons, a monorepo seems like a good fit, hence this project.

<details>
  <summary>Why the name "svelte-put"?</summary>

Because I needed to come up quickly with a name short enough & easy to remember, and it was late at night as my creativity was running low. `use` was the first option but no longer available in the npm registry. `put` came up next in mind and I stuck with it...

</details>

## Contributing

[Read Contribution Guide][github.contributing]

This project is a monorepo using [turborepo] under the hood. Familiarity with [turborepo] is not required but encouraged.

For a quick start, run the script below at project root to see what commands are available.

```bash
pnpm turbo
```

## Todos

- [ ] separate helper methods & implement unit tests
- [ ] add field test for svelte kit (integration)
- [ ] CI workflow (github action)

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

[github.movable]: https://github.com/vnphanquang/svelte-put/tree/main/packages/actions/movable
[github.movable.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/movable/CHANGELOG.md
[github.movable.docs]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/movable/api/docs/index.md

[github.intersect]: https://github.com/vnphanquang/svelte-put/tree/main/packages/actions/intersect
[github.intersect.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/intersect/CHANGELOG.md
[github.intersect.docs]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/intersect/api/docs/index.md

[github.clickoutside]: https://github.com/vnphanquang/svelte-put/tree/main/packages/actions/clickoutside
[github.clickoutside.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/clickoutside/CHANGELOG.md
[github.clickoutside.docs]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/clickoutside/api/docs/index.md

[github.shortcut]: https://github.com/vnphanquang/svelte-put/tree/main/packages/actions/shortcut
[github.shortcut.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/shortcut/CHANGELOG.md
[github.shortcut.docs]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/shortcut/api/docs/index.md

[github.avatar]: https://github.com/vnphanquang/svelte-put/tree/main/packages/misc/avatar
[github.avatar.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/misc/avatar/CHANGELOG.md
[github.avatar.docs]: https://github.com/vnphanquang/svelte-put/blob/main/packages/misc/avatar/api/docs/index.md

[github.toc]: https://github.com/vnphanquang/svelte-put/tree/main/packages/actions/toc
[github.toc.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/toc/CHANGELOG.md
[github.toc.docs]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/toc/api/docs/index.md

[github.modal]: https://github.com/vnphanquang/svelte-put/tree/main/packages/misc/modal
[github.modal.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/misc/modal/CHANGELOG.md
[github.modal.docs]: https://github.com/vnphanquang/svelte-put/blob/main/packages/misc/modal/api/docs/index.md

[github.select]: https://github.com/vnphanquang/svelte-put/tree/main/packages/components/select
[github.select.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/components/select/CHANGELOG.md
[github.select.docs]: https://github.com/vnphanquang/svelte-put/blob/main/packages/components/select/api/docs/index.md

<!-- heading badge -->
[license.badge]: https://img.shields.io/badge/license-MIT-blue.svg
[license]: ./LICENSE

<!-- npm -->
[npm.movable.badge]: https://img.shields.io/npm/v/@svelte-put/movable
[npm.movable]: https://www.npmjs.com/package/@svelte-put/movable
[npm.intersect.badge]: https://img.shields.io/npm/v/@svelte-put/intersect
[npm.intersect]: https://www.npmjs.com/package/@svelte-put/intersect
[npm.clickoutside.badge]: https://img.shields.io/npm/v/@svelte-put/clickoutside
[npm.clickoutside]: https://www.npmjs.com/package/@svelte-put/clickoutside
[npm.shortcut.badge]: https://img.shields.io/npm/v/@svelte-put/shortcut
[npm.shortcut]: https://www.npmjs.com/package/@svelte-put/shortcut
[npm.avatar.badge]: https://img.shields.io/npm/v/@svelte-put/avatar
[npm.avatar]: https://www.npmjs.com/package/@svelte-put/avatar
[npm.toc.badge]: https://img.shields.io/npm/v/@svelte-put/toc
[npm.toc]: https://www.npmjs.com/package/@svelte-put/toc
[npm.modal.badge]: https://img.shields.io/npm/v/@svelte-put/modal
[npm.modal]: https://www.npmjs.com/package/@svelte-put/modal

<!-- svelte REPL -->
[repl.badge]: https://img.shields.io/static/v1?label=&message=Svelte+REPL&logo=svelte&logoColor=fff&color=ff3e00
[repl.movable]: https://svelte.dev/repl/88a7c1fc2e134db7b58786d5f385fc5d
[repl.clickoutside]: https://svelte.dev/repl/9e5f9ee41c2c45aa8523993e357f6e78
[repl.intersect]: https://svelte.dev/repl/835eacce6ac44aff95a7cb0bb5ca200d
[repl.toc]: https://svelte.dev/repl/d9c896ac62cd41d49f80ffa249d292e6
[repl.avatar]: https://svelte.dev/repl/d54381946b1c4ebd8e612e4568fbbbd0
[repl.modal]: https://svelte.dev/repl/0a68001337544b8ab55995fb3d02d1f6
[repl.select]: https://svelte.dev/repl/4f0d701ab5ed411ebbc9a71b0955385d

[@microsoft/api-extractor]: https://www.npmjs.com/package/@microsoft/api-extractor
[@microsoft/api-documenter]: https://www.npmjs.com/package/@microsoft/api-documenter

[pnpm]: https://pnpm.io/
[pnpm.env]: https://pnpm.io/cli/env

[turborepo]: https://turborepo.org/
[nvm]: https://github.com/nvm-sh/nvm
