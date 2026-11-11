<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	import Demo from './includes/demo.svelte';

	export const metadata = defineDocPageMetadata({
		title: 'Introduction',
	});
</script>

{markdown`
This package attempts at a headless runtime abstraction to set up drag-to-scroll behavior for
pointer device.

~~~svelte
<script>
	import { dragscroll } from '@svelte-put/dragscroll';
</script>

<div use:dragscroll={{ axis: 'both' }}>...</div>
~~~

In the example below, try scrolling the chessboard-patterned box by dragging your
pointer within it.
`}

<Demo />

{markdown`
Read on for more examples and customistation options.

## Installation

> [!CODEGROUP] \`#file-icon=false\`
>
> ~~~bash #title=npm
> npm install --save-dev @svelte-put/dragscroll
> ~~~
>
> ~~~bash #title=pnpm
> pnpm add -D @svelte-put/dragscroll
> ~~~
>
> ~~~bash #title=yarn
> yarn add -D @svelte-put/dragscroll
> ~~~

Happy dragging! 👨‍💻
`}
