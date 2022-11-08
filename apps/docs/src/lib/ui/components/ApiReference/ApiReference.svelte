<script lang="ts">
  import ResourceLink from '$lib/ui/components/ResourceLink/ResourceLink.svelte';
  export let href: string;
</script>

<h2>API Reference</h2>

<p class="c-callout">The best documentation is no documentation!</p>

It is recommended to utilize editor intellisense & explore in-code documentation while using the
package (and use <ResourceLink key="typescript" /> if possible 😉).

<p>
  See the extracted
  <ResourceLink {href}>API Reference</ResourceLink>
  (powered by <ResourceLink key="@microsoft/api-extractor" /> and <ResourceLink
    key="@microsoft/api-documenter"
  />) on github.
</p>
