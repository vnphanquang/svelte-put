<script lang="ts">
  import clsx from 'clsx';

  import { packagesByCategory } from '$data/packages';
  import StatusBadge from '$lib/ui/components/StatusBadge/StatusBadge.svelte';
  import { createNpmBadgeUrl, createNpmUrl } from '$lib/utils/badge';
  import { capitalize } from '$lib/utils/string';
</script>

<h1>@svelte-put</h1>

<p class="italic">
  A collection of useful svelte actions, components, and utilities extracted from real world
  projects.
</p>

<h2>Packages</h2>
<p>
  <code>@svelte-put</code> includes several packages with self-managed release cycles, listed below.
  Check out their corresponding documentation page for more details.
</p>

{#each Object.entries(packagesByCategory) as [category, packages]}
  {@const sharedClass = 'bold border-border border-r px-2 h-full flex items-center'}
  {@const headerClass = clsx(sharedClass, 'font-bold border-b')}
  <h3 id="{category}-packages">{capitalize(category)}</h3>
  <div class="not-prose grid grid-cols-[198px,1fr,100px,80px] items-center">
    <p class={headerClass}>ID</p>
    <p class={headerClass}>Description</p>
    <p class={headerClass}>Version</p>
    <p class="{headerClass} border-r-0">Status</p>
    {#each packages as { id, description, name, path, status }, index}
      {@const cellClass = clsx(sharedClass, index < packages.length - 1 && 'border-b')}
      <p class={cellClass}>
        <a href={path} class="c-link font-semibold">
          {id}
        </a>
      </p>
      <p class={cellClass}>{description}</p>
      <div class={cellClass}>
        <a href={createNpmUrl(name)} target="__blank" class="block">
          <img
            class="block rounded"
            src={createNpmBadgeUrl(name)}
            alt={name}
            height="20"
            width="83"
          />
        </a>
      </div>
      <p class="{cellClass} border-r-0" class:border-b-0={index === packages.length - 1}>
        <StatusBadge {status} />
      </p>
    {/each}
  </div>
{/each}
