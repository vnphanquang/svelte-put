<script lang="ts">
  import type { ComponentProps } from 'svelte';

  import Svg from '../Svg.svelte';

  type $$Props = ComponentProps<Svg>;
</script>

<Svg width="48" height="48" title="ArrowUp" {...$$restProps}>
  <path d="M22.5 40V13.7L10.1 26.1 8 24 24 8l16 16-2.1 2.1-12.4-12.4V40Z" />
</Svg>
