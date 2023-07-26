<script>
  import { prepare } from '@svelte-put/tooltip';

  import TooltipComponent from './Tooltip.component.svelte';

  const tooltipWithComponentAndDefaultProps = prepare({
    content: {
      component: TooltipComponent,
      props: {
        content: 'Default content',
      },
    },
  });
</script>

<button use:tooltipWithComponentAndDefaultProps>A Button</button>
