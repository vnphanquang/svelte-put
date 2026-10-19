<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	export const metadata = defineDocPageMetadata({
		group: 'The Toc Instance',
		title: 'Anchor Tag Insertion',
	});
</script>

{markdown`
When you visit a Github README or an MDN documentation page, headings are often rendered as links
to allow more precise navigation & sharing purposes. The same behavior can be observed on this very
page. \`@svelte-put/toc\` attempts to support this pattern by inserting [anchor tag][a] at [indexed
elements][indexing]. For example, given this input:

~~~svelte
<h2>Svelte is Cool</h2>
~~~

The element will be transformed to something like:

~~~svelte
<h2 id="svelte-is-cool">
	<a href="#svelte-is-cool"> Svelte is Cool </a>
</h2>
~~~

## Position

The position of insertion can be spcified via the \`.anchor.position\` option. It accepts:

| Value       | Description                                          |
| ----------- | ---------------------------------------------------- |
| \`'before'\`  | insert link before the target tag                    |
| \`'prepend'\` | inject link as the first child of the target tag     |
| \`'wrap'\`    | wrap the whole target tag with a link                |
| \`'content'\` | wrap the whole content of the target tag with a link |
| \`'append'\`  | inject link as the last child of the target tag      |
| \`'after'\`   | insert link after the target tag                     |

The default is shown below:

~~~typescript #typehint
import { Toc } from '@svelte-put/toc';
// ---cut---
const toc = new Toc({
	anchor: {
		position: ['content', 'prepend'],
	},
});
~~~

Notice the default specifies two values. This is because when \`position\` is set as \`'wrap'\` or
\`'content'\` but the element already contains some [anchor tag][a], another strategy is needed to
avoid creating an invalid markup (\`<a>\` should not be in another \`<a>\`).

In other words, there are two common value set for customisations:

~~~typescript
type Position = 'before' | 'prepend' | 'append' | 'after';
~~~

...or...

~~~typescript
type Position = [
	'wrap' | 'content', // preferred
	'before' | 'prepend' | 'append' | 'after', // fallback
];
~~~

## Content

Typically, hovering on an indexed element renders a \`#\` symbol to the left. What to display
can be customised with the \`.anchor.content\` option:

~~~typescript #typehint
import { Toc } from '@svelte-put/toc';
// ---cut---
const toc = new Toc({
	anchor: {
		content: '#',
	},
});
~~~

This is the text content of the inserted anchor tag, unless \`.anchor.position\` is \`'wrap'\` or
\`'content'\`, in which cases it is available via the \`--content\` CSS variable.

## Attributes & CSS Variables

\`Toc\` will set some attributes on the inserted anchor element:

- \`href\`: set to \`#\${item.id}\`, where item.id is the extracted id value or generated slug during
  [indexing],
- \`data-toc-anchor\`: set to \`.anchor.position\`,
- \`aria-hidden="true"\` & \`tab-index="-1"\` if position is anything other than \`'wrap'\` or
  \`'content'\`.

It will also add the following [CSS custom
properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties)
as inline style to support [styling], if position is \`'wrap'\` or \`'content'\`:

- \`--current\`: \`--toc-{number}\`, where number is the associated indexed element's position
  (0-based) in the Table-of-Contents,
- \`--content\`: \`{string}\`, value of \`.anchor.content\`.

To completely replace the default set of attributes, simply pass a mapping to \`.anchor.attributes\`:

~~~typescript #typehint
import { Toc } from '@svelte-put/toc';
// ---cut---
const toc = new Toc({
	anchor: {
		attributes: {
			// replace completely
		},
	},
});
~~~

Alternatively, pass a callback to have access to more information about each item and the default
attributes:

~~~typescript #typehint
import { Toc } from '@svelte-put/toc';
// ---cut---
const toc = new Toc({
	anchor: {
		attributes: ({ items, item, defaults }) => ({
			...defaults,
			// enhance or replace some
		}),
	},
});
~~~

## Disabling

By default, anchor insertion is turned on. Simply set \`.anchor\` or \`.anchor.enabled\` to \`false\`
if you don't wish to have this feature.

~~~typescript #typehint
import { Toc } from '@svelte-put/toc';
// ---cut---
new Toc({ anchor: false });
// or
new Toc({
	anchor: {
		enabled: false,
	},
});
~~~

[indexing]: ../toc
[styling]: ../styling
[compile-time]: ../compile-time
[a]: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a
`}
