<script lang="ts" module>
	import type { StackItemProps } from '@svelte-put/async-stack';

	export interface NotificationProps extends StackItemProps<{ reason: string }> {
		content?: string;
		special?: boolean;
	}
</script>

<script lang="ts">
	import { fly } from 'svelte/transition';

	let {
		content = 'Placeholder',
		special = false,
		item, // injected by @svelte-put/async-stack
	}: NotificationProps = $props();

	function dismiss() {
		item.resolve({ reason: 'popped from within component' });
	}
</script>

<!-- eslint-disable svelte/valid-compile -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="not-prose pointer-events-auto relative flex items-start justify-between rounded-sm
	bg-blue-200 px-4 py-2 text-black shadow-lg md:items-center {special ? 'bg-pink-300' : ''}"
	in:fly|global={{ duration: 200, y: -20 }}
	onmouseenter={item.pause}
	onmouseleave={item.resume}
>
	<p>Notification (variant: {item.config.variant}): {content} (id = {item.config.id})</p>
	<button onclick={dismiss} class="md-max:mt-0.5">
		<i class="i i-[x] h-6 w-6"></i>
		<span class="sr-only">Dismiss</span>
	</button>
	<div
		class="progress absolute inset-x-0 bottom-0 h-0.5 origin-left bg-blue-500 {special
			? 'bg-pink-500'
			: ''}"
		class:paused={item.state === 'paused'}
		style={`--progress-duration: ${item.config.timeout}ms;`}
		aria-disabled={true}
	></div>
</div>

<style>
	.progress {
		animation: progress var(--progress-duration) linear;
	}

	.progress.paused {
		animation-play-state: paused;
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
