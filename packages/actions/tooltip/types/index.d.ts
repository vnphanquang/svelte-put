declare module '@svelte-put/tooltip' {
  import type { SvelteComponent, ComponentType } from 'svelte';
  import type { ActionReturn, Action } from 'svelte/action';
  /// <reference types="svelte" />
  export function prepare<
    Props extends TooltipComponentBaseProps,
    Events extends Record<string, any>,
    Slots extends Record<string, any>,
  >(
    param: TooltipContainer & {
      content: import('svelte').ComponentType<
        import('svelte').SvelteComponent<Props, Events, Slots>
      >;
      compute?: TooltipCompute<Props, import('svelte').SvelteComponent<Props, Events, Slots>>;
    },
  ): PreparedTooltipAction<Props>;
  export function prepare<
    Props extends TooltipComponentBaseProps,
    Events extends Record<string, any>,
    Slots extends Record<string, any>,
  >(
    param: TooltipContainer & {
      content: {
        component: import('svelte').ComponentType<
          import('svelte').SvelteComponent<Props, Events, Slots>
        >;
        props?: Props;
      };
      compute?: TooltipCompute<Props, import('svelte').SvelteComponent<Props, Events, Slots>>;
    },
  ): PreparedTooltipAction<Props>;
  export function prepare(
    param: TooltipContainer & {
      content: string;
      compute?: TooltipCompute<Props, string>;
    },
  ): PreparedTooltipAction<string>;

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

  type TooltipContent<Props extends TooltipComponentBaseProps> =
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

  type TooltipContainer = {
    /**
     * HTML tag to render the tooltip container. Defaults to `div`
     */
    tag?: string;
    /**
     * HTMLElement to render the tooltip container. Defaults to `parent` of the node action is placed on
     */
    target?: TooltipRenderTarget;
    /**
     * number of milliseconds to debounce the open / close action of the tooltip.
     * Defaults to `false` (close / open immediately).
     */
    debounce?: false | number;
    /**
     * class name(s) to assign to tooltip container. Helpful to avoid flash of content
     */
    class?:
      | string
      | {
          default?: string;
          visible?: string;
        };
  };

  type TooltipComputeContent<Props extends TooltipComponentBaseProps> =
    | string
    | SvelteComponent<Props>;

  type TooltipComputeParameter<
    Props extends TooltipComponentBaseProps,
    ComputeContent extends TooltipComputeContent<Props>,
  > = {
    node: HTMLElement;
    tooltip: HTMLElement;
    content: ComputeContent;
  };

  type TooltipCompute<
    Props extends TooltipComponentBaseProps,
    ComputeContent extends TooltipComputeContent<Props>,
  > = (
    param: TooltipComputeParameter<Props, ComputeContent>,
  ) => void | (() => void) | Promise<void | (() => void)>;

  type TooltipAttributes = {
    /** if provided will be set to `id` of the tooltip element, auto-generated otherwise  */
    'aria-describedby'?: string;
  };

  type TooltipParameter<Props extends TooltipComponentBaseProps> = TooltipContainer & {
    content: TooltipContent<Props>;
    compute?: TooltipCompute<Props, TooltipComputeContent<Props>>;
  };

  type TooltipActionReturn<Props extends TooltipComponentBaseProps> = ActionReturn<
    TooltipParameter<Props>,
    TooltipAttributes
  >;

  type PreparedTooltipAction<Parameter> = Action<
    HTMLElement,
    Parameter | undefined,
    TooltipAttributes
  >;
}

//# sourceMappingURL=index.d.ts.map
