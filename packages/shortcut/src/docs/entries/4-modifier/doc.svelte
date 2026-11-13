<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	export const metadata = defineDocPageMetadata({
		title: 'Modifier',
		group: 'Usage',
	});
</script>

{markdown`
Each \`ShortcutTrigger\` can specify either one or multiple modifiers (\`ctrl\`, \`meta\`, \`alt\`,
\`shift\`) via \`trigger.modifier\` in both \`AND\` & \`OR\` fashions.

## Catch All

When left as \`undefined\`, \`trigger.modifier\` means "do't check for modifiers".

~~~typescript #typehint
import type { ShortcutTrigger } from '@svelte-put/shortcut';
// ---cut---
const trigger: ShortcutTrigger = { key: 'k' };
~~~

## No Modifier

> [!SIDENOTE]
> Available since [v4.1.0](https://github.com/vnphanquang/svelte-put/releases/tag/%40svelte-put%2Fshortcut%404.1.0)

Set \`trigger.modifier\` to \`false\` or \`null\` for keys that expect **no** modifier.

~~~typescript #typehint
import type { ShortcutTrigger } from '@svelte-put/shortcut';
// ---cut---
const trigger: ShortcutTrigger = {
	key: 'Escape',
	modifier: false, // [!code info]
};
~~~

## Single Modifier

Set \`trigger.modifier\` to one of the modifiers (\`ctrl\`, \`meta\`, \`alt\`, \`shift\`) to listen
for that modifier.

~~~typescript #typehint
import type { ShortcutTrigger } from '@svelte-put/shortcut';
// ---cut---
const trigger: ShortcutTrigger = {
	key: 'k',
	modifier: 'ctrl', // [!code info]
};
~~~

## One of Many Modifiers (OR)

Use a flat array of modifiers to trigger when **one of them** is pressed.

~~~typescript #typehint
import type { ShortcutTrigger } from '@svelte-put/shortcut';
// ---cut---
const trigger: ShortcutTrigger = {
	key: 'k',
	modifier: ['ctrl', 'meta'], // [!code info]
};
~~~

## All of Modifiers (AND)

Wrap multiple modifiers in a subarray to trigger only when **all modifiers** are pressed at the same
time.

~~~typescript #typehint
import type { ShortcutTrigger } from '@svelte-put/shortcut';
// ---cut---
const trigger: ShortcutTrigger = {
	key: 'K',
	modifier: [['ctrl', 'shift']], // [!code info]
};
~~~

> [!INFO]
> Notice that the \`key\` option in the above example is set to a **capital K**. This is because
> \`shift\` is specified as a modifier; when \`shift\` and \`k\` are pressed down at the same time,
> [KeyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key) value will
> be \`K\`. You can use [this site](https://www.toptal.com/developers/keycode) to test your key
> combinations.

## Explicit No Modifier

> [!SIDENOTE]
> Available since [v4.2.0](https://github.com/vnphanquang/svelte-put/releases/tag/%40svelte-put%2Fshortcut%404.2.0)

Add \`'none'\` to also match when no modifier is pressed.

~~~typescript #typehint
import type { ShortcutTrigger } from '@svelte-put/shortcut';
// ---cut---
const trigger: ShortcutTrigger = {
	key: 'x',
	modifier: ['none', 'ctrl', 'meta'], // [!code word:none]
};
~~~

## Mix & Match

Use a combination of \`OR\` and \`AND\` to create complex modifier combinations.

~~~typescript #typehint
import type { ShortcutTrigger } from '@svelte-put/shortcut';
// ---cut---
const trigger: ShortcutTrigger = {
	key: 'Delete',
	modifier: [['ctrl', 'alt'], 'meta'], // [!code info]
};
~~~
`}
