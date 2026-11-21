<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	export const metadata = defineDocPageMetadata({
		group: 'Deprecated',
		title: 'preprocess-inline-svg',
	});
</script>

{markdown`
> [!INFO]
> **Deprecation Notice**
>
> The \`@svelte-put@preprocess-inline-svg\` package has been merged into
> [@svelte-put/inline-svg](../../packages/inline-svg) to be more cohesive.
> See [Inline SVG > Compile-Time](../../packages/inline-svg/compile-time) for more information.
`}
