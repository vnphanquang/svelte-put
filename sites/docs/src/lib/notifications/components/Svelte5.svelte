<script lang="ts" module>
	import type { BaseNotificationProps } from './BaseNotification.svelte';

	export interface ToastProps extends BaseNotificationProps {
		message: string;
	}
</script>

<script lang="ts">
	import BaseNotification from './BaseNotification.svelte';

	let { item, ...rest }: ToastProps = $props();

	function doNotShowAgain() {
		localStorage.setItem('skip-svelte-5-notification', 'true');
		item.resolve();
	}
</script>

<BaseNotification status="info" title="Are you runes-ed yet?" {item} {...rest}>
	<div class="space-y-2">
		<p>
			The <code>svelte-put</code> collection has moved to
			<a class="c-link" href="https://svelte.dev/docs/svelte/v5-migration-guide">Svelte 5</a>. I
			recommend you do too. If you are still using Svelte 4, head over to
			<a class="c-link" href="https://svelte-put-svelte-4.vnphanquang.com"
				>the old documentation site</a
			>.
		</p>
		<button class="c-btn c-btn--outlined text-fg ml-auto" onclick={doNotShowAgain}
			>Don't show me again</button
		>
	</div>
</BaseNotification>
