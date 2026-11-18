<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	export const metadata = defineDocPageMetadata({
		title: 'Portal',
		group: 'Usage',
	});
</script>

{markdown`
You have full control over how component is rendered. Typically, a dedicated DOM subtree is used to
centralised all stack items. As discussed briefly in [Setup > Portal](../setup#portal--where), the
\`item.render.*\` helpers can reduce setup effort:

~~~svelte src="fs:../2-setup/includes/examples/portal.svelte"

~~~

> [!SIDENOTE]
> Available since [v1.6.0](https://github.com/vnphanquang/svelte-put/releases/tag/%40svelte-put%2Fasync-stack%401.6.0).
> Previously, \`Stack.actions.render\` was recommended but is now deprecated. See [Migrations >
> Migrating to v1.6.0](../migrations#migrating-to-v160) for more information.
`}
