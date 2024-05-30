<script lang="ts">
	import type { NotificationProps} from '@svelte-put/noti';

	let { notification, message }: NotificationProps<{ ok: boolean }> & { message: string } = $props();
</script>

<!-- eslint-disable svelte/valid-compile -->
<section onmouseenter={notification.pause} onmouseleave={notification.resume} role="alert">
	<div
		class="progress"
		style:--progress-duration="{notification.config.timeout}ms"
		style:animation-play-state={notification.state === 'paused' ? 'paused' : 'running'}
	></div>
	<p>{notification.config.id} - {notification.config.variant}: {message} ({notification.state})</p>
	<button onclick={() => notification.resolve({ ok: true })}>Confirm</button>
	<button onclick={() => notification.resolve({ ok: false })}>Cancel</button>
</section>

<style>
	section {
		position: relative;
		padding: 8px 16px;
		background: lightcyan;
	}

	.progress {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		transform-origin: left;
		transform: scaleX(0);

		height: 2px;

		background: blue;

    animation: progress var(--progress-duration) linear;
	}

  @keyframes progress {
    from {
      transform: scaleX(0);
    }

    to {
      transform: scaleX(1);
    }
  }
</style>
