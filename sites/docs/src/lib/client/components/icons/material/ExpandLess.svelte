<script lang="ts">
  import type { ComponentProps } from 'svelte';

  import Svg from '../Svg.svelte';

  type $$Props = ComponentProps<Svg>;
</script>

<Svg width="20" height="20" title="expand" {...$$restProps}>
  <path d="M14.15 30.75 12 28.6l12-12 12 11.95-2.15 2.15L24 20.85Z" />
</Svg>
