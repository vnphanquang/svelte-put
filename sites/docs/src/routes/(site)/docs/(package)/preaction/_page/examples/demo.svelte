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
					popover: 'auto',
				} as HTMLAttributes<HTMLDivElement>,
			};
		}),
	};
</script>

<!-- :::highlight -->
<button use:apply={popover.control('my-popover')} class="c-btn">
	<!-- ::: -->
	Open Popover
</button>

<!-- :::highlight -->
<div use:apply={popover.target('my-popover')} class="border-2 p-10">
	<!-- ::: -->
	My simple popover
</div>
