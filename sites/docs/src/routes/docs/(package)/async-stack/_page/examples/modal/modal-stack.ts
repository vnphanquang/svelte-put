import { stack } from '@svelte-put/async-stack';

import ConfirmationModal from './ConfirmationModal.svelte';

export const modalStack = stack()
	.addVariant('confirm', {
		component: ConfirmationModal,
		props: {
			title: 'Confirmation',
			description: 'Do we have an accord?',
		},
	})
	.build();

