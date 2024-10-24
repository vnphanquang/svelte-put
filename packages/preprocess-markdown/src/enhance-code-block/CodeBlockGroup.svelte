<script lang="ts" module>
	import { getContext, setContext, hasContext } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	export interface CodeBlockGroupProps extends HTMLAttributes<HTMLElement> {
		/**
		 * number of code blocks inside group
		 * Required but should be injected automatically
		 * by the `enhance-code-block` preprocessor
		 */
		cols: number;
		/**
		 * unique name for group.
		 * Required but should be injected automatically
		 * by the `enhance-code-block` preprocessor
		 */
		name: string;
		/**
		 * display mode for group. Default to `files`
		 */
		display?: 'files' | 'tabs';
		/**
		 * bindable, title of the current active child code block
		 */
		title?: string;
	}

	export interface CodeBlockGroupContextInit {
		/** unique id to identify this context */
		id: string;
		/** name for the code block group, mapped to the checkbox input `name` field */
		name: string;
		/** display mode of the code block group */
		display: CodeBlockGroupProps['display'];
		/** initial code block identifier to display */
		title?: string;
	}

	export class CodeBlockGroupContext {
		static KEY = 'enhanced:codeblock:group';

		node: HTMLElement | undefined;

		#init: CodeBlockGroupContextInit;

		/**
		 * Caution: expect init.title to be in a "writable closure"
		 */
		constructor(init: CodeBlockGroupContextInit) {
			this.#init = init;
		}

		get id() {
			return this.#init.id;
		}

		get name() {
			return this.#init.name;
		}

		get display() {
			return this.#init.display;
		}

		get title(): string | undefined {
			return this.#init.title;
		}

		set title(title: string) {
			this.#init.title = title;
		}

		static set(init: CodeBlockGroupContextInit) {
			return setContext(CodeBlockGroupContext.KEY, new CodeBlockGroupContext(init));
		}

		static get(): CodeBlockGroupContext | null {
			if (!hasContext(CodeBlockGroupContext.KEY)) return null;
			return getContext(CodeBlockGroupContext.KEY);
		}
	}
</script>

<script lang="ts">
	let {
		cols,
		name,
		display = 'files',
		title = $bindable(),
		children,
		class: cls,
		...rest
	}: CodeBlockGroupProps = $props();

	let groupEl: HTMLDivElement;

	// preserve reactivity of title inside GroupContext
	const initClosure = {
		id: Math.random().toString(36).slice(2).toString(),
		name,
		display,
		get title(): string | undefined {
			return title;
		},
		set title(t: string) {
			title = t;
		},
	} satisfies CodeBlockGroupContextInit;

	const groupContext = CodeBlockGroupContext.set(initClosure);

	$effect(() => {
		groupContext.node = groupEl;
	});

	let fullscreen = $state(false);
	function onFullScreenChange() {
		fullscreen = !!document.fullscreenElement;
	}
</script>

<div
	class="codeblock-group codeblock-group--{display} {cls}"
	style:--cols={cols}
	{...rest}
	bind:this={groupEl}
	onfullscreenchange={onFullScreenChange}
>
	{#if children}
		{@render children()}
	{/if}
	<input
		id="codeblock-group-{groupContext.id}-fullscreen"
		class="codeblock-group-fullscreen sr-only"
		type="checkbox"
		bind:checked={fullscreen}
	/>
	<div class="first-row-last-col-fill"></div>
</div>

<style>
	.first-row-last-col-fill {
		position: relative;

		grid-column: -2;

		background-color: theme('colors.bg.DEFAULT');
		border-color: theme('colors.outline.DEFAULT');
		border-style: solid;
		border-top-right-radius: 4px;
	}

	.codeblock-group {
		position: relative;

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
