import { stack } from '@svelte-put/async-stack';

import Notification from './notification.svelte';

export const notiStack = stack()
	.addVariant('timeout', {
		component: Notification,
		props: {
			title: 'Sample Notification',
			content:
				'This notification will automatically timeout after a few seconds. Hover to pause timeout.',
		},
		timeout: 4000,
	})
	.addVariant('persistent', {
		component: Notification,
		props: {
			title: 'Sample Persistent notification',
			content:
				'This notification will not timeout automatically. Click the x button on top right to dismiss.',
		},
		timeout: 0,
	})
	.build();
