declare module '@svelte-put/tooltip' {
  import type { SvelteComponent, ComponentType } from 'svelte';
  import type { Action } from 'svelte/action';
  /// <reference types="svelte" />
  export function prepare<
    Events extends Record<string, any>,
    Slots extends Record<string, any>,
    Props extends TooltipComponentBaseProps,
  >(
    param: TooltipContainer & {
      content: import('svelte').ComponentType<
        import('svelte').SvelteComponent<Props, Events, Slots>
      >;
      compute?: TooltipCompute<Props, import('svelte').SvelteComponent<Props, Events, Slots>>;
    },
  ): PreparedTooltipAction<Props>;
  export function prepare<
    Events extends Record<string, any>,
    Slots extends Record<string, any>,
    Props extends TooltipComponentBaseProps,
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
      compute?: TooltipCompute<{}, string>;
    },
  ): PreparedTooltipAction<string>;
  export function tooltip<
    Events extends Record<string, any>,
    Slots extends Record<string, any>,
    Props extends TooltipComponentBaseProps,
    Content extends TooltipContent<Props>,
    ComputeContent extends TooltipComputeContent<Props>,
  >(
    node: HTMLElement,
    param: TooltipContainer & {
      content: import('svelte').ComponentType<
        import('svelte').SvelteComponent<Props, Events, Slots>
      >;
      compute?: TooltipCompute<Props, import('svelte').SvelteComponent<Props, Events, Slots>>;
    },
  ): import('svelte/action').ActionReturn<
    TooltipParameter<Props, Content, ComputeContent>,
    TooltipAttributes
  >;
  export function tooltip<
    Events extends Record<string, any>,
    Slots extends Record<string, any>,
    Props extends TooltipComponentBaseProps,
    Content extends TooltipContent<Props>,
    ComputeContent extends TooltipComputeContent<Props>,
  >(
    node: HTMLElement,
    param: TooltipContainer & {
      content: {
        component: import('svelte').ComponentType<
          import('svelte').SvelteComponent<Props, Events, Slots>
        >;
        props?: Props;
      };
      compute?: TooltipCompute<Props, import('svelte').SvelteComponent<Props, Events, Slots>>;
    },
  ): import('svelte/action').ActionReturn<
    TooltipParameter<Props, Content, ComputeContent>,
    TooltipAttributes
  >;
  export function tooltip(
    Node: HTMLElement,
    param: TooltipContainer & {
      content: string;
      compute?: TooltipCompute<{}, string>;
    },
  ): import('svelte/action').ActionReturn<
    TooltipParameter<Props, string, string>,
    TooltipAttributes
  >;
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
          /** default value */
          default?: string;
          /** value when tooltip is visible */
          visible?: string;
        };
    /**
     * config for handling of `pointer-events` on the container element
     *
     * @remarks
     * By default `pointer-events` is set to `none` by default, and `auto` when triggered.
     * Set to `false` to disable behavior, or provide an object to customize the values.
     */
    pointerEvents?:
      | boolean
      | {
          /** default value */
          default?: string;
          /** value when tooltip is visible */
          visible?: string;
        };
    /**
     * the attribute to toggle in respond to tooltip's visibility state.
     * Defaults to `data-visible`.
     *
     * @remarks
     * Set to `false` to disable, or provide a string to use as attribute name.
     */
    visibleAttribute?: boolean | string;
    /**
     * config for accessibility
     *
     * @remarks
     * By default, on the tooltip container element, `role` is set to `tooltip`, and `id` is auto-generated
     */
    aria?:
      | boolean
      | string
      | {
          role?: boolean;
          id?: string;
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

  type PreparedTooltipAction<Parameter> = Action<
    HTMLElement,
    Parameter | undefined,
    TooltipAttributes
  >;

  type TooltipParameter<
    Props extends TooltipComponentBaseProps,
    Content extends TooltipContent<Props>,
    ComputeContent extends TooltipComputeContent<Props>,
  > = TooltipContainer & {
    content: Content;
    compute?: TooltipCompute<TooltipComponentBaseProps, ComputeContent>;
  };
}

//# sourceMappingURL=index.d.ts.map
