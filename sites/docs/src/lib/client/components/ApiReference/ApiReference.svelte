<script lang="ts">
  import ResourceLink from '$client/components/ResourceLink/ResourceLink.svelte';
  export let href: string;
  export let shouldRecommendTypescript = true;
</script>

<section>
  <h2>API Reference</h2>

  <p class="c-callout-info">The best documentation is no documentation!</p>

  <p>
    It is recommended to utilize editor intellisense & explore in-code documentation while using the
    package
    {#if shouldRecommendTypescript}
      (and use <ResourceLink key="typescript" /> if possible 😉)
    {/if}
    .
  </p>

  <p>
    See the extracted
    <ResourceLink {href}>API Reference</ResourceLink> on github.
  </p>
  <p class="text-sm italic text-gray-500">
    API extraction is powered by <ResourceLink key="@microsoft/api-extractor" /> and <ResourceLink
      key="@microsoft/api-documenter"
    />).
  </p>
</section>
