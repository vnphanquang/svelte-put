# Architecture

:::div{.c-callout.c-callout--info}
svelte-put is currently migrating way from Typescript to vanilla Javascript with [JSDoc](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html) for packages' source code. This is very much inspired by the [initiative taken by the Svelte core team](https://news.ycombinator.com/item?id=35891259) that did the same for Svelte & SvelteKit repo. You can track the progress at [this Github issue](https://github.com/vnphanquang/svelte-put/issues/203).

Note that packages are still fully typed, the experience stays the same for end users that use Typescript.
:::

Packages within the `svelte-put` collection follow, as much as possible, the following design decisions:

- Minimalism. Stay small, with as few dependencies as possible. Do one thing at a time, and do it well.
- Headless UI. Stay away from UI component abstraction as much as possible to avoid opinionated UI patterns and lock-in solutions, prioritize flexibility for users.
- Typescript support. Provide type-safety with self-documented code for code discovery and language server support.

Because of the philosophies above, you will find that the majority of packages rely primarily on [svelte action](https://svelte.dev/docs/svelte-action) and [svelte store](https://svelte.dev/docs/svelte-store) to encapsulate only the necessary logics and leave the UI to be defined by users.

The tradeoff, however, is that sometimes it takes verbose setup to achieve a desired system (in packages such as [@svelte-put/noti](/docs/noti) or [@svelte-put/tooltip](/docs/tooltip)). In my case, this forces me to "own" my code and get familiar with pieces of the package; if issues or customization demand arises, I will be more capable of providing solutions than say if I were to use a highly abstract prebuilt component.

<p class="text-right text-sm">
  <a class="c-link" href="https://github.com/vnphanquang/svelte-put/edit/main/sites/docs/src/routes/docs/architecture/+page.md.svelte">
    Edit this page on Github
  </a>
</p>
