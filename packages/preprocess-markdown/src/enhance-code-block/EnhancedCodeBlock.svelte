<script>
	import { copy } from '@svelte-put/copy';
	import { fade } from 'svelte/transition';

	import FileIcon from './FileIcon.svelte';
	import { EnhancedCodeBlockGroupContext } from './enhanced-code-block-group-context.svelte.js';

	// TODO: remove all dependencies on @sveltevietnam/ui

	/** @type {import('./types.d.ts').EnhancedCodeBlockProps} */
	let {
		lang = '',
		title = '',
		hideLineNumber = 'false',
		numLines = undefined,
		collapsed = 'false',
		class: cls,
		children,
		...rest
	} = $props();

	const id = Math.random().toString(36).slice(2);
	const groupContext = EnhancedCodeBlockGroupContext.get();
	const fullScreenCheckBoxId = groupContext
		? `codeblock-group-${groupContext.id}-fullscreen`
		: `codeblock-${id}-fullscreen`;

	let collapsible = $derived(groupContext ? false : collapsed !== 'disabled');
	let collapsedInputChecked = $state(collapsed === 'true');
	$effect(() => {
		if (!collapsible) collapsedInputChecked = false;
	});

	/** @type {HTMLButtonElement | undefined} */
	let copyTrigger = $state(undefined);
	/** @type {ReturnType<setTimeout> | undefined} */
	let copyTimeoutId = undefined;
	let copied = $state(false);
	/**
	 * @param {import('@svelte-put/copy').TextResolverInput<'click'>} input
	 * @returns {string}
	 */
	function copyText(input) {
		const codeNode = input.node.getElementsByTagName('code')[0];
		if (!codeNode) return '';
		let text = '';
		for (const lineNode of codeNode.children) {
			// assuming shiki build output and transformers set up at mdsvex.config.js
			if (/** @type {HTMLElement} */ (lineNode).dataset.lineDiff === '-') continue;
			text += (lineNode.textContent || '') + '\n';
		}
		return text;
	}
	function onCopied() {
		copied = true;
	}
	function onMouseEnterCopyButton() {
		clearTimeout(copyTimeoutId);
	}
	function onMouseLeaveCopyButton() {
		copyTimeoutId = setTimeout(() => {
			copied = false;
		}, 1800);
	}

	let hydrated = $state(false);
	$effect(() => {
		hydrated = true;
	});

	let fullscreen = $state(false);
	/** @type {HTMLElement} */
	let codeblockEl;
	/** @param {MouseEvent} e */
	function enhanceFullScreen(e) {
		e.preventDefault();
		if (!document.fullscreenElement) {
			if (groupContext?.node) {
				groupContext.node.requestFullscreen();
			} else {
				codeblockEl.requestFullscreen();
			}
		} else if (document.exitFullscreen) {
			document.exitFullscreen();
		}
	}
	function onFullScreenChange() {
		fullscreen = !!document.fullscreenElement;
	}
</script>

<section
	bind:this={codeblockEl}
	onfullscreenchange={onFullScreenChange}
	class="codeblock {cls}"
	class:grouped={!!groupContext}
	class:hide-line-number={hideLineNumber !== 'false'}
	{...groupContext && { 'data-group-display': groupContext.display }}
	class:has-title={title}
	class:collapsible={groupContext ? false : collapsible}
	style:--num-line-width="{numLines ? numLines.length + 2 : 4}ch"
	{...rest}
>
	{#if groupContext}
		<label class="codeblock-group-label">
			{#if groupContext.display === 'files'}
				<span class="codeblock-title">
					<FileIcon {lang} />
					<span>{title}</span>
				</span>
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
		<label class="codeblock-header" for="codeblock-{id}-collapsed">
			<p class="codeblock-title">
				<FileIcon {lang} />
				<span>{title}</span>
			</p>
		</label>
	{/if}
	<div class="codeblock-content">
		<div class="codeblock-content-accordion">
			<div class="codeblock-btns">
				{#if hydrated}
					<button
						class="codeblock-btn codeblock-btn-copy"
						bind:this={copyTrigger}
						disabled={copied}
						onmouseleave={onMouseLeaveCopyButton}
						onmouseenter={onMouseEnterCopyButton}
						type="button"
					>
						<span class="sr-only">Copy</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							fill="currentcolor"
							viewBox="0 0 256 256"
						>
							{#if copied}
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
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
				<label
					class="codeblock-btn codeblock-btn-fullscreen"
					onclick={enhanceFullScreen}
					for={fullScreenCheckBoxId}
				>
					<span class="sr-only">Fullscreen</span>
					{#if !groupContext}
						<input class="codeblock-fullscreen sr-only" type="checkbox" id={fullScreenCheckBoxId} bind:checked={fullscreen} />
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
				{#if collapsible}
					<label class="codeblock-btn codeblock-collapsed-indicator">
						<input
							class="codeblock-collapsed sr-only"
							type="checkbox"
							bind:checked={collapsedInputChecked}
							id="codeblock-{id}-collapsed"
						/>
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
				{/if}
			</div>
			<div
				class="codeblock-pre-container"
				use:copy={{ trigger: copyTrigger, text: copyText }}
				oncopied={onCopied}
			>
				{#if children}
					{@render children()}
				{/if}
			</div>
		</div>
	</div>
</section>

<style lang="postcss">
	p {
		margin: 0;
		padding: 0;
	}

	.codeblock {
		--color-header-fg: hsl(0deg 0% 50%);

		/* assume integration with @sveltevietnam/ui */
		@dark global {
			--color-header-fg: hsl(0deg 0% 64%);
		}

		position: relative;

		overflow: hidden;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: auto 1fr;

		margin-block: 24px;

		border-width: 1px;
		border-radius: 0.375rem;

		& :global(pre) {
			height: 100%;
			margin-block: 0;

			border-width: 1px 0 0 !important;
			border-top-left-radius: 0;
			border-top-right-radius: 0;
		}

		&.grouped {
			display: contents !important;

			& :global(pre) {
				border-width: 1px !important;
			}

			& .codeblock-content {
				display: none;
				grid-column: 1 / span calc(var(--cols) + 1);
				grid-row: 2;
			}

			&[data-group-display='tabs'] {
				& .codeblock-btns {
					right: 0;
				}

				& .codeblock-btn {
					border-radius: 0.375rem;
				}

				& :global(pre) {
					border-top-right-radius: 0.375rem;
				}
			}
		}

		&.collapsible:not(:has(.codeblock-fullscreen:checked)) {
			& .codeblock-header {
				cursor: pointer;
			}

			& .codeblock-content {
				grid-template-rows: 0fr;
				transition: grid-template-rows 150ms ease-out;
			}

			&:not(:has(.codeblock-collapsed:checked)) {
				& .codeblock-content {
					grid-template-rows: 1fr;
				}

				& .codeblock-collapsed-indicator {
					transform: rotate(180deg);
				}
			}

			& .codeblock-collapsed-indicator {
				display: block;
			}
		}
	}

	:global(.codeblock:not(.grouped, .has-title):has(pre[data-num-lines='1'])) {
		& .codeblock-header {
			display: none;
		}

		& .codeblock-btns {
			display: none;
		}

		& :global(pre) {
			border-top-width: 0 !important;
			border-top-left-radius: 0.375rem;
			border-top-right-radius: 0.375rem;
		}
	}

	.codeblock:has(.codeblock-fullscreen:checked) {
		border-radius: 0;
	}

	.codeblock:has(.codeblock-fullscreen:checked),
	:global(.codeblock-group:has(.codeblock-group-fullscreen:checked)) {
		position: fixed;
		z-index: theme('zIndex.overlay');
		inset: 0;

		height: 100dvh;
		margin: 0;

		& .codeblock-btns {
			right: 12px;
		}
	}

	.codeblock:has(.codeblock-fullscreen:checked) :global(pre) {
		max-height: 100vh !important;
		max-height: 100dvh !important;
	}

	:global(.codeblock-group:has(.codeblock-group-fullscreen:checked) pre) {
		max-height: calc(100vh - 2.625rem) !important;
		max-height: calc(100dvh - 2.625rem) !important;
	}

	/* code block selected */
	:global(.codeblock-group):not(:has(.codeblock-group-selected:checked)) .codeblock:first-of-type {
		& .codeblock-group-label {
			color: currentcolor;
			background-color: var(--color-pre-bg);
		}

		& .codeblock-content {
			display: grid;
		}
	}

	.codeblock:has(.codeblock-group-selected:checked) {
		& .codeblock-group-label {
			margin-bottom: -1px;
			color: currentcolor;
			background-color: var(--color-pre-bg);
		}

		& .codeblock-content {
			display: grid;
		}
	}

	.codeblock-group-label {
		cursor: pointer;

		position: relative;
		z-index: 2;

		grid-column: auto;
		grid-row: 1;

		padding: 12px 16px;

		font-size: theme('fontSize.sm');
		line-height: normal;
		color: var(--color-header-fg);

		background-color: theme('colors.bg.DEFAULT');
		border-top-width: 1px;

		&:hover {
			color: currentcolor;
		}

		.codeblock:first-of-type & {
			border-left-width: 1px;

			:global(.codeblock-group:not(:has(.codeblock-group-fullscreen:checked))) & {
				border-top-left-radius: 0.375rem;
			}
		}

		.codeblock:last-of-type:not([data-group-display='files']) & {
			border-right-width: 1px;

			:global(.codeblock-group:not(:has(.codeblock-group-fullscreen:checked))) & {
				border-top-right-radius: 0.375rem;
			}
		}

		.codeblock:not(:first-of-type) & {
			border-left-width: 1px;
		}
	}

	.codeblock-header {
		padding: 12px 16px;
		line-height: normal;
		background-color: var(--color-pre-bg);
	}

	.codeblock-title {
		width: fit-content;
		font-size: theme('fontSize.xs');
		white-space: nowrap;
	}

	.codeblock-content {
		z-index: 1;
		display: grid;
		max-width: 100%;
	}

	.codeblock-content-accordion {
		overflow: hidden;
	}

	.codeblock-btns {
		position: absolute;
		z-index: 2;
		top: 6px;
		right: 8px;

		display: flex;
		gap: 4px;
		align-items: center;

		width: fit-content;
	}

	.codeblock-btn {
		cursor: pointer;
		padding: 4px;
		color: var(--color-header-fg);
		transition: color 150ms ease-out;

		&:hover {
			color: currentcolor;
		}
	}

	.codeblock-btn-copy {
		&:disabled {
			/* allow clicking even if already copied */
			cursor: pointer;
		}
	}

	.codeblock-btn-fullscreen {
		& .minimize {
			display: none;
		}

		:global(.codeblock-group:has(.codeblock-group-fullscreen:checked)) &,
		&:has(.codeblock-fullscreen:checked) {
			& .maximize {
				display: none;
			}

			& .minimize {
				display: block;
			}
		}
	}

	.codeblock-collapsed-indicator {
		display: none;
		transition: transform 150ms ease-out;
	}

	.codeblock-pre-container {
		height: 100%;
	}
</style>

