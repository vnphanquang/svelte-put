<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	import DemoHeadless from './includes/examples/headless.svelte';

	export const metadata = defineDocPageMetadata({
		title: 'As SVG',
	});
</script>

{markdown`
Rendering QR code with [SVGElement](https://developer.mozilla.org/en-US/docs/Web/API/SVGSVGElement).
For an explanation on what strategy to use, see [Introduction > Pick Your Poison](../#pick-your-poison).

## Action

~~~svelte src="fs:./includes/examples/action.svelte"

~~~

## Component

~~~svelte src="fs:./includes/examples/component.svelte"

~~~

## Component with Custom Snippet

~~~svelte src="fs:./includes/examples/component-with-snippet.svelte"

~~~

## Headless Utilities

\`@svelte-put/qr\` exports two top-level helpers, \`createQrSvgString\` and \`createQrSvgDataUrl\`,
that allow you to create QR code programmatically as string or
[Base64 SVG Data URL](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs),
respectively. The aforementioned helpers works in both browser and server.

This is helpful, for example, when you need more control of how the SVG is built and rendered, or
if you want to generate a downloadable SVG as in the following demo:
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
