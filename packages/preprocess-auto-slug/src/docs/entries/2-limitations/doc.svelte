<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	export const metadata = defineDocPageMetadata({
		title: 'Limitations',
	});
</script>

{markdown`
\`preprocess-auto-slug\` will generate duplicated \`id\` for matching nodes rendered inside \`each\`
block. In such cases it is recommended to manually specify \`id\` for the node.

> [!CODEGROUP]
>
> ~~~svelte #title="input.svelte"
> {#each new Array(2) as _, index}
> 	<h2 id="section-heading-{index}">Section Heading {index}</h2>
> {/each}
> ~~~
>
> ~~~svelte #title="output.svelte"
> <h2 id="section-heading-0">
> 	<a href="#section-heading-0" aria-hidden="true" tabindex="-1">#</a>
> 	Section Heading 0
> </h2>
> <h2 id="section-heading-1">
> 	<a href="#section-heading-1" aria-hidden="true" tabindex="-1">#</a>
> 	Section Heading 1
> </h2>
> ~~~
`}
