import { SvelteComponentTyped } from 'svelte';

import type { AvatarProps, AvatarSlots } from './avatar';

declare const __propDef: {
  props: AvatarProps & {
    [x: string]: any;
  };
  events: {
    [evt: string]: CustomEvent<any>;
  };
  slots: AvatarSlots;
};

export declare type AvatarEvents = typeof __propDef.events;
/**
 * Svelte `<img>` wrapper component for displaying avatar
 * @public
 */
export default class Avatar extends SvelteComponentTyped<AvatarProps, AvatarEvents, AvatarSlots> {}
export {};
