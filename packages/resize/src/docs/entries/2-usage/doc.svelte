<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	import Demo from './includes/demo.svelte';

	export const metadata = defineDocPageMetadata({
		title: 'Usage',
	});
</script>

{markdown`
The following example is ported from [one seen in MDN
Docs](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry/contentBoxSize#examples),
where \`border-radius\` will scale in proportion to the size of the box.
`}

<Demo />

{markdown`
## Configuration

\`resize\` accepts a config object with the following interface:

~~~typescript src="fs:../../../lib/types.public.d.ts#L28-L47"

~~~

## Event

A \`resized\` [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) is fired
when observed resize occurs. It is similar to the callback passed to [ResizeObserver] constructor,
except with a single [ResizeObserverEntry]:

~~~svelte #typehint
<script lang="ts">
	import { resize, type ResizeDetail } from '@svelte-put/resize';

	function onResized(e: CustomEvent<ResizeDetail>) {
		const { observer, entry } = e.detail;
	}
</script>

<div use:resize onresized={onResized} />
~~~

## Browser Support & Polyfill

As of this writing, [caniuse](https://caniuse.com/resizeobserver) shows that \`ResizeObserver\` is
supported by all major browsers, but not IE11. \`@svelte-put/resize\` tries to stay minimal and
hence does not include a polyfill. If one is needed, consider [resize-observer-polyfill].

[ResizeObserver]: https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver/ResizeObserver
[ResizeObserverEntry]: https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry
`}
