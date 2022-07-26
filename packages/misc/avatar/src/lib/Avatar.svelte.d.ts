import { SvelteComponentTyped } from 'svelte';

import type { GravatarOptions, UIAvatarOptions } from './avatar';
declare const __propDef: {
  props: {
    [x: string]: any;
    /**
     * Highest priority, src attribute
     */
    src?: string | undefined;
    /**
     * Second priority, see {@link https://en.gravatar.com/site/implement/images | Gravatar }
     */
    gravatar?: GravatarOptions | string | undefined;
    /**
     * Third priority, see {@link https://ui-avatars.com | UIAvatar }
     */
    uiAvatar?: string | UIAvatarOptions | undefined;
    /**
     * Lowest priority
     */
    fallback?: string | undefined;
    /**
     * value for "width" & "height" attribute of <img>.
     * Will have no effect if default slot is overridden
     */
    size?: number | undefined;
    /**
     * value for "alt" attribute of <img>.
     * Default to uiAvatar.name or gravatar.email if any.
     * Will have no effect if default slot is overridden
     */
    alt?: string | undefined;
  };
  events: {
    [evt: string]: CustomEvent<any>;
  };
  slots: {
    default: {
      /**
       * Default slot, take "src" as the src for img
       */
      src: string;
    };
  };
};
export declare type AvatarProps = typeof __propDef.props;
export declare type AvatarEvents = typeof __propDef.events;
export declare type AvatarSlots = typeof __propDef.slots;
export default class Avatar extends SvelteComponentTyped<AvatarProps, AvatarEvents, AvatarSlots> {}
export {};
