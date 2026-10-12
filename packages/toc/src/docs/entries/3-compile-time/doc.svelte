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

Use {toc.items} for rendering table-of-contents <!-- [!code ++] -->
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

Use {toc.items} for rendering table-of-contents
~~~

That means:

1. table-of-contents is readily available in the initial HTML (i.e. available for SSR),
2. [runtime parsing can be turned off](#turning-off-runtime-parsing) if the content is completely static.

> [!INFO]
> The code example above supports type-hint, if a pointer device is available, try hovering on
> relevant tokens to see more information. Similar patterns will be presented throughout the
> documentation.

## Vite Plugin

The compile-time strategy relies on a Svelte preprocessor. A Vite plugin setup is recommended
for a unified experience.

~~~typescript #title="vite.config.ts" src="fs:./includes/examples/vite-config.ts"

~~~

## Using Bare Svelte Preprocessor

If your setup doesn't allow Vite, however, you may import the preprocessor directly from
\`@svelte-put/toc/preprocessor\`:

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

The \`compile-time\` strategy is interoperable to the canonical \`Toc\` instance:

~~~svelte
<script>
	import { Toc, compileToc } from '@svelte-put/toc';
	const toc = new Toc({ ...compileToc() }); // [!code info]
</script>
~~~

This gives the best of both worlds: ready content at load, enhanced after hydration. See [TOC >
Prefill Compile-Time Data](../toc#prefill-compile-time-data) for some more information.

### Turning off Runtime Indexing

If you can assert that your relevant content is completely static, e.g. there is no dynamically inserted
content, skip runtime parsing to save resources:

~~~typescript
const toc = new Toc({ ...compileToc() }); // [!code --]
const toc = new Toc({ ...compileToc(), indexing: false }); // [!code ++]
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

To avoid being verbose, utilise language server when possible during development. The following
sections list some prominent options.

### Index Options

The \`processor.index\` options instruct how to find and process matching elements that are
considered entries to the final table-of-contents. They are typically heading elements.

#### Matching Tags

The processing can be filtered based on element tags. The default is shown below:

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

#### ID Attribute and Slug Resolution

When a tag is matched, the processor will look for the attribute whose name specified in
\`.preprocssor.idAttribute\`. If present, that will be taken as the slug. Otherwise, a slug will
be generated based on the text content. The default options are shown below:

~~~typescript #typehint
import { toc } from '@svelte-put/toc/vite';
toc({
	preprocessor: {
		index: {
			idAttribute: 'id',
			slug: ({ generated, nodeText, slugger }) => generated,
		},
	},
});
~~~

#### Attributes

Additional attributes may be added to the indexed element. For example:

~~~typescript #typehint
import { toc } from '@svelte-put/toc/vite';
toc({
	preprocessor: {
		index: {
			attributes: ({ item, items, defaults }) => {
				return {
					...defaults, // contains the id attribute
				};
			},
		},
	},
});
~~~

See [Recipes > No-JS Visibility Tracking](../recipes#no-js-visibility-tracking) on how this can be
helpful.

### Anchor Injection

Customisation to how anchor tag is inserted can be provided via the \`.preprocessor.anchor\` option.
Typically, this supports a pattern similar to one seen in Github README, i.e. a clickable \`#\` link
on hover at headings. The default options are shown below:

~~~typescript #typehint
import { toc } from '@svelte-put/toc/vite';
toc({
	preprocessor: {
		anchor: {
			enabled: true,
			position: 'prepend',
			content: '#',
			attributes: () => ({
				'aria-hidden': 'true',
				tabindex: '-1',
				'toc-data-anchor': '',
			}),
			href: (slug) => \`#\${slug}\`,
		},
	},
});
~~~

Attributes can be added to the anchor element, with the same API as discussed in [Index >
Attributes](#attributes).

### Import Source

The preprocessor needs to parse the exact location where \`compileToc\` is imported and used. If you
are using an alias for the package or proxying via another one, specify
\`.preprocessor.importSource\`, e.g.:

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

### Automatic Declaration

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
> Imports ](../recipes#collecting-compile-time-toc-with-vites-glob-imports) for an example on how this can be
> useful in practice.

[runtime]: ../runtime
[toc]: ../toc
`}
