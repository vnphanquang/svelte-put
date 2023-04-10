<script>
  const flag = true;
</script>

<!-- minimal -->
<svg data-inline-src="svelte" />

<!-- complex -->
<svg
  data-inline-src="svelte"
  class:literal={true}
  class:variable={flag}
  class={flag ? 'true' : 'false'}
/>
