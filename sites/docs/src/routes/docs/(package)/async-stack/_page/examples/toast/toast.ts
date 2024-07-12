import { stack } from '@svelte-put/async-stack';

import Toast from './Toast.svelte';

export const toastStack = stack({ timeout: 3000 }).addVariant('toast', Toast).build();

// create push proxies
const STATUSES = ['info', 'success', 'warning', 'error'] as const;
type Status = typeof STATUSES[number];
type ToastPusher = (message: string) => void;
export const toast: Record<Status, ToastPusher> = STATUSES.reduce((acc, status) => {
	acc[status] = (message) => toastStack.push('toast', {
		props: {
			status,
			title: status.charAt(0).toUpperCase() + status.slice(1),
			message,
		},
	});
	return acc;
}, {} as Record<Status, ToastPusher>);