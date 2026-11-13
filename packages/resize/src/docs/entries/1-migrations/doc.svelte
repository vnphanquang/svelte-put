<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	export const metadata = defineDocPageMetadata({
		title: 'Migration Guides',
	});
</script>

{markdown`
## Migrating to v4 (Svelte 5 in Runes mode)

Update event directives to standard attribute (remove colon):

~~~svelte
<!-- [!code --] -->
<div use:resize on:resized></div>
<!-- [!code ++] -->
<div use:resize onresized></div>
~~~
`}
