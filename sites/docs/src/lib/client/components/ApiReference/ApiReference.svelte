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
    package.
  </p>
</section>
