<script lang="ts">
	import type { StackItemProps } from '@svelte-put/async-stack';

	import { enhancedialog } from './enhance-dialog';

	let {
		item,
		title,
		description,
	}: StackItemProps<{ confirmed: boolean }> & {
		title: string;
		description: string;
	} = $props();

	let dialog: HTMLDialogElement;

	function checkAndResolve() {
		// when dialog has closed and animation has finished, resolve
		if (!dialog.open) {
			item.resolve({ confirmed: dialog.returnValue === 'yes' });
		}
	}

	$effect(() => {
		dialog?.showModal();
	});
</script>

<dialog
	class="bg-bg-200 text-fg backdrop:bg-bg space-y-4 p-8 shadow-lg backdrop:opacity-50"
	bind:this={dialog}
	use:enhancedialog
	onclickbackdrop={() => dialog.close()}
	onanimationend={checkAndResolve}
>
	<p class="text-xl font-medium">{title}</p>
	<p>{description}</p>
	<form method="dialog" class="flex justify-end gap-4">
		<button type="submit" class="c-btn c-btn--outlined" value="no">No</button>
		<button type="submit" class="c-btn" value="yes">Yes</button>
	</form>
</dialog>

<style>
	dialog {
		inset: 0;

		display: block; /* required for animation to work */

		margin: auto;

		animation-name: fly-out-down;
		animation-duration: 150ms;
		animation-timing-function: var(--default-transition-timing-function);
		animation-fill-mode: forwards;
	}

	dialog[open] {
		animation-name: fly-in-up;
	}

	@keyframes fly-in-up {
		from {
			transform: translateY(50px);
			opacity: 0;
		}

		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	@keyframes fly-out-down {
		from {
			transform: translateY(0);
			opacity: 1;
		}

		to {
			transform: translateY(50px);
			opacity: 0;
		}
	}
</style>
