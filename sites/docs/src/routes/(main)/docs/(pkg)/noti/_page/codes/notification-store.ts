// notification-store.ts
import { store } from '@svelte-put/noti';

import Notification from './Notification.svelte';

// define somewhere global, reuse across app
export const notiStore = store()
  .variant('info', Notification)
  .variant('special', {
    id: 'counter',
    component: Notification,
    props: {
      special: true,
      content: 'A very special notification',
    },
  })
  .build();
