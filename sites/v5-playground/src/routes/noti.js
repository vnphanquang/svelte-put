import { controller } from '@svelte-put/noti';
import Notification from './Notification.svelte';

export const notiCtrl = controller()
	.addVariant('test', {
		timeout: 4000,
		component: Notification,
		props: {
			message: 'Hello world!',
		}
	})
	.build();
