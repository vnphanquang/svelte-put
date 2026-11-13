<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	import DemoPatternRune from './includes/examples/pattern-rune.svelte';
	import DemoScrollContainer from './includes/examples/scroll-container.svelte';

	export const metadata = defineDocPageMetadata({
		title: 'Usage',
	});
</script>

{markdown`
The \`lockscroll\` action takes a Svelte rune.

~~~svelte
<script lang="ts">
	import { lockscroll } from '@svelte-put/lockscroll';
	let locked = $state(true);
</script>

<svelte:body use:lockscroll={locked} />
~~~

Usually, it can be helpful to encapsulate the \`locked\` state with some dedicated operation for
reusability. The following shows a possible patterns:

~~~svelte src="fs:./includes/examples/pattern-rune.svelte#L1-L17"

~~~
`}

<DemoPatternRune />

{markdown`
## Locking a Scroll Container

In the previous demo, \`lockscroll\` is used on
[svelte:body](https://svelte.dev/docs/svelte/svelte-body). In practice, it can be used on any
[scroll container](https://developer.mozilla.org/en-US/docs/Glossary/Scroll_container).

~~~svelte
<section use:lockscroll>...</section>
~~~

An example is shown as follow:
`}

<DemoScrollContainer />

{markdown`
## Toggle Event

When lock scroll state changes, a lockscroll:toggle
[CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) is fired from the
element the action is placed on.

~~~svelte #typehint src="fs:./includes/examples/event.svelte"

~~~
`}
