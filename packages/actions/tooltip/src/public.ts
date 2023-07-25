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
  /**
   * number of milliseconds to debounce the open / close action of the tooltip.
   * Defaults to `false` (close / open immediately).
   */
  debounce?: false | number;
};

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
type TooltipCompute<
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

// /** @type */
// export type TooltipParameter<
//   Props extends TooltipComponentBaseProps,
//   Content extends TooltipContent<Props>,
//   ComputeContent extends TooltipComputeContent<Props> = Content extends string
//     ? string
//     : SvelteComponent<Props>,
// > = TooltipContainer & {
//   content: TooltipContent<Props>;
//   compute: TooltipCompute<Props, ComputeContent>;
// };

export type TooltipConfig<Props extends TooltipComponentBaseProps> = TooltipContainer & {
  content: TooltipContent<Props>;
};

// /** @public */
// export type TooltipActionReturn<
//   Props extends TooltipComponentBaseProps,
// > = ActionReturn<TooltipParameter<Props>, TooltipAttributes>;

// type compose1 = <Props extends TooltipComponentBaseProps>(
//   config: TooltipContainer & { content: TooltipContent<Props> },
// ) => typeof config;
// type compose2 = <Props extends TooltipComponentBaseProps, Content extends TooltipContent<Props>>(
//   config: TooltipContainer & { content: Content },
// ) => typeof config;

// type Compose = <Props extends TooltipComponentBaseProps>(
//   config: TooltipContainer & { content: TooltipContent<Props> },
// ) => <
//   Content extends TooltipContent<Props> = typeof config['content'],
//   ComputeContent extends TooltipComputeContent<Props> = Content extends string ? string : SvelteComponent<Props>,
//   ComposedParam = Content extends string ? string : Props,
// >(
//   compute: TooltipCompute<Props, ComputeContent>,
// ) => (node: HTMLElement, param?: ComposedParam) => ActionReturn<ComposedParam>;

// const compose: Compose = <Props extends TooltipComponentBaseProps>(
//   config: TooltipContainer & { content: TooltipContent<Props> },
// ) => {
//   return <
//     ComputeContent extends TooltipComputeContent<Props> = TooltipContent<Props> extends string ? string : SvelteComponent<Props>,
//     ComposedParam = TooltipContent<Props> extends string ? string : Props,
//   >(compute: TooltipCompute<Props, ComputeContent>) => {
//     console.log('');
//     return (node: HTMLElement, param?: ComposedParam): ActionReturn<ComposedParam> => {
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       return 100 as any;
//     };
//   };
// };

// function a<Props extends TooltipComponentBaseProps>(content: TooltipContent<Props>): typeof content{
//   return config as any;
// }

// function b<Props extends TooltipComponentBaseProps, Content extends TooltipContent<Props>>(content: Content): string extends Content ? string : Props {
//   return content as any;
// }

// const Component = 100 as unknown as ComponentType<SvelteComponent<{ content?: string }>>;

// const composed = compose({
//   content: {
//     component: Component,
//     props: {
//       content: 'Hello world!',
//     },
//   },
// })(({ content, node, tooltip}) => {

// });

type Content<Props> = string | {
  props: Props;
};

type Config<Props> = {
  content: Content<Props>;
};

function compute<
  Props, C extends Config<Props>,
  Infer = C['content'] extends { props: infer Props } ? Props : string,
>(
  config: C,
  compute: (infer: Infer) => void
): Infer {
  return 0 as any;
}

const a = compute({
  content: {
    props: {
      prop: 'abc',
    },
  },
}, (infer) => {

});

const b = compute({
  content: 'abc',
}, (infer) => {

});

function compose<Props extends TooltipComponentBaseProps, Content extends TooltipContent<Props>>(
  content: Content,
  compute: (infer: Content extends { props: infer Props } ? Props : Content extends string ? string : undefined) => void
) {
  compute(content as any);
  return 0 as any;
}

const Component = 100 as unknown as ComponentType<SvelteComponent<{ content?: string }>>;

compose({
  component: Component,
  props: {
    content: 'Hello world!',
  },
}, (infer) => { });

compose('hello world!', (infer) => { });

compose(Component, (infer) => { });

function contentT<Props extends TooltipComponentBaseProps>(content: TooltipContent<Props>) {
  return content;
}

function composeT<Props extends TooltipComponentBaseProps, Content extends TooltipContent<Props>>(
  param: {
    content: Content;
    compute: (infer: Content extends { props: infer Props } ? Props : Content extends string ? string : undefined) => void;
  },
) {
  return param.compute(param.content as any);
}

composeT({
  content: contentT({
    component: Component,
    props: {
      content: 'Hello world!',
    },
  }),
  compute: (infer) => { },
});

composeT({
  content: contentT('hello world!'),
  compute: (infer) => { },
});

composeT({
  content: contentT(Component),
  compute: (infer) => { },
});
