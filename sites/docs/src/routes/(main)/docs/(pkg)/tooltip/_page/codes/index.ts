import Tooltip from './Tooltip.component.svelte?raw';
import contentComponent from './contentComponent.svelte?raw';
import contentComponentWithProps from './contentComponentWithProps.svelte?raw';
import contentString from './contentString.svelte?raw';
import prepareSvelte from './prepare.code.svelte?raw';
import prepareTs from './prepare.code.ts?raw';
import prepareQuick from './prepareQuick.code.ts?raw';
import quickStart from './quickStart.code.svelte?raw';

export const codes = {
  quickStart,
  prepare: {
    quick: prepareQuick,
    example: {
      Usage: prepareSvelte,
      'UI Setup': Tooltip,
      'Action Setup': prepareTs,
    },
  },
  content: {
    examples: {
      string: contentString,
      component: contentComponent,
      componentWithProps: contentComponentWithProps,
    },
  },
};
