<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	import Demo from './includes/examples/demo.svelte';

	export const metadata = defineDocPageMetadata({
		title: 'Introduction',
	});
</script>

{markdown`
\`@svelte-put/clickoutside\` provides a **runtime** enhancement to listen for click events outside
a node. It is typically used to implement click-on-backdrop feature for custom dialog/modal/popover
augmentation. When possible, however, prefer platform standards such as [HTML dialog](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog)
and [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API).
`}

<Demo />

{markdown`
## Installation

> [!CODEGROUP] \`#file-icon=false\`
>
> ~~~bash #title=npm
> npm install --save-dev @svelte-put/clickoutside
> ~~~
>
> ~~~bash #title=pnpm
> pnpm add -D @svelte-put/clickoutside
> ~~~
>
> ~~~bash #title=yarn
> yarn add -D @svelte-put/clickoutside
> ~~~

## QuickStart

~~~svelte #typehint
<script lang="ts">
	import { clickoutside } from '@svelte-put/clickoutside';

	function doSomething(e: CustomEvent<MouseEvent>) {
		console.log(e.target);
	}
</script>

<div use:clickoutside onclickoutside={doSomething}>...</div>
~~~

Happy clicking!
`}
