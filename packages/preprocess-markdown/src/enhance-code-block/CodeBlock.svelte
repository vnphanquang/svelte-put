<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';

	export interface SingleCodeBlockProps extends HTMLAttributes<HTMLElement> {
		/**
		 * the programming language
		 */
		lang?: string;
		/**
		 * title for the code block
		 */
		title?: string;
		/**
		 * whether should hide the line number at start of each line
		 */
		hideLineNumber?: string;
		/**
		 * total number of lines in the code block
		 */
		numLines?: string;
		/**
		 * bindable
		 */
		collapsed?: 'disabled' | string;
	}
</script>

<script lang="ts">
	import { copy } from '@svelte-put/copy';

	import ButtonCollapse from './ButtonCollapse.svelte';
	import ButtonCopy, { copyCode } from './ButtonCopy.svelte';
	import ButtonFullScreen from './ButtonFullScreen.svelte';
	import { CodeBlockGroupContext } from './CodeBlockGroup.svelte';
	import FileIcon from './FileIcon.svelte';

	const {
		lang = '',
		title = '',
		hideLineNumber = 'false',
		numLines = undefined,
		collapsed = 'false',
		children,
		class: cls,
		...rest
	}: SingleCodeBlockProps = $props();

	// init context & id
	const groupContext = CodeBlockGroupContext.get();
	const id = Math.random().toString(36).slice(2);
	const fullScreenCheckBoxId = groupContext
		? `codeblock-group-${groupContext.id}-fullscreen`
		: `codeblock-${id}-fullscreen`;
	const collapsedCheckboxId = `codeblock-${id}-collapsed`;

	// resolve the collapsed prop
	let collapsible = $derived(groupContext ? false : collapsed !== 'disabled');
	let collapsedInputChecked = $state(collapsed === 'true');
	$effect(() => {
		if (!collapsible) collapsedInputChecked = false;
	});

	let copyBtnEl: HTMLButtonElement | undefined = $state(undefined);
	let codeBlockEl: HTMLElement | undefined = $state(undefined);
</script>

{#snippet titleAndFileIcon()}
	<span class="codeblock-title">
		<FileIcon {lang} />
		<span>{title}</span>
	</span>
{/snippet}

<section
	class="codeblock {cls}"
	bind:this={codeBlockEl}
	class:collapsible={groupContext ? false : collapsible}
	class:titled={!!title}
	class:grouped={!!groupContext}
	class:hide-line-number={hideLineNumber !== 'false'}
	style:--num-line-width="{numLines ? numLines.length + 2 : 4}ch"
	{...groupContext && { 'data-group-display': groupContext.display }}
	{...rest}
>
	{#if groupContext}
		<label class="codeblock-group-label">
			{#if groupContext.display === 'files'}
				{@render titleAndFileIcon()}
			{:else}
				<span>{title}</span>
			{/if}
			<input
				type="radio"
				class="codeblock-group-selected sr-only"
				value={title}
				name={groupContext.name}
				checked={title === groupContext.title}
				bind:group={groupContext.title}
			/>
		</label>
	{:else}
		<label class="codeblock-header" for={collapsedCheckboxId}>
			{@render titleAndFileIcon()}
		</label>
	{/if}
	<div class="codeblock-content">
		<div class="codeblock-content-accordion">
			<!-- buttons -->
			<div class="codeblock-btns">
				<ButtonCopy class="codeblock-btn" bind:trigger={copyBtnEl} />
				<ButtonFullScreen
					class="codeblock-btn codeblock--btn--collapse"
					codeblock={codeBlockEl}
					id={fullScreenCheckBoxId}
				/>
				{#if collapsible}
					<ButtonCollapse
						class="codeblock-btn codeblock-btn--collapse"
						id={collapsedCheckboxId}
						collapsed={collapsedInputChecked}
					/>
				{/if}
			</div>
			<!-- pre & code -->
			<div class="codeblock-pre-container" use:copy={{ trigger: copyBtnEl, text: copyCode }}>
				{#if children}
					{@render children()}
				{/if}
			</div>
		</div>
	</div>
</section>

<style lang="postcss">
	/** has selectors */
	@custom-selector :--group-selected :has(.codeblock-group-selected:checked);
	@custom-selector :--fullscreen :has(.codeblock-fullscreen:checked);
	@custom-selector :--oneliner :has(pre[data-num-lines='1']);
	@custom-selector :--collapsed :has(.codeblock-collapsed:checked);

	/** complex patterns for codeblock-group */
	@custom-selector :--g-fullscreen
		:global(.codeblock-group:has(.codeblock-group-fullscreen:checked));
	@custom-selector :--g-not-fullscreen
		:global(.codeblock-group:not(:has(.codeblock-group-fullscreen:checked)));

	/** complex patterns for codeblock */
	@custom-selector :--c-not-collapsed :global(.codeblock:not(:--collapsed));

	@custom-selector :--c-collapsible-not-fullscreen
		:global(.codeblock.collapsible:not(:--fullscreen));

	@custom-selector :--c-oneliner-not-grouped-or-titled
		:global(.codeblock:not(.grouped, .titled):--oneliner);

	@custom-selector :--c-grouped-and-selected :global(.codeblock.grouped:--group-selected);
	@custom-selector :--c-tabs-grouped :global(.codeblock.grouped[data-group-display='tabs']);

	@custom-selector :--c-first-of-group :global(.codeblock:first-of-type);
	@custom-selector :--c-last-of-non-files-group
		:global(.codeblock:not([data-group-display='files']):last-of-type);

	@custom-selector :--c-first-of-unselected-group
		:global(.codeblock-group:not(:--group-selected) .codeblock:first-of-type);

	.codeblock {
		--color-header-fg: hsl(0deg 0% 50%);

		/* assume integration with @sveltevietnam/ui */
		/* @dark global { */
		/* 	--color-header-fg: hsl(0deg 0% 64%); */
		/* } */

		position: relative;

		overflow: hidden;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: auto 1fr;

		margin-block: 24px;

		border-width: 1px;
		border-radius: 0.375rem;

		&.grouped {
			display: contents !important;
		}

		:global(:--fullscreen) {
			border-radius: 0;
		}
	}

	.codeblock:global(:--fullscreen),
	:--g-fullscreen {
		position: fixed;
		z-index: var(--z-index-overlay);
		inset: 0;

		height: 100dvh;
		margin: 0;
	}

	.codeblock-header {
		padding: 12px 16px;
		line-height: normal;
		background-color: var(--color-pre-bg);

		:--c-collapsible-not-fullscreen & {
			cursor: pointer;
		}

		:--c-oneliner-not-grouped-or-titled & {
			display: none;
		}
	}

	.codeblock-title {
		width: fit-content;
		margin: 0;
		padding: 0;

		font-size: var(--text-xs);
		white-space: nowrap;
	}

	.codeblock-group-label {
		cursor: pointer;

		position: relative;
		z-index: 2;

		grid-column: auto;
		grid-row: 1;

		padding: 12px 16px;

		font-size: var(--text-sm);
		line-height: normal;
		color: var(--color-header-fg);

		background-color: var(--color-bg);
		border-top-width: 1px;
		border-left-width: 1px;

		&:has(:global(input:focus-visible)) {
			outline-offset: -1px;
		}

		&:hover {
			color: currentcolor;
		}

		:--g-not-fullscreen :--c-first-of-group & {
			border-top-left-radius: 0.375rem;
		}

		:--c-last-of-non-files-group & {
			border-right-width: 1px;

			:--g-not-fullscreen & {
				border-top-right-radius: 0.375rem;
			}
		}

		:--c-first-of-unselected-group &,
		:--c-grouped-and-selected & {
			margin-bottom: -1px;
			color: currentcolor;
			background-color: var(--color-pre-bg);
		}
	}

	.codeblock-content {
		z-index: 1;
		display: grid;
		max-width: 100%;

		.codeblock.grouped & {
			display: none;
			grid-column: 1 / span calc(var(--cols) + 1);
			grid-row: 2;
		}

		:--c-grouped-and-selected &,
		:--c-first-of-unselected-group & {
			display: grid;
		}

		:--c-collapsible-not-fullscreen & {
			grid-template-rows: 0fr;
			transition: grid-template-rows 150ms ease-out;
		}

		:--c-not-collapsed & {
			grid-template-rows: 1fr !important;
		}
	}

	.codeblock-content-accordion {
		overflow: hidden;
	}

	.codeblock-btns {
		position: absolute;
		z-index: 2;
		top: 8px;
		right: 8px;

		display: flex;
		gap: 4px;
		align-items: center;

		width: fit-content;

		:--c-tabs-grouped & {
			right: 0;
		}

		:--c-oneliner-not-grouped-or-titled & {
			display: none;
		}

		:--g-fullscreen & {
			right: 12px;
		}
	}

	:global(.codeblock-btn) {
		cursor: pointer;
		padding: 4px;
		color: var(--color-header-fg);
		transition: color 150ms ease-out;

		&:hover {
			color: currentcolor;
		}
	}

	.codeblock-pre-container {
		height: 100%;
	}

	.codeblock :global(pre) {
		height: 100%;
		margin-block: 0;

		border-width: 1px 0 0 !important;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
	}

	.codeblock.grouped :global(pre) {
		border-width: 1px !important;
	}

	:--c-tabs-grouped :global(pre) {
		border-top-right-radius: 0.375rem;
	}

	:--c-oneliner-not-grouped-or-titled :global(pre) {
		border-top-width: 0 !important;
		border-top-left-radius: 0.375rem;
		border-top-right-radius: 0.375rem;
	}

	.codeblock:global(:--fullscreen) :global(pre) {
		max-height: 100dvh !important;
		max-height: 100vh !important;
	}

	:--g-fullscreen :global(pre) {
		max-height: calc(100vh - 2.625rem) !important;
		max-height: calc(100dvh - 2.625rem) !important;
	}
</style>
