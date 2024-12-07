<script>
  import { ConnectedList, ConnectedListItem } from '$lib/components/connected-list';
  import ComprehensivePortal from './examples/comprehensive/NotificationPortal.svelte';
  import ComprehensiveUsage from './examples/comprehensive/usage.svelte';
  import Await from './examples/await.svelte';
  import CustomPortal from './examples/custom-portal.svelte';
  import Interactive from './examples/interactive/usage.svelte';

	import { getSettingsContext } from '$lib/contexts/settings';
  const { packageManager } = getSettingsContext();
</script>

## Deprecation Notice

This package will be deprecated when [Svelte 5](https://svelte-5-preview.vercel.app/status) lands, in favor for [@svelte-put/async-stack](https://svelte-put.vnphanquang.com/docs/async-stack) - a more generic and minimal package with very similar API. If you are using Svelte 5 today, head over to the [Migration Guides](https://svelte-put.vnphanquang.com/docs/noti#migration-to-async-stack) to learn more.

## Installation

<enhanced-code-block group display="tabs" bind:title={$packageManager}>

```bash
/// title=npm
npm install --save-dev @svelte-put/noti@^1.0.0
```

```bash
/// title=pnpm
pnpm add -D @svelte-put/noti@^1.0.0
```

```bash
/// title=yarn
yarn add -D @svelte-put/noti@^1.0.0
```

</enhanced-code-block>

<h2 id="comprehensive-example">Comprehensive Example</h2>

This section presents a working example of the package. You will notice that `@svelte-put/noti` only handles the core logics and leave UI up to you to configure. For that reason, the setup is quite verbose. This, however, enables flexibility: the package is not a plug-and-play prebuilt notification bundle but rather designed to help build custom notification system. We will unpack each part of the library in later sections of the document to see how customization can be achieved.

<fieldset class="border-2 border-violet-500 p-4">
  <legend>Example</legend>
  <p class="mt-0">Click to push toast notification</p>
  <ComprehensivePortal />
  <div class="flex gap-6">
    <ComprehensiveUsage />
  </div>
</fieldset>

<ConnectedList>
  <ConnectedListItem>

**Component Setup** (`Notification.svelte`): define a component to be rendered as notification.

  </ConnectedListItem>
  <ConnectedListItem>

**Store Setup** (`notification-store.ts`): a `NotificationStore` is created with (optionally) predefined notification variants.

  </ConnectedListItem>
  <ConnectedListItem>

**Portal Setup** (`NotificationPortal.svelte`): a `NotificationPortal` component is registered with `use:portal` as a centralized place to insert rendered notifications.

  </ConnectedListItem>
  <ConnectedListItem>

**Usage** (`usage.svelte`): notification is `pushed` using the previously created `NotificationStore`.

  </ConnectedListItem>
</ConnectedList>

<enhanced-code-block group display="files">

```svelte
/// src=./examples/comprehensive/Notification.svelte
/// title=Notification.svelte
```

```typescript
/// src=./examples/comprehensive/notification-store.ts
/// title=notification-store.ts
```

```svelte
/// src=./examples/comprehensive/NotificationPortal.svelte
/// title=NotificationPortal.svelte
```

```svelte
/// src=./examples/comprehensive/usage.svelte
/// title=usage.svelte
```

</enhanced-code-block>

<h2 id="notification-store">Notification Store</h2>

This is a key part of `@svelte-put/noti`. It holds all internal logics and is used for the `push` & `pop` mechanism. As shown in [Comprehensive Example], a `NotificationStore` is created with a builder pattern that provides type-safety for `push` invocations.

### Initialization

```typescript
/// title=notification-store-creation.ts
import { store } from '@svelte-put/noti';

export const notiStore = store({ /** optional common config */ })
  .variant(/* */)
  .build(); // remember to call this to build the actual store
```

The `store` function accepts an optional config object that will be merged to all notification instance config on `push`.

```typescript
/// title=NotificationCommonConfig (simplified)
type store = (config?: NotificationCommonConfig) => import('@svelte-put/noti').NotificationStoreBuilder;

type NotificationCommonConfig = {
  /**
   * milliseconds to wait and automatically pop the notification.
   * Defaults to `3000`. Set to `false` to disable
   */
  timeout?: number | false;
  /**
   * id generator for notifications. Defaults to 'uuid'.
   *
   *
   *   - counter: use an auto-incremented counter that is scoped to the store
   *   - uuid: use `crypto.randomUUID()`, fallback to `counter` if not available
   *   - callback: a custom function that accepts {@link NotificationInstanceConfig} and returns a string as the id
   */
  id?:
    | 'counter'
    | 'uuid'
    | ((config: {
        /* NotificationInstanceConfig, omitted for conciseness */
      }) => string);
};
```

### Predefined Variants

Use the `variant` method to add a variant config, allowing quick notification dispatch with minimal ad-hoc configuration. It accepts a mandatory `variant` string, and either a Svelte component or a config object (as seen in [Comprehensive Example]).

```typescript
/// title=NotificationVariantConfig (simplified)
type SvelteComponentClass = import('svelte').ComponentType<import('svelte').SvelteComponent>;

type variant = (
  variant: string,
  config: NotificationVariantConfig | SvelteComponentClass,
) => import('@svelte-put/noti').NotificationStoreBuilder;

type NotificationVariantConfig = {
  /** extends NotificationCommonConfig, omitted for conciseness */
  variant: string;
  component: SvelteComponentClass;
  props?: {
    /** inferred props for component */
  };
};
```

### Notification Push

New notifications can be pushed with the `NotificationStore.push` method. A `push` call take either one of the predefined variant, as seen in [Comprehensive Example], ...

```typescript
notiStore.push('<variant>', { /** optional config & component props */ });
```

...or the `'custom'` variant, helpful for one-off notification

```typescript
/// title=Custom Notification Push
notiStore.push('custom', {
  // :::highlight warning
  component: NotificationComponent, // required
  // :::
  props: { /** props for NotificationComponent */ },
  id: () => 'one-time-id',
  timeout: false,
});
```

:::div c-callout c-callout--warning
Custom `push` must provide a component in its config.
:::

If you find that the `push` interface is too verbose (it is), you can further create your own proxy utils.

```typescript
/// title=Notification Push Proxy
export const info = (content: string) => notiStore.push('info', { props: { content } });
// later
info('An info notification...');
```

:::div c-callout c-callout--info
The API is intentionally kept verbose to maintain a generic interface that can cover many use cases. But if you think it can be further simplified, [feedback and proposal](https://github.com/vnphanquang/svelte-put/discussions) are much welcomed 🙇.
:::

### Notification Pop

An active notification can be popped either from within the component (typically via user interactions), by dispatching a `resolve` [CustomEvent] (as seen in [Comprehensive Example])...

```svelte
/// title=Pop Within Notification Component
<script lang="ts">
  import type { NotificationInstance } from '@svelte-put/noti';
  import { createEventDispatcher } from 'svelte';

  // ...truncated...

  const dispatch = createEventDispatcher<{ resolve: string }>();
  // :::highlight
  const dismiss = () => dispatch('resolve', 'popped from within component');
  // :::
</script>

<!-- ...truncated... -->
```

or via the `pop` method from `NotificationStore`...

```typescript
/// title=Pop From NotificationStore
import { notiStore } from './notification-store';

// pop the topmost notification
notiStore.pop();

// pop a specific notification
notiStore.pop('specific-id');

// pop a specific notification with custom resolution value
notiStore.pop('id', 'custom-resolve-detail');

// alternatively, provide arguments as object
notiStore.pop({
  detail: 'custom-resolve-detail',
}); // pop the topmost notification with custom resolution value
```

<h3 id="await-resolution">Resolution Await</h3>

Notification resolution can be await. The awaited value is inferred from either the argument provided to `NotificationStore.pop`, or `CustomEvent.detail` of the `resolve` [CustomEvent]. This is especially helpful for complex interactive notification (see [Notification Component] section for an example of interactive notification).

```typescript
/// title=Awaiting for Resolution
import { notiStore } from './notification-store';

const pushed = notiStore.push('info');
const resolved = await pushed.resolve();
```

In the following example, try pressing the "Push a persistent notification" button and observe the async nature of the push & pop mechanism.

<fieldset class="border-2 border-violet-500 p-4">
  <legend>Example</legend>
  <Await />
</fieldset>

```svelte
/// src=./examples/await.svelte
/// title=Awaiting for Resolution - Demo
```

<h3 id="timeout-and-progress">Timeout and Progress</h3>

```typescript
const pushed = notiStore.push('info', { timeout: 3000 });
```

If your notification has `timeout` specified in its config, a `setTimeout` is setup and the `notification` will be automatically popped from the stack. This timeout can be **paused** and **resumed**.

```typescript
/// title=Pausing & Resuming - NotificationStore
notiStore.pause(pushed.id);
notiStore.resume(pushed.id);
```

The `pause` and `resume` methods on `NotificationStore` are actually just proxy methods for the same ones on `NotificationInstance`, which is accessible from within the notification component via the [injected notification prop].

```svelte
/// title=Pausing & Resuming - NotificationInstance
<script lang="ts">
  import type { NotificationInstance } from '@svelte-put/noti';

  export let notification: NotificationInstance;

  const { progress } = notification;

  $: console.log($progress.state); // 'idle' | 'running' | 'paused' | 'ended'
  const pause = () => progress.pause();
  const resume = () => progress.resume();
</script>

<!-- ...truncated... -->
```

:::div c-callout c-callout--info
`NotificationInstance.progress` is a [Svelte store], its value contain a `state` property with value of `'idle'`, `'running'`, `'paused'`, or `'ended'`, helpful to control the play state of some animation, for example.
:::

## Notification Portal

<h3 id="use-portal"><code>use:portal</code></h3>

The complementary `portal` [Svelte action] provides a quick and minimal solution to set any `HTMLElement` as the rendering portal for a [NotificationStore][Notification Store]. When using the `portal` action, only one portal can bind to a `NotificationStore`, and vice versa.

```svelte
/// title=Portal Action
<script>
  import { portal } from '@svelte-put/noti';
  import { notiStore } from './notification-store';
</script>

<aside use:portal={notiStore} />
```

:::div c-callout c-callout--info
Notification instances are rendered as direct children of the `HTMLElement` to which `use:portal` is attached. Newest instance is the last child.
:::

### Limitation

`use:portal` is helpful for reducing boilerplate and keeping everything connected. However, there are some known UI limitations:

- [Svelte transition] for the notification component root node must be `global` (`in:fly|global`, for example),
- outro transition (upon unmount) will not run (but hopefully soon will be able to when [this PR](https://github.com/sveltejs/svelte/pull/9056) is merged),
- `animate` is not available because it requires a keyed each block,

The next section discusses how a custom portal can be built to overcome these limitations, should it be necessary.

<h3 id="custom-portal">Custom Portal</h3>

Instead of [use:portal], rendering of notifications can be manually handled by subscribing to the `notifications` array property of a [NotificationStore][Notification Store]. This is helpful when more granular control over rendering is necessary. For example, to coordinate and animate smoothly the positions of the notifications, as done in the following demo.

<fieldset class="border-2 border-violet-500 p-4">
  <legend>Example</legend>
  <p class="mt-0">Click to push toast notification</p>
  <div class="flex gap-6">
    <CustomPortal />
  </div>
</fieldset>

:::div c-callout c-callout--info
Notice the subtle difference compared to [Comprehensive Example]. Specifically, thanks to `animate:flip`, the unmount transition is much smoother, especially when multiple notifications are active.
:::

```svelte
/// src=./examples/custom-portal.svelte
/// title=custom-portal.svelte
```

:::div c-callout c-callout--info
Notice the usage of `@svelte-put/noti/Notification.svelte` in above code snippet. It is just a small abstraction on top of [svelte:component] to conveniently provide the same functionality that `use:portal` does. You can even go more granular and omit it; just make sure to [provide the necessary props](https://github.com/vnphanquang/svelte-put/blob/a2f8fe227ef7de9074efcd6b26cfa0b0d1e05776/packages/noti/src/Notification.svelte).
:::

<h2 id="notification-component">Notification Component</h2>

Any Svelte component can be used with `@svelte-put/noti`. This section lists some **optional** prop & event interfaces that help build feature-rich notifications.

<h3 id="injected-notification-prop">Injected <code>notification</code> Prop</h3>

This is an optional prop that provides access to the corresponding `NotificationInstance` interface (element of notification stack managed by [NotificationStore][Notification Store]).

```typescript
/// title=NotificationInstance (simplified)
type NotificationInstanceConfig = NotificationVariantConfig & {
  /** extends NotificationVariantConfig, omitted for conciseness */
  id: string;
};

type NotificationInstance = NotificationInstanceConfig & {
  /** reference to the rendered notification component */
  instance?: SvelteComponent;
  /** internal api for resolving a notification, effectively popping it from the stack */
  $resolve: (e: ComponentEvents['resolve']) => Promise<ComponentEvents['resolve']['detail']>;
  /** svelte store with .pause & .resume methods for controlling automatic timeout */
  progress: NotificationProgressStore;
}
```

This is helpful, for example, if you want access to the `id` or `variant` of the pushed notification.

```svelte
/// title=SomeNotificationComponent.svelte
<script lang="ts">
  import type { NotificationInstance } from '@svelte-put/noti';

  export let notification: NotificationInstance;
</script>

<div data-id={notification.id} class="notification notification--{notification.variant}" />
```

The `notification` prop also allows access to the `progress` store for controlling timeout. Check [Timeout and Progress] for more information. Also refer to the `Notification` component used in [Comprehensive Example] which made use of the `progress` store to pause notification timeout on pointer hover.

### `resolve` CustomEvent

If set up correctly, either automatically via [use:portal] or manually in your [custom portal], a `resolve` [CustomEvent] dispatched from the pushed instance component will prompt [NotificationStore][Notification Store] to remove it from the current notification stack.

The detail of this `resolve` [CustomEvent] can be awaited, allowing us to receive user actions from complex interactive notifications such as in the example below.

<fieldset class="border-2 border-violet-500 p-4">
  <legend>Example</legend>
  <Interactive />
</fieldset>

<enhanced-code-block group display="files">

```svelte
/// src=./examples/interactive/InteractiveNotification.svelte
/// title=InteractiveNotification.svelte
```

```svelte
/// src=./examples/interactive/usage.svelte
/// title=interactive-usage.svelte
```

</enhanced-code-block>

---

Happy pushing and popping notifications! 👨‍💻

[Comprehensive Example]: #comprehensive-example
[Notification Store]: #notification-store
[Timeout and Progress]: #timeout-and-progress
[Notification Component]: #notification-component
[injected notification prop]: #injected-notification-prop
[Custom Portal]: #custom-portal
[use:portal]: #use-portal

[CustomEvent]: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent
[Svelte action]: https://svelte.dev/docs/svelte-action
[Svelte store]: https://svelte.dev/docs/svelte-store
[Svelte transition]: https://svelte.dev/docs/svelte-transition
[svelte:component]: https://svelte.dev/docs/special-elements#svelte-component

