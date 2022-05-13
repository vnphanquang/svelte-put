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
- I want to include more than just actions in this collection.

For those reasons, a monorepo seems like a good fit, hence this project.

## Packages

`@svelte-put` includes several packages that have self-managed release cycles, listed below. Check out their corresponding README for more details.

### Svelte Actions

| Package | Short Description | Version |
| --- | --- | --- |
| [svelte-movable][github.movable] | move node around on mousedown | [![npm.movable.badge]][npm.movable] |
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

<!-- heading badge -->
[semantic-release]: https://github.com/semantic-release/semantic-release
[semantic-release.badge]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[license.badge]: https://img.shields.io/badge/license-MIT-blue.svg
[license]: ./LICENSE

<!-- npm -->
[npm.movable.badge]: https://img.shields.io/npm/v/@svelte-put/movable
[npm.movbale]: https://www.npmjs.com/package/@svelte-put/movable
