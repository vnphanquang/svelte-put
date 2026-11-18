<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	import DemoAwait from './includes/demo/await.svelte';

	export const metadata = defineDocPageMetadata({
		title: 'Stack',
		group: 'Usage',
	});
</script>

{markdown`
At the core of \`@svelte-put/async-stack\` is \`Stack\`, it holds logic for the async \`push\`
& \`pop\` mechanism.

## Initialisation

A \`Stack\` instance is created using a builder pattern as follow:

~~~typescript
import { stack } from '@svelte-put/async-stack';

export const notiStack = stack({/** optional common config, shared by all notifications */})
	.addVariant('name' /* specific config for notification of this variant */)
	.build(); // remember to call this to build the actual stack;
~~~

This provides type-safety for \`push\` invocations. The \`stack\` helper accepts an optional config
object that will be merged with all \`StackItem\` instance config upon \`push\`. The defaults are
shown as follows:

~~~typescript #typehint
import { stack } from '@svelte-put/async-stack';
//---cut---
stack({
	timeout: 0, // default: no timeout
	id: 'uuid', // generate with crypto.randomUUID if available
});
~~~

A \`Stack\` instance may be wrapped in a [Svelte context] for better encapsulation. See
[Recipes][recipes.context] for an example.

## Predefined Variants

Use the \`addVariant\` method to add a predefined config, allowing quick push with minimal ad-hoc
configuration. The first parameter is a unique variant name; the second accepts either a Svelte
component or a config object.

~~~typescript #typehint
import { stack } from '@svelte-put/async-stack';
import type { Component } from 'svelte';
const notiStack = stack();
const Notification = (() => {}) as unknown as Component<{
	title?: string;
	content?: string;
}>;
// ---cut---
// given an example Notification Svelte component:
notiStack.addVariant('info', Notification);
// or
notiStack.addVariant('info', {
	component: Notification,
	props: {
		content: 'a predefined notification',
	},
	id: () => 'a-custom-id',
	timeout: 4000,
});
~~~

> [!WARNING]
> If your component expects some required props, make sure to provide them in the variant config.

## Push

Push a \`StackItem\` onto the stack by calling the \`push\` method. A \`push\` call takes either one
of the predefined variant as a string...

~~~typescript
notiStack.push('info', {/* optional overrides */});
~~~

...or the \`'custom'\` variant, helpful for one-off / ad-hoc push:

~~~typescript
notiStack.push('custom', {
	component: OneTimeNotification, // required [!code warning]
	props: {/** pass necessary data to OneTimeNotification */},
});
~~~

> [!WARNING]
> A \`custom\` push mush provide a component in its argument.

If you find that the \`push\` interface is too verbose (it is, by design), you can create
your own proxies.

~~~typescript
export const info = (content: string) => notiStack.push('info', { props: { content } });
// later
info('An actual info notification');
~~~

## Pop

Pop an active \`StackItem\` either from within the component (typically following user
interactions), by calling \`resolve\` from the **injected** \`item\` prop...

~~~svelte #typehint #title="confirm-notification.svelte"
<script lang="ts">
	import type { StackItemProps } from '@svelte-put/async-stack';

	let { item }: StackItemProps<{ confirmed: boolean }> = $props();

	const confirm = () => item.resolve({ confirmed: true });
	const cancel = () => item.resolve({ confirmed: false });
</script>

<!-- ...truncated... -->
~~~

...or via the \`pop\` method on the \`Stack\` instance:

~~~typescript
// pop the topmost notification
notiStack.pop();

// pop a specific notification
notiStack.pop('specific-id');

// pop a specific notification with custom resolution value
notiStack.pop('id', { confirmed: true });

// alternatively, provide arguments as object
notiStack.pop({
	resolved: { confirmed: false },
}); // pop the topmost notification with custom resolution value
~~~

\`Stack.pop\` returns the popped \`StackItem\` instance, or \`null\` if no item with the provided
\`id\` is found. You can set id in the push config, and get it back from the returned object:

~~~typescript
const pushed = notiStack.push('info', { id: 'my-id' });
const popped = notiStack.pop(pushed.config.id); // or just 'my-id'
assert(pushed === popped);
~~~

### Typescript Support

To provide typing for a \`Stack.pop\` call, pass type of your component as the generic argument.
This also helps infer the \`resolution\` type:

~~~typescript #typehint
import { stack, type StackItemProps } from '@svelte-put/async-stack';
import type { Component } from 'svelte';
const notiStack = stack().build();
const ConfirmNotification = (() => {}) as unknown as Component<
	StackItemProps<{
		confirmed?: string;
	}>
>;
// ---cut---
const popped = notiStack.pop<typeof ConfirmNotification>('id');
if (popped) {
	const resolution = await popped.resolution;
	if (resolution) {
		console.log(resolution.confirmed);
	}
}
~~~

See [Awaiting for Resolution](#awaiting-for-resolution) for more information.

## Awaiting For Resolution

A \`StackItem\` instance is _resolved_ when it is popped from a \`Stack\`. This resolution is a
[Promise] whose resolved value is the argument passed to either \`Stack.pop\` or
\`StackItem.resolve\`, as explained in [Pop](#pop). This is especially helpful for interative
notification.

~~~typescript #typehint
import { stack, type StackItemProps } from '@svelte-put/async-stack';
import type { Component } from 'svelte';
const ConfirmNotification = (() => {}) as unknown as Component<
	StackItemProps<{
		confirmed?: string;
	}>
>;
const notiStack = stack().addVariant('confirm', ConfirmNotification).build();
// ---cut---
const pushed = notiStack.push('confirm');
const resolved = await pushed.resolution;
~~~

To provide typing for \`resolution\`, simply extend the \`StackItemProps\` from the component's props.
The generic argument passed to \`StackItemProps\` is the type of \`resolution\`'s Promise resolved value:

~~~svelte #title="confirm-notification.svelte"
<script lang="ts">
	import type { StackItemProps } from '@svelte-put/async-stack';

	let { item }: StackItemProps<{ confirmed: boolean }> = $props();
	// typeof item.resolution === Promise<{ confirmed: boolean }>
</script>
~~~

In the following example, try pressing the button and observe the async nature of the push & pop
mechanism.
`}

<DemoAwait />

{markdown`
~~~svelte src="fs:./includes/examples/await.svelte"

~~~

See [Component > Handling Resolution](../component#handling-resolution) for a perspective from
within the component.

## Global Timeout Management

\`Stack\` exposes two methods for controling timeout, \`.pause\` and \`.resume\`, that are proxies
to the methods of same names on \`StackItem\`, as explained in [Component > Timeout
Management](../component#timeout-management)...

~~~typescript
notiStack.pause(pushed.id); // same as calling item.pause within component
notiStack.resume(pushed.id); // same as calling item.resume within component
~~~

...except when no \`id\` is specified, in which case they will apply to **all active**
\`StackItem\` instances.

~~~typescript
notiStack.pause(); // pausing all items
notiStack.resume(); // resuming all items
~~~

[Svelte context]: https://svelte.dev/docs/svelte#setcontext
[recipes.context]: ../recipes#wrapping-stack-in-svelte-context
[Promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
`}
