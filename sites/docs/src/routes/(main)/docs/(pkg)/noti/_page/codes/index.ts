import interactiveComponent from './InteractiveNotification.svelte?raw';
import component from './Notification.svelte?raw';
import awaitSvelte from './await.svelte?raw';
import awaitTS from './await.ts?raw';
import commonConfig from './common-config.ts?raw';
import customPortal from './customPortal.svelte?raw';
import interactiveTrigger from './interactive.svelte?raw';
import quickStartStore from './notification-store?raw';
import popStore from './pop.ts?raw';
import quickStartPortal from './quickStart-portal.svelte?raw';
import quickStartUsage from './quickStart-usage.svelte?raw';
import variantConfig from './variant-config.ts?raw';

export const codes = {
  quickStart: {
    Usage: quickStartUsage,
    'Store Setup': quickStartStore,
    'Portal Setup': quickStartPortal,
    Component: component,
  },
  store: {
    builder: `import { store } from '@svelte-put/noti';
const notiStore = store({ /** optional common config */ })
  .variant(/* */)
  .build(); // remember to call this to build the actual store`,
    commonConfig,
    variantConfig,
    progress: `notiStore.pause(notificationId);
notiStore.resume(notificationId);`,
    proxy: `<script lang="ts">
  import type { NotificationInstance } from '@svelte-put/noti';

  export let notification: NotificationInstance;

  const { progress } = notification;

  $: console.log($progress.state); // 'idle' | 'running' | 'paused' | 'ended'
  const pause = () => progress.pause();
  const resume = () => progress.resume();
</script>`,
  },
  push: {
    variant: `notiStore.push('<variant>', { /** optional config & component props */ });`,
    custom: `notiStore.push('custom', {
  component: NotificationComponent, // required
  props: { /** props for NotificationComponent */ },
  id: () => 'one-time-id',
  timeout: false,
});`,
    proxy: `export const info = (content: string) => notiStore.push('info', { props: { content } });
// later
info('An info notification...');
`,
  },
  pop: {
    store: popStore,
    await: awaitTS,
    demo: awaitSvelte,
  },
  portal: {
    action: `import { portal } from 'svelte-put/noti';
<div use:portal={notiStore} />`,
    custom: customPortal,
  },
  component: {
    instance: `type NotificationInstanceConfig = {
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
`,
    configExample: `<!-- SomeNotificationComponent.svelte -->
<script lang="ts">
  import type { NotificationInstance } from '@svelte-put/noti';

  export let notification: NotificationInstance;
</script>

<div data-id={notification.id} class="notification notification--{notification.variant}" />`,
    interactive: {
      Usage: interactiveTrigger,
      Component: interactiveComponent,
    },
  },
};
