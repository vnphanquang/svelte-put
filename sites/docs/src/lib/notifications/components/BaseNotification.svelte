<script lang="ts" module>
	import type { StackItemProps } from '@svelte-put/async-stack';
	import { inlineSvg } from '@svelte-put/inline-svg';
	import type { HTMLAttributes } from 'svelte/elements';

	export interface BaseNotificationProps extends HTMLAttributes<HTMLElement>, StackItemProps {
		title?: string;
		status?: 'info' | 'success' | 'warning' | 'error';
	}
</script>

<script lang="ts">
	import { getNotificationIcon } from '../notification.icon';
	let {
		item,
		title,
		status = 'info',
		class: cls,
		children,
		...rest
	}: BaseNotificationProps = $props();

	const iconUrl = $derived(getNotificationIcon(status));

	function dismiss() {
		item.resolve();
	}
</script>

<article
	class="relative rounded border shadow {cls}"
	role="status"
	aria-live="polite"
	aria-atomic="true"
	data-status={status}
	{...rest}
>
	<div class="rounded-inherit relative flex items-start gap-3 overflow-hidden p-3">
		{#await iconUrl}
			<svg
				class="h-6 w-6 shrink-0 animate-spin [animation-duration:1.5s]"
				inline-src="phosphor/spinner-gap"
				width="24"
				height="24"
			></svg>
		{:then url}
			<svg class="h-6 w-6 shrink-0" use:inlineSvg={url} width="24" height="24"></svg>
		{/await}

		<div class="w-full leading-normal">
			<p class="mb-2 border-b border-current pb-1 font-medium">
				{title ?? status[0].toUpperCase() + status.slice(1)}
			</p>
			{#if children}
				{@render children()}
			{/if}
		</div>

		<!-- progress, (time until auto-dismiss) -->
		<div
			class="progress absolute inset-x-0 bottom-0 h-0.5 origin-left overflow-hidden"
			style:--progress-duration={item.config.timeout + 'ms'}
			style:--progress-play-state={item.state === 'paused' ? 'paused' : 'running'}
			aria-disabled="true"
		></div>
	</div>

	<!-- x button to dismiss -->
	<button
		onclick={dismiss}
		class="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 rounded-full border border-current bg-inherit p-1.5"
	>
		<svg class="h-3.5 w-3.5" inline-src="phosphor/x" width="14" height="14"></svg>
		<span class="sr-only">Dismiss</span>
	</button>
</article>

<style>
	article {
		color: var(--noti-color-fg);
		background-color: var(--noti-color-bg);

		&[data-status='info'] {
			--noti-color-icon: theme('colors.info.element');
			--noti-color-progress: theme('colors.info.surface.200');
			--noti-color-bg: theme('colors.info.surface.DEFAULT');
			--noti-color-fg: theme('colors.info.text');
		}

		&[data-status='success'] {
			--noti-color-icon: theme('colors.success.element');
			--noti-color-progress: theme('colors.success.surface.200');
			--noti-color-bg: theme('colors.success.surface.DEFAULT');
			--noti-color-fg: theme('colors.success.text');
		}

		&[data-status='warning'] {
			--noti-color-icon: theme('colors.warning.element');
			--noti-color-progress: theme('colors.warning.surface.200');
			--noti-color-bg: theme('colors.warning.surface.DEFAULT');
			--noti-color-fg: theme('colors.warning.text');
		}

		&[data-status='error'] {
			--noti-color-icon: theme('colors.error.element');
			--noti-color-progress: theme('colors.error.surface.200');
			--noti-color-bg: theme('colors.error.surface.DEFAULT');
			--noti-color-fg: theme('colors.error.text');
		}
	}

	.progress {
		background-color: var(--noti-color-progress);
		animation: progress var(--progress-duration) linear;
		animation-play-state: var(--progress-play-state);
	}

	svg {
		color: var(--noti-color-icon);
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
