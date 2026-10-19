<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';
	import DemoFilter from './includes/demos/filter.svelte';

	export const metadata = defineDocPageMetadata({
		group: 'The Toc Instance',
		title: 'Visibility Tracking',
	});
</script>

{markdown`
A common UX enhancement is to track the "active" content and highlight the corresponding entry in
Table-of-Contents. Historically this has been Javascript-dependent using various strategies, namely
[onscroll](https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event) or
[IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver).

\`@svelte-put/toc\` v7 proposes a strategy to support this pattern without Javascript, using the
[CSS scroll-driven animations][scroll] API, specifically [View Timeline][view-timeline].

> [!INFO]
> At the time of this writing, the proposed strategy requires features that are supported
> by modern browsers [except for Firefox](https://caniuse.com/?search=animation-timeline)
> (currently available in nightly build) and Firefox Android. I suspect however, that
> they will land soon.
>
> The library will progressively enhance and will not break even in unsupported browsers.

## Setup

Firstly, spread \`.enhance.scope()\` on a common ancestor of [indexable content][indexing] and
Table-of-Contents:

~~~svelte #typehint
<script>
	// [!code ++:3]
	import { Toc } from '@svelte-put/toc';
	const toc = new Toc();
</script>

<!-- ---cut--- -->
<!-- [!code ++] -->
<main {...toc.enhance.scope()}>
	<section>table of content</section>
	<section>indexable content</section>
</main>
~~~

Next, enhance the entries of Table-of-Contents with \`.enhance.link()\`:

~~~svelte #typehint
<script>
	// [!code ++:3]
	import { Toc } from '@svelte-put/toc';
	const toc = new Toc();
</script>

<!-- ---cut--- -->
<main {...toc.enhance.scope()}>
	<section>
		{#if toc.items.size}
			<ul>
				{#each toc.items.values() as item (item.id)}
					<li>
						<!-- [!code ++:3] [!code focus:3] -->
						<a {...toc.enhance.link(item)}>
							{item.text}
						</a>
					</li>
				{/each}
			</ul>
		{/if}
	</section>

	<section>indexable content</section>
</main>
~~~

Lastly, import the necessary CSS:

~~~svelte
<script>
	import '@svelte-put/toc/styles.css'; // [!code ++]
</script>
~~~

To explain what has been done in a few words: \`.enhance.scope()\` and \`.enhance.link()\` set up the
necessary [attributes](#attributes) and CSS variables to be picked up by \`style.css\`.

## Flat vs Non-Flat Content

The library assumes your [indexable content][indexing] is "flat": one section comes after another,
as one would expect in a typical article / blog post. On the contrary, non-flat content is one that
contains at least two sections that live in two completely separate subtree.

In case this assumption isn't true for your use case. Turn off \`.track.flat\`:

~~~typescript #typehint
import { Toc } from '@svelte-put/toc';
// ---cut---
const toc = new Toc({
	track: {
		flat: false,
	},
});
~~~

When \`.track.flat\` is \`true\`, however, tracking is more accurate. So keep it on when possible.

> [!INFO] \`$class=" i-[ph--lightbulb]"\`
> Alternatively, keep \`.track.flat\` on but filter out special content that isn't in the normal flow
> of your main content. See the next section for how to do that.

## Skip Tracking For Certain Content

Provide a callback to \`.track.enabled\` to filter out certain content that should not be tracked.
For example:

~~~typescript #typehint
import { Toc } from '@svelte-put/toc';
// ---cut---
const toc = new Toc({
	track: ({ item }) => item.id !== 'table-of-contents',
});
~~~

This may be helpful when, for example, an indexed content is rendered sticky and thus always "in view",
in which case tracking isn't relevant. Consider the following demo (requires Javascript), where the
Table-of-Contents heading is indexed but not tracked:
`}

<DemoFilter />

{markdown`
## Turning Off Tracking

Since tracking is CSS-only, if you want to turn it off, simply omit the CSS import:

~~~svelte
<script>
	import '@svelte-put/toc/styles.css'; // [!code --]
	import '@svelte-put/toc/styles/anchor.css'; // [!code ++]
</script>
~~~

See [Styling] for a more thorough explanation on this matter.

## CSS Variables

### View Timeline Inset

By default, an indexed element will become "in view" when it enters the top 20% of the screen.
This is controlled by:

~~~css
[data-toc-index] {
	view-timeline-inset: 0% var(--toc-timeline-inset, 80%);
}
~~~

You can customise this threshold by setting \`--toc-timeline-inset\` anywhere in your stylesheet
(but recommended at \`:root\`). For example, to increase the "in-view" area to 40% of the screen,
set the variable to 60%.

### Link Color

Similarly, the \`--toc-active-color\` CSS variable determines the color for a link when hovered or
its associated indexed element is in view:

~~~css
[data-toc-link] {
	color: var(--toc-active-color, blue);
}
~~~

Override as needed in your stylesheet.

## Multiple Toc Instances & Overlapping Content

When there are multiple \`Toc\` instances on the same page with overlapping indexable content,
tracking may conflict. In such case, specify \`.id\`:

~~~typescript #typehint
import { Toc } from '@svelte-put/toc';
// ---cut---
const toc = new Toc({
	id: 42, // a unique number
});
~~~

An example would be the demo from "[Skip Tracking For Certain Content](#skip-tracking-for-certain-content)"
where a separate \`Toc\` instance is used for the demo which lives in the same page that is
indexed by another \`Toc\` instance.

> [!SIDENOTE]
> Conflict happens because stylesheet relies on
> [view-timeline-name](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/view-timeline-name),
> which are set via CSS variable as \`toc-{number}\` where \`{number}\` is the position of the
> indexed element within a Toc instance. This can be worked around by generating unique IDs,
> e.g. [crypto.randomUUID](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID).
> I have deliberately opted to not do so in order to keep the markup cleaner, as the scenario of
> using multiple \`Toc\` instances on the same page is considered _not typical_.

## Attributes & CSS Variables

Set by \`toc.enhance.scope\`:

- \`data-toc-scope\`: \`'flat'\`, or empty string when \`.track.flat\` is turned off,
- \`style:--items\`: \`--toc-0,--toc-1,...\` up until the last elements.

Set by \`toc.enhance.link\`:

- \`data-toc-link\`: comma-separated string with the following values,
  - \`first\`: if corresponds to the first indexed element,
  - \`last\`: if corresponds to the first indexed element,
- \`href\`: link to the corresponding indexed element,
- \`title\`: text content of the indexed element, helpful for UX in the case the link overflows and
  is truncated,
- \`style:--items\`: \`--toc-0,--toc-1,...\` up until the last elements.

## Limitations

The proposed strategy comes with a few shortcomings. They are not exclusive to this strategy, i.e.
other solutions often suffer from the same problems, but worth mentioning anyway:

1. When an indexed content section is too short, its associated link in Table-of-Contents may never
   be highlighted, even on click. This also depends on the content around it, as well as additional
   styling such as
   [scroll-margin](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-margin).
2. Later indexed elements may never be considered "in view" if it does not cross the view timeline
   inset threshold (see [View Timeline Inset](#view-timeline-inset)). This typically happens when
   there is no other content on the page after the last indexed content section, and the content
   section itself is not long enough to cover 80% of the viewport height.

It may be helpful to turn on debug CSS to visualise better how content is tracked:

~~~javascript
import '@svelte-put/toc/styles/track-debug.css';
~~~

See [Styling > Debug][styling.debug] for more information.

I personally think, however, that these inconvenience are worth trading off to avoid Javascript
dependency.

[indexing]: ../toc
[styling]: ../styling
[styling.debug]: ../styling#debug
[view-timeline]: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/view-timeline
[scroll]: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations
`}
