// notification-store.ts
import { store } from '@svelte-put/noti';

import Notification from './Notification.svelte';

// define somewhere global, reuse across app
export const notiStore = store()
  // add a minimalistic variant config
  .variant('info', Notification)
  // add a verbose variant config
  .variant('special', {
    id: 'counter',
    component: Notification,
    props: {
      special: true,
      content: 'A very special notification',
    },
  })
  // build the actual NotificationStore
  .build();
