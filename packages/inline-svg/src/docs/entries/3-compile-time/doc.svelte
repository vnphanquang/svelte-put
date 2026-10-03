<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	export const metadata = defineDocPageMetadata({
		title: 'Compile Time - Static SVGs - Vite Plugin',
	});
</script>

{markdown`
This strategy is useful for SVGs that live in your repo as static assets. It only runs at compile
time by [Svelte preprocessor] (via Vite plugin) during development, and therefore has
**zero runtime footprint**. The idea is to enable the following...

~~~svelte
<svg inline-src="google/info"> <!-- innerHTML inlined at compile time --> </svg>
~~~

...which allows additional styling and attributes to be added idiomatically as with any other HTML element. This is different from current solutions that I know of for inlining SVGs in Svelte land, which require either runtime logics or a component-oriented strategy.

Alternatively, for dynamic SVGs that are fetched at runtime, consider using the [runtime strategy][runtime] instead.

> [!INFO]
> This library makes no implication that you should or should not use SVG to render icons. For some
> cases, it is helpful to do so, especially in conjunction with customisable color scheme. For
> others, different strategies such as icon font or CSS-only icons (see [Icons in Pure CSS
> by Anthony Fu](https://antfu.me/posts/icons-in-pure-css)) might have more benefits.

## Setup

Given the following Vite config and filesystem setup...

> [!CODEGROUP]
>
> ~~~typescript #title="vite.config.ts" src="fs:./includes/examples/config.ts"
>
> ~~~
>
> ~~~txt #title="File System" #file-icon=false src="fs:./includes/examples/filesystem.txt"
>
> ~~~

...we can now do...

~~~svelte title=source.svelte
<!-- this will have width="20" height="20" as specified in the config -->
<svg inline-src="svelte" />

<!-- nested -->
<svg inline-src="google/arrow-right.svg" />
<!-- .svg can be omitted -->
<svg inline-src="simpleicons/github" />

<!-- with custom attributes -->
<svg inline-src="diagram" width="100" height="100" />

<!-- alternatively, you can provide a per-case path that is relative to the current source file -->
<svg inline-src="./local-icon.svg" />

<!-- if the source svg is not found for any of the above, an error will be thrown -->
~~~

## Limitations

The \`inlineSvg\` preprocessor only works in Svelte markup, i.e in the template part of Svelte
files. The following will not work:

~~~svelte title=source.svelte
<script>
	let html = \`<svg inline-src="path/icon"></svg>\`; // [!code error]
</script>

{@html html}
~~~

Similarly, the preprocessor does not support inline src attribute as a variable. The following will
not work:

~~~svelte title=Component.svelte
<script>
	const icon = 'path/icon';
</script>

<svg inline-src={icon} /> <!-- [!code error] -->
~~~

This is because it is difficult for the preprocessor to statically analyze a variable to determine
its immutability at compile time, i.e a variable is meant to be changed. In these case, some
alternatives are:

- use \`if-else\` statements to render different svg element with static inline src attribute as literal string, or
- use the [runtime strategy][runtime] to dynamically inline SVGs in browser.

If you have an idea for improvements, please [raise an issue over at
github](https://github.com/vnphanquang/svelte-put/issues). Thanks!

## Attributes and Inner HTML

Attributes provided to the \`svg\` element where inline src attribute (\`inline-src\` by default) is
specified will replace existed ones from the original SVG. On the contrary, its inner HTML will be
completely replaced.

Take the following SVG as an example:

~~~html
<svg viewBox="0 0 24 24" width="24" height="24" stroke-width="2">
	<!-- truncated original svg innerHTML -->
</svg>
~~~

And \`inlineSvg\` is used as follows:

~~~svelte
<svg inline-src="./local-icon.svg" height="16" stroke-width="1">
	<!-- some innerHTML -->
</svg>
~~~

The resulting SVG at runtime will be:

~~~html
<svg viewBox="0 0 24 24" width="24" height="16" stroke-width="1">
	<!-- [!code warning] -->
	<!-- truncated original svg innerHTML -->
</svg>
~~~

> [!WARNING]
> Notice that the \`width\` attribute is not automatically calculated for you in the output above.
> Make sure to provide both dimensions. This behavior differs from the [runtime strategy][runtime],
> which automatically calculates the missing dimension to preserve aspect ratio. The rationale is
> that preprocessor operates at compile time with static SVGs, so it trusts your intention. If you
> think otherwise, feel free to [open a discussion](https://github.com/vnphanquang/svelte-put/discussions).

If you have a use case where it is useful to append/prepend the \`innerHTML\` of the original SVG
rather than replacing it, please [raise an issue over at Github](https://github.com/vnphanquang/svelte-put/issues).
For now, let's keep things simple.

## Customisation

By default the Vite plugin / Svelte preprocessor can be setup with no config at all, in which case
SVG source paths are resolved relative to the Svelte source file the inline src attribute
(\`inline-src\` as default) is specified in.

~~~typescript
export function inlineSvg(
	source?: InlineSvgSourceDefinition | InlineSvgSourceDefinition[],
	config?: InlineSvgViteConfig, // or InlineSvgPreprocessorConfig if using bare preprocessor
): import('vite').Plugin; // or  import('svelte/compiler').PreprocessorGroup if using bare preprocessor
~~~

> [!WARNING]
> Note that path alias is not supported! For example, \`"$lib/src/assets/..."\` will not work.

### Source Definitions

The first parameter to Vite plugin / Svelte preprocessor can be either a single object, or an array
of such (as seen in [Setup](#setup)), helpful for organizing SVG sources into different directories.

~~~typescript
/** sources for the inline svg */
export type InlineSvgSourceDefinition = {
	/**
	 * directories relative to which the svg source path will be resolved
	 */
	directories?: string[] | string;
	/**
	 * default attributes to add to the svg element, will override the attributes from the svg source,
	 * but be overridden by the attributes from the element itself (in svelte source)
	 */
	attributes?: Record<string, string>;
};
~~~

> [!INFO]
> When source parameter is an array of config objects, the following apply:
>
> 1. there can be only one config object without the \`directories\` option, taken as the default
>    config and will be used for all SVG sources not covered by other config objects
>    (all relative SVG paths).
> 2. If multiple config objects without \`directories\` are provided, an error will be thrown
>    during development. If none is provided, the internal default config is used.

During build, each SVG source will then be searched top down in the config until a match is found, or else an error will be thrown. Relative SVGs (relative to current Svelte source file) always has the highest priority and will use the **default config** as described above.

### Processing Options

The second parameter to the Vite plugin / Svelte preprocessor provides customization to the
underlying Svelte processor itself. Their corresponding interfaces are as follow:

~~~typescript #title="InlineSvgPreprocessorConfig"
export interface InlineSvgPreprocessorConfig {
	/** attribute to get the svg source from, default to \`inline-src\` */
	inlineSrcAttributeName?: string;
	/** whether to keep the inline src attribute after compilation, default to \`false\` */
	keepInlineSrcAttribute?: boolean;
}
~~~

### Typescript Support

Specify typedef option to let Vite plugin automatically generate type definition for the inline src
attribute. This is useful to enable type checking and auto-completion in your editor.

> [!CODEGROUP]
>
> ~~~typescript #title="vite.config.ts"
> import path from 'path';
> import { inlineSvg } from '@svelte-put/inline-svg/vite';
>
> /** @type {import('vite').UserConfig} */
> const config = {
> 	plugins: [
> 		inlineSvg([
> 			[/** truncated source config as in Setup */],
> 			{ typedef: true }, // [!code info] [!code focus]
> 		]),
> 		sveltekit(),
> 	],
> };
> export default config;
> ~~~
>
> ~~~typescript #title="src/preprocess-inline-svg.d.ts" src="fs:./includes/examples/typedef.ts"
>
> ~~~
>
> ~~~bash #title=Filesystem #file-icon=false src="fs:./includes/examples/filesystem.txt"
>
> ~~~

\`typedef\` takes a string to write the generated typing to, or \`true\` to use
\`src/preprocess-inline-svg.d.ts\`.

> [!WARNING]
>
> Avoid setting \`inlineSrcAttributeName\` to \`data-*\` in this case since it would be "swallowed"
> by the [broader typedef from svelte/elements](https://github.com/sveltejs/svelte/blob/396ea2ef370e7ea5b5d4571c4e5e14384bac3ca6/packages/svelte/elements.d.ts#L843).

## Using Bare Svelte Preprocessor

The wrapper Vite plugin adds some improvements to developer experience by watching the specified
directories from your [source config](#source-definitions) and triggering page reload when there is
addition/removal/change to them. It also provide optional [typedef generation](#typescript-support)
as seen in previous section.

If your setup doesn't allow Vite, however, you can import the preprocessor directly from
\`@svelte-put/inline-svg/preprocessor\`:

~~~javascript #title="svelte.config.js"
import { inlineSvg } from '@svelte-put/inline-svg/preprocessor'; // [!code ++]

/** @type {import('@sveltejs/kit').Config} */
export default {
	preprocess: [
		inlineSvg(/** truncated config */), // [!code ++]
		// other preprocessors
	],
};
~~~

[Svelte preprocessor]: https://svelte.dev/docs/svelte-compiler#preprocess
[runtime]: ../runtime
`}
