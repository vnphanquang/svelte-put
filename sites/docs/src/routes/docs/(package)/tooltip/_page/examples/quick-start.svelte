<script lang="ts">
  import { computePosition } from '@floating-ui/dom';
  import { tooltip } from '@svelte-put/tooltip';
</script>

<button
  class="c-btn relative"
  use:tooltip={{
    content: 'An example tooltip',
    class: 'c-tooltip',
    compute: async ({ node, tooltip, content }) => {
      console.log(content);
      const { x, y } = await computePosition(node, tooltip, {
        placement: 'top',
      });
      tooltip.style.left = `${x}px`;
      tooltip.style.top = `${y}px`;
    },
  }}
>
  A button with tooltip
</button>