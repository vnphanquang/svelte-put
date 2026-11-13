<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	export const metadata = defineDocPageMetadata({
		title: 'Introduction',
	});
</script>

{markdown`
This package attempts at a reusable and minimal runtime abstraction for managing keyboard shortcuts.

~~~svelte
<script lang="ts">
	import { shortcut, type ShortcutEventDetail } from '@svelte-put/shortcut';

	function handleK(detail: ShortcutEventDetail) {
		console.log('attached node:', detail.node);
		console.log('original trigger config:', detail.trigger);
	}
</script>

<svelte:window
	use:shortcut={{
		trigger: {
			key: 'k',
			modifier: ['ctrl', 'meta'],
			callback: handleK,
		},
	}}
/>
~~~

Read on for more examples and customistation options.

## Installation

> [!CODEGROUP] \`#file-icon=false\`
>
> ~~~bash #title=npm
> npm install --save-dev @svelte-put/shortcut
> ~~~
>
> ~~~bash #title=pnpm
> pnpm add -D @svelte-put/shortcut
> ~~~
>
> ~~~bash #title=yarn
> yarn add -D @svelte-put/shortcut
> ~~~

Happy making shortcuts! 👨‍💻
`}
