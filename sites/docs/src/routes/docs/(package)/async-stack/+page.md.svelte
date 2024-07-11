<script>
	import { SettingsContext } from '$lib/contexts/settings.svelte';
  import { ConnectedList, ConnectedListItem } from '$lib/components/connected-list';

  import introImage from './_page/images/intro.png?enhanced&imagetools'
  import ComprehensivePortal from './_page/examples/comprehensive/NotificationPortal.svelte';
  import ComprehensiveUsage from './_page/examples/comprehensive/usage.svelte';
  import Await from './_page/examples/await.svelte';
  import Interactive from './_page/examples/interactive/usage.svelte';
  import RecipeModalUsage from './_page/examples/modal/usage.svelte';
  import RecipeModalPortal from './_page/examples/modal/ModalPortal.svelte';
  import RecipeToastUsage from './_page/examples/toast/usage.svelte';
  import RecipeToastPortal from './_page/examples/toast/ToastPortal.svelte';

  const settings = SettingsContext.get();
</script>

## Introduction

`@svelte-put/async-stack` is no more than a [stack](https://en.wikipedia.org/wiki/Stack_(abstract_data_type)) structure that sits between your component library and application, providing type-safe push&pop mechanism to mount/unmount components from anywhere to a centralized DOM element.

<figure>
<enhanced:img src={introImage} class="mx-auto rounded w-full max-w-3xl h-auto" alt="async-stack manages
      async flow between your push (component libraries) and the place it is rendered
    (application"></enhanced:img>
<figcaption>

Illustration 1: the minimal role of `async-stack`, managing just the async operations of forwarding components to where they should render.

</figcaption>
</figure>

<div class="c-callout c-callout--success c-callout--icon-bulb">

**What are the use cases?**

This package was extracted from the core logic of now-deprecated [@svelte-put/noti] and [@svelte-put/modal] packages, which were also the original use cases. Throughout this documentation, examples will be in the form of rendering notifications. See [Recipes] for more examples.

</div>

## Installation

<enhanced-code-block group display="tabs" bind:title={settings.packageManager}>

```bash title=npm
npm install --save-dev @svelte-put/async-stack@latest
```

```bash title=pnpm
pnpm add -D @svelte-put/async-stack@latest
```

```bash title=yarn
yarn add -D @svelte-put/async-stack@latest
```

</enhanced-code-block>

<h2 id="comprehensive-example">Comprehensive Example</h2>

This section presents a working example of the package. You will notice that `@svelte-put/async-stack` only handles the core logic and leave UI up to you to configure. For that reason, the setup is quite verbose. This, however, enables flexibility: the package is not a plug-and-play prebuilt component bundle but rather designed to help build custom notification/dialog system, for example. We will unpack each part of the library in later sections of the document to see how customization can be achieved.

<fieldset class="border-2 border-violet-500 p-4">
  <legend>Example</legend>
  <p class="mt-0">Click to push toast notification</p>
  <ComprehensivePortal />
  <div class="flex flex-col tb:flex-row gap-4 tb:gap-6">
    <ComprehensiveUsage />
  </div>
</fieldset>

<ConnectedList>
  <ConnectedListItem>

**Stack Setup** (`notification-stack.ts`): a `Stack` is created with (optionally) predefined notification variants.

  </ConnectedListItem>
  <ConnectedListItem>

**Component Setup** (`Notification.svelte`): define a component to be rendered as notification.

  </ConnectedListItem>
  <ConnectedListItem>

**Portal Setup** (`NotificationPortal.svelte`): a centralized place to insert rendered notifications, with the help of the `render` action from `Stack`, and some sensible animations powered by `svelte/animate` and `svelte/transition`.

  </ConnectedListItem>
  <ConnectedListItem>

**Usage** (`usage.svelte`): notification is pushed using the previously created `Stack`.

  </ConnectedListItem>
</ConnectedList>

<enhanced-code-block group display="files">

```typescript src=./_page/examples/comprehensive/notification-stack.ts title=notification-stack.ts
```

```svelte src=./_page/examples/comprehensive/Notification.svelte title=Notification.svelte
```

```svelte src=./_page/examples/comprehensive/NotificationPortal.svelte title=NotificationPortal.svelte
```

```svelte src=./_page/examples/comprehensive/usage.svelte title=usage.svelte
```

</enhanced-code-block>

<h2 id="stack">Stack</h2>

This is the core part of `@svelte-put/async-stack`. It holds all logic for the async `push` & `pop` mechanism. Shown in [Comprehensive Example], a `Stack` instance is created using a builder pattern that provides type-safety for `push` invocations.

### Initialization

```typescript title=notification-stack.ts
import { stack } from '@svelte-put/async-stack';

export const notiStack = stack({ /** optional common config, shared by all notifications */ })
  .addVariant('name', /* specific config for notification of this variant */)
  .build(); // remember to call this to build the actual stack;
```

The `stack` function accepts an optional config object that will be merged with all `StackItem` instance config on `push`.

```typescript title="StackItemCommonConfig (simplified)"
type stack = (config?: StackItemCommonConfig) => import('@svelte-put/async-stack').StackBuilder;

type StackItemCommonConfig = {
	/**
	 * milliseconds to wait and automatically pop the stack item.
	 * Defaults to `0` (disabled)
	 */
	timeout?: number;
	/**
	 * id generator for stack items. Defaults to 'uuid'
	 *   - counter: use an auto-incremented counter that is scoped to the
	 *   - uuid: use `crypto.randomUUID()`, fallback to `counter` if not available
	 *   - callback: a custom function that accepts {@link StackItemInstanceConfig} and returns a string as the id
	 */
	id?:
		| 'counter'
		| 'uuid'
    | ((config: /* StackItemInstanceConfig, omitted for conciseness */) => string);
};
```

A `Stack` instance may be wrapped in a [Svelte context] for better encapsulation. See [Recipes][recipes.context] for an example.

### Predefined Variants

Use the `addVariant` method to add a predefined config, allowing quick push with minimal ad-hoc configuration. The first parameter is a unique variant name, while the second accepts either a Svelte component or a config object (as seen in [Comprehensive Example]).

```typescript title="StackItemVariantConfig (simplified)"
type addVariant = (
  variant: string,
  config: StackItemVariantConfig | import('svelte').Component,
) => import('@svelte-put/async-stack').StackBuilder;

type StackItemVariantConfig = {
  /** extends StackItemCommonConfig, omitted for conciseness */
  variant: string;
  component: import('svelte').Component;
  props?: {
    /** inferred props for component */
  };
};
```

### Push

A `StackItem` can be pushed onto `Stack` by invoking the `push` method on `Stack` instance. A `push` call take either one of the predefined variant, as seen in [Comprehensive Example]...

```typescript
notiStack.push('<variant>', /** optional StackItem instance config & component props */);
```

...or the `'custom'` variant, helpful for one-off, ad-hoc push

```typescript title="Custom Push"
notiStack.push('custom', {
  // :::highlight warning
  component: MyNotification, // required
  // :::
  props: { /** props for MyNotification */ },
  id: () => 'one-time-id',
  timeout: 4000,
});
```

<div class="c-callout c-callout--warning">

Custom `push` must provide a component in its config.

</div>

If you find that the `push` interface is too verbose (it is, by design), you can further create your own proxy util(s).

```typescript title="push proxies"
export const info = (content: string) => notiStack.push('info', { props: { content } });

// later
info('An actual info notification');
```

### Pop

An active `StackItem` instance can be popped either from within the component (typically following user interactions), by calling `resolve` from the injected `item` prop...

```svelte title="Pop Within Component"
<script lang="ts">
  import type { StackItemProps } from '@svelte-put/async-stack';

  let { item }: StackItemProps<{ confirmed: boolean }> = $props();

  const confirm = () => item.resolve({ confirmed: true });
  const cancel = () => item.resolve({ confirmed: false });
</script>
<!-- ...truncated... -->
```

...or via the `pop` method on `Stack` instance:

```javascript title="Pop From Stack"
import { notiStack } from './notification-stack';

// pop the topmost notification
notiStack.pop();

// pop a specific notification
notiStack.pop('specific-id');

// pop a specific notification with custom resolution value
notiStack.pop('id', 'custom-resolve-detail');

// alternatively, provide arguments as object
notiStack.pop({
  detail: 'custom-resolve-detail',
}); // pop the topmost notification with custom resolution value
```

`Stack.pop` returns the popped `StackItem` instance, or `null` if no notification is found with the provided `id`. You can set id in the push config, and get it back from the returned object.

```javascript title="Where is my id?"
import { notiStack } from './notification-stack';

const pushed = notiStack.push('info', { id: 'my-id' });

// ... later ...

const popped = notiStack.pop(pushed.config.id); // or just 'my-id'

// pushed === popped -> true
```

#### Typescript Support

To provide typing for `StackItem.pop`, pass type of your component as the generic argument. This helps infer the `resolution` type. See [Awaiting for Resolution] for more information.

<enhanced-code-block group display="files">

```typescript title="pop.ts"
import ConfirmNoti from './ConfirmNoti.svelte';

const popped = notiStack.pop<typeof ConfirmNoti>('id');
if (popped) {
  const resolution = await notiStack.resolution;
  if (resolution) { // can be undefined, for example when timeouted
    console.log(resolution.confirmed);
  }
}
```

```svelte title="ConfirmNoti.svelte"
<script lang="ts">
  import type { StackItemProps } from '@svelte-put/async-stack';

  let { item }: StackItemProps<{ confirmed: boolean }> = $props();
</script>

<!-- ...truncated... -->
```

</enhanced-code-block>

<h3 id="await-resolution">Awaiting for Resolution</h3>

A `StackItem` instance is *resolved* when it is popped from a `Stack`. This resolution is a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) that can be awaited, and its value is from argument passed to either `Stack.pop` or `StackItem.resolve` (injected `item` prop). This is especially useful for complex interactive notification (see [Component for StackItem] section for an exmaple of such).

```typescript title="Awaiting for Resolution"
import { notiStack } from './notification-stack';

const pushed = notiStack.push('info');
const resolved = await pushed.resolution;
```

To provide typing for `resolution`, simply extend the `StackItemProps`. The generic argument passed to `StackItemProps` is the type of `resolution`'s Promise value:

```svelte title="Extending StackItemProps"
<script lang="ts">
  import type { StackItemProps } from '@svelte-put/async-stack';

  let { item }: StackItemProps<{ confirmed: boolean }> = $props();
  // typeof item.resolution === Promise<{ confirmed: boolean }>
</script>
```

In the following example, try pressing the "Push a persistent notification" button and observe the async nature of the push & pop mechanism.

<fieldset class="border-2 border-violet-500 p-4">
  <legend>Example</legend>
  <Await />
</fieldset>

```svelte src=./_page/examples/await.svelte title="Async Push & Pop"
```

<h3 id="timeout-and-progress">Timeout and Progress</h3>

```typescript
const pushed = notiStack.push('info', { timeout: 3000 });
```

If a `StackItem` has `timeout` specified in its config, `Stack` sets up a `setTimeout` to automatically pop it in due time.

<div class="c-callout c-callout--warning">

A `StackItem` upon being timeouted will resolve with no value. Make sure you are aware of this if you await for its resolution somewhere else in the application.

</div>

This timeout can be **paused** and **resumed** by invoking corresponding methods on the `Stack` instance.

```typescript title="Pausing & Resuming - Stack"
notiStack.pause(pushed.id);
notiStack.resume(pushed.id);
```

The `pause` and `resume` methods on `Stack` instance are actually just proxies for the same ones on `StackItem` instance, which is accessible from within component via the injected `item` prop...

```svelte title="Pausing & Resuming - Notification instance"
<script lang="ts">
  import type { StackItemProps } from '@svelte-put/async-stack';

  let { item }: StackItemProps<{ confirmed: boolean }> = $props();

  $inspect(item.state);
  const pause = () => item.pause();
  const resume = () => item.resume();
</script>

<!-- ...truncated... -->
```

...accept when no `id` is specified, in which case the method will be applied to all active `StackItem` instances.

```typescript title="Pausing & Resuming All- Stack"
notiStack.pause(); // pausing all items
notiStack.resume(); // resuming all items
```

<div class="c-callout c-callout--info">

`item.state` is a reactive Svelte rune with value of `'idle' | 'elapsing' | 'paused' | 'timeout' | 'resolved'`, helpful to control the play state of some animation, for example, as seen in [Comprehensive Example].

</div>

<h2 id="portal">Portal for Rendering Stack</h2>

As seen in [Comprehensive Example], `@svelte-put/async-stack` does not control how and where you render your stack items, as it cannot assume the styling and animation required for your project. To make it easier to set up one, however, you can utilize the `render` action on a `Stack` instance with the following pattern:

```svelte title=NotificationPortal.svelte
<script>
	import { notiStack } from './notification-stack';
</script>

<!-- notification portal, typically setup at somewhere global like root layout -->
<aside>
  <!-- :::focus -->
  <!-- :::highlight -->
  {#each notiStack.items as notification (notification.config.id)}
    <div use:notiStack.actions.render={notification}></div>
  {/each}
  <!-- ::: -->
  <!-- ::: -->
</aside>
```

The `render` action makes sure your `StackItem` components receive all the correct props upon `push`. In the example above, the associated components will be rendered as direct children of `<div>`.

<h2 id="component">Component for StackItem</h2>

Any Svelte component can be used with `@svelte-put/async-stack`. In any case, however, your component should accept an `item` prop that is the actual `StackItem` instance created by `Stack` on [push]. If you follow the setup pattern introduced in [Portal For Rendering Stack][portal], the `render` action should automatically pass the `item` prop to your component.

```svelte title="MyNotification.svelte"
<script lang="ts">
  import type { StackItemProps } from '@svelte-put/async-stack';

  // :::highlight
  let { item }: StackItemProps<{ confirmed: boolean }> = $props();
  // :::
</script>
<!-- ...truncated... -->
```

The `item` prop has the following interface:

```typescript title="StackItem (simplified)"
interface StackItem<Resolved> {
  // the config applied on push
  config: StackItemInstanceConfig;

  // managing timeout
  state: StackItemState;
  resume: () => void;
  pause: () => void;

  // handling resolution
  resolution: Promise<Resolved | undefined>;
  resolve: (r: Resolved) => void;
}

type StackItemState = 'idle' | 'elapsing' | 'paused' | 'timeout' | 'resolved';

type StackItemInstanceConfig = {
  id: string;
  timeout: number;
  variant: string;
  component: import('svelte').Component;
  props?: Record<string, unknown>;
}
```

### Timeout Management

When a`StackItem` is pushed with a `timeout`, calling `pause` or `resume` can help better control its `state`, as described in [Timeout and Progress]. The [Comprehensive Example] demonstrates this by pausing timeout upon pointer hover over the notification. Try it out again below:

<fieldset class="border-2 border-violet-500 p-4">
  <legend>Example</legend>
  <p class="mt-0">Click to push toast notification</p>
  <ComprehensivePortal />
  <div class="flex flex-col tb:flex-row gap-4 tb:gap-6">
    <ComprehensiveUsage />
  </div>
</fieldset>

### Resolution Handling

Calling `resolve` on the `item` prop will pop the notification from `Stack` and resolve the `resolution` promise, as described in [Awaiting for Resolution]. This is especially useful for interactive notifications, such as in the example below.

<fieldset class="border-2 border-violet-500 p-4">
  <legend>Example</legend>
  <Interactive />
</fieldset>

<enhanced-code-block group display="files">

```svelte src=./_page/examples/interactive/InteractiveNotification.svelte title=InteractiveNotification.svelte
```

```svelte src=./_page/examples/interactive/usage.svelte title=interactive-usage.svelte
```

</enhanced-code-block>


## Recipes

This section presents some useful patterns to better integrate `@svelte-put/async-stack` into your application.

<h3 id="wrapping-stack-in-svelte-context">Wrapping Stack in Svelte Context</h3>

To share a `Stack` instance across the application, it is useful to wrap it in an idiomatic [Svelte context]. The example below shows such pattern.

<enhanced-code-block group display="files">

```svelte title="src/routes/+layout.svelte"
<script>
  import { setContext } from 'svelte';
  import { notiStack } from '$lib/notification/notification-stack';

  let { children } = $props();
  setContext('app:noti', notiStack);
</script>

{@render children()}
```

```typescript title="src/lib/notification/notification-stack.ts"
export const notiStack = stack({ /* common config */ })
  .addVariant('name', /* specific config */)
  .build();
export type NotiStack = typeof notiStack;
````

```svelte title="src/routes/[...]/+page.svelte"
<script lang="ts">
  import type { NotiStack } from '$lib/notification/notification-stack';

  const notiStack = getContext<NotiStack>('app:noti');
  function pushNoti = () => notiStack.push(/* push config */);
</script>

<buttton onclick={pushNoti}></buttton>
```

</enhanced-code-block>

### Modal / Dialog

A modal or dialog system shares much similarity with a notification system, although components tend to be much more complex. The following example shows one possible setup for such system.

<div class="not-prose contents">
  <RecipeModalPortal />
</div>
<fieldset class="border-2 border-violet-500 p-4">
  <legend>Example</legend>
  <RecipeModalUsage />
</fieldset>

<enhanced-code-block group display="files">

```typescript title="modal-stack.ts" src="./_page/examples/modal/modal-stack.ts"
```

```svelte title="ConfirmationModal.svelte" src="./_page/examples/modal/ConfirmationModal.svelte"
```

```svelte title="ModalPortal.svelte" src="./_page/examples/modal/ModalPortal.svelte"
```

```typescript title="usage.svelte" src="./_page/examples/modal/usage.svelte"
```

```javascript title="enhance-dialog.js" src="./_page/examples/modal/enhance-dialog.js"
```

</enhanced-code-block>

<div class="c-callout c-callout--info">

**HTML [dialog](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) for the win!**

The `ConfirmationModal` component uses a native `<dialog>` element, which is a great way to create accessible dialogs without reinventing the wheel. A couple of things worth noting from the example above:

- [dialog.showModal()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal) is used to create dialog-as-a-modal, providing some additional feature like focus-trapping and escape key. Depending on your use cases, you might just need to use [dialog.show()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/show) instead.
- The `ConfirmationModal` component uses `animationend` event to check for when to resolve the `StackItem` (note the fly-in-and-out animation). This works in conjunction with a correct `form` setup and the use of [dialog.returnValue](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/returnValue). If you do not care about such things, simply call `item.resolve` when needed.
- Currently there is no way yet to natively capture click event on the `<dialog>`backdrop, the `enhancedialog` action is there for that.

</div>

### [Svelte Sonner](https://svelte-sonner.vercel.app/) Inspired Toast System

As demonstrated throughout this documentation, `svelte-put/async-stack` can be used to build a push notification system. See [Comprehensive Example] for a complete example. The example below shows a more fancy version that is inspired by [Svelte Sonner](https://svelte-sonner.vercel.app/).

<div class="not-prose contents">
  <RecipeToastPortal />
</div>
<fieldset class="border-2 border-violet-500 p-4">
  <legend>Example</legend>
  <RecipeToastUsage />
</fieldset>

<enhanced-code-block group display="files">

```typescript title="toast.ts" src="./_page/examples/toast/toast.ts"
```

```svelte title="Toast.svelte" src="./_page/examples/toast/Toast.svelte"
```

```svelte title="ToastPortal.svelte" src="./_page/examples/toast/ToastPortal.svelte"
```

```typescript title="usage.svelte" src="./_page/examples/toast/usage.svelte"
```

</enhanced-code-block>


[@svelte-put/noti]: /docs/noti
[@svelte-put/modal]: /docs/modal
[Comprehensive Example]: #comprehensive-example
[Svelte context]: https://svelte.dev/docs/svelte#setcontext
[Timeout and Progress]: #timeout-and-progress
[Awaiting for Resolution]: #await-resolution
[recipes]: #recipes
[recipes.context]: #wrapping-stack-in-svelte-context
[Component for StackItem]: #component
[portal]: #portal
[push]: #push

