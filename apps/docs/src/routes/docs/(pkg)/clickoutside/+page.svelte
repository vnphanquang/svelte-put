<script lang="ts">
  import typescript from 'svelte-highlight/languages/typescript';

  import ActionUsageNotice from '$lib/ui/components/ActionUsageNotice/ActionUsageNotice.svelte';
  import Code from '$lib/ui/components/Code/Code.svelte';
  import Installation from '$lib/ui/components/Installation/Installation.svelte';
  import ResourceLink from '$lib/ui/components/ResourceLink/ResourceLink.svelte';

  import type { PageData } from './$types';
  import Demo from './codes/demo.svelte';

  export let data: PageData;

  const codeLimitParent = `<div bind:this={parentNode}>
  <div use:clickoutside={{ limit: { parent: parentNode } }}>...</div>
</div>`;
  const codeCustomizeEventType = `<div use:clickoutside={{ event: 'mousedown' }}>...</div>`;
  const codeAddEventListenerOptions = `<div use:clickoutside={{ options: { passive: true } }}>...</div>
<div use:clickoutside={{ options: true }}>...</div>
`;
  const codeExcludingEvents = '<button on:click|stopPropagation>...</button>';
  const codeExcludingEventsCustom = `<div use:clickoutside={{ options: { capture: true }, event: 'mousedown' }}>...</div>
<button on:mousedown|stopPropagation|capture>...</button>
`;
</script>

<Installation pkg={data.package.name} />

<h2>Quick Start</h2>
<Code lang="svelte" code="./codes/quick-start.svelte?raw" title="quick start" />

<ActionUsageNotice action={data.package.id} />

<h2>Advanced Usage & Customization</h2>

<h3>Feature Demo</h3>
<Demo class="" />
<Code
  lang="svelte"
  code="./codes/demo.svelte?raw"
  title="usage demo source. expand to see"
  expanded={false}
  class="max-h-[500px]"
/>

<h3>Limit the <code>clickoutside</code> Zone</h3>
<p>
  As seen in the demo above, the <code>limit.parent</code> option can be set to limit the zone that
  will trigger <code>on:clickoutside</code>. By default, there is no limit, and the event listener
  is attached to <code>document</code>.
</p>
<Code lang="svelte" code={codeLimitParent} title="setting limit.parent" />

<h3>Event Type Customization</h3>
<p>
  By default, <code>clickoutside</code> is based on the <code>click</code> event. You can customize
  this with the <code>event</code> option.
</p>
<Code lang="svelte" code={codeCustomizeEventType} title="overriding event type" />

<h3><code>AddEventListenerOptions</code></h3>
<p>
  Additional options can be passed to <ResourceLink key="addEventListener" /> should it be necessary.
</p>
<Code lang="svelte" code={codeAddEventListenerOptions} title="providing AddEventListenerOptions" />

<h3>Excluding Other Events in the <code>clickoutside</code> Zone</h3>
<p>
  In the initial demo under the "Advanced Usage" section, notice the <code>stopPropagation</code>
  modifier was added to the click event. Without this, the button would also trigger an
  <code>on:clickoutside</code> event.
</p>
<Code lang="svelte" code={codeExcludingEvents} title="excluding events" />
<p>
  Be aware to reflect the customization made to the event listener as mentioned in the last two
  sections. For example:
</p>
<Code lang="svelte" code={codeExcludingEventsCustom} title="mousedown & capture" icon="warning" />

<h2>Typescript Support</h2>
<p>
  Ambient types for custom events should be available automatically where <code
    >{data.package.id}</code
  > is imported.
</p>
<Code
  lang="svelte"
  code="./codes/typescript-auto-example.svelte?raw"
  title="automatically typed - example source"
  expanded={false}
/>
<p>If the above is not working, fall back to this:</p>
<Code
  lang={typescript}
  code="./codes/typescript-fallback.d.ts?raw"
  title="src/app.d.ts - fallback typescript support"
  expanded={false}
/>
