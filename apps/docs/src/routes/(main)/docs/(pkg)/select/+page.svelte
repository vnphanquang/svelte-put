<script lang="ts">
  import type { GroupConfig } from '@svelte-put/select';
  import Select from '@svelte-put/select/Select.svelte';
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
    {
      label: 'Vietnamese Pot-bellied',
      value: 'Vietnamese Pot-bellied',
      id: 'vietnamese-pot-bellied',
      group: 'pig',
    },
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
  $: optionsWithFirstTwoNotDeselectable = [
    ...options.slice(0, 2).map((o) => ({ ...o, deselectable: false })),
    ...options.slice(2),
  ];
  let placeholder = 'Custom placeholder';
  let multiple: boolean;
  $: search = {
    enabled: false,
    debounced: 0,
    clearOnSelection: true,
  };
  let group: GroupConfig<typeof options[0]>;
  $: group = {
    enabled: false,
    ungroupedLabel: 'UNGROUPED',
    group: (option) => option.group?.toUpperCase() ?? '',
  };
  let clearable: boolean;
  let hideExpansionIndicator: boolean;
  let collapseOnSelection: boolean;
</script>

<main>
  <h1>@svelte-put/select</h1>
  <section>
    <h2>Interactive Playground</h2>
    <div class="interactive-playground ip">
      <label for="placeholder">Interactive Placeholder: </label>
      <input type="text" bind:value={placeholder} placeholder="something fun" id="placeholder" />
      <label for="multiple">Multiple?:</label>
      <input type="checkbox" id="multiple" bind:checked={multiple} />
      <p class="ip__group-title">Search Config</p>
      <div class="ip__group">
        <label for="searchable">Enabled?:</label>
        <input type="checkbox" id="searchable" bind:checked={search.enabled} />
        <label for="clearOnSelection">Clear search on selection?:</label>
        <input type="checkbox" id="clearOnSelection" bind:checked={search.clearOnSelection} />
        <label for="debounced">Debounce delay:</label>
        <input type="number" id="debounced" bind:value={search.debounced} />
      </div>
      <p class="ip__group-title">Group Config</p>
      <div class="ip__group">
        <label for="groupable">Enabled?:</label>
        <input type="checkbox" id="groupable" bind:checked={group.enabled} />
        <label for="ungroupedLabel">Debounce delay:</label>
        <input type="text" id="ungroupedLabel" bind:value={group.ungroupedLabel} />
      </div>
      <label for="clearable">Clearable?:</label>
      <input type="checkbox" id="clearable" bind:checked={clearable} />
      <label for="hideExpansionIndicator">Hide expansion indicator?:</label>
      <input type="checkbox" id="hideExpansionIndicator" bind:checked={hideExpansionIndicator} />
      <label for="collapseOnSelection">Collapse on selection</label>
      <input type="checkbox" id="collapseOnSelection" bind:checked={collapseOnSelection} />
      <div class="ip__select">
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
  <section>
    <h2>Samples</h2>
    <section class="samples">
      <article>
        <h4>Default</h4>
        <Select {options} placeholder="Please select" />
      </article>
      <article>
        <h4>Multiple</h4>
        <Select {options} placeholder="Please select" multiple />
      </article>
      <article class="samples__group">
        <h4>Pre-selected Options</h4>
        <div>
          <h5>Single</h5>
          <Select {options} placeholder="Please select" selected={options[2]} />
          <!-- this should cause ts error (selected must be array) -->
          <!-- <Select {options} placeholder="Please select" multiple selected={options[2]} />
          <Select {options} placeholder="Please select" multiple={true} selected={options[2]} /> -->
        </div>
        <div>
          <h5>Multiple</h5>
          <Select {options} placeholder="Please select" multiple selected={options.slice(2, 5)} />
          <!-- this should cause ts error (selected must be single value) -->
          <!-- <Select {options} placeholder="Please select" selected={options.slice(2, 5)} />
          <Select {options} placeholder="Please select" multiple={false} selected={options.slice(2, 5)} /> -->
        </div>
      </article>
      <article>
        <h4>Pre-selected & Fixed Options</h4>
        <Select
          options={optionsWithFirstTwoNotDeselectable}
          multiple
          selected={options.slice(0, 2)}
        />
      </article>
      <article>
        <h4>Disabled</h4>
        <Select {options} placeholder="Please select" disabled />
      </article>
      <article class="samples__group">
        <h4>Searchable</h4>
        <div>
          <h5>Single</h5>
          <Select {options} placeholder="Please select" search />
          <h5>Multiple</h5>
          <Select {options} placeholder="Please select" search multiple />
        </div>
      </article>
      <article>
        <h4>Groupable</h4>
        <Select {options} placeholder="Please select" group />
      </article>
      <article>
        <h4>Non-clearable</h4>
        <Select {options} placeholder="Please select" clearable={false} />
      </article>
      <article>
        <h4>Hide Expansion Indicator</h4>
        <Select {options} placeholder="Please select" hideExpansionIndicator />
      </article>
    </section>
  </section>
</main>

<style>
  main {
    display: grid;
    gap: 2.5rem;
    padding: 5rem 0;
    place-items: center;
    width: 100%;
  }
  h1 {
    font-size: 2.25rem;
    font-weight: 700;
    line-height: 2.5rem;
  }
  h4 {
    font-size: 1.25rem;
    font-weight: bold;
  }
  section {
    display: grid;
    gap: 1.25rem;
    max-width: 42rem;
    width: 100%;
  }
  h2 {
    font-size: 1.875rem;
    font-weight: 700;
    line-height: 2.25rem;
    text-decoration-line: underline;
  }
  .interactive-playground.ip {
    align-items: center;
    display: grid;
    gap: 1.25rem;
    grid-template-columns: auto 1fr;
  }
  .ip__group-title {
    align-self: flex-start;
  }
  .ip__group {
    align-items: center;
    display: grid;
    gap: 1.25rem;
    grid-template-columns: auto 1fr;
  }
  .ip input[type='checkbox'] {
    justify-self: start;
  }
  .ip__select {
    border-color: rgb(107 114 128);
    border-top-width: 2px;
    grid-column: 1/3;
    padding-top: 1rem;
  }
  .samples {
    display: grid;
    gap: 1.25rem;
    width: 100%;
  }
  .samples__group {
    display: grid;
    gap: 1rem;
  }
</style>
