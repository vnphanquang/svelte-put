<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	export const metadata = defineDocPageMetadata({
		title: 'Introduction',
	});
</script>

{markdown`
This package attempts at a reusable and minimal runtime abstraction that wraps [ResizeObserver].

~~~svelte
<script lang="ts">
	import { resize, type ResizeDetail } from '@svelte-put/resize';

	function onResized(e: CustomEvent<ResizeDetail>) {
		const {
			observer, // see https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
			entry, // see https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry
		} = e.detail;
	}
</script>

<div use:resize onresized={onResized} />
~~~

Read on for more guidelines and examples.

## Installation

> [!CODEGROUP] \`#file-icon=false\`
>
> ~~~bash #title=npm
> npm install --save-dev @svelte-put/resize
> ~~~
>
> ~~~bash #title=pnpm
> pnpm add -D @svelte-put/resize
> ~~~
>
> ~~~bash #title=yarn
> yarn add -D @svelte-put/resize
> ~~~

Happy resizing! 👨‍💻

[ResizeObserver]: https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
`}
