import { useTooltip } from '@svelte-put/tooltip';

import Tooltip from './Tooltip.component.svelte';

export const exampleTooltip = useTooltip({
  component: Tooltip,
});
