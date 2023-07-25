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
export type TooltipContent<Props extends TooltipComponentBaseProps> =
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
export type TooltipContainer = {
  /**
   * HTML tag to render the tooltip container. Defaults to `div`
   */
  tag?: string;
  /**
   * HTMLElement to render the tooltip container. Defaults to `parent` of the node action is placed on
   */
  target?: TooltipRenderTarget;
};

/** @public */
export type TooltipComputeParameter<
  Props extends TooltipComponentBaseProps,
  Content extends TooltipContent<Props>,
> = {
  node: HTMLElement;
  tooltip: HTMLElement;
  content: Content extends string ? string : SvelteComponent<Props>;
};

type TooltipCompute<
  Props extends TooltipComponentBaseProps,
  Content extends TooltipContent<Props>,
> = (
  param: TooltipComputeParameter<Props, Content>,
) => void | (() => void) | Promise<void | (() => void)>;

/** @public */
export type TooltipAttributes = {
  /** if provided will be set to `id` of the tooltip element, auto-generated otherwise  */
  'aria-describedby'?: string;
};

/** @type */
export type TooltipParameter<
  Props extends TooltipComponentBaseProps,
  Content extends TooltipContent<Props>,
> = TooltipContainer & {
  content: TooltipContent<Props>;
  compute: TooltipCompute<Props, Content>;
};

/** @public */
export type TooltipActionReturn<
  Props extends TooltipComponentBaseProps,
  Content extends TooltipContent<Props>,
> = ActionReturn<TooltipParameter<Props, Content>, TooltipAttributes>;
