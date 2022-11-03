<script lang="ts">
  import type { ComponentProps } from 'svelte';

  import Svg from '../Svg.svelte';

  type $$Props = ComponentProps<Svg>;
</script>

<Svg width="20" height="20" title="done" {...$$restProps}>
  <path d="M18.9 35.7 7.7 24.5l2.15-2.15 9.05 9.05 19.2-19.2 2.15 2.15Z" />
</Svg>
