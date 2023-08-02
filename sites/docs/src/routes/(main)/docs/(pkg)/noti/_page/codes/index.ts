import component from './Notification.svelte?raw';
import commonConfig from './common-config.ts?raw';
import customPortal from './customPortal.svelte?raw';
import quickStartStore from './notification-store?raw';
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
  component: NotificationComponent,
  props: { /** props for NotificationComponent */ },
  id: () => 'one-time-id',
  timeout: false,
})`,
  },
  customPortal,
};
