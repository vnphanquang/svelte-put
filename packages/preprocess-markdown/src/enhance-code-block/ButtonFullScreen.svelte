<script lang="ts" module>
	import type { HTMLLabelAttributes } from 'svelte/elements';

	export interface ButtonFullScreeenProps extends HTMLLabelAttributes {
		id: string;
		codeblock?: HTMLElement;
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';

	import { CodeBlockGroupContext } from './CodeBlockGroup.svelte';

	let { id, codeblock, ...rest }: ButtonFullScreeenProps = $props();

	let fullscreen = $state(false);
	const groupContext = CodeBlockGroupContext.get();

	function onFullScreenChange() {
		fullscreen = !!document.fullscreenElement;
	}

	function goFullscreen() {
		if (!document.fullscreenElement) {
			if (groupContext?.node) {
				groupContext.node.requestFullscreen();
			} else {
				codeblock?.requestFullscreen();
			}
		} else if (document.exitFullscreen) {
			document.exitFullscreen();
		}
	}

	function onKeyDown(e: KeyboardEvent) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			goFullscreen();
		}
	}

	function onClick(e: MouseEvent) {
		e.preventDefault();
		goFullscreen();
	}

	onMount(() => {
		document.addEventListener('fullscreenchange', onFullScreenChange);
		return () => {
			document.removeEventListener('fullscreenchange', onFullScreenChange);
		};
	});
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<label for={id} {...rest} onclick={onClick} onkeydown={onKeyDown}>
	<span class="sr-only">Toggle full screen</span>
	{#if !groupContext}
		<input class="codeblock-fullscreen sr-only" type="checkbox" {id} bind:checked={fullscreen} />
	{/if}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		fill="currentcolor"
		viewBox="0 0 256 256"
	>
		<path
			class="maximize"
			d="M216,48V88a8,8,0,0,1-16,0V56H168a8,8,0,0,1,0-16h40A8,8,0,0,1,216,48ZM88,200H56V168a8,8,0,0,0-16,0v40a8,8,0,0,0,8,8H88a8,8,0,0,0,0-16Zm120-40a8,8,0,0,0-8,8v32H168a8,8,0,0,0,0,16h40a8,8,0,0,0,8-8V168A8,8,0,0,0,208,160ZM88,40H48a8,8,0,0,0-8,8V88a8,8,0,0,0,16,0V56H88a8,8,0,0,0,0-16Z"
		></path>
		<path
			class="minimize"
			d="M152,96V48a8,8,0,0,1,16,0V88h40a8,8,0,0,1,0,16H160A8,8,0,0,1,152,96ZM96,152H48a8,8,0,0,0,0,16H88v40a8,8,0,0,0,16,0V160A8,8,0,0,0,96,152Zm112,0H160a8,8,0,0,0-8,8v48a8,8,0,0,0,16,0V168h40a8,8,0,0,0,0-16ZM96,40a8,8,0,0,0-8,8V88H48a8,8,0,0,0,0,16H96a8,8,0,0,0,8-8V48A8,8,0,0,0,96,40Z"
		></path>
	</svg>
</label>

<style lang="postcss">
	/** copied from CodeBlock.svelte */
	@custom-selector :--fullscreen :has(.codeblock-fullscreen:checked);
	@custom-selector :--g-fullscreen
		:global(.codeblock-group:has(.codeblock-group-fullscreen:checked));

	.minimize {
		display: none;
	}

	:--g-fullscreen,
	label:has(:global(.codeblock-fullscreen:checked)) {
		& .maximize {
			display: none;
		}

		& .minimize {
			display: block;
		}
	}
</style>
