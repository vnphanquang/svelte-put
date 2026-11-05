<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	export const metadata = defineDocPageMetadata({
		title: 'Migration Guides',
	});
</script>

{markdown`
## Migrating to v2 (Svelte 5 in Runes mode)

Update event directives to standard attribute (remove colon):

~~~svelte
<!-- [!code --] -->
<div on:qr:init></div>
<!-- [!code ++] -->
<div onqrinit></div>

<!-- [!code --] -->
<div on:qr:logofetch></div>
<!-- [!code ++] -->
<div onqrlogofetch></div>
~~~

Default \`slot\` for svg and img components are deprecated in favor for the \`svg\` and \`img\`
Svelte snippets, respectively:

> [!CODEGROUP]
>
> ~~~svelte #title="SVG"
> <script>
> 	import QR from '@svelte-put/qr/svg/QR.svelte';
> </script>
>
> <!-- [!code --:5] -->
> <QR let:attributes let:innerHTML>
> 	<svg {...attributes}>
> 		{@html innerHTML}
> 	</svg>
> </QR>
> <!-- [!code ++:7] -->
> <QR>
> 	{#snippet svg({ attributes, html })}
> 		<svg {...attributes}>
> 			{@html html}
> 		</svg>
> 	{/snippet}
> </QR>
> ~~~
>
> ~~~svelte #title="IMG"
> <script>
> 	import QR from '@svelte-put/qr/img/QR.svelte';
> </script>
>
> <!-- [!code --:5] -->
> <QR let:attributes let:innerHTML>
> 	<svg {...attributes}>
> 		{@html innerHTML}
> 	</svg>
> </QR>
> <!-- [!code ++:7] -->
> <QR>
> 	{#snippet img({ attributes, html })}
> 		<svg {...attributes}>
> 			{@html html}
> 		</svg>
> 	{/snippet}
> </QR>
> ~~~
`}
