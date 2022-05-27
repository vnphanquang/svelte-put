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
  - [Inspiration & Acknowledgement](#inspiration--acknowledgement)
  - [Playground](#playground)
  - [Packages](#packages)
    - [Svelte Actions](#svelte-actions)
  - [Contributing](#contributing)
  - [Todos](#todos)

</details>

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

## Playground

If you want to play around to see what's available before trying anything. Follow these steps:

1. Clone repo

    ```bash
    git clone https://github.com/vnphanquang/svelte-put.git
    ```

    or with ssh

    ```bash
    git clone git@github.com:vnphanquang/svelte-put.git
    ```

2. Make sure you have [pnpm] and node compatible with what is specified in the `engines` section of the root [package.json](./package.json#engines)
3. Install dependencies

    ```bash
    pnpm install
    ```

4. Run playground (svelte-kit)

    run at root:

    ```bash
    pnpm dev --filter=@svelte-put/svelte-kit
    ```

    or run at project directory

    ```bash
    cd apps/svelte-kit
    pnpm dev
    ```

5. See playground at `localhost:3000`

## Packages

`@svelte-put` includes several packages that have self-managed release cycles, listed below. Check out their corresponding README for more details.

### Svelte Actions

| Package | Category | Short Description | Version | Changelog |
| --- | --- | --- | --- | --- |
| [@svelte-put/movable][github.movable] | action | move node on mousedown | [![npm.movable.badge]][npm.movable] | [CHANGELOG][github.movable.changelog] |
| [@svelte-put/intersect][github.intersect] | action |wrapper for IntersectionObserver | [![npm.intersect.badge]][npm.intersect] | [CHANGELOG][github.intersect.changelog] |
| [@svelte-put/clickoutside][github.clickoutside] | action | event for clicking outside node | [![npm.clickoutside.badge]][npm.clickoutside] | [CHANGELOG][github.clickoutside.changelog] |
| [@svelte-put/shortcut][github.shortcut] | action | add keyboard shortcuts to node | [![npm.shortcut.badge]][npm.shortcut] | [CHANGELOG][github.shortcut.changelog] |

## Contributing

[Read Contribution Guide][github.contributing]

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
[github.intersect]: https://github.com/vnphanquang/svelte-put/tree/main/packages/actions/intersect
[github.intersect.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/intersect/CHANGELOG.md
[github.clickoutside]: https://github.com/vnphanquang/svelte-put/tree/main/packages/actions/clickoutside
[github.clickoutside.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/clickoutside/CHANGELOG.md
[github.shortcut]: https://github.com/vnphanquang/svelte-put/tree/main/packages/actions/shortcut
[github.shortcut.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/shortcut/CHANGELOG.md

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

[pnpm]: https://pnpm.io/
