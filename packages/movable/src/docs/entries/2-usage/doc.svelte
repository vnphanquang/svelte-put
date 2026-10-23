<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	import ExampleHandle from './includes/examples/handle.svelte';
	import ExampleLimitScreen from './includes/examples/limit-screen.svelte';
	import ExampleLimitAncestor from './includes/examples/limit-ancestor.svelte';
	import ExampleLimitAxis from './includes/examples/limit-axis.svelte';
	import ExampleLimitDelta from './includes/examples/limit-delta.svelte';
	import ExampleIgnore from './includes/examples/ignore.svelte';

	export const metadata = defineDocPageMetadata({
		title: 'Usage',
	});
</script>

{markdown`
The \`movable\` [Svelte action] takes several options that can be helpful to customise to your
exact use case. Here are the defaults:

~~~svelte #typehint
<script lang="ts">
	import { movable } from '@svelte-put/movable';
</script>

<!-- ---cut--- -->
<div
	use:movable={{
		enabled: true,
		limit: undefined,
		handle: undefined,
		ignore: undefined,
		cursor: true,
		preventClickThreshold: 'auto',
	}}
>
	...
</div>
~~~

Read on for more explanation.

## Custom Events

~~~svelte
<div use:movable onmovablestart onmovableend></div>
~~~

\`movable\` provides two [CustomEvent], \`movablestart\` and \`movableend\`, with [event.detail][CustomEvent.detail]
as \`MovableEventDetail\`.

~~~typescript #typehint
import { movable, type MovableEventDetail } from '@svelte-put/movable';

function listener(event: CustomEvent<MovableEventDetail>) {
	const { node, position } = event.detail;
	// do something
}
~~~

## Setting Limit

By default, node using \`movable\` can be moved freely. The \`.limit\` option can be set to
constraint node within a "movable" zone.

### Within Screen

Limit to the viewport by setting \`.limit.parent\` to \`'screen'\`.

~~~svelte #typehint $class=" no-line-number"
<script lang="ts">
	import { movable } from '@svelte-put/movable';
</script>

<!-- ---cut--- -->
<!-- limit to viewport -->
<div use:movable={{ limit: { parent: 'screen' } }}></div>
~~~
`}

<ExampleLimitScreen />

{markdown`
### Within Ancestor

Limit to an ancestor by referencing \`.limit.parent\` to that element.

~~~svelte #typehint
<!-- [!code word:parent] -->
<script lang="ts">
	import { movable } from '@svelte-put/movable';
	let parent: HTMLElement;
</script>

<section bind:this={parent}>
	<div use:movable={{ limit: { parent } }} />
</section>
~~~
`}

<ExampleLimitAncestor />

{markdown`
### Within Delta

Set \`.limit.delta\` to limit \`movable\` to a certain travel distance. It takes a number with unit
of \`%\` or \`px\` in one or both axes, and can also be combined with \`.limit.parent\`:

~~~svelte #typehint
<script lang="ts">
	import { movable } from '@svelte-put/movable';
	let ancestor: HTMLElement;
</script>

<div bind:this={ancestor}></div>
<!-- ---cut--- -->
<!-- use in isolation -->
<div use:movable={{ limit: { delta: '50%' } }}></div>
<div use:movable={{ limit: { delta: '250px' } }}></div>
<div use:movable={{ limit: { delta: { x: '20%', y: '100px' } } }}></div>

<!-- use with parent -->
<div use:movable={{ limit: { delta: '50%', parent: ancestor } }}></div>
~~~
`}

<ExampleLimitDelta />

{markdown`
### Within Single Axis

Setting \`.limit.delta.x\` or \`.limit.delta.y\` to \`0\` effectively disables movement in that axis.

~~~svelte
<div use:movable={{ limit: { delta: { x: 0 } } }}></div>
<div use:movable={{ limit: { delta: { y: 0 } } }}></div>
~~~
`}

<ExampleLimitAxis />

{markdown`
## Custom Handle

A "handle" is an HTMLElement on which \`movable\` will listen for pointer events to initiate and
map movement to the target node.

~~~svelte #typehint
<script lang="ts">
	import { movable } from '@svelte-put/movable';

	let handle: HTMLElement;
</script>

<!-- ---cut--- -->
<div use:movable={{ handle }}>
	<div bind:this={handle}></div>
</div>
~~~

By default, the target node itself is the handle. The example below show a typical use of a custom handle:
`}

<ExampleHandle />

{markdown`
## Ignoring Children

The \`.ignore\` option takes one or more CSS selector strings and will prevent matching elements
from triggering \`movable\`. This can be helpful, for example, to still allow user to copy text
within the movable element.

~~~svelte #typehint
<script lang="ts">
	import { movable } from '@svelte-put/movable';
</script>

<!-- ---cut--- -->
<div use:movable={{ ignore: '.movable-ignore' }}>
	<p class="movable-ignore">A text that user should be able to copy...</p>
</div>
~~~
`}

<ExampleIgnore />

{markdown`
> [!INFO]
> Prefer [custom handle](#custom-handle) when possible for better predictability.

## Disabling Cursor Handling

By default, \`movable\` adds \`cursor: grab\` to \`handle\`, and \`cursor: grabbing\` on \`mousedown\`
to both \`handle\` and \`window.body\`. This can be turned off with \`.cursor\` option:

~~~svelte #typehint $class=" no-line-number"
<script lang="ts">
	import { movable } from '@svelte-put/movable';
</script>

<!-- ---cut--- -->
<!-- disabling cursor -->
<div use:movable={{ cursor: false }}></div>
~~~

> [!WARNING]
> Automatic cursor handling is one on Svelte action initalisation and update. It won't work for
> [ignored children](#ignoring-children) that are dynamically added to DOM at runtime. In such cases,
> disable \`.cursor\` and add styles manually to the ignored children.

[Svelte action]: https://svelte.dev/docs/svelte/svelte-action
[CustomEvent]: https://developer.mozilla.org/en-US/docs/Web/API/CustomEventj
[CustomEvent.detail]: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail
`}
