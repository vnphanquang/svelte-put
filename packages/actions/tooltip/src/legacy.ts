import type { SvelteComponent, ComponentType } from 'svelte';
import type { ActionReturn, Action } from 'svelte/action';

/** @public */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TooltipComponentBaseProps = Record<string, any>;

/**
 * @public
 * Where to render the tooltip container
 */
export type TooltipRenderTarget =
  | 'parent'
  | 'self'
  | 'body'
  | HTMLElement
  | ((node: HTMLElement, tooltip: HTMLElement) => void);

/** @public */
export type TooltipContentConfig<Props extends TooltipComponentBaseProps> =
  | string
  | ComponentType<SvelteComponent<Props>>
  | {
      /**
       * Svelte component to render as tooltip
       */
      component: ComponentType<SvelteComponent<Props>>;
      /**
       * Props to pass to component, if any. Note that if required props are not passed down,
       * a runtime error will be thrown.
       */
      props?: Props;
    };

/** @public */
export type TooltipComputeParam<
  Props extends TooltipComponentBaseProps,
  Content extends TooltipContentConfig<Props>,
> = {
  node: HTMLElement;
  tooltip: HTMLElement;
  param: TooltipParameter<Props, Content>;
  content: string extends Content ? string : SvelteComponent<Props>;
};

/** @public */
export type TooltipParameter<
  Props extends TooltipComponentBaseProps,
  Content extends TooltipContentConfig<Props>,
> = {
  /**
   * HTML tag to render the tooltip container. Defaults to `div`
   */
  tag?: string;
  /**
   * HTMLElement to render the tooltip container. Defaults to `parent` of the node action is placed on
   */
  target?: TooltipRenderTarget;
  /**
   * A custom function for operating on the reference node (node action is placed on) and
   * the tooltip container, typically to calculate the position or assign classes to the tooltip.
   */
  compute?: (
    param: TooltipComputeParam<Props, Content>,
  ) => void | (() => void) | Promise<void | (() => void)>;
  /**
   * content config
   */
  content: Content;
};

/** @public */
export type ComposedTooltipParameter<
  Props extends TooltipComponentBaseProps,
  Content extends TooltipContentConfig<Props>,
> = string extends Content ? string : Props;

/** @public */
export type TooltipAttributes = {
  /** if provided will be set to `id` of the tooltip element, auto-generated otherwise  */
  'aria-describedby'?: string;
};

/** @public */
export type TooltipActionReturn<
  Props extends TooltipComponentBaseProps,
  Content extends TooltipContentConfig<Props>,
> = ActionReturn<TooltipParameter<Props, Content>, TooltipAttributes>;
