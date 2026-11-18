<script lang="ts" module>
	import type { StackItemProps } from '@svelte-put/async-stack';

	export interface NotificationProps extends StackItemProps<{ reason: string }> {
		title?: string;
		content?: string;
	}
</script>

<script lang="ts">
	let {
		title = 'Notification',
		content = 'Placeholder',
		item, // injected by @svelte-put/async-stack
	}: NotificationProps = $props();

	function dismiss() {
		item.resolve({ reason: 'popped from within component' });
	}
</script>

<!-- eslint-disable svelte/valid-compile -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class={[
		'not-md bg-fill-100 pointer-events-auto relative border border-current shadow-lg',
		item.config.timeout && 'pbe-1',
	]}
	onmouseenter={item.pause}
	onmouseleave={item.resume}
>
	<div class="flex items-start justify-between gap-4 border-b border-current px-4 py-2">
		<div class="flex items-center gap-1">
			<p><strong>{title}</strong></p>
			<div>
				<i class="i i-[ph--info] h-5 w-5"></i>
				<div class="c-infobox p-0">
					<p class="border-b border-current px-2 py-1">
						<strong>Notification Configuration</strong>
					</p>
					<dl class="grid grid-cols-[auto_1fr] gap-1 px-2 py-1 leading-none">
						<dt>Variant:</dt>
						<dd>{item.config.variant}</dd>
						<dt>ID:</dt>
						<dd>{item.config.id}</dd>
					</dl>
				</div>
			</div>
		</div>
		<button class="c-btn c-btn--icon" onclick={dismiss} type="button">
			<i class="i i-[ph--x] h-6 w-6"></i>
			<span class="sr-only">Dismiss</span>
		</button>
	</div>
	{#if content}
		<p class="px-4 py-2">{content}</p>
	{/if}
	{#if item.config.timeout}
		<div
			class="progress bg-info absolute inset-x-0 bottom-0 h-1 origin-left"
			class:paused={item.state === 'paused'}
			style:--progress-duration="{item.config.timeout}ms"
		></div>
	{/if}
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
