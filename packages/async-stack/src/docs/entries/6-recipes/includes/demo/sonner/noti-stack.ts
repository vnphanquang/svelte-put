import { stack } from '@svelte-put/async-stack';

import Notification from './notification.svelte';

export const STATUSES = ['info', 'success', 'warning', 'error'] as const;
export type Status = (typeof STATUSES)[number];

const SAMPLE_CONTENT = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`;

export const notiStack = stack({ timeout: 4_000 })
	.addVariant('info', {
		component: Notification,
		props: {
			title: 'Sample Info Notification',
			content: SAMPLE_CONTENT,
		},
	})
	.addVariant('success', {
		component: Notification,
		props: {
			status: 'success',
			title: 'Sample Success Notification',
			content: SAMPLE_CONTENT,
		},
	})
	.addVariant('warning', {
		component: Notification,
		props: {
			status: 'warning',
			title: 'Sample Warning Notification',
			content: SAMPLE_CONTENT,
		},
	})
	.addVariant('error', {
		component: Notification,
		props: {
			status: 'error',
			title: 'Sample Error Notification',
			content: SAMPLE_CONTENT,
		},
	})
	.build();
