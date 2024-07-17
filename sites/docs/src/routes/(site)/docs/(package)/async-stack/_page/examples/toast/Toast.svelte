<script lang="ts" context="module">
	import type { StackItemProps } from '@svelte-put/async-stack';
	import { inlineSvg } from '@svelte-put/inline-svg';
	import type { HTMLAttributes } from 'svelte/elements';

	import iconInfo from './icons/info.svg?url';

	export interface ToastProps extends HTMLAttributes<HTMLElement>, StackItemProps {
		title?: string;
		message: string;
		status?: 'info' | 'success' | 'warning' | 'error';
	}

	const iconModules = import.meta.glob<string>('./icons/*.svg', {
		query: '?url',
		import: 'default',
	});

	async function getIcon(status: ToastProps['status']) {
		const path = `./icons/${status}.svg`;
		if (path in iconModules) {
			return await iconModules[path]();
		}
		return iconInfo;
	}
</script>

<script lang="ts">
	let { item, title, message, status = 'info', class: cls, ...rest }: ToastProps = $props();

	const iconUrl = $derived(getIcon(status));

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
	<div class="overflow-hidden relative flex items-start gap-3 rounded-inherit p-3">
		{#await iconUrl}
			<svg
				class="shrink-0 h-6 w-6 animate-spin [animation-duration:1.5s]"
				inline-src="phosphor/spinner-gap"
				width="24"
				height="24"
			></svg>
			{:then url}
			<svg class="shrink-0 h-6 w-6" use:inlineSvg={url} width="24" height="24"></svg>
		{/await}

		<div class="leading-normal">
			<p class="font-medium pb-1 border-b border-current mb-2">
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

	<!-- x button to dismiss -->
	<button onclick={dismiss} class="bg-inherit border border-current p-1.5 rounded-full absolute top-0 right-0 -translate-y-1/2 translate-x-1/2">
		<svg class="h-3.5 w-3.5" inline-src="phosphor/x" width="14" height="14"></svg>
	</button>
</article>

<style>
	article {
		color: var(--toast-color-fg);
		background-color: var(--toast-color-bg);

		&[data-status='info'] {
			--toast-color-icon: theme('colors.info.element');
			--toast-color-progress: theme('colors.info.surface.200');
			--toast-color-bg: theme('colors.info.surface.DEFAULT');
			--toast-color-fg: theme('colors.info.text');
		}

		&[data-status='success'] {
			--toast-color-icon: theme('colors.success.element');
			--toast-color-progress: theme('colors.success.surface.200');
			--toast-color-bg: theme('colors.success.surface.DEFAULT');
			--toast-color-fg: theme('colors.success.text');
		}

		&[data-status='warning'] {
			--toast-color-icon: theme('colors.warning.element');
			--toast-color-progress: theme('colors.warning.surface.200');
			--toast-color-bg: theme('colors.warning.surface.DEFAULT');
			--toast-color-fg: theme('colors.warning.text');
		}

		&[data-status='error'] {
			--toast-color-icon: theme('colors.error.element');
			--toast-color-progress: theme('colors.error.surface.200');
			--toast-color-bg: theme('colors.error.surface.DEFAULT');
			--toast-color-fg: theme('colors.error.text');
		}
	}

	.progress {
		background-color: var(--toast-color-progress);
		animation: progress var(--progress-duration) linear;
		animation-play-state: var(--progress-play-state);
	}

	svg {
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