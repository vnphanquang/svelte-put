<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	import DemoMinimal from './includes/examples/demo-minimal.svelte';
	import DemoTrigger from './includes/examples/demo-trigger.svelte';
	import DemoTextCallback from './includes/examples/demo-text-callback.svelte';
	import DemoSynthetic from './includes/examples/demo-synthetic.svelte';

	export const metadata = defineDocPageMetadata({
		title: 'Usage',
	});
</script>

{markdown`
By default, \`copy\` will trigger a \`click\` <sup class="c-num">1</sup> event listener on
the same node <sup class="c-num">2</sup> it is used on. The triggered listener will then copy
[innerText](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/innerText) of said node
<sup class="c-num">3</sup> to the default clipboard.
`}

<DemoMinimal />

{markdown`
~~~svelte
<script>
	import { copy } from '@svelte-put/copy';
</script>

<button use:copy type="button">Click to copy this</button>
~~~

The next sections show how <span class="c-num">1</span>, <span class="c-num">2</span>, and
<span class="c-num">3</span> can be customised.

## 1. Event Type

Pass one or more event types to the \`event\` option:

~~~svelte #typehint $class=" no-line-number" src="fs:./includes/examples/custom-event.svelte"

~~~

## 2. Trigger

The \`trigger\` option, typically an \`HTMLElement\`, specifies the node to which the event listener
is attached. A typical use case is clicking on a node to copy text within some other node. In the
demo below, try clicking on the left button to copy text in the <span class="border-yellow-500
	border px-2">yellow</span>-bordered box.
`}

<DemoTrigger />

{markdown`
~~~svelte #typehint $class=" no-line-number" src="fs:./includes/examples/custom-trigger.svelte"

~~~

## 3. Target Text

The \`text\` option can receive a **literal** string or a sync/async **callback** that returns the
string to be copied. By default, it is the \`innerText\` of the node the action is placed on.

### Literal

~~~svelte #typehint
<script lang="ts">
	import { copy } from '@svelte-put/copy';
</script>

<!-- ---cut--- -->
<button use:copy={{ text: 'some static text' }} type="button">Click to copy</button>
~~~

### Callback
`}

<DemoTextCallback />

{markdown`
Here, the callback parameters contains information about the forwarded event and references to
relevant elements:

~~~svelte #typehint src="fs:./includes/examples/custom-text.svelte"

~~~

> [!SIDENOTE]
> Notice the \`generic\` argument to \`TextResolverInput\`, which depends on the [event type](#1-event-type)
> being used.

## Simulating Copy Event

Set the \`synthetic\` option to \`true\` to dispatch a "fake" [copy
event](https://developer.mozilla.org/en-US/docs/Web/API/Element/copy_event) alongside the
\`copied\`, should that be of any use.

~~~svelte #typehint src="fs:./includes/examples/synthetic.svelte"

~~~
`}

<DemoSynthetic />

{markdown`
> [!WARNING]
> Note that since this synthetic copy event is not "real", write operations on clipboardData will
> have no effect on the actual copied text.

## Generic Helper

Behind the scene, copy uses the \`copyToClipboard\` helper. You may use this utility directly to
build a custom solution to your exact need.

~~~typescript #typehint
import { copyToClipboard } from '@svelte-put/copy';

export function customCopy(text: string) {
	copyToClipboard(text);
}
~~~

Or, use the implementation of \`copyToClipboard\` at your convenience:

~~~javascript #title="copy-to-clipboard.js" src="fs:../../../lib/copy.helpers.js"

~~~
`}
