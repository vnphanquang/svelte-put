import limitationInput from './limitation.input.svelte?raw';
import limitationOutput from './limitation.output.svelte?raw';
import quickStart from './quickStart.ts?raw';

export const codes = {
  quickStart: {
    input: `<h2>Quick start</h2>`,
    instruction: quickStart,
    output: `<h2 id="quick-start">
  <a href="#quick-start" aria-hidden="true" tabindex="-1">#</a>
  Quick Start
</h2>
`,
  },
  limitation: {
    input: limitationInput,
    output: limitationOutput,
  },
};
