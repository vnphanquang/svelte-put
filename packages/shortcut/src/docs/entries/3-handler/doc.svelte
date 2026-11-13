<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	export const metadata = defineDocPageMetadata({
		title: 'Handler',
		group: 'Usage',
	});
</script>

{markdown`
Handlers can be provided via either \`trigger.callback\`...

~~~svelte #typehint
<script lang="ts">
	import { shortcut, type ShortcutEventDetail } from '@svelte-put/shortcut';

	function toggleCommandPalette(detail: ShortcutEventDetail) {
		console.log('Action was placed on:', detail.node);
		console.log('Trigger:', detail.trigger);
	}
</script>

<svelte:window
	use:shortcut={{
		trigger: {
			key: 'k',
			modifier: ['ctrl', 'meta'],
			callback: toggleCommandPalette,
		},
	}}
/>
~~~

...or \`shortcut\` [CustomEvent] handler:

~~~svelte #typehint
<script lang="ts">
	import { shortcut, type ShortcutEventDetail } from '@svelte-put/shortcut';

	function handleShortcuts(event: CustomEvent<ShortcutEventDetail>) {
		if (event.detail.trigger.id === 'toggle-command-palette') {
			// ...
		}
	}
</script>

<svelte:window
	use:shortcut={{
		trigger: {
			key: 'k',
			modifier: ['ctrl', 'meta'],
			id: 'toggle-command-palette',
		},
	}}
	onshortcut={handleShortcuts}
/>
~~~

The two approaches are equivalent in functionality and depend on your aesthetic preference:

- \`trigger.callback\` is bound directly to its trigger definition, whereas
- \`onshortcut\` is a centralised event listener for all shortcuts.

In the later case, note the use of \`trigger.id\` in the example to help identify the trigger.

> [!WARNING]
> You should use only one of the two presented approaches and **NOT** both to avoid duplicate event handling.

[CustomEvent]: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent
`}
