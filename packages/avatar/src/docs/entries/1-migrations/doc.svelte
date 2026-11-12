<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	export const metadata = defineDocPageMetadata({
		title: 'Migration Guides',
	});
</script>

{markdown`
## Migrating to v4 (Svelte 5 in Runes mode)

Simply update default [slot](https://svelte.dev/docs/special-elements#slot) to \`img\`
[snippet](https://svelte.dev/docs/svelte/snippet):

~~~svelte
<Avatar let:alt let:src let:size let:sources> <!-- [!code --] -->
<Avatar> <!-- [!code ++] -->
	{#snippet img({ src, size, alt, sources })} <!-- [!code ++] -->
		<img {src} {alt} width={size} height={size} data-sources={sources} />
	{/snippet} <!-- [!code ++] -->
</Avatar>
~~~
`}
