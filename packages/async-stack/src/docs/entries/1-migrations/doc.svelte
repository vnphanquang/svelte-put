<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	export const metadata = defineDocPageMetadata({
		title: 'Migration Guides',
	});
</script>

{markdown`
## Migrating to v1.6.0

Since v1.6.0, the rendering strategy using \`stack.actions.render\` is deprecated
in favor for a new approach, \`item.render\`, that is more minimal and less error-prone:

~~~svelte
<aside>
	<ul>
		{#each stack.items as item (item.config.id)}
			<!-- [!code --] -->
			<li use:notiStack.actions.render={notification}></li>
			<!-- [!code ++:3] -->
			<li>
				<item.render.component {...item.render.props()} />
			</li>
		{/each}
	</ul>
</aside>
~~~

For the \`stackitemmount\` and \`stackitemunmount\` [CustomEvent], use [Svelte attachment] instead:

~~~svelte
<!-- [!code word:lifecycle] -->
<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	const lifecycle: Attachment = (element) => {
		// \`stackitemmount\` handler goes here
		return () => {
			// \`stackitemunmount\` handler goes here
		};
	}
</script>
<li {@attach lifecycle>...</li>
~~~

> [!WARNING]
> Notice, however, the reactive nature of [Svelte attachment]: attachment callback re-runs when
> a Svelte rune inside it changes. Use [untrack] to opt out of such behavior.

[CustomEvent]: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent
[Svelte attachment]: https://svelte.dev/docs/svelte/@attach
[untrack]: https://svelte.dev/docs/svelte/svelte#untrack
`}
