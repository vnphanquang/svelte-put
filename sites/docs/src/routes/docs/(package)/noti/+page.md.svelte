<script>
  import { SettingsContext } from '$lib/contexts/settings.svelte';
  import { ConnectedList, ConnectedListItem } from '$lib/components/connected-list';

  import ComprehensivePortal from './_page/examples/comprehensive/NotificationPortal.svelte';
  import ComprehensiveUsage from './_page/examples/comprehensive/usage.svelte';
  import Await from './_page/examples/await.svelte';
  import Interactive from './_page/examples/interactive/usage.svelte';

  const settings = SettingsContext.get();
</script>

## Installation

<enhanced-code-block group display="tabs" bind:title={settings.packageManager}>

```bash title=npm
npm install --save-dev @svelte-put/noti
```

```bash title=pnpm
pnpm add -D @svelte-put/noti
```

```bash title=yarn
yarn add -D @svelte-put/noti
```

</enhanced-code-block>

<h2 id="comprehensive-example">Comprehensive Example</h2>

This section presents a working example of the package. You will notice that `@svelte-put/noti` only handles the core logics and leave UI up to you to configure. For that reason, the setup is quite verbose. This, however, enables flexibility: the package is not a plug-and-play prebuilt notification bundle but rather designed to help build custom notification system. We will unpack each part of the library in later sections of the document to see how customization can be achieved.

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

**Controller Setup** (`notification-controller.ts`): a `NotificationController` is created with (optionally) predefined notification variants.

  </ConnectedListItem>
  <ConnectedListItem>

**Component Setup** (`Notification.svelte`): define a component to be rendered as notification.

  </ConnectedListItem>
  <ConnectedListItem>

**Portal Setup** (`NotificationPortal.svelte`): a a centralized place to insert rendered notifications, with the help of the `render` action from the controller, and some sensible animations powered by `svelte/animate` and `svelte/transition`.

  </ConnectedListItem>
  <ConnectedListItem>

**Usage** (`usage.svelte`): notification is `pushed` using the previously created `NotificationController`.

  </ConnectedListItem>
</ConnectedList>

<enhanced-code-block group display="files">

```typescript src=./_page/examples/comprehensive/notification-controller.ts title=notification-controller.ts
```

```svelte src=./_page/examples/comprehensive/Notification.svelte title=Notification.svelte
```

```svelte src=./_page/examples/comprehensive/NotificationPortal.svelte title=NotificationPortal.svelte
```

```svelte src=./_page/examples/comprehensive/usage.svelte title=usage.svelte
```

</enhanced-code-block>

<h2 id="notification-controller">Notification Controller</h2>

This is a key part of `@svelte-put/noti`. It holds all logics for the async `push` & `pop` mechanism. Shown in [Comprehensive Example], a `NotificationController` instance is created with a builder pattern that provides type-safety for `push` invocations.

### Initialization

```typescript title=notification-controller.ts
import { controller } from '@svelte-put/noti';

export const notiCtrl = controller({ /** optional common config, shared by all notifications */ })
  .addVariant('name', /* specific config for notification of this variant */)
  .build(); // remember to call this to build the actual controller;
```

The `controller` function accepts an optional config object that will be merged to all notification instance config on `push`.

```typescript title="NotificationCommonConfig (simplified)"
type controller = (config?: NotificationCommonConfig) => import('@svelte-put/noti').NotificationControllerBuilder;

type NotificationCommonConfig = {
  /**
   * milliseconds to wait and automatically pop the notification.
   * Defaults to `3000`. Set to 0 to disable
   */
  timeout?: number;
  /**
   * id generator for notifications. Defaults to 'uuid'.
   *
   *   - counter: use an auto-incremented counter that is scoped to the controller
   *   - uuid: use `crypto.randomUUID()`, fallback to `counter` if not available
   *   - callback: a custom function that accepts {@link NotificationInstanceConfig} and returns a string as the id
   */
  id?:
    | 'counter'
    | 'uuid'
    | ((config: /* NotificationInstanceConfig, omitted for conciseness */) => string);
};
```

You may use the exported controller instance as a global singleton, or wrap it in an idiomatic [Svelte context] for better encapsulation.

<enhanced-code-block group display="files">

```typescript title=src/lib/contexts/notification.ts
import { getContext, setContext } from 'svelte';

const notiCtrl = controller(/* config */)/* variants */.build();

export class NotificationContext {
  static KEY = 'app:notification';

  static set(): typeof notiCtrl {
    return setContext(NotificationContext.KEY, notiCtrl);
  }

  static get(): typeof notiCtrl {
    return getContext(NotificationContext.KEY);
  }
}
```

```svelte title=src/routes/layout.svelte
<script>
  import { NotificationContext } from '$lib/contexts/notification';
  let { children } = $props();

  NotificationContext.set();
</script>

{@render children()}
```

```svelte title=my-page.svelte
<script>
  import { NotificationContext } from '$lib/contexts/notification';

  const notiCtrl = NotificationContext.get();
  const pushNoti = () => notiCtrl.push(/* push config */);
</script>

<button on:click={pushNoti}>
```

</enhanced-code-block>

### Predefined Variants

Use the `addVariant` method to add a predefined config, allowing quick notification dispatch with minimal ad-hoc configuration. The first parameter is variant name, while the second accepts either a Svelte component or a config object (as seen in [Comprehensive Example]).

```typescript title="NotificationVariantConfig (simplified)"
type addVariant = (
  variant: string,
  config: NotificationVariantConfig | import('svelte').Component,
) => import('@svelte-put/noti').NotificationControllerBuilder;

type NotificationVariantConfig = {
  /** extends NotificationCommonConfig, omitted for conciseness */
  variant: string;
  component: import('svelte').Component;
  props?: {
    /** inferred props for component */
  };
};
```

### Notification Push

New notifications can be pushed by invoking the `push` method on a `NotificationController` instance. A `push` call take either one of the predefined variant, as seen in [Comprehensive Example]...

```typescript
notiCtrl.push('<variant>', /** optional notification instance config & component props */);
```

...or the `'custom'` variant, helpful for one-off notification

```typescript title="Custom Notification Push"
notiCtrl.push('custom', {
  // :::highlight warning
  component: NotificationComponent, // required
  // :::
  props: { /** props for NotificationComponent */ },
  id: () => 'one-time-id',
  timeout: 0,
});
```

<div class="c-callout c-callout--warning">

Custom `push` must provide a component in its config.

</div>

If you find that the `push` interface is too verbose (it is, by design), you can further create your own proxy util(s).

```typescript title="Notification Push Proxy"
export const info = (content: string) => notiCtrl.push('info', { props: { content } });

// later
info('An actual info notification');
```

### Notification Pop

An active notification can be popped either from within the component (typically following user interactions), by calling `resolve` from the injected `notification` prop...

```svelte title="Pop Within Component"
<script lang="ts">
  import type { NotificationProps } from '@svelte-put/noti';

  let { notification }: NotificationProps<{ confirmed: boolean }> = $props();

  const confirm = () => notification.resolve({ confirmed: true });
  const cancel = () => notification.resolve({ confirmed: false });
</script>
<!-- ...truncated... -->
```

...or via the `pop` method on a `NotificationController` instance:

```typescript title="Pop From NotificationController"
import { notiCtrl } from './notification-controller';

// pop the topmost notification
notiCtrl.pop();

// pop a specific notification
notiCtrl.pop('specific-id');

// pop a specific notification with custom resolution value
notiCtrl.pop('id', 'custom-resolve-detail');

// alternatively, provide arguments as object
notiCtrl.pop({
  detail: 'custom-resolve-detail',
}); // pop the topmost notification with custom resolution value
```

<h3 id="await-resolution">Awaiting for Resolution</h3>

Notification resolution can be awaited. The resolved value is from either the argument provided to `pop` on a `NotificationController` instance or to `resolve` on the injected `notification` prop. This is especially helpful for complex interactive notification (see [Notification Component] section for an example of such).

```typescript title="Awaiting for Resolution"
import { notiCtrl } from './notification-controller';

const pushed = notiCtrl.push('info');
const resolved = await pushed.resolution;
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
const pushed = notiCtrl.push('info', { timeout: 3000 });
```

If your notification has `timeout` specified in its config, a `setTimeout` is setup and the `notification` will be automatically popped from the stack in due time. This timeout can be **paused** and **resumed** by invoking corresponding methods on the `NotificationController` instance.

```typescript title="Pausing & Resuming - NotificationController"
notiCtrl.pause(pushed.id);
notiCtrl.resume(pushed.id);
```

The `pause` and `resume` methods on `NotificationController` instance are actually just proxy methods for the same ones on `Notification` instance, which is accessible from within the notification component via the injected `notification` prop.

```svelte title="Pausing & Resuming - Notification instance"
<script lang="ts">
  import type { NotificationProps } from '@svelte-put/noti';

  let { notification }: NotificationProps<{ confirmed: boolean }> = $props();

  $inspect(notification.state)
  const pause = () => notification.pause();
  const resume = () => notification.resume();
</script>

<!-- ...truncated... -->
```

<div class="c-callout c-callout--info">

`notification.state` is a reactive Svelte rune with value of `'idle' | 'elapsing' | 'paused' | 'timeout' | 'resolved'`, helpful to control the play state of some animation, for example, as seen in [Comprehensive Example].

</div>

<h2 id="notification-portal">Notification Portal</h2>

As seen in [Comprehensive Example], `@svelte-put/noti` does not control how and where you render your notifications, as it cannot assume the styling and animation required for your project. To make it easier to set up one, however, you can utilize the `render` action on a `NotificationController` instance in the following pattern:

```svelte title=NotificationPortal.svelte
<script>
	import { notiCtrl } from './notification-controller';
</script>

<!-- notification portal, typically setup at somewhere global like root layout -->
<aside>
  <!-- :::focus -->
  <!-- :::highlight -->
  {#each notiCtrl.notifications as notification (notification.config.id)}
    <div use:notiCtrl.actions.render={notification}></div>
  {/each}
  <!-- ::: -->
  <!-- ::: -->
</aside>
```

The `render` action makes sure your notification components receive all the correct props upon `push`. In the example above, your notification component will be rendered as the direct child of `<div>`.

<h2 id="notification-component">Notification Component</h2>

Any Svelte component can be used with `@svelte-put/noti`. In any case, however, your component should accept a `notification` that is the actual notification instance created on `push`. If you follow the setup pattern introduced in [Notification Portal], the `render` action should automatically pass the `notification` prop to your component.

```svelte title="MyNotification.svelte"
<script lang="ts">
  import type { NotificationProps } from '@svelte-put/noti';

  // :::highlight
  let { notification }: NotificationProps<{ confirmed: boolean }> = $props();
  // :::
</script>
<!-- ...truncated... -->
```

The `notification` prop has the following interface:

```typescript title="Notification (simplified)"
interface Notification<Resolved> {
  // the config applied on push
  config: NotificationInstanceConfig;

  // managing timeout
  state: NotificationState;
  resume: () => void;
  pause: () => void;

  // handling resolution
  resolution: Promise<Resolved | undefined>;
  resolve: (r: Resolved) => void;
}

type NotificationState = 'idle' | 'elapsing' | 'paused' | 'timeout' | 'resolved';

type NotificationInstanceConfig = {
  id: string;
  timeout: number;
  variant: string;
  component: import('svelte').Component;
  props?: Record<string, unknown>;
}
```

### Timeout Management

If your notification is pushed with a `timeout`, calling `pause` & `resume` can help better control the `state`, as described in [Timeout and Progress]. The [Comprehensive Example] demonstrates this by pausing timeout upon pointer hover over the notification.

### Resolution Handling

Calling `resolve` on the `notification` prop will pop the notification from the stack and resolve the `resolution` promise, as described in [Awaiting for Resolution]. This is especially useful for interactive notifications, such as in the example below.

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

## Migration Guides

### V1 -> V2 (Svelte 5 in Runes mode)

Version 2 is now powered by Svelte runes, making the public API much more minimal. Let's go through the breaking changes.

#### `NotificationStore` is now `NotificationController`

First, the Svelte-based `NotificationStore` has been replaced by the plain class `NotificationController`. The `variant` method is now `addVariant`:

```typescript title="store is now controller"
// :::diff -
import { store } from '@svelte-put/noti';
// :::
// :::diff +
import { controller } from '@svelte-put/noti';
// :::

// :::diff -
export const notiStore = store()
// :::
// :::diff +
export const notiCtrl = controller()
// :::
// :::diff -
  .variant('name', /** config */)
// :::
// :::diff +
  .addVariant('name', /** config */)
// :::
  .build();
```

#### `resolve()` method is now `resolution` property

In V1, to await for resolution, you would call `.resolve()` on the notification instance. In V2, this is now a property `resolution` to remove ambiguity between the act of awaiting for the promise and the act of resolving the notification.

```typescript title="resolve() is now resolution"
// :::diff -
const pushed = notiStore.push(/** push config */)
// :::
// :::diff +
const pushed = notiCtrl.push(/** push config */)
// :::

// :::diff -
const resolved = await pushed.resolve();
// :::
// :::diff +
const resolved = await pushed.resolution;
// :::
```

#### `resolve` CustomEvent is dropped

In V1, notification is popped by dispatching a `resolve` CustomEvent within the component.

```svelte title="dispatching resolve event"
<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  // ...truncated...

  const dispatch = createEventDispatcher<{ resolve: string }>();
  // :::highlight
  const dismiss = () => dispatch('resolve', 'popped from within component');
  // :::
</script>
<!-- ...truncated... -->
```

Some fiction was observed as this required boilerplate around setting up dispatcher, for the same reason `createEventDispatcher` is now deprecated in Svelte 5. To resolve the notification in V2, just call the `resolve` method on the `notification` prop.

```svelte title="calling resolve method"
<script lang="ts">
  import type { NotificationProps } from '@svelte-put/noti';

  // ...truncated...

  let { notification }: NotificationProps<string> = $props();
  const dismiss = () => notification.resolve('popped from within component');
</script>
<!-- ...truncated... -->
```

#### Managing Timeout

The `progress` Svelte store is no longer needed. Notification `state`, as well as the `resume` and `pause` methods, are now directly available on the `notification` prop.

```svelte title="progress is now flatten"
<script lang="ts">
  // :::diff -
  import type { NotificationInstance } from '@svelte-put/noti';
  // :::
  // :::diff +
  import type { NotificationProps } from '@svelte-put/noti';
  // :::

  // :::diff -
  export let notification: NotificationInstance;
  const { progress } = notification;
  // :::
  // :::diff +
  let { notification }: NotificationProps<string> = $props();
  // :::

  // :::diff -
  $: console.log($progress.state);
  const pause = () => progress.pause();
  const resume = () => progress.resume();
  // :::
  // :::diff +
  $inspect(notification.state);
  const pause = () => notification.pause();
  const resume = () => notification.resume();
  // :::
</script>

<!-- ...truncated... -->
```

Additionally, the `timeout` config property no longer accepts `false`. To disable notification timing, pass `0` instead.

```typescript title="timeout now accepts only number"
// :::diff -
notiStore.push('variant', { timeout: false });
// :::
// :::diff +
notiCtrl.push('variant', { timeout: 0 });
// :::
```

#### Notification Config

Properties such as `.id` and `.variant` that were previously available on the notification instance are moved into the `config` property.

```svelte title="properties now live in notification.config"
<script lang="ts">
  import type { NotificationProps } from '@svelte-put/noti';
  let { notification }: NotificationProps<string> = $props();
</script>

<!-- :::diff - -->
<p>Notification (variant: {notification.variant}): id of {notification.id} with timeout of {notification.timeout}ms</p>
<!-- ::: -->
<!-- :::diff + -->
<p>Notification (variant: {notification.config.variant}): id of {notification.config.id} with timeout of {notification.config.timeout}ms</p>
<!-- ::: -->
```

---

Happy pushing and popping notifications! 👨‍💻

[Comprehensive Example]: #comprehensive-example
[Svelte context]: https://svelte.dev/docs/svelte#setcontext
[Notification Component]: #notification-component
[Notification Portal]: #notification-portal
[Timeout and Progress]: #timeout-and-progress
[Awaiting for Resolution]: #await-resolution
