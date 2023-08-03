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
