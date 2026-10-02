<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	export const metadata = defineDocPageMetadata({
		title: 'Customisation',
	});
</script>

{markdown`
A lot of aspects of \`preprocess-auto-slug\` can be cusomtised, including:

- which tags to process,
- how \`id\` and \`href\` are generated,
- the placement of anchor tag.

To avoid being verbose, please utilise language server during
development or see the type definition below for more details:

~~~typescript #title="preprocess-auto-slug.d.ts" src="fs:../../../lib/types.public.d.ts"

~~~
`}
