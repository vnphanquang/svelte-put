# Architecture

Packages within the `svelte-put` collection follow, as much as possible, the following design decisions:

- Minimalism. Stay small, with as few dependencies as possible. Do one thing at a time, and do it well.
- Headless UI. Stay away from UI component abstraction as much as possible to avoid opinionated UI patterns and lock-in solutions, prioritize flexibility for users.
- Typescript support. Provide type-safety with self-documented code for code discovery and language server support.

Because of the philosophies above, you will find that the majority of packages rely primarily on [Svelte action](https://svelte.dev/docs/svelte-action) and extend on [Svelte runes](https://svelte.dev/blog/runes) to encapsulate only the necessary logics and leave the UI to be defined by users.

The tradeoff, however, is that sometimes it takes verbose setup to achieve a desired system (such as in [@svelte-put/async-stack](/docs/async-stack)). In my case, this forces me to "own" my code and get familiar with pieces of the package; if issues or customization demand arises, I will be more capable of providing solutions than say if I were to use a highly abstract prebuilt component.

<p class="text-right text-sm">
  <a class="c-link" href="https://github.com/vnphanquang/svelte-put/edit/main/sites/docs/src/routes/(site)/docs/architecture/+page.md.svelte">
    Edit this page on Github
  </a>
</p>


