import { computePosition } from '@floating-ui/dom';
import { compose } from '@svelte-put/tooltip';

import Tooltip from './Tooltip.component.svelte';

export const exampleTooltip = compose({
  content: {
    component: Tooltip,
    props: {
      content: 'Example Tooltip',
    },
  },
  target: 'parent',
  compute: async ({ node, tooltip }) => {
    tooltip.classList.toggle('c-tooltip', true);
    const { x, y } = await computePosition(node, tooltip, {
      placement: 'right',
    });
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
  },
});
