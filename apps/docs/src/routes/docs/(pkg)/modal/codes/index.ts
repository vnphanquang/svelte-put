import modalStore from '$lib/services/modal?raw';

import confirmationTs from './ConfirmationModal.code.svelte?raw';
import fullCustomTs from './FullCustomModal.code.svelte?raw';
import informationTs from './InformationModal.code.svelte?raw';
import confirmationJs from './js.generated/ConfirmationModal.code.js.svelte?raw';
import fullCustomJs from './js.generated/FullCustomModal.code.js.svelte?raw';
import informationJs from './js.generated/InformationModal.code.js.svelte?raw';
import pushAndPopJs from './js.generated/pushAndPop.code.js.svelte?raw';
import modalPortal from './modalPortal.svelte?raw';
import pushAndPopTs from './pushAndPop.code.svelte?raw';

export const codes = {
  modalStore,
  modalPortal,
  modals: {
    confirmation: {
      Typescript: confirmationTs,
      Javascript: confirmationJs,
    },
    information: {
      Typescript: informationTs,
      Javascript: informationJs,
    },
    fullCustom: {
      source: {
        Typescript: fullCustomTs,
        Javascript: fullCustomJs,
      },
      interface: `appStore.push({
  component: FullCustomModal,
  props: {
    content: 'Some custom content'
  },
});`,
    },
  },
  pushAndPop: {
    Typescript: pushAndPopTs,
    Javascript: pushAndPopJs,
  },
};
