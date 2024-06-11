# Guidelines

This page includes common guidelines shared among packages in the `svelte-put` collections.

## Action as Element Directive

Any [svelte action](https://svelte.dev/docs/svelte-action) exported by a package should be used with `element` and not `component`.

```svelte title=example.svelte
<!-- :::diff - -->
<Component use:action /> <-- incorrect usage-->
<!-- ::: -->
<!-- :::diff + -->
<div use:action /> <-- correct usage-->
<!-- ::: -->
```

## Svelte Store Reactive Syntax

Note that the [$ syntax](https://svelte.dev/docs/svelte-components#script-4-prefix-stores-with-$-to-access-their-values) for unpacking reactive store value is only available in `*.svelte` files and not in JS/TS. Instead, use the `.subscribe` method on the store instance itself in such cases.

## Should I use Typescript or not?

If you are developing Svelte application (typically with SvelteKit & Vite), there is no reason not to use Typescript for its convenience in development workflow. One completely valid alternative to Typescript, is just plain Javascript with [JSDoc](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html), which, if setup correctly, will go to the same Typescript type checker and provide similar type checking benefits without the hassle of tooling setup. The packages in this collection are in fact written in Javascript with JSDoc.

Throughout the documentation, however, you will see example code in [Typescript](https://www.typescriptlang.org/). This is frankly just me being lazy and not wanting to maintain two versions of every code block. Sorry!

<p class="text-right text-sm">
  <a class="c-link" href="https://github.com/vnphanquang/svelte-put/edit/main/sites/docs/src/routes/docs/guidelines/+page.md.svelte">
    Edit this page on Github
  </a>
</p>
