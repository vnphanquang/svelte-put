<script lang="ts">
  import type { ComponentProps } from 'svelte';

  import Svg from '../Svg.svelte';

  type $$Props = ComponentProps<Svg>;
</script>

<Svg width="20" height="20" title="warning" {...$$restProps}>
  <path
    d="M2 42 24 4l22 38Zm5.2-3h33.6L24 10Zm17-2.85q.65 0 1.075-.425.425-.425.425-1.075 0-.65-.425-1.075-.425-.425-1.075-.425-.65 0-1.075.425Q22.7 34 22.7 34.65q0 .65.425 1.075.425.425 1.075.425Zm-1.5-5.55h3V19.4h-3Zm1.3-6.1Z"
  />
</Svg>
