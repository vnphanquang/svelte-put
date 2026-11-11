<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	export const metadata = defineDocPageMetadata({
		title: 'Usage',
	});
</script>

{markdown`
> [!INFO]
> [IntersectionObserver], and this package by extension, has many use cases, e.g. replacing
> logic that historically relied on [onscroll](https://developer.mozilla.org/en-US/docs/Web/API/Element/scroll_event).
> However, consider whether you really need another Javascript dependency. For many use cases,
> modern native alternatives may be sufficient. [CSS scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations),
> which hit baseline in 2026, is one such alternative.

## Options

\`intersect\` supports all options in [IntersectionObserver]'s constructor (\`root\`,
\`rootMargin\`, \`threshold\`), and an additional \`enabled\` option to dynamically enable/disable
the action.

~~~svelte #typehint src="fs:./includes/examples/options.svelte"

~~~

## Events

### \`intersect\`

Listener for the \`intersect\` [CustomEvent] is essentially the same callback as one passed to the
[IntersectionObserver]'s constructor.

~~~svelte #typehint src="fs:./includes/examples/intersect.svelte"

~~~

### \`intersectonce\`

Following the same interface as with \`intersect\`, \`intersectonce\` [CustomEvent] only fires once
on the first intersection and never again.

~~~svelte #typehint src="fs:./includes/examples/intersectonce.svelte"

~~~

[IntersectionObserver]: https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver
[CustomEvent]: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent
`}
