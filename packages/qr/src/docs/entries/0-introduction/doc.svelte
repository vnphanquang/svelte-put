<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	export const metadata = defineDocPageMetadata({
		title: 'Introduction',
	});
</script>

{markdown`
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

Happy making QR!
`}
