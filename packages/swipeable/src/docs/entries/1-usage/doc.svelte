<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	export const metadata = defineDocPageMetadata({
		title: 'Usage',
	});
</script>

{markdown`
## Events

\`swipeable\` fires \`swipestart\` when a swipe action in one of the allowed directions is detected
(pointermove), and \`swipeend\` when the swipe action is completed (pointerup).

~~~svelte #typehint src="fs:./includes/examples/events.svelte"

~~~

> [!INFO]
> **Multiple \`swipestart\` events**
>
> A \`swipestart\` event might be fired again if user changes the swipe direction during the swipe
> action. In [Demo], try swiping to left and then change to right midway. Observe that the background
> color and icon are updated accordingly.

## Configuration

\`swipeable\` takes an optional parameter with the following interface. Details of each property are
explained in next sections.

~~~typescript src="fs:../../../lib/types.public.d.ts#L39-L82"

~~~

### Direction

The optional \`direction\` property takes one or an array of directions for \`swipeable\` to
register at runtime. Supported values are:

~~~typescript src="fs:../../../lib/types.public.d.ts#L3-L5"

~~~

The default is \`['left', 'right']\`. Although it is possible to allow \`swpieable\` to listen to
all directions, it is recommended to constraint to either horizontal or vertical directions to avoid
janky behavior.

### Threshold

The optional \`threshold\` property sets up the distance to trigger the \`swipeend\` event. The
value is a string that takes a number followed by a unit (\`px\`, \`rem\`, \`%\`).

~~~typescript src="fs:../../../lib/types.public.d.ts#L7-L8"

~~~

The default is \`30%\`. Note that percentage is relative to the element size in the travel direction
(i.e height for vertical swipe, and width for horizontal swipe).

### CSS Custom Property

THe optional \`customPropertyPrefix\` property sets up the CSS custom property to track the swipe
travel distance. Typically you would use this property to shift the element's position following the
swipe movement for visual feedback (so that user knows that their swipe is being registered).

~~~svelte
<div use:swipeable style:left="var(--swipe-distance-x)"></div>
~~~

> [!INFO]
> \`swipeable\` tracks displacement via a custom property instead of setting the element's \`style\`
> directly to avoid interfering with user-defined styles.

The default is \`--swipe\`, i.e \`--swipe-distance-x\` for horizontal swipe, and
\`--swipe-distance-y\` for vertical swipe. Set to \`null\` to disable tracking.

### Follow Through

The optional \`followThrough\` property that instructs \`swipeable\` how to behave when swipe reaches the threshold, either:

- \`true\` (default): "follow through" in the swipe direction, then fire \`swipeend\` event. That
  is, upon \`pointerup\`, the [CSS Custom Property](#css-custom-property) will be tweened to
  element's width / height, or
- \`false\`: stop swipe action immediately and fire \`swipeend\` event.

\`followThrough\` takes either a boolean or a config object with the following interface.

~~~typescript src="fs:../../../lib/types.public.d.ts#L10-L34"

~~~

### Leaving Padded Container

Sometimes, swipeable elements live inside a container with some padding. If you want the item to
move completely out of the container during its follow-through movement, set explicit parent:

~~~svelte
<ul class="p-4">
	<li use:swipeable={{ followThrough: { container: 'ul' } }}>Swipe me</li>
</ul>
~~~

### Flick

It is typical to expect a quick swipe with high velocity — a so-called "flick" — to bypass the
threshold and be recognized as a complete swipe action (try this behavior in the demo seen at
[Introduction](..)). This can be configured via the optional \`flick\` property:

~~~typescript
type Flick = boolean | ((ms: number, px: number) => boolean);
~~~

For complex configuration, you can provide a function that takes the duration in milliseconds and
the distance in pixels, and returns a boolean to indicate whether the swipe should be considered a
flick. The default is:

~~~typescript $class=" no-line-number"
// is flick if the duration is less than 170ms and the velocity is greater than 1px/ms
const DEFAULT_FLICK_CHECK = (ms, px) => ms < 170 && Math.abs(px / ms) > 1;
~~~

## Scrolling Conflict with Touch Events

On mobile, you may run into scrolling issue. By default, \`swipeable\` sets \`touch-action: none\`
on the element (argubaly could be smarter).

To mitigate this issue, limit [direction](#direction) to one axis and set
[touch-action](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/touch-action)
for the other axis on the item:

~~~svelte
<div class="touch-pan-y" use:swipeable={{ direction: 'x', disableTouchEvents: false }}>...</div>

<style>
	.touch-pan-y {
		touch-action: pan-y;
	}
</style>
~~~
`}
