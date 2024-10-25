<script lang="ts" module>
	import type { BaseNotificationProps } from './BaseNotification.svelte';

	export interface ToastProps extends BaseNotificationProps {
		message: string;
	}
</script>

<script lang="ts">
	import BaseNotification from './BaseNotification.svelte';

	let { message, ...rest }: ToastProps = $props();
</script>

<BaseNotification {...rest}>
	<p>{message}</p>
</BaseNotification>
