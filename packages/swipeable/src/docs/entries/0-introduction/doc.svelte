<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	import Demo from './includes/demo.svelte';

	export const metadata = defineDocPageMetadata({
		title: 'Introduction',
	});
</script>

{markdown`
This package attempts at a resusable pattern for setting swipe gestures.

~~~svelte #typehint
<script lang="ts">
	import { swipeable, type SwipeEndEventDetail } from '@svelte-put/swipeable';

	function swipeend(e: CustomEvent<SwipeEndEventDetail>) {
		const { passThreshold, direction, distance } = e.detail;
		if (passThreshold) {
			// do something based on the swipe direction
		}
	}
</script>

<!-- listen for swipe left and swipe right -->
<div use:swipeable style:left="var(--swipe-distance-x)">...</div>
~~~

The following example demonstrates a practial use case often seen in notification center or email:
`}

<Demo />

{markdown`
Read on for more rendering strategies and customisation options.

## Installation

> [!CODEGROUP] \`#file-icon=false\`
>
> ~~~bash #title=npm
> npm install --save-dev @svelte-put/qr
> ~~~
>
> ~~~bash #title=pnpm
> pnpm add -D @svelte-put/qr
> ~~~
>
> ~~~bash #title=yarn
> yarn add -D @svelte-put/qr
> ~~~

Happy swiping!
`}
