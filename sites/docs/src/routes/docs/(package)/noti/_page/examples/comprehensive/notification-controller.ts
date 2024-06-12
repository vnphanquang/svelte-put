import { controller } from '@svelte-put/noti';

import Notification from './Notification.svelte';

export const notiCtrl = controller()
	// add a minimalistic variant config
	.addVariant('info', Notification)
	// add a verbose variant config
	.addVariant('special', {
		id: 'counter',
		component: Notification,
		props: {
			special: true,
			content: 'A very special notification',
		},
	})
	// build the actual NotificationController
	.build();
