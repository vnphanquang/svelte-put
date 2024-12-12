<script lang="ts">
	// :::highlight
	import { make, apply } from '@svelte-put/preaction';
	// :::
	import type { HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements';

	const popover = {
		// :::highlight
		control: make((id: string) => {
			// :::
			return {
				action: (node: HTMLButtonElement) => {
					// regular runtime Svelte action business
					console.log('popover control', node);
				},
				attributes: {
					popovertarget: id,
					class: 'c-btn',
					popovertargetaction: 'show',
				} as HTMLButtonAttributes,
			};
		}),

		// :::highlight
		target: make((id: string) => {
			// :::
			return {
				action: (node: HTMLDivElement) => {
					// regular runtime Svelte action business
					console.log('popover target', node);
				},
				attributes: {
					id,
					class: 'border-2 p-10 m-auto',
					popover: 'auto',
				} as HTMLAttributes<HTMLDivElement>,
			};
		}),
	};
</script>

<!-- :::highlight -->
<button use:apply={popover.control('my-popover')}>
	<!-- ::: -->
	Open Popover
</button>

<!-- :::highlight -->
<div use:apply={popover.target('my-popover')}>
	<!-- ::: -->
	My simple popover
</div>
