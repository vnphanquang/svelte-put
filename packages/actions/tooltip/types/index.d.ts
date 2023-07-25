declare module '@svelte-put/tooltip' {
  import type { SvelteComponent, ComponentType } from 'svelte';
  import type { ActionReturn } from 'svelte/action';
  /// <reference types="svelte" />

  export function compose<
    Props extends TooltipComponentBaseProps,
    Content extends TooltipContent<Props>,
  >(
    param: TooltipParameter<
      Props,
      Content,
      Content extends string ? string : import('svelte').SvelteComponent<Props, any, any>
    >,
  ): (
    node: HTMLElement,
    composedParam?: Content extends string ? string : Props,
  ) => TooltipComposedActionReturn<Props, Content>;

  export function tooltip<
    Props extends TooltipComponentBaseProps,
    Content extends TooltipContent<Props>,
  >(
    node: HTMLElement,
    param: TooltipParameter<
      Props,
      Content,
      Content extends string ? string : import('svelte').SvelteComponent<Props, any, any>
    >,
  ): TooltipActionReturn<Props, Content>;
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

  type TooltipParameter<
    Props extends TooltipComponentBaseProps,
    Content extends TooltipContent<Props>,
    ComputeContent extends TooltipComputeContent<Props> = Content extends string
      ? string
      : SvelteComponent<Props>,
  > = TooltipContainer & {
    content: Content;
    compute: TooltipCompute<Props, ComputeContent>;
  };

  type TooltipActionReturn<
    Props extends TooltipComponentBaseProps,
    Content extends TooltipContent<Props>,
  > = ActionReturn<TooltipParameter<Props, Content>, TooltipAttributes>;

  type TooltipComposedActionReturn<
    Props extends TooltipComponentBaseProps,
    Content extends TooltipContent<Props>,
  > = ActionReturn<Content extends string ? string : Props, TooltipAttributes>;

  // /**
  //  * @template {import('./public').TooltipComponentBaseProps} Props
  //  * @template {import('./public').TooltipContent<Props>} Content
  //  * @param {import('./public').TooltipContainer} container
  //  * @param {Content} content
  //  * @param {import('./public').TooltipCompute<Props, Content>} compute
  //  */
  // export function compose(container, content, compute) {
  //   /**
  //    * @param {HTMLElement} node
  //    * @param {undefined | (Content extends string ? string : Props)} composedParam
  //    * @returns {import('./public').TooltipComposedActionReturn<Props, Content>}
  //    */
  //   return function (node, composedParam = undefined) {
  //     /** @type {import('./public').TooltipParameter<Props, Content>} */
  //     let composed = {
  //       ...container,
  //       content,
  //       compute,
  //     };
  //     if (typeof content === 'string' && typeof composedParam === 'string') {
  //       composed.content = composedParam;
  //     } else if (isContentConfigDirectComponent(content)) {
  //       composed.content = {
  //         component: /** @type {any} */(composed.content),
  //         props: /** @type {Props} */(composedParam),
  //       };
  //     } else if ('component' in /** @type {any} */ (content)) {
  //       composed.content = {
  //         component: content.component,
  //         props: {
  //           ...content.props,
  //           .../** @type {Props} */(composedParam),
  //         },
  //       };
  //     } else {
  //       composed.content = content;
  //     }

  //     return /** @type {any}*/(tooltip(node, composed));
  //   };
  // }
}

//# sourceMappingURL=index.d.ts.map
