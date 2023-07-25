declare module '@svelte-put/tooltip' {
  import type { SvelteComponent, ComponentType } from 'svelte';
  import type { ActionReturn } from 'svelte/action';
  export function compose<
    Props extends TooltipComponentBaseProps,
    Param extends TooltipParameter<Props>,
  >(
    param: Param,
  ): (
    node: HTMLElement,
    composedParam?: string extends Param['content'] ? string : Props,
  ) => TooltipActionReturn<Props>;

  export function tooltip<Props extends TooltipComponentBaseProps>(
    node: HTMLElement,
    param: TooltipParameter<Props>,
  ): TooltipActionReturn<Props>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type TooltipComponentBaseProps = Record<string, any>;

  /**
   * @public
   * Where to render the tooltip container
   */
  type TooltipRenderTarget =
    | 'parent'
    | 'self'
    | 'body'
    | HTMLElement
    | ((node: HTMLElement, tooltip: HTMLElement) => void);

  type TooltipContentConfig<Props extends TooltipComponentBaseProps> =
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

  type TooltipComputeParam<
    Props extends TooltipComponentBaseProps,
    Content extends TooltipContentConfig<Props>,
  > = {
    node: HTMLElement;
    tooltip: HTMLElement;
    param: TooltipParameter<Props>;
    content: string extends Content ? string : SvelteComponent<Props>;
  };

  type TooltipParameter<Props extends TooltipComponentBaseProps> = {
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
      param: TooltipComputeParam<Props, TooltipParameter<Props>['content']>,
    ) => void | (() => void) | Promise<void | (() => void)>;
    /**
     * content config
     */
    content:
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
  };

  type TooltipAttributes = {
    /** if provided will be set to `id` of the tooltip element, auto-generated otherwise  */
    'aria-describedby'?: string;
  };

  type TooltipActionReturn<Props extends TooltipComponentBaseProps> = ActionReturn<
    TooltipParameter<Props>,
    TooltipAttributes
  >;
}

//# sourceMappingURL=index.d.ts.map
