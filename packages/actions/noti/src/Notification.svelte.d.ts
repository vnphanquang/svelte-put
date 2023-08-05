import type { SvelteComponent } from 'svelte';

import { NotificationInstance } from './public';

export type NotificationProps = {
  notification: NotificationInstance;
};

export default class Notification extends SvelteComponent<NotificationProps> {}
