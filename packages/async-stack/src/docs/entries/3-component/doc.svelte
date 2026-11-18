<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	import DemoResolve from './includes/demo/resolve/index.svelte';

	export const metadata = defineDocPageMetadata({
		title: 'Component',
		group: 'Usage',
	});
</script>

{markdown`
Any Svelte component can be used with \`@svelte-put/async-stack\`. However, your component should
accept an \`item\` prop that is the \`StackItem\` instance created by \`Stack\` on [push].

~~~svelte #title="my-component.svelte"
<script lang="ts">
	import type { StackItemProps } from '@svelte-put/async-stack';
	let { item }: StackItemProps<{ optionalDataForYourBusiness: '...' }> = $props();
</script>
~~~

If you follow the setup pattern introduced in [Usage > Portal][portal], the \`.render.props()\`
should already pass along the \`item\` prop to your component.

~~~svelte
{#each stack.items as item (item.config.id)}
	<item.render.component {...item.render.props()}
{/each}
~~~

The \`item\` prop has the following interface:

~~~typescript #title="StackItem.d.ts (simplified)"
interface StackItem<Resolved> {
	// the config applied on push
	config: {
		id: string;
		timeout: number;
		variant: string;
		component: import('svelte').Component;
		props?: Record<string, unknown>;
	};

	// managing timeout
	state: 'idle' | 'elapsing' | 'paused' | 'timeout' | 'resolved';
	resume: () => void;
	pause: () => void;

	// handling resolution
	resolution: Promise<Resolved | undefined>;
	resolve: (r: Resolved) => void;
}
~~~

## Timeout Management

If a \`StackItem\` has timeout specified in its config or given one when pushed, \`Stack\` sets up
a \`setTimeout\` to automatically pop it in due time.

~~~typescript
const pushed = notiStack.push('info', { timeout: 3000 });
~~~

> [!WARNING]
> A \`StackItem\` upon being timeouted will resolve with no value. Make sure you are aware of this
> if you await for its resolution somewhere else in the application.

Combining \`item.pause\`, \`item.resume\`, \`item.state\` allows more fine-grained control over the
timeout:

~~~svelte #typehint
<script lang="ts">
	import type { StackItemProps } from '@svelte-put/async-stack';
	let { item }: StackItemProps = $props();

	function toggle() {
		if (item.state === 'paused') {
			return item.resume();
		}
		return item.pause();
	}
</script>
~~~

Together, they also enable a [Live Timeout Bar](../recipes#live-timeout-bar) UI pattern discussed in "Recipes".

## Handling Resolution

Calling \`.resolve\` on the \`item\` prop will pop the item from \`Stack\` and resolve the
\`resolution\` Promise.

~~~svelte #typehint #title="confirm-notification.svelte"
<script lang="ts">
	import type { StackItemProps } from '@svelte-put/async-stack';

	let { item }: StackItemProps<boolean> = $props();

	item.resolution.then((confirmed) => {
		if (confirmed) console.log('User hit "accept"');
	});
</script>

<button onclick={() => item.resolve(true)} type="button">Accept</button>
<button onclick={() => item.resolve(false)} type="button">Deny</button>
~~~

This is helpful for rendering interactive notification; try the example below:
`}

<DemoResolve />

{markdown`
More discussion surrounding this async behavior is discussed in [Stack > Awaiting for
Resolution](../stack#awaiting-for-resolution).

### Resolution Interception

> [!SIDENOTE]
> Available since v1.2.0, but this feature is marked as "experimental" and may change.

Provide a callback to \`item.onResolve\` to intercept a resolution:

~~~typescript #typehint
import type { Component } from 'svelte';
import type { StackItem } from '@svelte-put/async-stack';
const item = {} as unknown as StackItem<Component>;
// ---cut---
const off = item.onResolve(({ resolved, cancel }) => {
	// access the value that was passed to item.resolve or stack.pop
	console.log('item was resolved with value:', resolved);

	// call cancel to abort the resolution flow;
	// note, however, other listeners will still run to completion.
	cancel();
});

off(); // unregister the callback.
~~~

This feature allows you to perform cleanup or exit animation, note:

- if multiple callbacks were registered, they will run **in parallel**,
- callback may optionally be async, in which case it will be awaited **before** the item is resolved,
- avoid async callback that are slow, e.g. heavy network fetching, which may introduce UI lag.

[setup]: ../setup
[push]: ../stack#push
[portal]: ../portal
`}
