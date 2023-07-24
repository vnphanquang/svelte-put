declare module '@svelte-put/tooltip' {
  import type { SvelteComponent, ComponentType } from 'svelte';
  export function useTooltip<Props extends TooltipComponentBaseProps>(
    param: TooltipParameter<Props>,
  ): (props: Props, target: TooltipRenderTarget) => TooltipConfig<Props>;

  export function tooltip<Props extends TooltipComponentBaseProps>(
    node: HTMLElement,
    param: TooltipParameter<Props>,
  ): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type TooltipComponentBaseProps = Record<string, any>;

  type TooltipRenderTarget = HTMLElement | 'parent' | 'self' | 'body';

  type TooltipConfig<Props extends TooltipComponentBaseProps> = {
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
     * HTMLElement to render the tooltip as child. Defaults to `self`, which is the node the action is used on
     */
    target?: TooltipRenderTarget;
  };

  type TooltipParameter<Props extends TooltipComponentBaseProps> =
    | [ComponentType<SvelteComponent<Props>>, Props | undefined]
    | TooltipConfig<Props>;
}

//# sourceMappingURL=index.d.ts.map
