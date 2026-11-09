<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	import DemoHeadless from './includes/examples/headless.svelte';
	import DemoBackgroundFill from './includes/examples/background-fill.svelte';

	export const metadata = defineDocPageMetadata({
		title: 'As IMG',
	});
</script>

{markdown`
Rendering QR code with [HTMLImageElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement).
For an explanation on what strategy to use, see [Introduction > Pick Your Poison](../#pick-your-poison).

> [!SUCCESS]
> Since **v1.2.0**, \`@svelte-put/qr\` renders a base64 PNG image for \`img\` in the browser using the
> Canvas API. On the server (i.e during prerendering and SSR), however, it will render a base64
> SVG instead, since canvas is not available there.
>
> The rendered PNG has the default size of 1000x1000, it is recommended that you specify \`width\`
> and \`height\` explicitly.

## Action

~~~svelte src="fs:./includes/examples/action.svelte"

~~~

## Component

~~~svelte src="fs:./includes/examples/component.svelte"

~~~

## Component with Custom Snippet

~~~svelte src="fs:./includes/examples/component-with-snippet.svelte"

~~~

## Customising Background Fill

IMG strategies accept an additional option named \`backgroundFill\`:
`}

<div class="tablet:flex-row-reverse flex flex-col gap-6">
	<div>
		<DemoBackgroundFill />
	</div>
	<div class="flex-1">
		{markdown`
~~~svelte src="fs:./includes/examples/background-fill.svelte"

~~~
		`}
	</div>
</div>

{markdown`
For other customisation options, make sure to check out [Interactive Playground](../playground).

## Headless Utilities

In case you want to create a
[base64 PNG data URL](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs)
QR code programmatically, \`@svelte-put/qr\` exports a top-level helper named \`createQrPngDataUrl\`
for your convenience. This is helpful, for example, if you want to generate a downloadable link as
in the following demo.
`}

<div class="tablet:flex-row-reverse flex flex-col gap-6">
	<DemoHeadless />
	<div class="flex-1">
		{markdown`
~~~svelte src="fs:./includes/examples/headless.svelte" #typehint

~~~
		`}
	</div>
</div>
