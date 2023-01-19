import dataAttributes from './data-attributes.d.ts?raw';
import eventsTs from './events.code.svelte?raw';
import eventsJs from './js.generated/events.code.js.svelte?raw';
import quickStartInput from './quick-start-input.svelte?raw';
import quickStartOutput from './quick-start-output.svelte?raw';
import tocLinkMarkupEquivalence from './toclink-markup-equivalence.svelte?raw';
import eventTypingAuto from './typescript-auto.svelte?raw';
import eventTypingFallback from './typescript-fallback.d.ts?raw';

const caveatFlat = `  <h2>Heading, whether it is h1,h2,...</h2>
  <p>...content...</p> `;
const caveatSection = `<section>
${caveatFlat}
</section>`;

export const codes = {
  quickStart: {
    input: quickStartInput,
    output: quickStartOutput,
  },
  events: {
    example: {
      Typescript: eventsTs,
      Javascript: eventsJs,
    },
    typing: {
      auto: eventTypingAuto,
      fallback: eventTypingFallback,
    },
  },
  observe: `<!-- use default options -->
<main use:toc={{ observe: true }}>...</main>

<!-- customization-->
<main use:toc={{
  observe: {
    strategy: 'auto',
    threshold: 1,
  }
}}>...</main>`,
  caveat: {
    avoid: caveatFlat,
    prefer: caveatSection,
  },
  toclink: {
    usage: `<a use:toclink={{ store: tocStore, tocItem, observe: true }}></a>`,
    equivalence: tocLinkMarkupEquivalence,
  },
  dataAttributes,
};
