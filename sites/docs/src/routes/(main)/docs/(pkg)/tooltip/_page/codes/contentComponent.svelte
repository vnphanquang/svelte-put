<script>
  import { prepare } from '@svelte-put/tooltip';

  import TooltipComponent from './Tooltip.component.svelte';

  export const tooltipWithComponent = prepare({ content: TooltipComponent });
</script>

<button use:tooltipWithComponent>A Button</button>
