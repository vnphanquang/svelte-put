<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	export const metadata = defineDocPageMetadata({
		title: 'Migration Guides',
	});
</script>

{markdown`
## Migrating to v2 (Svelte 5 in Runes mode)

Update event directives to standard attribute (remove colon):

~~~svelte
<!-- [!code --] -->
<div use:intersect on:lockscroll:toggle></div>
<!-- [!code ++] -->
<div use:intersect onlockscrolltoggle></div>
~~~

If you previously used the \`createLockScrollStore\` helper, that is no longer supported. Instead,
extend from the pattern introduced in [Usage](../usage).

~~~svelte
<script>
	import { lockscroll, createLockScrollStore } from '@svelte-put/lockscroll'; // [!code --]
	import { lockscroll } from '@svelte-put/lockscroll'; // [!code ++]

	// can be created in js/ts files or within a Svelte context
	let lock = createLockScrollStore(); // [!code --]

	// [!code ++:8]
	class ScrollLock {
		locked = $state(false);

		toggle(force = !this.locked) {
			this.locked = force;
		}
	}
	const lock = new ScrollLock();
</script>

<svelte:body use:lockscroll={lock} /> <!-- [!code --]  -->
<svelte:body use:lockscroll={lock.locked} />  <!-- [!code ++]  -->
~~~
`}
