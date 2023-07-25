import prepareSvelte from './prepare.code.svelte?raw';
import prepareTs from './prepare.code.ts?raw';
import quickStart from './quickStart.code.svelte?raw';

export const codes = {
  quickStart,
  prepare: {
    svelte: prepareSvelte,
    ts: prepareTs,
  },
};
