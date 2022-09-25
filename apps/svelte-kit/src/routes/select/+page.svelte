<script lang="ts">
  import Select from './Select.svelte';

  const options = [
    { label: 'Golden Retriever', value: 'Golden Retriever', id: 'golden-retriever', group: 'dog' },
    { label: 'Chihuahua', value: 'Chihuahua', id: 'chihuahua', group: 'dog' },
    { label: 'German Shepherd', value: 'German Shepherd', id: 'german-shepherd', group: 'dog' },
    { label: 'Bulldog', value: 'Bulldog', id: 'bulldog', group: 'dog' },
    { label: 'Poodle', value: 'Poodle', id: 'poodle', group: 'dog' },
    { label: 'Labrador', value: 'Labrador', id: 'labrador', group: 'dog' },
    { label: 'Husky', value: 'Husky', id: 'husky', group: 'dog' },
    { label: 'Alaskan', value: 'Alaskan', id: 'alaskan', group: 'dog' },
    { label: 'Siamese', value: 'Siamese', id: 'siamese', group: 'cat' },
    { label: 'Shorthair', value: 'Shorthair', id: 'shorthair', group: 'cat' },
    { label: 'Ragdoll', value: 'Ragdoll', id: 'ragdoll', group: 'cat' },
    { label: 'Sphynx', value: 'Sphynx', id: 'sphynx', group: 'cat' },
    { label: 'Burmese', value: 'Burmese', id: 'burmese', group: 'cat' },
    { label: 'Maine Coon', value: 'Maine Coon', id: 'maine-coon', group: 'cat' },
    { label: 'Persian', value: 'Persian', id: 'persian', group: 'cat' },
    { label: 'Vietnamese Pot-bellied', value: 'Vietnamese Pot-bellied', id: 'vietnamese-pot-bellied', group: 'pig' },
    { label: 'Micro', value: 'Micro', id: 'micro', group: 'pig' },
    { label: 'Mangalica', value: 'Mangalica', id: 'mangalica', group: 'pig' },
    { label: 'Duroc', value: 'Duroc', id: 'duroc', group: 'pig' },
    { label: 'Kunekune', value: 'Kunekune', id: 'kunekune', group: 'pig' },
    { label: 'Platypus', value: 'Platypus', id: 'platypus' },
    { label: 'Owl', value: 'Owl', id: 'owl' },
    { label: 'Rabbit', value: 'Rabbit', id: 'rabbit' },
    { label: 'Guinea Pig', value: 'Guinea Pig', id: 'guinea-pig' },
    { label: 'Hamster', value: 'Hamster', id: 'hamster' },
  ];

  let placeholder = 'Custom placeholder';
  let multiple: boolean;

  $: search = {
    enabled: false,
    debounced: 0,
    clearOnSelection: true,
  };

  $: group = {
    enabled: false,
    ungroupedLabel: 'Ungrouped',
  };

  let clearable: boolean;
  let hideExpansionIndicator: boolean;
  let collapseOnSelection: boolean;
</script>

<div class="grid place-items-center w-screen p-40 gap-10">
  <h1 class="text-4xl font-bold">@svelte-put/select</h1>

  <section class="w-full max-w-2xl grid gap-5">
    <h2 class="text-3xl font-bold underline">Interactive Playground</h2>
    <div class="grid grid-cols-[auto,1fr] gap-5 items-center">
      <label for="placeholder">Interactive Placeholder: </label>
      <input type="text" bind:value={placeholder} placeholder="something fun" id="placeholder">

      <label for="multiple">Multiple?:</label>
      <input type="checkbox" id="multiple" bind:checked={multiple} class="justify-self-start">

      <p>Search Config</p>
      <div class="grid grid-cols-[auto,1fr] gap-5 items-center">
        <label for="searchable">enabled?:</label>
        <input type="checkbox" id="searchable" bind:checked={search.enabled} class="justify-self-start">

        <label for="clearOnSelection">Clear search on selection?:</label>
        <input type="checkbox" id="clearOnSelection" bind:checked={search.clearOnSelection} class="justify-self-start">

        <label for="debounced">Debounce delay:</label>
        <input type="number" id="debounced" bind:value={search.debounced} class="justify-self-start">
      </div>

      <p>Group Config</p>
      <div class="grid grid-cols-[auto,1fr] gap-5 items-center">
        <label for="groupable">Enabled?:</label>
        <input type="checkbox" id="groupable" bind:checked={group.enabled} class="justify-self-start">

        <label for="ungroupedLabel">Debounce delay:</label>
        <input type="text" id="ungroupedLabel" bind:value={group.ungroupedLabel} class="justify-self-start">
      </div>

      <label for="clearable">Clearable?:</label>
      <input type="checkbox" id="clearable" bind:checked={clearable} class="justify-self-start">

      <label for="hideExpansionIndicator">Hide expansion indicator?:</label>
      <input type="checkbox" id="hideExpansionIndicator" bind:checked={hideExpansionIndicator} class="justify-self-start">

      <label for="collapseOnSelection">Collapse on selection</label>
      <input type="checkbox" id="collapseOnSelection" bind:checked={collapseOnSelection} class="justify-self-start">

      <div class="border-t-2 border-gray-500 col-[1/3] pt-4">
        <Select
          {options}
          bind:placeholder
          bind:multiple
          {search}
          {group}
          bind:clearable
          bind:hideExpansionIndicator
          bind:collapseOnSelection
        />
      </div>
    </div>
  </section>

  <section class="w-full max-w-2xl grid gap-5">
    <h2 class="text-3xl font-bold underline">Samples</h2>
    {#each [false, true] as multiple}
      <section class="w-full grid gap-5">
        <h3 class="text-2xl font-bold">
          {multiple ? 'Multiple' : 'Single'} Select
        </h3>

        <article>
          <h4 class="text-xl">Default</h4>
          <Select {options} placeholder="Please select" {multiple} />
        </article>

        <article>
          <h4 class="text-xl">Disabled</h4>
          <Select {options} placeholder="Please select" {multiple} disabled />
        </article>

        <article>
          <h4 class="text-xl">Searchable</h4>
          <Select {options} placeholder="Please select" {multiple} search />
        </article>

        <article>
          <h4 class="text-xl">Non-clearable</h4>
          <Select {options} placeholder="Please select" {multiple} clearable={false} />
        </article>

        <article>
          <h4 class="text-xl">Hide Expansion Indicator</h4>
          <Select {options} placeholder="Please select" {multiple} hideExpansionIndicator />
        </article>
      </section>
    {/each}
  </section>
</div>
