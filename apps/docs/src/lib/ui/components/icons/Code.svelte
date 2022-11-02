<script lang="ts">
  import type { ComponentProps } from 'svelte';

  import Svg from './Svg.svelte';

  type $$Props = ComponentProps<Svg>;
</script>

<Svg width="20" height="20" {...$$restProps}>
  <path
    d="m16 35.9-12-12 12.1-12.1 2.15 2.15L8.3 23.9l9.85 9.85Zm15.9.1-2.15-2.15 9.95-9.95-9.85-9.85L32 11.9l12 12Z"
  />
</Svg>
