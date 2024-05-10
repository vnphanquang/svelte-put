<script>
  import { ConnectedList, ConnectedListItem } from '$lib/components/connected-list';
  import DemoQuickStart from './examples/quick-start.svelte';
  import DemoPrepare from './examples/prepare/usage.svelte';

	import { getSettingsContext } from '$lib/contexts/settings';
  const { packageManager } = getSettingsContext();
</script>

## Introduction

This library is not a plug-and-play, prebuilt component. Rather, it is designed to help build composable tooltips, utilizing [Svelte action](https://svelte.dev/docs/svelte-action).

## Installation

<enhanced-code-block group display="tabs" bind:title={$packageManager}>

```bash
/// title=npm
npm install --save-dev @svelte-put/tooltip
```

```bash
/// title=pnpm
pnpm add -D @svelte-put/tooltip
```

```bash
/// title=yarn
yarn add -D @svelte-put/tooltip
```

</enhanced-code-block>

<h2 id="quick-start">Quick Start</h2>

The following example shows usage of `@svelte-put/tooltip`'s out-of-the-box `tooltip` action, paired with [@floating-ui].

<fieldset class="border-2 border-violet-500 p-4">
  <legend>Example</legend>
  <p class="mt-0">Hover or tab into focus to trigger tooltip</p>
  <DemoQuickStart />
</fieldset>

```svelte
/// src=./examples/quick-start.svelte
/// title=quick-start.svelte
```

:::div c-callout c-callout--info
CSS Code for `c-tooltip` in above code snippet is omitted for conciseness, but will be discussed in a later section.
:::

## Design Decisions

`@svelte-put/tooltip` adopts a headless approach. By default, it will take care of:

- creating a tooltip container element,
- handling logics for inserting elements & events for changing visibility state of the tooltip,
- managing `pointer-events` style on tooltip container element,
- managing `role`, `id`, and `aria-describedBy` accessibility attributes,

and leave tooltip **UI** and **positioning** to be determined by library users. Thanks to this approach, `@svelte-put/tooltip` can be configured to fit a lot of different applications.

For the same reason, however, the out-of-the-box `use:tooltip` action does not do much. As seen in [Quick Start], the styling is provided through CSS `.c-tooltip`, and positioning logics is provided by pairing with [@floating-ui] in the `compute` callback.

<h2 id="prepare">The <code>prepare</code> API</h2>

Following the aforementioned design decisions, `@svelte-put/tooltip` provides a `prepare` API to help create reusable tooltip actions with their own UI and positioning logics.

```typescript
/// title=prepared-tooltips.ts
import { prepare } from '@svelte-put/tooltip';

export const myTooltip = prepare({ content: 'placeholder' });

// later in Svelte: <button use:myTooltip>...</button>
```

Argument passed to `prepare` share the same `TooltipParameter` interface as that passed to `use:tooltip` (seen in [Quick Start])

```typescript
/// title=TooltipParameter
type TooltipParameter = TooltipContainer & {
  content: Content;
  compute?: TooltipCompute;
};
export function tooltip(node: HTMLElement, param: TooltipParameter);
export function prepare(param: TooltipParameter);
```

Below is a comprehensive example of how to use `prepare` to build highly custom tooltip actions. If you feel overwhelmed, don't get too caught up with the code; more information is provided in the next sections.

<fieldset class="border-2 border-violet-500 p-4">
  <legend>Example</legend>
  <p class="mt-0">Hover or tab into focus to trigger tooltip</p>
  <DemoPrepare />
</fieldset>

There are four parts to this setup:

<ConnectedList>
  <ConnectedListItem>

set up Svelte tooltip component (`Tooltip.svelte`):

  </ConnectedListItem>

  <ConnectedListItem>

set up CSS for tooltip component (`c-tooltip.css`):

  </ConnectedListItem>

  <ConnectedListItem>

create reusable tooltip action with the `prepare` API (`tooltips.ts`):

  </ConnectedListItem>

  <ConnectedListItem>

use the prepared tooltip action (`usage.svelte`):

  </ConnectedListItem>
</ConnectedList>

<enhanced-code-block group display="files">

```svelte
/// src=./examples/prepare/Tooltip.svelte
/// title=Tooltip.svelte
```

```css
/// src=./examples/prepare/c-tooltip.css
/// title=c-tooltip.css
```

```typescript
/// src=./examples/prepare/tooltips.ts
/// title=tooltips.ts
```

```svelte
/// src=./examples/prepare/usage.svelte
/// title=usage.svelte
```

</enhanced-code-block>

## Tooltip Content

This is the only **required** field for both the out-of-the-box `tooltip` action and the `prepare` function. Besides setting the default content, it also helps generate type inference for the parameter of the prepared action.

Content can be provided as either a `string` (inserted as `innerHTML` to the tooltip container), ...

```svelte
/// title=content as string
<script>
  import { prepare } from '@svelte-put/tooltip';

  const tooltipWithText = prepare({ content: 'Placeholder' });
</script>

<button use:tooltipWithText>A Button</button>
```

... or as any Svelte component (optionally with default props)...

```svelte
/// title=content as component
<script>
  import { prepare } from '@svelte-put/tooltip';

  import Tooltip from './Tooltip.svelte';

  const tooltipWithComponent = prepare({
    content: {
      component: TooltipComponent,
      // optionally with default props
      props: {
        content: 'Default content',
      },
    },
  });
</script>

<button use:tooltipWithComponent>A Button</button>
```

:::div c-callout c-callout--warning
Note that if a component has required props and but no default prop is provided, you will get warning in browser console (and language server error if set up), and potentially runtime error if internal component logics depends on such props.
:::

There is no restriction on Svelte component for tooltip content. You can optionally declare a `visible` prop which will be injected at runtime for you by `@svelte-put/tooltip`.

```svelte
/// title=injected-visible-prop.svelte
<script>
  // (optional) props injected by @svelte-put/tooltip at runtime
  export let visible = false;
  // your props
  export let content = 'Placeholder content';

  $: console.log('visibility state', visible);
</script>

<p class="m-0 p-0 text-gradient-brand text-lg">{content}</p>
```

## Tooltip Container

The tooltip container is rendered by `@svelte-put/tooltip`. The following customizations are available as top-level properties of the `TooltipParameter` interface.

```typescript
/// title=TooltipContainer
type TooltipParameter = TooltipContainer & { /* truncated */ };

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
   * number of milliseconds to debounce show / hide state of the tooltip.
   * Defaults to `false` (show / hide immediately)
   */
  debounce?: false | number;
  /**
   * config for handling of `pointer-events` on the container element
   * Defaults to `true`
   *
   * By default `pointer-events` is set to `none` by default, and `auto` when triggered.
   * Set to `false` to disable default behavior, or provide string(s) to
   * corresponding states
   */
  pointerEvents?:
    | boolean
    | {
        default?: string;
        /** value when tooltip is visible */
        visible?: string;
      };
  /**
   * the attribute to toggle in respond to tooltip's visibility state.
   * Defaults to `data-visible`.
   *
   * Set to `false` to disable, or provide a string to use as attribute name.
   */
  visibleAttribute?: boolean | string;
  /**
   * config for accessibility
   * Defaults to `true`
   *
   * By default:
   *   - (for container element) `role` is set to `tooltip`,
   *   - (for container element) `id` is taken from `aria-describedby` of
   *     the node action is placed on (if any),
   *     or auto-generated from a global counter,
   *   - (for node on which action is used) `aria-describedby` is set to the `id` of
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
```

:::div c-callout c-callout--info
Typically, you should specify a class name with enough css depending on your rendering & positioning strategy. See examples in [Quick Start] and [Prepare].
:::

## Tooltip Compute

The positioning logics is not handled by the library but left up to you via the `compute` method. This is to avoid complicating the public api of the library, which otherwise would often try to do either too much or not enough, in my personal experience.

```typescript
/// title=Compute (simplified)
export type Compute = ({
  node: HTMLElement,
  tooltip: HTMLElement,
  content: string | SvelteComponent, // inferred from the content parameter
}) => void | (() => void) | Promise<void | (() => void)>
```

In [Prepare], the action setup integrates [@floating-ui] (previously `popperjs`) for handling positioning logics. `@floating-ui` is a minimal and extensive library that pairs well with `@svelte-put/tooltip`. I recommend giving it a try.

## To tooltip or not to tooltip?

Although this library opens a lot of doors for composing UI by accepting any Svelte component, tooltip should be kept minimal. [Nielsen Norman Group's article on tooltip](https://www.nngroup.com/articles/tooltip-guidelines/) is a recommended read. To quote [MDN docs on tooltip](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tooltip_role):

> If the information is important enough for a tooltip, isn't it important enough to always be visible?

---

Happy tooling & tipping! 👨‍💻

[Quick Start]: #quick-start
[Prepare]: #prepare
[@floating-ui]: https://github.com/floating-ui/floating-ui
