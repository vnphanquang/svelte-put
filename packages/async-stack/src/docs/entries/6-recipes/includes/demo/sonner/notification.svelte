<script lang="ts" module>
	import type { StackItemProps } from '@svelte-put/async-stack';

	import type { Status } from './noti-stack';

	export interface NotificationProps extends StackItemProps {
		status?: Status;
		title?: string;
		content?: string;
	}

	const STATUS_TO_CONFIG = {
		info: {
			fill: 'var(--color-info-fill-50)',
			stroke: 'var(--color-info-stroke-50)',
			progress: 'var(--color-info-stroke-100)',
			iconClass: 'i-[ph--info]',
		},
		success: {
			fill: 'var(--color-success-fill-50)',
			stroke: 'var(--color-success-stroke-50)',
			progress: 'var(--color-success-stroke-100)',
			iconClass: 'i-[ph--check-circle]',
		},
		warning: {
			fill: 'var(--color-warning-fill-50)',
			stroke: 'var(--color-warning-stroke-50)',
			progress: 'var(--color-warning-stroke-100)',
			iconClass: 'i-[ph--warning]',
		},
		error: {
			fill: 'var(--color-error-fill-50)',
			stroke: 'var(--color-error-stroke-50)',
			progress: 'var(--color-error-stroke-100)',
			iconClass: 'i-[ph--warning-circle]',
		},
	};
</script>

<script lang="ts">
	let {
		title,
		content,
		status = 'info',
		item, // injected by @svelte-put/async-stack
	}: NotificationProps = $props();

	let config = $derived(STATUS_TO_CONFIG[status]);
</script>

<div
	class={[
		'bg-fill-100 noti pointer-events-auto relative border border-current shadow-lg',
		item.config.timeout && 'pbe-1',
	]}
	style:--noti-fill={config.fill}
	style:--noti-stroke={config.stroke}
	style:--noti-progress={config.progress}
>
	<div class="flex items-start justify-between gap-4 border-b border-current px-4 py-2">
		<p>
			<i class={['i h-5 w-5', config.iconClass]}></i>
			<strong>{title}</strong>
		</p>
		<button class="c-btn c-btn--icon" onclick={() => item.resolve()} type="button">
			<i class="i i-[ph--x] h-6 w-6"></i>
			<span class="sr-only">Dismiss</span>
		</button>
	</div>
	{#if content}
		<p class="px-4 py-2">{content}</p>
	{/if}
	{#if item.config.timeout}
		<div
			class="progress absolute inset-x-0 bottom-0 h-1 origin-left"
			class:paused={item.state === 'paused'}
			style:--progress-duration="{item.config.timeout}ms"
		></div>
	{/if}
</div>

<style>
	.noti {
		color: var(--noti-stroke);
		background-color: var(--noti-fill);
	}

	.progress {
		background-color: var(--noti-progress);
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
