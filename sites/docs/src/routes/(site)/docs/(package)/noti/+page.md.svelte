<script>
	import { SettingsContext } from '$lib/contexts/settings.svelte';

  const settings = SettingsContext.get();
</script>

## Deprecation Notice

This package has been dropped in favor of [@svelte-put/async-stack](/docs/async-stack). `@svelte-put/async-stack` is a generic implementation extracted from `@svelte-put/noti` itself, and now is more minimal and powerful thanks to Svelte runes. See [Migration to @svelte-put/async-stack](#migration-to-async-stack) for more details.

To see the original documentation, [visit here](https://svelte-put-svelte-4.vnphanquang.com/docs/noti).

<h2 id="migration-to-async-stack"> Migration to @svelte-put/async-stack </h2>

Make sure you first install the latest version of `@svelte-put/async-stack`.

<enhanced-code-block group display="tabs" bind:title={settings.packageManager}>

```bash title=npm
npm install --save-dev @svelte-put/async-stack@next
```

```bash title=pnpm
pnpm add -D @svelte-put/async-stack@next
```

```bash title=yarn
yarn add -D @svelte-put/async-stack@next
```

</enhanced-code-block>

### `NotificationStore` is now `Stack`

First, the Svelte-store-based `NotificationStore` has been replaced by the plain class `Stack`. The `variant` method is now `addVariant`:

```typescript title="store is now stack"
// :::diff -
import { store } from '@svelte-put/noti';
// :::
// :::diff +
import { stack } from '@svelte-put/async-stack';
// :::

// :::diff -
export const notiStore = store()
// :::
// :::diff +
export const notiStack = stack()
// :::
// :::diff -
  .variant('name', /** config */)
// :::
// :::diff +
  .addVariant('name', /** config */)
// :::
  .build();
```

### `resolve()` method is now `resolution` property

In `@svelte-put/noti` V1, to await for resolution, you would call `.resolve()` on the notification instance. In `@svelte-put/async-stack`, this is now a property `resolution` to remove ambiguity between the act of awaiting for the promise and the act of resolving the notification.

```typescript title="resolve() is now resolution"
// :::diff -
const pushed = notiStore.push(/** push config */)
// :::
// :::diff +
const pushed = notiStack.push(/** push config */)
// :::

// :::diff -
const resolved = await pushed.resolve();
// :::
// :::diff +
const resolved = await pushed.resolution;
// :::
```

###  `notification` injected prop is now `item`

In `@svelte-put/noti` V1, a `notification` prop is injected for components used in the variant/push config.

```svelte title="previously: injected notification prop"
<script lang="ts">
  import type { NotificationInstance } from '@svelte-put/noti';

  export let notification: NotificationInstance;
</script>
```

In `@svelte-put/async-stack`, this prop is now named `item`.

```svelte title="now: injected item prop"
<script lang="ts">
  import type { StackItemProps } from '@svelte-put/async-stack';

  let { item }: StackItemProps<{ valueForResolution: string }> = $props();
</script>
```

### `resolve` CustomEvent is dropped

In `@svelte-put/noti` V1, notification is popped by dispatching a `resolve` CustomEvent within the component.

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

Some fiction was observed as this required boilerplate around setting up dispatcher, for the same reason `createEventDispatcher` is now deprecated in Svelte 5. To resolve the notification (now `StackItem`) in `@svelte-put/async-stack`, just call the `resolve` method on the `item` prop.

```svelte title="calling resolve method"
<script lang="ts">
  import type { StackItemProps } from '@svelte-put/async-stack';

  // ...truncated...

  let { item }: StackItemProps<string> = $props();
  const dismiss = () => item.resolve('popped from within component');
</script>
<!-- ...truncated... -->
```

Notice the generic argument passed to `StackItemProps` is the Promise type of `resolution`.

### Managing Timeout

The `progress` Svelte store is no longer needed. Notification `state`, as well as `resume` and `pause` methods, are now directly available on the `item` prop.

```svelte title="progress is now flatten"
<script lang="ts">
  // :::diff -
  import type { NotificationInstance } from '@svelte-put/noti';
  // :::
  // :::diff +
  import type { StackItemProps } from '@svelte-put/async-stack';
  // :::

  // :::diff -
  export let notification: NotificationInstance;
  const { progress } = notification;
  // :::
  // :::diff +
  let { item }: StackItemProps<string> = $props();
  // :::

  // :::diff -
  $: console.log($progress.state);
  const pause = () => progress.pause();
  const resume = () => progress.resume();
  // :::
  // :::diff +
  $inspect(item.state);
  const pause = () => item.pause();
  const resume = () => item.resume();
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
notiStack.push('variant', { timeout: 0 });
// :::
```

And lastly, the default timeout is now `0` (disabled) instead of `3000` ms. To set the base timeout for all notification, pass the `timeout` option to the `stack` builder.

```typescript title="default timeout is now 0"
import { stack } from '@svelte-put/async-stack';

export const notiStack = stack({ timeout: 3000 })
  // .addVariant('<name>', { <config> })
  // ...
  .build();
```

#### Notification Config

Properties such as `.id` and `.variant` that were previously available on the notification instance are moved into the `config` property of `item`.

```svelte title="properties now live in notification.config"
<script lang="ts">
  import type { StackItemProps } from '@svelte-put/async-stack';
  let { item }: StackItemProps<string> = $props();
</script>

<!-- :::diff - -->
<p>Notification (variant: {item.variant}): id of {item.id} with timeout of {item.timeout}ms</p>
<!-- ::: -->
<!-- :::diff + -->
<p>Notification (variant: {item.config.variant}): id of {item.config.id} with timeout of {item.config.timeout}ms</p>
<!-- ::: -->
```

---

Happy migrating 😅

