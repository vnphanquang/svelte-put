import component from './Notification.svelte?raw';
import customPortal from './customPortal.svelte?raw';
import quickStartStore from './notification-store?raw';
import quickStartPortal from './quickStart-portal.svelte?raw';
import quickStartUsage from './quickStart-usage.svelte?raw';

export const codes = {
  quickStart: {
    Usage: quickStartUsage,
    'Store Setup': quickStartStore,
    'Portal Setup': quickStartPortal,
    Component: component,
  },
  portalAction: `<div use:portal={notiStore} />`,
  customPortal,
};
