<script>
  import { inlineSvg } from '@svelte-put/inline-svg';

  let { src = 'https://raw.githubusercontent.com/sveltejs/branding/master/svelte-logo.svg' } = $props();
</script>

<!-- add attributes and styling as with any other HTML element -->
<svg use:inlineSvg={src} width="100" class="svelte" />

<style>
  svg.svelte {
    filter: drop-shadow(0 0 0.5rem theme('colors.svelte'));
  }
</style>