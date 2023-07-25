<script lang="ts">
  import { computePosition } from '@floating-ui/dom';
  import { tooltip } from '@svelte-put/tooltip';
</script>

<button
  class="c-btn-primary relative"
  use:tooltip={{
    content: 'An example tooltip',
    compute: async ({ node, tooltip, content }) => {
      tooltip.classList.toggle('c-tooltip', true);
      const { x, y } = await computePosition(node, tooltip, {
        placement: 'right',
      });
      tooltip.style.left = `${x}px`;
      tooltip.style.top = `${y}px`;
    },
  }}
>
  A button with tooltip
</button>
