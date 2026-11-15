<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	export const metadata = defineDocPageMetadata({
		title: 'Introduction',
	});
</script>

{markdown`
\`@svelte-put/async-stack\` is no more than a
[stack](<https://en.wikipedia.org/wiki/Stack_(abstract_data_type)>) structure that sits between your
component library and application, providing type-safe push&pop mechanism to mount/unmount
components from anywhere to a centralized DOM parent element.

~~~svelte src="fs:./includes/examples/intro.svelte"

~~~

Read on for more examples and guidelines.

## Installation

> [!CODEGROUP] \`#file-icon=false\`
>
> ~~~bash #title=npm
> npm install --save-dev @svelte-put/async-stack
> ~~~
>
> ~~~bash #title=pnpm
> pnpm add -D @svelte-put/async-stack
> ~~~
>
> ~~~bash #title=yarn
> yarn add -D @svelte-put/async-stack
> ~~~

Happy stacking! 👨‍💻
`}
