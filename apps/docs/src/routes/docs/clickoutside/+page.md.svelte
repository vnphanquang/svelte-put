<script lang="ts">
  import Highlight from 'svelte-highlight';
  import typescript from 'svelte-highlight/languages/typescript';
  import xml from 'svelte-highlight/languages/xml';

  import code from '$lib/ui/components/SveltePutLogoAnimation.svelte?raw';

  import tsCode from '../../+layout.ts?raw';
</script>

# Clickoutside ## Test Heading 1

<Highlight language={typescript} code={tsCode} langtag />

<Highlight language={xml} {code} langtag />
