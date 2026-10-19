<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	export const metadata = defineDocPageMetadata({
		group: 'The Toc Instance',
		title: 'Indexing',
	});
</script>

{markdown`
> [!INFO] \`$class=" i-[ph--book-open]"\`
> "_Indexing_" in this document refers to the process of traversing through the AST (compile-time) or
> DOM tree (runtime) to look for elements that are considered Table-of-Contents entries. Typically,
> these are heading tags, i.e. h2 -> h6.

At the center of \`@svelte-put/toc\` is the \`Toc\` instance:

~~~typescript #typehint $class=" no-line-number"
import { Toc } from '@svelte-put/toc';
const toc = new Toc();
~~~

This text discusses the mandatory indexing setup for \`Toc\` to work, as well as options for
customisations.

## Runtime Dynamic Indexing

Shown in [Quick Start](..#quick-start), simply spread \`toc.runtime.index()\` onto the element where subtree
contains the indexable content:

~~~svelte #typehint
<script>
	import { Toc } from '@svelte-put/toc';
	const toc = new Toc();
</script>

<!-- ---cut--- --><main {...toc.runtime.index()}><!-- indexable content --></main>
~~~

This will:

> [!STEPLIST]
>
> 1. look for matching elements,
> 2. slugify the text content into \`id\` attribute,
> 3. [insert anchor tag](#anchor-tag-insertion), if instructed so.

Notice the \`.index()\` method is namespaced under \`runtime\` to signify the fact that this operation
is runtime-only. That is, it [requires Javascript](https://www.kryogenix.org/code/browser/everyonehasjs.html).

## Prefilling Compile-Time Data

If your content and layout is compatible with the [compile-time] strategy, you can use it here to
improve the initial load...

~~~svelte
<script>
	import { Toc, compileToc } from '@svelte-put/toc';
	const toc = new Toc({ ...compileToc() }); // [!code info]
</script>
~~~

...which performs the same operation as \`toc.runtime.index()\`, but at compile-time.

### Skipping Runtime Indexing

If you can assert that your relevant content is completely static, e.g. there is no dynamically inserted
content, skip runtime parsing, i.e. \`toc.runtime.index()\` to save resources:

~~~svelte
<main {...toc.runtime.index()}> <!-- [!code --] -->
<main> <!-- [!code ++] -->
<!-- content to index -->
</main>
~~~

## Manual Data

[Prefilling compile-time data](#prefilling-compile-time-data) works because the \`Toc\` constructor
accepts an \`items\`, which \`compileToc()\` will provide. Using the same API also allows custom
data:

~~~typescript #typehint
import { Toc } from '@svelte-put/toc';
// ---cut---
const toc = new Toc({
	// [!code info:9]
	items: [
		{
			id: 'heading-2',
			text: 'Heading 2',
			tag: 'h2',
			index: 0,
		},
		// ...
	],
});
~~~

## Reactivity and Re-Indexing

\`toc.items\` is a [SvelteMap](https://svelte.dev/docs/svelte/svelte-reactivity#SvelteMap) and therefore
reactive. However, you will need to trigger a rerun of \`toc.runtime.index()\` if your content changes
at runtime, e.g. when switching pages. Typically, this can be done with a [#key block](https://svelte.dev/docs/svelte/key):

~~~svelte
{#key slug}
	<main {...toc.runtime.index()}></main>
{/key}
~~~

## Customisation

Indexing behavior can be configured via the \`.index.*\` options.

### Selector

The \`.index.selector\` option determines what elements in the subtree to match for Table-of-Contents
entries. The default is shown below:

~~~typescript #typehint
import { Toc } from '@svelte-put/toc';
// ---cut---
const toc = new Toc({
	index: {
		selector: ':is(h2,h3,h4,h5,h6)',
	},
});
~~~

It is a CSS selector that will be passed to
[querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector). To ignore
certain elements, you can use
[:not()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:not). For example:

~~~typescript #typehint
import { Toc } from '@svelte-put/toc';
// ---cut---
const toc = new Toc({
	index: {
		selector: ':is(h2,h3,h4,h5,h6):not(.ignore-this-in-toc)',
	},
});
~~~

> [!SIDENOTE]
> For the [compile-time Vite plugin][compile-time], \`.index.selector\` is not available since
> there is no DOM to query. Use \`.index.tags\` there instead.

### ID Attribute and Slug Generation

Upon matching an element, \`Toc\` looks for a unique id from the attribute specified in
\`.index.idAttribute\`. If not present, it will attempt to generate one from the text content using
[github-slugger](https://github.com/Flet/github-slugger), which you may override as needed. The
default is shown below:

~~~typescript #typehint
import { Toc } from '@svelte-put/toc';
// ---cut---
const toc = new Toc({
	index: {
		idAttribute: 'id',
		slug: ({ generated, nodeText, slugger }) => generated,
	},
});
~~~

### Attributes & CSS Variables

\`Toc\` will set some attributes that act as marker and assist other parts of the library, e.g. for [styling]:

- \`id\` (or what set in \`.index.idAttribute\`): to the generated slug, if not already,
- \`data-toc-index\`: a comma-separated string with values:
  - \`first\`: if this corresponds to the first entry in Table-of-Contents,
  - \`last\`: if this corresponds to the last entry in Table-of-Contents,
  - \`notrack\`: if [tracking configuration][tracking] is disabled or filters out this element.

It will also add the following [CSS custom
properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties)
as inline style:

- \`--current\`: \`--toc-{number}\`, where number is its position (0-based) in the
  Table-of-Contents,
- \`--next\`: \`--toc-{number}\`, if any, where number is the next item's position.

To completely replace the default set of attributes, simply pass a mapping to \`.index.attributes\`:

~~~typescript #typehint
import { Toc } from '@svelte-put/toc';
// ---cut---
const toc = new Toc({
	index: {
		attributes: {
			// replace completely
		},
	},
});
~~~

Note that this may cause other functionality, e.g. [visibility tracking][tracking], to fail.
Alternatively, pass a callback to have access to more information about each item and the default
attributes:

~~~typescript #typehint
import { Toc } from '@svelte-put/toc';
// ---cut---
const toc = new Toc({
	index: {
		attributes: ({ items, item, defaults }) => ({
			...defaults,
			// enhance or replace some
		}),
	},
});
~~~

[styling]: ../styling
[compile-time]: ../compile-time
[tracking]: ./tracking
`}
