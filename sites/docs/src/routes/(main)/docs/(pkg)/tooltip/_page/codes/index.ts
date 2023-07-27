import Tooltip from './Tooltip.component.svelte?raw';
import containerInterface from './container.interface.ts?raw';
import contentComponent from './contentComponent.svelte?raw';
import contentComponentWithProps from './contentComponentWithProps.svelte?raw';
import contentString from './contentString.svelte?raw';
import prepareSvelte from './prepare.code.svelte?raw';
import prepareTs from './prepare.code.ts?raw';
import prepareCSS from './prepare.css?raw';
import prepareQuick from './prepareQuick.code.ts?raw';
import quickStart from './quickStart.code.svelte?raw';

export const codes = {
  quickStart,
  prepare: {
    quick: prepareQuick,
    example: {
      Usage: prepareSvelte,
      'UI Setup': Tooltip,
      'CSS Setup': prepareCSS,
      'Action Setup': prepareTs,
    },
    interface: `type TooltipParameter = TooltipContainer & {
  content: Content;
  compute?: TooltipCompute;
};
export function tooltip(node: HTMLElement, param: TooltipParameter);
export function prepare(param: TooltipParameter);
`,
  },
  container: {
    interface: containerInterface,
  },
  content: {
    examples: {
      string: contentString,
      component: contentComponent,
      componentWithProps: contentComponentWithProps,
    },
  },
  compute: {
    interface: `export Compute = ({
  node: HTMLElement,
  tooltip: HTMLElement,
  content: string | SvelteComponent, // inferred from the content parameter
}) => void | (() => void) | Promise<void | (() => void)>`,
  },
};
