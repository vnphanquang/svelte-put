<script>
	import { EnhancedCodeBlockGroupContext } from './enhanced-code-block-group-context.svelte.js';

	/** @type {import('./types.d.ts').EnhancedCodeBlockGroupProps} */
	let {
		cols,
		name,
		display,
		title = $bindable(),
		children,
		class: cls,
		...rest
	} = $props();

	/** @type {HTMLDivElement} */
	let groupEl;

	// preserve reactivity of title inside GroupContext
	const initClosure = {
		name,
		display,
		/** @returns {string | undefined} */
		get title() {
			return title;
		},
		/** @param {string} t */
		set title(t) {
			title = t;
		},
	};

	EnhancedCodeBlockGroupContext.set(initClosure);
</script>

<div
	class="codeblock-group codeblock-group--{display} {cls}"
	style:--cols={cols} {...rest}
	bind:this={groupEl}
>
	{#if children}
		{@render children()}
	{/if}
	<div class="first-row-last-col-fill"></div>
</div>

<style>
	.first-row-last-col-fill {
		position: relative;
		bottom: -1px;

		grid-column: -2;

		border-color: theme('colors.outline.DEFAULT');
		border-style: solid;
		border-top-right-radius: 4px;
	}

	.codeblock-group {
		position: relative;

		background-color: theme('colors.bg.DEFAULT');
		overflow: auto;
		display: grid;
		grid-template-columns: repeat(var(--cols), auto) 1fr;
		grid-template-rows: auto 1fr;

		max-width: 100%;
		margin-block: 24px;

		&:where(.codeblock-group--files) {
			& .first-row-last-col-fill {
				border-width: 1px 1px 0 0;
			}
		}
	}
</style>

