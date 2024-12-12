import { stack } from '@svelte-put/async-stack';

import Notification from './Notification.svelte';

export const notiStack = stack({ timeout: 3000 })
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
	// build the actual stack
	.build();
