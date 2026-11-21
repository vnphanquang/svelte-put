<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	export const metadata = defineDocPageMetadata({
		group: 'Deprecated',
		title: 'preprocess-auto-slug',
	});
</script>

{markdown`
> [!INFO]
> **Deprecation Notice**
>
> \`@svelte-put@preprocess-auto-slug\` has been merged into [@svelte-put/toc](../../packages/toc).
> Previously, I found myself using \`preprocess-auto-slug\` always in conjuction with \`toc\`, so it
> doesn't make sense to maintain two packages, especially now that \`toc\` supports a [compile-time
> strategy](../../packages/toc/compile-time).
`}
