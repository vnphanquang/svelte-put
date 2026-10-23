<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	export const metadata = defineDocPageMetadata({
		title: 'Customisation',
	});
</script>

{markdown`
The \`clickoutside\` [Svelte action] takes several options that can be helpful to customise to your
exact use case. Here are the defaults:

~~~svelte #typehint
<script lang="ts">
	import { clickoutside } from '@svelte-put/clickoutside';
</script>

<!-- ---cut--- -->
<div
	use:clickoutside={{
		enabled: true,
		limit: {
			parent: document.documentElement,
		},
		event: 'click',
		options: undefined,
	}}
>
	...
</div>
~~~

Read on for more explanation.

## Limit the Clickoutsisde Zone

Set \`.limit.parent\` to better define a zone that will trigger \`clickoutside\` [CustomEvent]. By
default there is no limit, i.e the limit is the document node. Here is an example:

~~~svelte
<script lang="ts">
	let parentNode: HTMLElement;
</script>

<section bind:this={parentNode}>
	<div use:clickoutside={{ limit: { parent: parentNode } }}>...</div>
</section>
~~~

## Event Type

\`clickoustide\` listen for [click event](https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event)
by default. This can be customised via the \`.event\` option:

~~~svelte
<div use:clickoutside={{ event: 'mousedown' }}>...</div>
~~~

## Options to addEventListener

Additional options can be passed to [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) in advanced use cases:

~~~svelte
<div use:clickoutside={{ options: { passive: true } }}>...</div>

<!-- options: true => useCapture -->
<div use:clickoutside={{ options: true }}>...</div>
~~~

## Excluding Other Events in the Clickoutside Zone

Consider this example, where there is a button in the clickoutside zone:

~~~svelte
<section bind:this={parentNode}>
	<div use:clickoutside={{ limit: { parent: parentNode } }}>...</div>
	<!-- [!code info] -->
	<button>Click me</button>
</section>
~~~

Clicking on this button will trigger \`clickoutside\` event for \`<div>\`, which makes sense given
our defined zone. Often time, however, this is not the intended behavior. In such case, you can
prevent propagation:

~~~svelte
<!-- [!code word:stopPropagation] -->
<button onclick={(e) => e.stopPropagation()}>Click me</button>
~~~

Be aware to reflect customisation made to the event listener as mentioned in the last two sections.
For example, if the \`mousedown\` event is used:

~~~svelte
<!-- [!code word:mousedown] -->
<div use:clickoutside={{ event: 'mousedown' }}>...</div>
<button onmousedown={(e) => e.stopPropagation()}>Click me</button>
~~~

[Svelte action]: https://svelte.dev/docs/svelte/svelte-action
[CustomEvent]: https://developer.mozilla.org/en-US/docs/Web/API/CustomEventj
`}
