<!-- [!code word:item]  -->
<script lang="ts" module>
	import type { StackItemProps } from '@svelte-put/async-stack';

	export interface NotificationProps extends StackItemProps { // [!code info]
		title?: string;
		content?: string;
	}
</script>

<script lang="ts">
	let {
		title = 'Notification',
		content = 'Placeholder',
		item, // injected by @svelte-put/async-stack [!code info]
	}: NotificationProps = $props();

	function dismiss() {
		item.resolve();
	}
</script>

<div>
	<p><strong>{title}</strong></p>
	<button onclick={dismiss} type="button" aria-label="Dismiss">x</button>
	<p>{content}</p>
</div>