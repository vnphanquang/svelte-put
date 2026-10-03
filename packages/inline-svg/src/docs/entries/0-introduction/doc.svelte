<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	export const metadata = defineDocPageMetadata({
		title: 'Introduction',
	});
</script>

{markdown`
Existing solutions for inline SVGs in Svelte land often rely on component, which proves painful when
it comes to custom styling or event handling. This package attempts to achieve a more minimal
alternative using [Svelte action] (runtime) and [Svelte preprocessor] via the [Vite
plugin API] (compile time).

It allows the following pattern...

~~~svelte $class=" no-line-number"
<!-- dynamic SVG -->
<svg use:inlineSvg="https://raw.githubusercontent.com/sveltejs/branding/master/svelte-logo.svg" />
~~~

or...

~~~svelte $class=" no-line-number"
<!-- static SVG -->
<svg use:inlineSvg="./svelte.svg" />
~~~

## Installation

> [!CODEGROUP] \`#file-icon=false\`
>
> ~~~bash #title=npm
> npm install --save-dev @svelte-put/inline-svg
> ~~~
>
> ~~~bash #title=pnpm
> pnpm add -D @svelte-put/inline-svg
> ~~~
>
> ~~~bash #title=yarn
> yarn add -D @svelte-put/inline-svg
> ~~~

## Pick Your Poison

As shown above, there are two distinct ways to use this package. Head over to the dedicated
documentation page for more information on setup and usage:

1. [As a Svelte action - run at runtime - for dynamic SVGs][runtime]
2. [As a Vite plugin - run at compiletime - for static SVGs][compile-time]

## Frequently Asked Questions

Q: Why should I care about **runtime** vs **build time**?<br>
A: Javascript! **Runtime** [requires Javascript](https://www.kryogenix.org/code/browser/everyonehasjs.html). Without it, users will not see your SVG. On the other hand, **build time** does the work beforehand, so SVGs are already there in the initial HTML.

Q: When to use which?<br>
A: If you do not know in advance what SVGs to inline, or if your SVG is huge but only conditionally rendered: use Svelte action [runtime strategy][runtime]. Otherwise, especially for static icons and pictograms, use Svelte preprocessor [compile-time strategy][compile-time].

Q: Do I really need this package?<br>
A: No! Use \`<img>\` when possible. My initial use case is to be able to change properties of the SVG, especially color. But that can potentially be done with [mask-image](https://developer.mozilla.org/en-US/docs/Web/CSS/mask-image). So consider your use case before adding another dependency.

## Acknowledgement & Prior Arts

- [svelte-inline-svg] runs at runtime as Svelte component.
- [vite-plugin-svelte-svg] runs at build time as Svelte component; svg can be processed with [svgo].
- [svg-to-svelte]: convert SVG files to svelte components.

---

Happy inlining SVGs! 👨‍💻

[Svelte action]: https://svelte.dev/docs/svelte-action
[Svelte preprocessor]: https://svelte.dev/docs/svelte-compiler#preprocess
[Vite Plugin API]: https://vite.dev/guide/api-plugin
[runtime]: ../runtime
[compile-time]: ../compile-time
[svelte-inline-svg]: https://github.com/robinscholz/svelte-inline-svg
[vite-plugin-svelte-svg]: https://github.com/metafy-gg/vite-plugin-svelte-svg
[svg-to-svelte]: https://github.com/metonym/svg-to-svelte
[svgo]: https://github.com/svg/svgo
`}
