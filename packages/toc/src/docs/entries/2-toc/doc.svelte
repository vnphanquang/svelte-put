<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	export const metadata = defineDocPageMetadata({
		title: 'The TOC Instance',
	});
</script>

{markdown`
## Prefill Compile-Time Data

If your content and layout is compatible with the [compile-time] strategy, you can use it here to
improve the initial load:

~~~svelte
<script>
	import { Toc, compileToc } from '@svelte-put/toc';
	const toc = new Toc({ ...compileToc() }); // [!code info]
</script>
~~~

Note that, this is the exact same as initialising runtime \`Toc\` with an \`items\` map:

~~~svelte
<script lang="ts">
	import { Toc } from '@svelte-put/toc';

	// [!code info:11] [!code focus:11]
	const toc = new Toc({
		items: new Map([
			[
				'heading-2',
				{
					id: 'heading-2',
					text: 'Heading 2',
					tag: 'h2',
					index: 0,
				},
			],
		]),
	});
</script>

<!-- use the headless toc to build table-of-contents -->
{toc.items}
~~~

## Turning off Runtime Indexing

If you can assert that your relevant content is completely static, e.g. there is no dynamically inserted
content, skip runtime parsing to save resources:

~~~typescript
const toc = new Toc({ ...compileToc() }); // [!code --]
const toc = new Toc({ ...compileToc(), index: false }); // [!code ++]
~~~

## Visibility Tracking

## Non-Flat Content

### Limitations

- content too short
- first and last content
- clicking may not highlight
- no link may be highlight if content is too long

[compile-time]: ../compile-time
`}
