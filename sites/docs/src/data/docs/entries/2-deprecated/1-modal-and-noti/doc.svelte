<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	export const metadata = defineDocPageMetadata({
		group: 'Deprecated',
		title: 'modal & noti',
	});
</script>

{markdown`
> [!INFO]
> **Deprecation Notice**
>
> The two related packages, \`@svelte-put/modal\` and \`@svelte-put/noti\` have been dropped in favor
> of [@svelte-put/async-stack](../../packages/async-stack) - a generic implementation that is minimal,
> unopinionated, and more powerful thanks to Svelte runes.
`}
