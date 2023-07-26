import { prepare } from '@svelte-put/tooltip';

export const myTooltip = prepare({ content: 'placeholder' });
// later: <button use:myTooltip>...</button>
