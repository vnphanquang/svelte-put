/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */

import { SvelteComponent } from 'svelte';

import { store, portal } from './new';

class Noti extends SvelteComponent<{ content?: string }> {}

const notiStore = store({
  id: () => 'custom',
  timeout: false,
})
  .variant('error', {
    component: Noti,
    props: {
      content: 'placeholder for error',
    },
  })
  .build();

const node = document.createElement('div');
portal(node, notiStore);

notiStore.push('error', {
  props: {
    content: 'noti error instance',
  },
});

const pushed = notiStore.push('custom', {
  component: Noti,
  props: {
    content: 'custom instance',
  },
});

const resolved = await pushed.resolve();
