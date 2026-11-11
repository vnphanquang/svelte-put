<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	import DemoScrollSnapIssue from './includes/demo-scroll-snap-issue.svelte';

	export const metadata = defineDocPageMetadata({
		title: 'Usage',
	});
</script>

{markdown`
> [!INFO]
> \`use:dragscroll\` should be placed on a scroll container.

## Scroll Axis

\`dragscroll\` supports both axes. you can specifying one or both scrolling axes using the \`axis\`
option. By default, it is set to \`x\`.

~~~svelte #typehint src="fs:./includes/examples/axis.svelte"

~~~

## Mouse vs Pointer Event

By default, \`dragscroll\` assumes
[PointerEvent](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent), i.e \`pointerup\`,
\`pointerdown\`, \`pointermove\`, \`pointerleave\`. You can switch to
an equvalence with [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) by
setting the \`event\` option to \`mouse\`.

~~~svelte #typehint src="fs:./includes/examples/event.svelte"

~~~

## Disable Cursor Handling

By default, \`dragscroll\` adds \`cursor: grab\` to the node the action is placed on, and
\`cursor: grabbing\` on \`mousedown\`. This can be disabled by setting the \`cursor\` option to
\`false\` (default is \`true\`).

~~~svelte #typehint src="fs:./includes/examples/cursor.svelte"

~~~

## Limitation

There is a known issue when \`dragscroll\` is used with
[scroll-snap-align](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-align), where the
scroll container tends to be unresponsive to \`dragscroll\` and requires a great \`mousemove\`
length to snap to the next box.

In the example below, try using the **scrollbar** to confirm \`scroll-snap-align\` has been set up.
Then, try dragging with mouse and notice that it only works when the mouse is dragged over almost
the entire width of the container.
`}

<DemoScrollSnapIssue />

{markdown`
If you find a solution or workaround to the above, please consider [open a
PR](https://github.com/vnphanquang/svelte-put/pulls) or [discussion
thread](https://github.com/vnphanquang/svelte-put/discussions). Thank you!
`}
