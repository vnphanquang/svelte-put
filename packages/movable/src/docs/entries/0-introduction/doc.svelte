<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	import Demo from './includes/examples/demo.svelte';

	export const metadata = defineDocPageMetadata({
		title: 'Introduction',
	});
</script>

{markdown`
Sometimes, design calls for capability to move certain elements around the screen. This package was
developed to afford such requirement; originally, it was to support user to move dialogs around so
that they can still see the rest of the content on the page.

In the example below, try dragging the blue box around:
`}

<Demo />

{markdown`
## Installation

> [!CODEGROUP] \`#file-icon=false\`
>
> ~~~bash #title=npm
> npm install --save-dev @svelte-put/movable
> ~~~
>
> ~~~bash #title=pnpm
> pnpm add -D @svelte-put/movable
> ~~~
>
> ~~~bash #title=yarn
> yarn add -D @svelte-put/movable
> ~~~

## QuickStart

~~~svelte #typehint
<script lang="ts">
	import { movable } from '@svelte-put/movable';
</script>

<div use:movable>...</div>
~~~

Happy moving!
`}
