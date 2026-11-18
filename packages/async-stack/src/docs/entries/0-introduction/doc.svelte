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
component library and application, providing type-safe mechanism to render components from anywhere
to a centralised DOM parent element.

![The minimal role of async-stack: managing just the async operations of forwarding
components to where they should render.](./includes/images/intro.png)

The original use case for this package was to facillitate a centralised strategy for in-app push
notification and dialogs / modals, specifically one that requires an async workflow:

~~~typescript
function do_business() {
	// do some stuff ...

	const pushed = noti.push('info');
	const { confirmed } = await pushed.resolution;
	if (confirmed) {
		// then do more stuff
	}
}
~~~

> [!INFO]
> Throughout this documentation, examples will be in the form of rendering notifications.

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
