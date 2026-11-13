<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	export const metadata = defineDocPageMetadata({
		title: 'Event Handling',
		group: 'Usage',
	});
</script>

{markdown`
## Event Type

\`@svelte-put/shortcut\` support \`keydown\` (default) or \`keyup\` event type. You may change this
via the \`type\` option.

~~~svelte #typehint
<script>
	import { shortcut } from '@svelte-put/shortcut';

	const trigger = { key: 'k' };
</script>

<!-- ---cut--- -->
<svelte:window use:shortcut={{ trigger, type: 'keyup' }} />
~~~

## Original Keyboard Event

You can access the original \`KeyboardEvent\` via \`detail.originalEvent\`. This is helpful for checking \`target\`.

~~~svelte #typehint
<script lang="ts">
	import type { ShortcutEventDetail } from '@svelte-put/shortcut';
	import { shortcut } from '@svelte-put/shortcut';

	function onShortcut(event: CustomEvent<ShortcutEventDetail>) {
		const keyboardEvent = event.detail.originalEvent;
		// be cautious: \`keyboardEvent\` has already reached window here

		keyboardEvent.preventDefault(); // prevent browser default

		if ((keyboardEvent.target as HTMLElement)?.tagName === 'INPUT') {
			console.log('some input is focused, should skip');
			return;
		}
		// do things
	}
</script>

<svelte:window
	use:shortcut={{
		trigger: {
			key: 'k',
			modifier: ['ctrl', 'meta'],
		},
	}}
	onshortcut={onShortcut}
/>
~~~

> [!WARNING]
> Be aware that the event listener is placed on the same node the \`shortcut\` action is attached to.
> For example, if you use the action on \`svelte:window\`, when a shortcut is triggered from an
> \`<input>\` element, calling \`stopPropagation\` or \`preventDefault\` on \`originalEvent\` might
> not result in the behavior you would expected. By the time \`trigger.callback\` or \`onshortcut\`
> event handler runs, the event has already bubbled up to \`window\`.
`}
