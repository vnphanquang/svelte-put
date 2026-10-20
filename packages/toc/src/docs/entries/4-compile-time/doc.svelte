<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	export const metadata = defineDocPageMetadata({
		title: 'Compile-time',
	});
</script>

{markdown`
[New in v7](../migrations#migrating-to-v7), \`@svelte-put/toc\` can now traverse the AST of a Svelte
file to search for matching tags (typically headings) and populate data at \`compileToc\`. All of this
happens during compile-time:

~~~svelte #typehint #title="content.svelte"
<script module>
	// [!code ++:2]
	import { compileToc } from '@svelte-put/toc';
	const toc = compileToc();
</script>

<h2>Svelte is cool</h2>
<!-- ... other indexable content... -->

<!-- [!code ++:2] -->
Use {toc.items} for rendering Table-of-Contents, or pass to Toc instance for further enhancement
~~~

The intermediate Svelte code looks something like:

~~~svelte #title="content.svelte (intermediate)"
<script module>
	// [!code focus:10] [!code info:10]
	const toc = {
		items: new Map([
			[
				'svelte-is-cool',
				{
					id: 'svelte-is-cool',
					text: 'Svelte is Cool',
					tag: 'h2',
				},
			],
			/* ... */
		]),
	};
</script>

<h2 id="svelte-is-cool">Svelte is cool</h2>
<!-- ... other indexable content... -->
~~~

That means:

1. Table-of-Contents is readily available in the initial HTML (i.e. available for SSR),
2. [runtime parsing can be turned off](#turning-off-runtime-parsing) if the content is completely static.

## Vite Plugin

The compile-time strategy relies on a Svelte preprocessor. A Vite plugin setup is recommended
for a unified experience.

~~~typescript #title="vite.config.ts" src="fs:./includes/examples/vite-config.ts"

~~~

## Using Bare Svelte Preprocessor

If your setup doesn't allow Vite, however, you may use the preprocessor directly:

~~~javascript #title="svelte.config.js" #typehint
import { toc } from '@svelte-put/toc/preprocessor'; // [!code ++]

/** @type {import('@sveltejs/kit').Config} */
export default {
	preprocess: [
		// [!code ++:3]
		toc({
			// setting \`files\` as the equivalence of \`include\` Vite plugin option
			files: (filename) => filename?.endsWith('content.svelte'),
		}),
		// other preprocessors
	],
};
~~~

## Usage with TOC

Although it is completely fine to use the result of \`compileToc\` by itself, this compile-time
strategy is also interoperable to the canonical [Toc instance][toc]:

~~~svelte
<script>
	import { Toc, compileToc } from '@svelte-put/toc';
	const toc = new Toc({ ...compileToc() }); // [!code info]
</script>
~~~

This gives the best of both worlds: ready content at load, enhanced during SSR and after hydration,
enabling feature such as [Visibility Tracking][tracking] without much manual setup.

### Skipping Runtime Indexing

If you can assert that your relevant content is completely static, e.g. there is no dynamically inserted
content, skip runtime parsing to save resources:

~~~svelte
<section {...toc.index()}> <!-- [!code --] -->
<section> <!-- [!code ++] -->
 <!-- content to index -->
</section>
~~~

The parsing logic in this case will not be loaded, and the data comes solely from compile-time parsing.

## Customisations

Processing settings can be specified to the \`.preprocessor\` option when using the Vite plugin...

~~~typescript #typehint $class=" no-line-number"
import { toc } from '@svelte-put/toc/vite';
toc({ preprocessor: {/* ... */} });
~~~

...or at the top level when using the bare preprocessor:

~~~typescript #typehint $class=" no-line-number"
import { toc } from '@svelte-put/toc/preprocessor';
toc({/* ... */});
~~~

A lot of options are shared between the preprocessor and \`Toc\` instance. To avoid being verbose,
utilise language server when possible during development. The following sections list only some
options that are unique to compile-time.

### Matching Tags

Indexing can be filtered based on element tags. The default is shown below:

~~~typescript #typehint
import { toc } from '@svelte-put/toc/vite';
toc({
	preprocessor: {
		index: {
			tags: ['h2', 'h3', 'h4', 'h5', 'h6'],
		},
	},
});
~~~

> [!SIDENOTE]
> \`.index.tags\` is the equivalence of \`.index.selector\` in the parameters to [Toc instance][toc]
> constructor.

### CompileToc

Some behavior of \`compileToc\` can be customised via \`.compileToc.*\` options.

#### Import Source

The preprocessor needs to parse the exact location where \`compileToc\` is imported and used. If you
are using an alias for the package or proxying via another one, specify \`.compileToc.importSource\`, e.g.:

~~~typescript #typehint
import { toc } from '@svelte-put/toc/vite';
toc({
	preprocessor: {
		compileToc: {
			importSource: 'my-alias-to-svelte-put-toc',
		},
	},
});
~~~

#### Automatic Declaration

Imagine a blog post setup where you have 100+ content-specific files, manually declaring \`compileToc\`
every time can be repetitive:

~~~svelte #typehint #title="post.svelte"
<script module>
	import { compileToc } from '@svelte-put/toc';
	export const toc = compileToc();
</script>

<!-- blog post content -->
~~~

Specify the \`.preprocessor.autoDeclare\` option to let the preprocessor automatically add the
equivalence for you:

~~~typescript #typehint
import { toc } from '@svelte-put/toc/vite';
toc({
	preprocessor: {
		compileToc: {
			// [!code focus:5]
			autoDeclare: {
				// filter out the Svelte files you want to auto-declare
				enabled: (filename) => filename?.endsWith('post.svelte'),
				identifier: 'toc',
			},
		},
	},
});
~~~

Note that, the declaration goes in the [module
script](https://svelte.dev/docs/svelte/svelte-files#script-module), since it is static per file.

> [!INFO] \`$class=" i-[ph--lightbulb]"\`
> See [Recipes > Collecting Compile-time TOC with Vite's Glob
> Import ](../recipes#collecting-compile-time-toc-with-vites-glob-import) for an example on how this can be
> useful in practice.

[tracking]: ../toc/tracking
[toc]: ../toc
`}
