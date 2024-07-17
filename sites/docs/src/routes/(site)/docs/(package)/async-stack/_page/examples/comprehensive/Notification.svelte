<script lang="ts" context="module">
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
  class="relative px-4 py-2 bg-blue-200 rounded-sm not-prose shadow-lg text-black pointer-events-auto flex items-start md:items-center justify-between"
  class:bg-pink-300={special}
  in:fly|global={{ duration: 200, y: -20 }}
  onmouseenter={item.pause}
  onmouseleave={item.resume}
>
  <p>Notification (variant: {item.config.variant}): {content} (id = {item.config.id})</p>
  <button onclick={dismiss} class="md-max:mt-0.5">
    <svg inline-src="phosphor/x" width="24" height="24" />
  </button>
  <div
    class="progress absolute inset-x-0 bottom-0 h-0.5 bg-blue-500 origin-left"
    class:bg-pink-500={special}
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

