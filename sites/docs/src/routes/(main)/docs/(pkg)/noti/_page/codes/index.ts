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
  portalAction: `<div use:portal={notiStore} />`,
  store: {
    builder: `import { store } from '@svelte-put/noti';
const notiStore = store({ /** optional common config */ })
  .variant(/* */)
  .build(); // remember to call this to build the actual store`,
    commonConfig,
    variantConfig,
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
  customPortal,
  component: {
    instanceConfig: `type NotificationInstanceConfig = {
  /** extends NotificationVariantConfig, omitted for conciseness */
  id: string;
};`,
    configExample: `<!-- SomeNotificationComponent.svelte -->
<script lang="ts">
  import type { NotificationInstanceConfig } from '@svelte-put/noti';

  export let config: NotificationInstanceConfig;
</script>

<div data-id={config.id} class="notification notification--{config.variant}" />`,
    interactive: {
      Usage: interactiveTrigger,
      Component: interactiveComponent,
    },
  },
};
