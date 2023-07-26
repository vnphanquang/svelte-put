<script>
  import { prepare } from '@svelte-put/tooltip';

  const tooltipWithText = prepare({ content: 'Placeholder' });
</script>

<button use:tooltipWithText>A Button</button>
