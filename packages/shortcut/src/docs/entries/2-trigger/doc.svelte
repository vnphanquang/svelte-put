<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	export const metadata = defineDocPageMetadata({
		title: 'Trigger',
		group: 'Usage',
	});
</script>

{markdown`
The \`trigger\` option take either a single trigger definition...

~~~svelte #typehint
<script lang="ts">
	import { shortcut } from '@svelte-put/shortcut';
</script>

<!-- ---cut--- -->
<svelte:window use:shortcut={{ trigger: { key: 'k', modifier: 'ctrl' } }} />
~~~

...or and array of such...

~~~svelte #typehint
<script lang="ts">
	import { shortcut } from '@svelte-put/shortcut';
</script>

<!-- ---cut--- -->
<svelte:window
	use:shortcut={{
		trigger: [
			{ key: 'c', modifier: 'ctrl' },
			{ key: 'v', modifier: 'ctrl' },
		],
	}}
/>
~~~

## Code vs Key

> [!SIDENOTE]
> Available since [v4.2.0](https://github.com/vnphanquang/svelte-put/releases/tag/%40svelte-put%2Fshortcut%404.2.0).
> Note that \`trigger.code\` is marked as experimental since \`KeyboardEvent.code\` may not be
> supported in all browsers at the time of this writing (2026)

You can specify \`trigger.code\` instead of \`trigger.key\` to use
[KeyboardEvent.code](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code) for
matching. This is useful for keys that have different \`key\` values depending on the keyboard
layout, or if you care about where the key is physically located.

~~~typescript #typehint
import type { ShortcutTrigger } from '@svelte-put/shortcut';
// ---cut---
const trigger: ShortcutTrigger = {
	code: 'KeyK',
	modifier: ['ctrl', 'meta'],
};
~~~

> [!WARNING]
> You should use either \`trigger.key\` or \`trigger.code\`, but not both. If both are specified,
> \`trigger.code\` will take precedence.
`}
