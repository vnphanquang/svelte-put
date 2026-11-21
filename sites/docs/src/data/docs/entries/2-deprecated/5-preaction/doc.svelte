<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	export const metadata = defineDocPageMetadata({
		group: 'Deprecated',
		title: 'preaction',
	});
</script>

{markdown`
> [!INFO]
> **Deprecation Notice**
>
> \`@svelte-put/preaction\` was an experimentation to add SSR support for [Svelte
> action](https://svelte.dev/docs/svelte/svelte-action). Svelte has since then added
> [Attachment](https://svelte.dev/docs/svelte/@attach), which solved the exact problem that
> \`preaction\` was intended for. As such, I recommend you check out attachment instead.
`}
