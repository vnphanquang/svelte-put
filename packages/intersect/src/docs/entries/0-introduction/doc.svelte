<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	export const metadata = defineDocPageMetadata({
		title: 'Introduction',
	});
</script>

{markdown`
This package attempts at a runtime abstraction that wraps
[IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver).

~~~svelte #typehint src="fs:../2-usage/includes/examples/intersect.svelte"

~~~

Read on for more examples and customistation options.

## Installation

> [!CODEGROUP] \`#file-icon=false\`
>
> ~~~bash #title=npm
> npm install --save-dev @svelte-put/intersect
> ~~~
>
> ~~~bash #title=pnpm
> pnpm add -D @svelte-put/intersect
> ~~~
>
> ~~~bash #title=yarn
> yarn add -D @svelte-put/intersect
> ~~~

## Acknowledgement

This packages employs [Svelte action](https://svelte.dev/docs/svelte-action). If you are looking for
a declarative, component-oriented solution, check out [metonym's
implementation](https://github.com/metonym/svelte-intersection-observer).

Happy intersecting! 👨‍💻
`}
