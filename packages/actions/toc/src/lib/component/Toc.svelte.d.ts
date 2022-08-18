/* eslint-disable @typescript-eslint/no-explicit-any */
import { SvelteComponentTyped } from 'svelte';

import type { TocParameters, TocEventItemDetails, TocEventDetails } from '../action/toc.types';

/**
 * Props to `Toc` component
 * @public
 */
export interface TocProps {
  parameters?: Partial<TocParameters>;
  ulClass?: string;
  liClass?: string;
}

/**
 * Slots to `Toc` component
 * @public
 */
export interface TocSlots {
  default: {
    items: TocEventItemDetails[];
  };
  anchor: {
    item: TocEventItemDetails[];
  };
}

/**
 * Custom events dispatched from `Toc` component
 * @public
 */
export interface TocEvents {
  toc: CustomEvent<TocEventDetails>;
}

declare const __propDef: {
  props: TocProps & {
    [x: string]: any;
  };
  events: TocEvents & {
    [evt: string]: CustomEvent<any>;
  };
  slots: TocSlots;
};

/**
 * Svelte `<Toc>` component that internally use `toc` action and display
 * a basic table of contents with ul
 * @public
 */
export default class Toc extends SvelteComponentTyped<TocProps, TocEvents, TocSlots> {}
export {};
