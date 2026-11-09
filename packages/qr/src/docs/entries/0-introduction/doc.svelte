<script lang="ts" module>
	import Demo from '../../components/demo.svelte';
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	export const metadata = defineDocPageMetadata({
		title: 'Introduction',
	});
</script>

{markdown` A solution for rendering SVG tailored to Svelte land. An example: `}

<div class="tablet:flex-row-reverse flex flex-col gap-6">
	<Demo />
	<div class="flex-1">
		{markdown`
~~~svelte src="fs:../2-svg/includes/examples/component.svelte"

~~~
		`}
	</div>
</div>

{markdown`
Read on for more rendering strategies and customisation options.

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

## Pick your Poison

> [!STEPLIST]
>
> 1. First, pick your rendering target: [SVG] or [IMG].
> 2. Next, pick a rendering strategy (later strategies in the list require more setup):
>    - **Svelte action**: quick and minimal, enough if SSR is not relevant, and especially helpful
>      when access to the target \`SVGElement\` or \`HTMLImageElement\` is needed, e.g. for styling
>      or event handling,
>    - **Svelte component**: good if component abstraction is preferred, or when SSR is a
>      requirement; no access to the element target however,
>    - **Svelte component with custom snippet**: if component is preferred, but access to element
>      target is also a requirement,
>    - **Headless utilities**: build a QR yourself.

## Kudos

This package is made possible by [headless-qr](https://github.com/Rich-Harris/headless-qr) and
heavily inspired by [bitjson/qr-code](https://github.com/bitjson/qr-code). Please check out their
work for more information.

Happy making QR!

[svg]: ../svg
[img]: ../img
`}
