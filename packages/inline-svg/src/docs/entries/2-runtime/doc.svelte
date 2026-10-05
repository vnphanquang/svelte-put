<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	import Demo from './includes/demo.svelte';

	export const metadata = defineDocPageMetadata({
		title: 'Runtime - Dynamic - Svelte Action',
	});
</script>

{markdown`
This strategy is useful when:

- you don't know in advance what SVGs to inline until runtime
  (after app/site is loaded or data is fetched in browser), or
- if your SVG is large in size and only conditionally rendered.

For static icons and pictograms, consider the [compile-time strategy][compile-time] instead.

[compile-time]: ../compile-time

## Quick Start
`}

<div class="flex items-center justify-between gap-10">
	<p>
		The Svelte logo SVG on the right is dynamically fetched via network at <strong>runtime </strong>
		upon page load. Notice in the source code below, only `width` (or `height`) needs to be specified.
		By default, `inlineSvg` will calculate the other dimension the keep the aspect ratio.
	</p>
	<div>
		<Demo />
	</div>
</div>

{markdown`
~~~svelte #title="demo.svelte" src="fs:./includes/demo.svelte"

~~~

> [!WARNING]
> The \`inlineSvg\` action only works if used on \`<svg>\`, for obvious reason.

## Attributes and Inner HTML

Attributes provided to the \`svg\` element where \`inlineSvg\` is placed on will replace existed
ones from the original SVG. On the contrary, its inner HTML will be completely replaced.
Take the following SVG as an example:

~~~html title=https://example.com/original.svg
<svg viewBox="0 0 24 24" width="24" height="24" stroke-width="2">
	<!-- truncated original svg innerHTML -->
</svg>
~~~

And \`inlineSvg\` is used as follows:

~~~svelte title=source.svelte
<svg use:inlineSvg={'https://example.com/original.svg'} height="16" stroke-width="1">
	<!-- some innerHTML -->
</svg>
~~~

The resulting SVG at runtime will be:

~~~html title = rendered.html
<svg viewBox="0 0 24 24" width="16" height="16" stroke-width="1">
	<!-- truncated original svg innerHTML -->
</svg>
~~~

> [!INFO] \`$class=" i-[ph--lightbulb]"\`
> If you have a use case where it is useful to append/prepend the innerHTML of the original SVG rather than replacing it, please [raise an issue over at github](https://github.com/vnphanquang/svelte-put/issues). For now, let's keep things simple.

## API

The \`inlineSvg\` action takes either a string as the remote SVG url, or a config object with some
more options. The code snippet below shows default options with type hinting. If you are using a
pointer device, try hovering to see more information. To avoid being verbose, please utilise language
server during development.

~~~svelte #typehint
<script lang="ts">
	import { inlineSvg } from '@svelte-put/inline-svg';
</script>

<svg
	use:inlineSvg={{
		src: '', // this is required
		cache: 'no-cache',
		autoDimensions: true,
		transform: (svg) => svg,
	}}
></svg>
~~~
`}
