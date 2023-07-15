import { createModalStore } from '@svelte-put/modal';
import type { ModalResolveCallback, ModalResolved } from '@svelte-put/modal';

import FullCustomModal from './FullCustomModal.code.svelte';

const store = createModalStore();
const pushed = store.push(FullCustomModal);

let unsubscribe = store.onPop<FullCustomModal>(pushed.id, (_resolved) => {
  /** */
});
unsubscribe(); // to unregister the callback

// or

function onPop(_resolved: ModalResolved<FullCustomModal>) {
  /** */
}
unsubscribe = store.onPop<FullCustomModal>(pushed.id, onPop);
unsubscribe(); // to unregister the callback

// or

const sideEffect: ModalResolveCallback<FullCustomModal> = (_resolved) => {
  /** */
};
unsubscribe = store.onPop(pushed.id, sideEffect);
unsubscribe(); // to unregister the callback
