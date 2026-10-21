<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	export const metadata = defineDocPageMetadata({
		title: 'Migration Guides',
	});
</script>

{markdown`
## Migrating to v4 (Svelte 5 in Runes mode)

Change event directive \`on:clickoutside\` to standard attribute \`onclickoutside\` (remove colon).

~~~svelte
<!-- [!code --] -->
<div use:clickoutside on:clickoutside></div>
<!-- [!code ++] -->
<div use:clickoutside onclickoutside></div>
~~~

Additionally, event modifier \`|stopPropagation\` is no longer support in Svelte, either use
\`onclickcapture\` or explicitly call \`e.stopPropagation()\` in your event handler.
`}
