<script lang="ts" module>
	import type { StackItemProps } from '@svelte-put/async-stack';
	import type { HTMLAttributes } from 'svelte/elements';

	export interface ToastProps extends HTMLAttributes<HTMLElement>, StackItemProps {
		title?: string;
		message: string;
		status?: 'info' | 'success' | 'warning' | 'error';
	}

	const iconClassMap: Record<NonNullable<ToastProps['status']>, string> = {
		info: 'i-[info]',
		success: 'i-[check-circle]',
		warning: 'i-[warning]',
		error: 'i-[warning-circle]',
	};
</script>

<script lang="ts">
	let { item, title, message, status = 'info', class: cls, ...rest }: ToastProps = $props();

	const iconClass = $derived(status ? iconClassMap[status] : 'i-[info]');

	function dismiss() {
		item.resolve();
	}
</script>

<article
	class="relative rounded shadow {cls}"
	role="status"
	aria-live="polite"
	aria-atomic="true"
	data-status={status}
	{...rest}
>
	<!-- x button to dismiss -->
	<button
		onclick={dismiss}
		class="absolute right-0 top-0 flex -translate-y-1/2 translate-x-1/2 cursor-pointer rounded-full border border-current bg-inherit p-1.5"
	>
		<i class="i i-[x] h-3.5 w-3.5"></i>
		<span class="sr-only">Dismiss</span>
	</button>
	<div class="rounded-inherit relative flex items-start gap-3 overflow-hidden p-3">
		<div class="i {iconClass} h-6 w-6 shrink-0"></div>

		<div class="leading-normal">
			<p class="mb-2 border-b border-current pb-1 font-medium">
				{title}
			</p>
			<p>{message}</p>
		</div>

		<!-- progress, (time until auto-dismiss) -->
		<div
			class="progress absolute inset-x-0 bottom-0 h-0.5 origin-left overflow-hidden"
			style:--progress-duration={item.config.timeout + 'ms'}
			style:--progress-play-state={item.state === 'paused' ? 'paused' : 'running'}
			aria-disabled="true"
		></div>
	</div>
</article>

<style>
	article {
		color: var(--toast-color-fg);
		background-color: var(--toast-color-bg);

		&[data-status='info'] {
			--toast-color-icon: var(--color-info-fg);
			--toast-color-progress: var(--color-info-bg-200);
			--toast-color-bg: var(--color-info-bg);
			--toast-color-fg: var(--color-info-fg);
		}

		&[data-status='success'] {
			--toast-color-icon: var(--color-success-fg);
			--toast-color-progress: var(--color-success-bg-200);
			--toast-color-bg: var(--color-success-bg);
			--toast-color-fg: var(--color-success-fg);
		}

		&[data-status='warning'] {
			--toast-color-icon: var(--color-warning-fg);
			--toast-color-progress: var(--color-warning-bg-200);
			--toast-color-bg: var(--color-warning-bg);
			--toast-color-fg: var(--color-warning-fg);
		}

		&[data-status='error'] {
			--toast-color-icon: var(--color-error-fg);
			--toast-color-progress: var(--color-error-bg-200);
			--toast-color-bg: var(--color-error-bg);
			--toast-color-fg: var(--color-error-fg);
		}
	}

	.progress {
		background-color: var(--toast-color-progress);
		animation: progress var(--progress-duration) linear;
		animation-play-state: var(--progress-play-state);
	}

	.i {
		color: var(--toast-color-icon);
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
