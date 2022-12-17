import handle from './handle.svelte?raw';
import ignore from './ignore.svelte?raw';
import limitAncestor from './limit.ancestor.svelte?raw';
import limitDelta from './limit.delta.svelte?raw';
import limitScreen from './limit.screen.svelte?raw';
import quickStart from './quickStart.svelte?raw';
import typescriptSupportAuto from './typescript-auto.svelte?raw';
import typescriptSupportFallback from './typescript-fallback.d.ts?raw';

export const codes = {
  quickStart,
  events: `<div use:movable on:movableend on:movablestart />`,
  limit: {
    ancestor: {
      instruction: `<div use:movable={{ limit: { parent: someNode } }} />`,
      example: limitAncestor,
    },
    screen: {
      instruction: `<div use:movable={{ limit: { parent: 'screen' } }} />`,
      example: limitScreen,
    },
    delta: {
      instruction: `<div use:movable={{ limit: { delta: '50%' } }} />
<div use:movable={{ limit: { delta: '250px' } }} />
<div use:movable={{ limit: { delta: { x: '20%', y: '100px' } } }} />`,
      example: limitDelta,
    },
  },
  handle: {
    instruction: `<div use:movable={{ handle: someNode }} />`,
    example: handle,
  },
  cursor: `<div use:movable={{ cursor: false }} />`,
  ignore: {
    instruction: `<div use:movable={{ ignore: '.to-ignore' }} />`,
    example: ignore,
  },
  typescriptSupport: {
    auto: typescriptSupportAuto,
    fallback: typescriptSupportFallback,
  },
};
