import type { SvelteComponent, ComponentType } from 'svelte';
import type { Action } from 'svelte/action';

/** @public */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TooltipComponentBaseProps = Record<string, any>;

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
   * class name(s) to assign to tooltip container. Typically needed depending
   * on the positioning strategy
   */
  class?:
    | string
    | {
        default?: string;
        /** toggled on when tooltip is visible */
        visible?: string;
      };
  /**
   * HTML tag to render the tooltip container.
   * Defaults to `div`
   */
  tag?: string;
  /**
   * `HTMLElement` to render the tooltip container as child.
   * Defaults to `parent` of the node action is placed on
   */
  target?:
    | 'parent'
    | 'self'
    | 'body'
    | HTMLElement
    | ((node: HTMLElement, tooltip: HTMLElement) => void);
  /**
   * number of milliseconds to debounce the show / hide action of the tooltip.
   * Defaults to `false` (show / hide immediately)
   */
  debounce?: false | number;
  /**
   * config for handling of `pointer-events` on the container element
   * Defaults to `true`
   *
   * @remarks
   * By default `pointer-events` is set to `none` by default, and `auto` when triggered.
   * Set to `false` to disable default behavior, or provide string(s) to
   * corresponding states
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
   * Defaults to `true`
   *
   * @remarks
   * By default:
   *   - (container element) `role` is set to `tooltip`,
   *   - (container element) `id` is taken from `aria-describedby` of
   *     the node action is placed on (if any),
   *     or auto-generated from a global counter,
   *   - (node action is placed on) `aria-describedby` is set to the `id` of
   *     the container element (if not already exists)
   *
   * Set to `false` to disable default behavior, or provide string(s) to
   * the corresponding attributes
   */
  aria?:
    | boolean
    | {
        role?: string;
        id?: string;
      };
};

/** @public */
export type TooltipComputeContent<Props extends TooltipComponentBaseProps> =
  | string
  | SvelteComponent<Props>;

/** @public */
export type TooltipComputeParameter<
  Props extends TooltipComponentBaseProps,
  ComputeContent extends TooltipComputeContent<Props>,
> = {
  node: HTMLElement;
  tooltip: HTMLElement;
  content: ComputeContent;
};

/** @public */
export type TooltipCompute<
  Props extends TooltipComponentBaseProps,
  ComputeContent extends TooltipComputeContent<Props>,
> = (
  param: TooltipComputeParameter<Props, ComputeContent>,
) => void | (() => void) | Promise<void | (() => void)>;

/** @public */
export type TooltipAttributes = {
  /** if provided will be set to `id` of the tooltip element, auto-generated otherwise  */
  'aria-describedby'?: string;
};

/** @public */
export type PreparedTooltipAction<Parameter> = Action<
  HTMLElement,
  Parameter | undefined,
  TooltipAttributes
>;

/** @public */
export type TooltipParameter<
  Props extends TooltipComponentBaseProps,
  Content extends TooltipContent<Props>,
  ComputeContent extends TooltipComputeContent<Props>,
> = TooltipContainer & {
  content: Content;
  compute?: TooltipCompute<TooltipComponentBaseProps, ComputeContent>;
};
