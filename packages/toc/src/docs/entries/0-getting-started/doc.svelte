<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	export const metadata = defineDocPageMetadata({
		title: 'Getting Started',
	});
</script>

{markdown`
Over the years, i struggled to find a Table-of-Contents solution that is convenient to set up
without runtime penalty (JS dependency) or locked-in UI pattern. This library is my take; it is not
perfect but has evolved throughout its versions to now be able to:

- At [compile time][compile-time] (optionally, recommended for static content):

> [!STEPLIST]
>
> 1. search for matching tags, e.g. h2 through h6,
> 2. slugify the text content into \`id\` attribute,
> 3. add anchor tag, supporting a typical # pattern as in Github markdown headings,
> 4. populate collected items to be used at runtime.

- At runtime:

> [!STEPLIST]
>
> 1. track visiblity of "active" content using the [View Timeline] API, **no Javascript required**,
> 2. optionally perform an equivalence of steps 1-3 in compile-time, for dynamic runtime-only content.

> [!INFO]
> The Table-of-Contents on this very page is powered by \`@svelte-put/toc\`. Try [disabling
> Javascript](https://developer.chrome.com/docs/devtools/javascript/disable) to see if it still works.

## Acknowledgement

This package employs a headless approach and attempts to stay minimal. If you are looking for a
declarative, component-oriented solution, check out [janosh/svelte-toc](https://github.com/janosh/svelte-toc).

## Installation

> [!CODEGROUP] \`#file-icon=false\`
>
> ~~~bash #title=npm
> npm install --save-dev @svelte-put/toc
> ~~~
>
> ~~~bash #title=pnpm
> pnpm add -D @svelte-put/toc
> ~~~
>
> ~~~bash #title=yarn
> yarn add -D @svelte-put/toc
> ~~~

If you are upgrading, make sure to head to [Migrations](../migrations) for more detailed guides.

## Example Setup

Say i have the following content that i want to index for a Table-of-Contents:

~~~html #title="content.svelte" src="fs:./includes/examples/input.svelte"

~~~

Next, set up the \`Toc\` instance:

~~~svelte #title="content.svelte" src="fs:./includes/examples/setup.svelte"

~~~

That's it, the remaining work is to style the page as needed. The DOM at runtime will look something
like this:

~~~html src="fs:./includes/examples/output.svelte"

~~~

Read on for more information, or see [Compile-time] if your content is completely static.

[Svelte preprocessor]: https://svelte.dev/docs/svelte-compiler#preprocess
[compile-time]: ../compile-time
[runtime]: ../runtime
[View Timeline]: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/view-timeline
`}
