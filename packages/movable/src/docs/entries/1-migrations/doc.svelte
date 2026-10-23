<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	export const metadata = defineDocPageMetadata({
		title: 'Migration Guides',
	});
</script>

{markdown`
## Migrating to v4 (Svelte 5 in Runes mode)

Update event attribute syntax to remove colon:

~~~svelte
<!-- [!code --] -->
<div use:movable on:movablestart on:movableend></div>
<!-- [!code ++] -->
<div use:movable onmovablestart onmovableend></div>
~~~
`}
