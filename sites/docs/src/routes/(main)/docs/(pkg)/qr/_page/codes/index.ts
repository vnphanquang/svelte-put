import config from './config?raw';
import events from './events.svelte?raw';
import imgAction from './img-action.svelte?raw';
import imgComponentWithCustomDefaultSlot from './img-component-with-custom-default-slot.svelte?raw';
import imgComponent from './img-component.svelte?raw';
import svgAction from './svg-action.svelte?raw';
import svgComponentWithCustomDefaultSlot from './svg-component-with-custom-default-slot.svelte?raw';
import svgComponent from './svg-component.svelte?raw';

export const codes = {
  config,
  img: {
    action: imgAction,
    component: imgComponent,
    'default slot': imgComponentWithCustomDefaultSlot,
  },
  svg: {
    action: svgAction,
    component: svgComponent,
    'default slot': svgComponentWithCustomDefaultSlot,
  },
  events,
};
