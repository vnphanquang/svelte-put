<!-- eslint-disable no-undef -->
<script lang="ts">
	import { clickoutside } from '@svelte-put/clickoutside';
	import { shortcut } from '@svelte-put/shortcut';
	import type { ShortcutTrigger } from '@svelte-put/shortcut';
	import { slide } from 'svelte/transition';

	import type {
		Searcher,
		SearchConfig,
		BaseOption,
		GroupConfig,
		SearchProp,
		GroupProp,
		SelectProperties,
	} from './Select.types';

	// eslint-disable-next-line no-undef
	type Value = $$Generic;
	// eslint-disable-next-line no-undef
	type Option = $$Generic<BaseOption<Value>>;
	// eslint-disable-next-line no-undef
	type Multiple = $$Generic<true | false | undefined>;

	type $$Props = SelectProperties<Option, Multiple>;
	type SelectedOption = $$Props['selected'];
	type SelectedValue = $$Props['value'];

	export let id: string = crypto.randomUUID();
	export let placeholder = '';
	export let disabled = false;
	export let multiple: $$Props['multiple'] = undefined;
	export let collapseOnSelection = multiple ? false : true;
	$: collapseOnSelection = multiple ? false : true;
	export let required = false;
	export let generateUlId = () => `${id}-ul`;
	export let generateLiId = (option: Option) => `li-${option.id}`;
	export let open = false;
	export let group: GroupProp<Option> = false;
	export let options: Option[];
	export let selected: SelectedOption = undefined;
	export let value: SelectedValue = (
		Array.isArray(selected) ? selected?.map((o) => o.value) : selected?.value
	) as SelectedValue;
	export let search: SearchProp<Option> = false;
	export let clearable = true;
	export let hideExpansionIndicator = false;

	// option focus handling
	let focusedOptionIndex: number | undefined = undefined;
	$: activeDescendant =
		focusedOptionIndex !== undefined && searchedOptions[focusedOptionIndex]
			? generateLiId(searchedOptions[focusedOptionIndex])
			: undefined;
	function resetFocusedOptionIndex() {
		focusedOptionIndex = undefined;
	}

	// search handling
	let defaultSearcher: Searcher<Option> = (input) => {
		const { query, options } = input;
		return options.filter((option) => {
			let matched = option.label.toLowerCase().includes(query.toLowerCase());
			if (!matched && option.group) {
				matched = option.group.toLowerCase().includes(query.toLowerCase());
			}
			return matched;
		});
	};
	const DEFAULT_SEARCH_CONFIG: SearchConfig<Option> = {
		search: defaultSearcher,
		clearOnSelection: true,
		debounced: 0,
		enabled: false,
	};
	function resolveSearchProp(prop: SearchProp<Option>): SearchConfig<Option> {
		let debounced = 0;
		if (typeof prop === 'boolean') {
			return {
				...DEFAULT_SEARCH_CONFIG,
				enabled: prop,
			};
		}

		if (typeof prop === 'function') {
			return {
				...DEFAULT_SEARCH_CONFIG,
				enabled: true,
				search: prop,
			};
		}

		if (prop.debounced) {
			debounced = prop.debounced;
		}
		return {
			...DEFAULT_SEARCH_CONFIG,
			enabled: true,
			...prop,
			debounced,
		};
	}
	let rSearch: SearchConfig<Option>;
	$: rSearch = resolveSearchProp(search);
	let query = '';
	let searchedOptions: Option[] = options;
	$: allOptionsDisabled = searchedOptions.every((o) => o.disabled);
	// add lodash debounce?
	const doSearch = async (query: string, options: Option[]) => {
		const previousSearchOptions = searchedOptions;
		searchedOptions = await rSearch.search({ query, options });
		if (!searchedOptions.length) focusedOptionIndex = undefined;
		else if (focusedOptionIndex !== undefined) {
			const focusedOption = previousSearchOptions[focusedOptionIndex];
			focusedOptionIndex = 0;
			for (let i = 0; i < searchedOptions.length; i++) {
				if (searchedOptions[i].id === focusedOption.id) {
					focusedOptionIndex = i;
					break;
				}
			}
		} else {
			focusedOptionIndex = 0;
		}
		if (!open && query) expand();
	};
	$: doSearch(query.trim(), options);

	// grouping
	const DEFAULT_GROUP_CONFIG: GroupConfig<Option> = {
		enabled: false,
		ungroupedLabel: 'Ungrouped',
		group: (option) => option.group ?? '',
	};
	function resolveGroup(prop: GroupProp<Option>): GroupConfig<Option> {
		if (typeof prop === 'function') {
			return {
				...DEFAULT_GROUP_CONFIG,
				enabled: true,
				group: prop,
			};
		} else if (typeof prop === 'boolean') {
			return {
				...DEFAULT_GROUP_CONFIG,
				enabled: prop,
			};
		} else {
			return {
				...DEFAULT_GROUP_CONFIG,
				enabled: true,
				...prop,
			};
		}
	}
	$: rGroup = resolveGroup(group);
	function groupOptions(
		options: Option[],
		groupConfig: GroupConfig<Option>,
	): Record<string, Option[]> {
		return options.reduce(
			(map, option) => {
				let group = '';
				if (groupConfig.enabled) {
					group = groupConfig.group(option) || groupConfig.ungroupedLabel;
				}

				if (map[group]) {
					map[group].push(option);
				} else {
					map[group] = [option];
				}
				return map;
			},
			{} as Record<string, Option[]>,
		);
	}
	$: grouped = groupOptions(searchedOptions, rGroup);

	// selection handling
	let selectionMap: Record<string, boolean> = options.reduce(
		(acc, option) => {
			let isSelected = false;
			if (Array.isArray(selected)) {
				isSelected = selected?.some((o) => o.value === option.value);
			} else {
				isSelected = selected?.value === option.value;
			}
			acc[option.id] = isSelected;
			return acc;
		},
		{} as Record<string, boolean>,
	);
	$: selectedOptions = options.filter((o) => selectionMap[o.id]);
	function toggleSelection(_option: Option) {
		if (_option.disabled) return;
		if (multiple) {
			selectionMap[_option.id] = !selectionMap[_option.id];
			selected = options.filter((option) => selectionMap[option.id]) as unknown as SelectedOption;
			value = (selected as Option[]).map((option) => option.value) as unknown as SelectedValue;
		} else {
			for (const option of options) {
				selectionMap[option.id] = option.id === _option.id ? !selectionMap[option.id] : false;
			}
			selected = _option as unknown as SelectedOption;
			value = _option.value as unknown as SelectedValue;
		}
		if (rSearch.clearOnSelection) {
			query = '';
		}
		if (collapseOnSelection) collapse();
	}
	function clearSelection() {
		for (const option of options.filter((o) => o.deselectable !== false)) {
			selectionMap[option.id] = false;
			selected = undefined;
			value = undefined;
			query = '';
		}
	}
	function removeLastSelection() {
		if (query) return;
		for (const option of selectedOptions.reverse()) {
			if (selectionMap[option.id]) {
				toggleSelection(option);
				break;
			}
		}
	}

	// expansion handling
	function collapse() {
		open = false;
	}
	function expand() {
		if (!disabled) open = true;
	}
	function onClickComboBox() {
		if (open) {
			collapse();
		} else {
			expand();
		}
	}

	function onArrowDown() {
		if (!open) return expand();
		if (allOptionsDisabled) {
			resetFocusedOptionIndex();
			return;
		}
		if (focusedOptionIndex === undefined) focusedOptionIndex = 0;
		else if (focusedOptionIndex < searchedOptions.length - 1) focusedOptionIndex++;
		else focusedOptionIndex = 0;
		if (searchedOptions[focusedOptionIndex].disabled) onArrowDown();
	}
	function onArrowUp() {
		if (!open) return expand();
		if (allOptionsDisabled) {
			resetFocusedOptionIndex();
			return;
		}
		focusedOptionIndex = !focusedOptionIndex
			? searchedOptions.length - 1
			: Math.max(focusedOptionIndex - 1, 0);
		if (searchedOptions[focusedOptionIndex].disabled && !allOptionsDisabled) onArrowUp();
	}
	function onEnter() {
		if (!open) return expand();
		if (focusedOptionIndex === undefined) return;
		if (searchFocused) searchElement?.blur();
		toggleSelection(searchedOptions[focusedOptionIndex]);
	}
	let comboboxShortcuts: ShortcutTrigger[];
	$: comboboxShortcuts = [
		{ key: 'ArrowDown', callback: onArrowDown, preventDefault: true },
		{ key: 'ArrowUp', callback: onArrowUp, preventDefault: true },
		{ key: 'Enter', callback: onEnter, preventDefault: true },
		{ key: 'Escape', callback: collapse, enabled: open },
		{ key: 'Tab', callback: collapse, enabled: open },
	];

	let searchElement: HTMLInputElement;
	let searchFocused = false;
	function focusSearch() {
		searchFocused = true;
	}
	function blurSearch() {
		searchFocused = false;
	}
	let inputShortcuts: ShortcutTrigger[];
	$: inputShortcuts = [{ key: 'Backspace', callback: removeLastSelection }];
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	{id}
	class="combobox {$$props.class}"
	use:shortcut={{
		enabled: !allOptionsDisabled,
		trigger: comboboxShortcuts,
	}}
	use:clickoutside={{ enabled: open }}
	on:clickoutside={collapse}
	on:click|preventDefault={onClickComboBox}
	tabindex={rSearch.enabled ? -1 : 0}
	role="combobox"
	aria-disabled={disabled}
	data-searchable={rSearch.enabled}
	data-multiple={multiple}
	aria-autocomplete="list"
	aria-controls={generateUlId()}
	aria-expanded={open}
	aria-activedescendant={activeDescendant}
	aria-required={required}
>
	<div class="search-and-selected">
		{#if rSearch.enabled}
			<input
				bind:this={searchElement}
				class="search"
				bind:value={query}
				disabled={!rSearch.enabled}
				type="text"
				on:focus={focusSearch}
				on:blur={blurSearch}
				use:shortcut={{ trigger: inputShortcuts, enabled: searchFocused }}
			/>
		{/if}

		{#if selectedOptions.length}
			{#if multiple}
				{#each selectedOptions as option (option.id)}
					<p class="selected-option">
						<span class="selected-option-label">{option.label}</span>
						{#if option.deselectable !== false}
							<button
								class="selected-option-remove"
								on:click|preventDefault|stopPropagation={() => toggleSelection(option)}
								tabindex="-1"
								disabled={option.disabled}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="14"
									width="14"
									viewBox="0 0 48 48"
									stroke="currentColor"
								>
									<path
										d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z"
									/>
								</svg>
							</button>
						{/if}
					</p>
				{/each}
			{:else}
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<p class="selected-single" on:click={() => searchElement?.focus()}>
					{selectedOptions[0].label}
				</p>
			{/if}
		{/if}

		{#if !selectedOptions.length && !query}
			<p class="placeholder">{placeholder}</p>
		{/if}
	</div>

	<div class="combobox-right">
		{#if clearable && selectedOptions.length}
			<button
				class="combobox-clear"
				on:click|stopPropagation={clearSelection}
				{disabled}
				tabindex="-1"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="20"
					width="20"
					viewBox="0 0 48 48"
					stroke="currentColor"
				>
					<path
						d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z"
					/>
				</svg>
			</button>
			{#if !hideExpansionIndicator}
				<div class="combobox-right-separator" />
			{/if}
		{/if}

		{#if !hideExpansionIndicator}
			<div class="combobox-arrow">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="26"
					width="26"
					viewBox="0 0 48 48"
					stroke="currentColor"
				>
					<path d="m24 30.75-12-12 2.15-2.15L24 26.5l9.85-9.85L36 18.8Z" />
				</svg>
			</div>
		{/if}
	</div>

	{#if open}
		<ul
			id={generateUlId()}
			class="listbox"
			role="listbox"
			transition:slide|local={{ duration: 120 }}
			on:mouseleave={resetFocusedOptionIndex}
		>
			{#each Object.entries(grouped) as [group, options] (group)}
				{#if group}
					<p class="listbox-option-group">{group}</p>
				{/if}
				{#each options as option (option.id)}
					{#if !selectionMap[option.id] || option.deselectable !== false}
						{@const absoluteIndex = searchedOptions.findIndex((o) => o.id === option.id)}
						<li
							transition:slide|local={{ duration: 100 }}
							class="listbox-option"
							role="option"
							data-focused={focusedOptionIndex === absoluteIndex}
							aria-selected={selectionMap[option.id]}
							aria-disabled={option.disabled}
							id={generateLiId(option)}
							on:click|stopPropagation={() => toggleSelection(option)}
							on:mouseenter={() => (focusedOptionIndex = absoluteIndex)}
						>
							{option.label}
						</li>
					{/if}
				{/each}
			{/each}
		</ul>
	{/if}
</div>

<!-- FIXME: fix this dreadful color scheme -->
<style>
	.combobox {
		position: relative;
		display: flex;
		align-items: stretch;
		background-color: white;
	}

	.combobox[aria-disabled='true'] {
		cursor: not-allowed;
		background-color: lightgray;
	}

	.search-and-selected {
		position: relative;

		display: flex;
		flex: 1;
		flex-direction: row;
		flex-wrap: wrap;

		min-height: 40px;
		padding: 8px;
	}

	.search:focus + .selected-single {
		display: none;
	}

	.search {
		display: block;
		flex-basis: 0;
		flex-grow: 1;
		order: 1;

		width: 100%;
		min-width: 0;

		outline: none;
	}

	.placeholder {
		pointer-events: none;

		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;

		padding: 8px;

		color: rgb(128 128 128);
	}

	.search:focus + .placeholder {
		display: none;
	}

	.selected-option {
		overflow: hidden;
		display: inline-flex;
		flex-wrap: nowrap;
		align-items: center;
		order: 0;

		margin: 2px;

		background-color: rgb(230 230 230);
		border-radius: 0.25rem;
	}

	.selected-option-label {
		flex: 1;
		padding: 0 4px;
	}

	.selected-option-remove {
		display: inline-block;
		padding: 4px;
	}

	.selected-option-remove:hover {
		background-color: tomato;
	}

	.combobox-right {
		display: flex;
		align-items: stretch;
		padding: 0 8px;
	}

	.combobox-right-separator {
		width: 1px;
		margin: 4px 8px;
		background-color: rgb(204 204 204);
	}

	.combobox-clear {
		color: red;
	}

	.combobox-clear:disabled {
		color: gray;
	}

	.combobox-arrow {
		display: flex;
		align-items: center;
		color: lightblue;
		background-color: transparent;
	}

	.combobox[aria-disabled='true'] .combobox-arrow {
		color: gray;
	}

	.combobox-arrow > svg {
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 150ms;
	}

	@supports (rotate: 0deg) {
		.combobox-arrow > svg {
			rotate: 0deg;
			transition-property: rotate;
		}

		.combobox[aria-expanded='true'] .combobox-arrow > svg {
			rotate: 180deg;
		}
	}

	@supports not (rotate: 0deg) {
		.combobox-arrow {
			transform: rotate(0deg);
			transition-property: transform;
		}

		.combobox[aria-expanded='true'] .combobox-arrow {
			transform: rotate(180deg);
		}
	}

	.listbox {
		position: absolute;
		z-index: 2;
		top: 100%;
		right: 0;
		left: 0;

		overflow: auto;

		max-height: 300px;
		margin-top: 4px;
		padding: 4px 0;

		background-color: white;
	}

	.listbox-option-group {
		padding: 8px;
		color: darkgray;
	}

	.listbox-option-group:not(first-of-type) {
		padding-top: 12px;
	}

	.listbox-option {
		cursor: pointer;
		width: 100%;
		padding: 8px;
	}

	.listbox-option[data-focused='true'] {
		background-color: rgb(222 246 255);
	}

	.listbox-option[aria-selected='true'] {
		background-color: lightblue;
	}

	.listbox-option[aria-disabled='true'] {
		cursor: not-allowed;
		color: darkgray;
	}
</style>
