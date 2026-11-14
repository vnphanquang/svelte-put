<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	export const metadata = defineDocPageMetadata({
		title: 'Migration Guides',
	});
</script>

{markdown`
## Migrating to v1 (Svelte 5 in Runes mode)

Update event directives to standard attribute (remove colon):

~~~svelte
<!-- [!code --] -->
<div on:turnstile></div>
<!-- [!code ++] -->
<div onturnstile></div>
~~~
`}
