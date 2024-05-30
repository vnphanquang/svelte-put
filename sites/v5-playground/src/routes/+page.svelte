<script lang="ts">
	import { notiCtrl } from './noti';

	async function pushNotification() {
		const notification = notiCtrl.push('test', {
			timeout: 2_000,
			props: {
				message: 'Custom Hello World!',
			},
		});

		const resolved = await notification.resolution;
		if (resolved) {
			const { ok } = resolved;
			console.log(`Turbo ~ pushNotification ~ ok:`, ok);
		}
	}
</script>

<button onclick={pushNotification}>
	Push notification
</button>

<style>
	button {
		margin: 40px auto;
		border: 1px solid tomato;
	}
</style>
