import demoTs from './demo.code.svelte?raw';
import demoJs from './js.generated/demo.code.js.svelte?raw';
import quickStartJs from './js.generated/quick-start.code.js.svelte?raw';
import quickStartTs from './quick-start.code.svelte?raw';
import typescriptAuto from './typescript-auto-example.svelte?raw';
import typescriptFallback from './typescript-fallback.d.ts?raw';

const limitParent = `<div bind:this={parentNode}>
  <div use:clickoutside={{ limit: { parent: parentNode } }}>...</div>
</div>`;
const eventType = `<div use:clickoutside={{ event: 'mousedown' }}>...</div>`;
const addEventListenerOptions = `<div use:clickoutside={{ options: { passive: true } }}>...</div>
<div use:clickoutside={{ options: true }}>...</div>
`;
const excludingEvents = '<button on:click|stopPropagation>...</button>';
const excludingEventsCustom = `<div use:clickoutside={{ options: { capture: true }, event: 'mousedown' }}>...</div>
<button on:mousedown|stopPropagation|capture>...</button>
`;

export const codes = {
  quickStart: {
    typescript: quickStartTs,
    javascript: quickStartJs,
  },
  advancedUsage: {
    demo: {
      typescript: demoTs,
      javascript: demoJs,
    },
    limitParent,
    eventType,
    addEventListenerOptions,
    excludingEvents: {
      default: excludingEvents,
      custom: excludingEventsCustom,
    },
  },
  typescriptSupport: {
    auto: typescriptAuto,
    fallback: typescriptFallback,
  },
} as const;
