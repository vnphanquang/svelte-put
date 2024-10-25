<script lang="ts" module>
	import type { HTMLLabelAttributes } from 'svelte/elements';

	export interface ButtonCollapseProps extends HTMLLabelAttributes {
		id: string;
		/** $bindable */
		collapsed: boolean;
	}
</script>

<script lang="ts">
	let { id, collapsed = $bindable(), ...rest }: ButtonCollapseProps = $props();
</script>

<label {...rest}>
	<input class="codeblock-collapsed sr-only" type="checkbox" bind:checked={collapsed} {id} />
	<span class="sr-only">Collapse</span>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		fill="currentcolor"
		viewBox="0 0 256 256"
	>
		<path
			d="M213.66,165.66a8,8,0,0,1-11.32,0L128,91.31,53.66,165.66a8,8,0,0,1-11.32-11.32l80-80a8,8,0,0,1,11.32,0l80,80A8,8,0,0,1,213.66,165.66Z"
		>
		</path>
	</svg>
</label>

<style lang="postcss">
	/** copied from CodeBlock.svelte */
	@custom-selector :--fullscreen :has(.codeblock-fullscreen:checked);
	@custom-selector :--collapsed :has(.codeblock-collapsed:checked);
	@custom-selector :--c-collapsible-not-fullscreen
		:global(.codeblock.collapsible:not(:--fullscreen));
	@custom-selector :--c-not-collapsed :global(.codeblock:not(:--collapsed));

	label {
		transform: rotate(180deg);
		display: none;
		transition: transform 150ms ease-out;

		:--c-collapsible-not-fullscreen & {
			display: block;
		}

		:--c-not-collapsed & {
			transform: rotate(0deg);
		}
	}
</style>
