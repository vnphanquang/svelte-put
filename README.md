<div align="center">

# @svelte-put

[![semantic-release.badge]][semantic-release] [![MIT][license.badge]][license]

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

| Package | Short Description | Version | Changelog | Docs | REPL |
| --- | --- | --- | --- | --- | --- |
| [@svelte-put/movable][github.movable] | move node on mousedown | [![npm.movable.badge]][npm.movable] | [Changelog][github.movable.changelog] | [Docs][github.movable.docs] | [REPL][repl.movable] |
| [@svelte-put/intersect][github.intersect] | wrapper for IntersectionObserver | [![npm.intersect.badge]][npm.intersect] | [Changelog][github.intersect.changelog] | [Docs][github.intersect.docs] | [REPL][repl.intersect] |
| [@svelte-put/clickoutside][github.clickoutside] | event for clicking outside node | [![npm.clickoutside.badge]][npm.clickoutside] | [Changelog][github.clickoutside.changelog] | [Docs][github.clickoutside.docs] | [REPL][repl.clickoutside] |
| [@svelte-put/shortcut][github.shortcut] | add keyboard shortcuts to node | [![npm.shortcut.badge]][npm.shortcut] | [Changelog][github.shortcut.changelog] | [Docs][github.shortcut.docs] |
| [@svelte-put/toc][github.toc] | action & component for building table of contents | [![npm.toc.badge]][npm.toc] | [Changelog][github.toc.changelog] | [Docs][github.toc.docs] | [REPL][repl.toc] |

### Miscellaneous

| Package | Short Description | Version | Changelog | Docs | REPL |
| --- | --- | --- | --- | --- | --- |
| [@svelte-put/avatar][github.avatar] | component & utilities for avatar | [![npm.avatar.badge]][npm.avatar] | [Changelog][github.avatar.changelog] | [Docs][github.avatar.docs] | [REPL][repl.avatar] |

Note:

- REPLs are copies from playground code. See the [Playground](#playground) section for more info.
- Documentation markdowns are generated with [@microsoft/api-extractor] & [@microsoft/api-documenter].

### In the Pipeline

These are some packages that will be added in the future (as soon as I find time, and the implementation has matured & become generic enough).

| Package | Category | Short Description |
| --- | --- | --- |
| @svelte-put/popover | action | trigger tooltip & detailed popover, using [popperjs](https://popper.js.org/) |
| @svelte-put/modal | utility | open async modal (that you can call programmatically and `await`) |
| @svelte-put/noti | utility | fire async toast-like notification |
| @svelte-put/inputcache | action | cache & restore value of input into/from local/session storage |

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

2. Make sure you have [pnpm] and node compatible with what is specified in the `engines` section of the root [package.json](./package.json#engines). Node version can also be [managed with pnpm][pnpm.env] instead of [nvm].

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

<div align="center">

</div>

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
[github.issues]: https://github.com/vnphanquang/svelte-action-movable/issues?q=

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

<!-- heading badge -->
[semantic-release]: https://github.com/semantic-release/semantic-release
[semantic-release.badge]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
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

<!-- svelte REPL -->
[repl.movable]: https://svelte.dev/repl/88a7c1fc2e134db7b58786d5f385fc5d
[repl.clickoutside]: https://svelte.dev/repl/9e5f9ee41c2c45aa8523993e357f6e78
[repl.intersect]: https://svelte.dev/repl/835eacce6ac44aff95a7cb0bb5ca200d
[repl.toc]: https://svelte.dev/repl/d9c896ac62cd41d49f80ffa249d292e6
[repl.avatar]: https://svelte.dev/repl/d54381946b1c4ebd8e612e4568fbbbd0

[@microsoft/api-extractor]: https://www.npmjs.com/package/@microsoft/api-extractor
[@microsoft/api-documenter]: https://www.npmjs.com/package/@microsoft/api-documenter

[pnpm]: https://pnpm.io/
[pnpm.env]: https://pnpm.io/cli/env

[turborepo]: https://turborepo.org/
[nvm]: https://github.com/nvm-sh/nvm
