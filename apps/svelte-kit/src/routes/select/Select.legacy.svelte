<script lang="ts">
  import { clickoutside } from '@svelte-put/clickoutside';
  import { slide } from 'svelte/transition';

  type Value = $$Generic;
  type Option = $$Generic<{ label: string; value: Value; id: string }>;
  type Multiple = $$Generic<true | false>;
  type SelectedValue = $$Generic<Multiple extends true ? Option['value'][] : Option['value']>;
  type SelectedOption = $$Generic<Multiple extends true ? Option[] : Option>;

  interface $$Props {
    name: string;
    options: Option[];
    value?: SelectedValue;
    unit?: string;
    open?: boolean;
    placeholder?: string;
    class?: string;
    disabled?: boolean;
    multiple?: Multiple;
    closeOnSelect?: boolean;
    selected?: SelectedOption;
  }

  interface $$Slots {
    default: { option: Option; htmlId: string };
    selected: { options: Option[] };
    // eslint-disable-next-line @typescript-eslint/ban-types
    unit: {};
  }

  export let unit = '';
  export let name: string;
  export let open = false;
  export let placeholder = '';
  export let disabled = false;
  export let multiple: Multiple = false as Multiple;
  export let closeOnSelect = multiple ? false : true;
  export let options: Option[];
  export let selected: SelectedOption | undefined = undefined;
  export let value: SelectedValue | undefined = (
    Array.isArray(selected) ? selected.map((o) => o.value) : selected?.value
  ) as SelectedValue;

  let selectedOptions: Option[] = [];
  $: if (selected) {
    selectedOptions = (Array.isArray(selected) ? selected : selected ? [selected] : []) as Option[];
    value = (
      Array.isArray(selected) ? selected.map((option) => option.value) : selected.value
    ) as SelectedValue;
  }

  function closeOptions() {
    open = false;
  }

  function openOptions() {
    if (!disabled) open = true;
  }

  function toggleOptions() {
    if (open) {
      closeOptions();
    } else {
      openOptions();
    }
  }

  function onOptionClick(_option: Option) {
    if (closeOnSelect) closeOptions();
  }

  function getOptionId(option: Option) {
    return `select-option-${option.id}`;
  }
</script>

<div
  class="container {$$props.class ?? ''}"
  use:clickoutside={{ enabled: open }}
  on:clickoutside={closeOptions}
>
  <button
    class="input w-full text-left"
    data-focus={open}
    on:click|preventDefault={toggleOptions}
    {disabled}
  >
    {#if selectedOptions.length || placeholder}
      {#if selectedOptions.length}
        <slot name="selected" options={selectedOptions}>
          {#each selectedOptions as option, i (option.id)}
            {option.label}
            <slot name="unit">
              <span class="input-unit">{unit}</span>
              {i !== selectedOptions.length - 1 ? ', ' : ''}
            </slot>
          {/each}
        </slot>
      {:else}
        {placeholder}
      {/if}
    {:else}
      &nbsp
    {/if}
    <span class="input-arrow" class:open>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
        <rect id="Rectangle_29238" data-name="Rectangle 29238" width="16" height="16" fill="none" />
        <path
          id="Path_44069"
          data-name="Path 44069"
          d="M14.424,5.288,8,11.712,1.576,5.288"
          fill="none"
          stroke={disabled ? 'gray' : '#6bba99'}
          stroke-miterlimit="10"
          stroke-width="2"
        />
      </svg>
    </span>
  </button>

  {#if multiple}
    {#each options as option}
      <input
        id={getOptionId(option)}
        type="checkbox"
        hidden
        bind:group={selected}
        value={option}
        {name}
      />
    {/each}
  {:else}
    {#each options as option}
      <input
        id={getOptionId(option)}
        type="radio"
        hidden
        bind:group={selected}
        value={option}
        {name}
      />
    {/each}
  {/if}
  {#if open}
    <ul class="options z-10" transition:slide={{ duration: 150 }} aria-expanded={open}>
      {#each options as option}
        {@const htmlId = getOptionId(option)}
        {@const isSelected = !!selectedOptions.find((s) => s.id === option.id)}
        <slot {htmlId} {option}>
          <li class="option" on:click={() => onOptionClick(option)}>
            <label class="option-label" class:selected={isSelected} for={htmlId}>
              {option.label}
              <slot name="unit">
                <span class="option-unit">{unit}</span>
              </slot>
            </label>
          </li>
        </slot>
      {/each}
    </ul>
  {/if}
</div>

<style lang="postcss">
  .container {
    @apply relative;
  }

  .input {
    @apply cursor-pointer appearance-none rounded bg-white py-2 px-4 text-2xl shadow-sm;
    @apply border border-solid border-transparent outline-none;
    height: 50px;
    @apply focus:border-primary focus:shadow;
    @apply disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-opacity-20;
  }

  .input-unit {
    @apply align-middle text-xs;
  }

  .input-arrow {
    @apply absolute inset-y-0 right-0 mr-4 flex rotate-180 items-center transition-transform;

    &.open {
      @apply rotate-0;
    }
  }

  .options {
    @apply absolute inset-x-0 top-full mt-1 rounded bg-white py-2 shadow-lg;
  }

  .option {
    @apply flex w-full;
  }

  .option-label {
    @apply w-full cursor-pointer py-2 px-4 hover:bg-red-200;

    &.selected {
      @apply bg-red-400;
    }
  }

  .option-unit {
    @apply text-xs;
  }
</style>
