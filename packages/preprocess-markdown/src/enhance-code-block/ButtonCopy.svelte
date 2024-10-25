<script lang="ts" module>
	import type { TextResolverInput } from '@svelte-put/copy';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	export interface ButtonCopyProps extends HTMLButtonAttributes {
		/** $bindable. The button element. Pass as `trigger` arg to `@svelte-put/copy` */
		trigger?: HTMLButtonElement;
	}

	/**
	 * copy code exclude meta lines. Pass as `text` arg to `@svelte-put/copy`
	 */
	export function copyCode(input: TextResolverInput<'click'>): string {
		const codeNode = input.node.getElementsByTagName('code')[0];
		if (!codeNode) return '';
		let text = '';
		for (const lineNode of codeNode.children) {
			// assuming shiki build output and transformers set up at mdsvex.config.js
			if ((lineNode as HTMLElement).dataset.lineDiff === '-') continue;
			text += (lineNode.textContent || '') + '\n';
		}
		return text;
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let { trigger = $bindable(), ...rest }: ButtonCopyProps = $props();

	let timeoutId: ReturnType<typeof setTimeout> | undefined = undefined;
	let optimistic = $state(false);

	function onClick() {
		optimistic = true;
	}
	function onMouseEnter() {
		clearTimeout(timeoutId);
	}
	function onMouseLeave() {
		timeoutId = setTimeout(() => {
			optimistic = false;
		}, 1800);
	}

	let hydrated = $state(false);
	onMount(() => {
		hydrated = true;
	});
</script>

{#if hydrated}
	<button
		type="button"
		bind:this={trigger}
		disabled={optimistic}
		onmouseleave={onMouseLeave}
		onmouseenter={onMouseEnter}
		onclick={onClick}
		{...rest}
	>
		<span class="sr-only">Copy</span>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			fill="currentcolor"
			viewBox="0 0 256 256"
		>
			{#if optimistic}
				<path
					d="M168,152a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,152Zm-8-40H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm56-64V216a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V48A16,16,0,0,1,56,32H92.26a47.92,47.92,0,0,1,71.48,0H200A16,16,0,0,1,216,48ZM96,64h64a32,32,0,0,0-64,0ZM200,48H173.25A47.93,47.93,0,0,1,176,64v8a8,8,0,0,1-8,8H88a8,8,0,0,1-8-8V64a47.93,47.93,0,0,1,2.75-16H56V216H200Z"
					in:fade={{ duration: 150 }}
				>
				</path>
			{:else}
				<path
					d="M200,32H163.74a47.92,47.92,0,0,0-71.48,0H56A16,16,0,0,0,40,48V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm-72,0a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm72,184H56V48H82.75A47.93,47.93,0,0,0,80,64v8a8,8,0,0,0,8,8h80a8,8,0,0,0,8-8V64a47.93,47.93,0,0,0-2.75-16H200Z"
					in:fade={{ duration: 150 }}
				>
				</path>
			{/if}
		</svg>
	</button>
{/if}

<style lang="postcss">
	button {
		&:disabled {
			/* allow clicking even if already copied */
			cursor: pointer;
		}
	}
</style>
