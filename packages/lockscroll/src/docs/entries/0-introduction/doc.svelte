<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	export const metadata = defineDocPageMetadata({
		title: 'Introduction',
	});
</script>

{markdown`
This package attempts at a reusable and minimal runtime abstraction to lock scroll and hide
scrollbar, globally or within a scroll container:

~~~svelte
<script>
	import { lockscroll } from '@svelte-put/lockscroll';

	let locked = $state(false);
	function toggleLockScroll() {
		locked = !locked;
	}
</script>

<svelte:body use:lockscroll={locked} />
<button onclick={toggleLockScroll}>Lock scroll</button>
~~~

Read on for more examples and guidelines.

## Installation

> [!CODEGROUP] \`#file-icon=false\`
>
> ~~~bash #title=npm
> npm install --save-dev @svelte-put/lockscroll
> ~~~
>
> ~~~bash #title=pnpm
> pnpm add -D @svelte-put/lockscroll
> ~~~
>
> ~~~bash #title=yarn
> yarn add -D @svelte-put/lockscroll
> ~~~

Happy scrolling (or not)! 👨‍💻
`}
