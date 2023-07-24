import type { SvelteComponent, ComponentType } from 'svelte';
import type { ActionReturn, Action } from 'svelte/action';

/** @public */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TooltipComponentBaseProps = Record<string, any>;

/** @public */
export type TooltipRenderTarget = HTMLElement | 'parent' | 'self' | 'body';

/** @public */
export type TooltipConfig<Props extends TooltipComponentBaseProps> = {
  /**
   * Svelte component to render as tooltip
   */
  component: ComponentType<SvelteComponent<Props>>;
  /**
   * Props to pass to component, if any. Note that if required props are not passed down,
   * a runtime error will be thrown.
   */
  props?: Props;
  /**
   * HTMLElement to render the tooltip as child. Defaults to `parent` of the node this action is placed on
   */
  target?: TooltipRenderTarget;
};

/** @public */
export type TooltipParameter<Props extends TooltipComponentBaseProps> =
  | [ComponentType<SvelteComponent<Props>>, Props | undefined]
  | TooltipConfig<Props>;

/** @public */
export type TooltipAttributes = {
  /** if provided will be set to `id` of the tooltip element, auto-generated otherwise  */
  'aria-describedby'?: string;
};

/** @public */
export type TooltipAction<Props extends TooltipComponentBaseProps> = Action<HTMLElement, TooltipParameter<Props>, TooltipAttributes>;

/** @public */
export type TooltipActionReturn<Props extends TooltipComponentBaseProps> = ActionReturn<TooltipParameter<Props>, TooltipAttributes>;
