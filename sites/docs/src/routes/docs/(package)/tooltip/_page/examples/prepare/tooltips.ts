import { arrow, autoUpdate, computePosition, offset } from '@floating-ui/dom';
import { prepare } from '@svelte-put/tooltip';

import Tooltip from './Tooltip.svelte';

export const helloTip = prepare({
  content: {
    component: Tooltip,
    props: {
      content: 'Hello world!',
    },
  },
  target: 'parent',
  debounce: 120,
  class: 'c-tooltip',
  compute: async ({ node, tooltip, content }) => {
    console.log('Content rendered, string or Svelte component instance', content);

    const arrowEl = document.createElement('div');
    arrowEl.className = 'c-tooltip-arrow';
    tooltip.prepend(arrowEl);

    autoUpdate(node, tooltip as HTMLElement, async () => {
      const { x, y, middlewareData, placement } = await computePosition(node, tooltip as HTMLElement, {
        placement: 'right',
        middleware: [
          offset(16),
          arrow({
            element: arrowEl,
          }),
        ],
      });
      (tooltip as HTMLElement).style.left = `${x}px`;
      (tooltip as HTMLElement).style.top = `${y}px`;

      const staticSide = (
        {
          top: 'bottom',
          right: 'left',
          bottom: 'top',
          left: 'right',
        } as const
      )[placement.split('-')[0]];

      arrowEl.style.left = `${middlewareData.arrow?.x ?? 0}px`;
      arrowEl.style.top = `${middlewareData.arrow?.y ?? 0}px`;
      if (staticSide) arrowEl.style[staticSide] = '-4px';
    });
  },
});