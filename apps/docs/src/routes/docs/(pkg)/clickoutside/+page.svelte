<script lang="ts">
  import typescript from 'svelte-highlight/languages/typescript';

  import ActionUsageNotice from '$lib/ui/components/ActionUsageNotice/ActionUsageNotice.svelte';
  import Code from '$lib/ui/components/Code/Code.svelte';
  import CodeSwitch from '$lib/ui/components/Code/CodeSwitch.svelte';
  import Installation from '$lib/ui/components/Installation/Installation.svelte';
  import ResourceLink from '$lib/ui/components/ResourceLink/ResourceLink.svelte';
  import { capitalize } from '$lib/utils/string';

  import type { PageData } from './$types';
  import { codes } from './codes';
  import Demo from './codes/demo.code.svelte';

  export let data: PageData;
</script>

<Installation pkg={data.package.name} />

<h2>Quick Start</h2>
<Code lang="svelte" code="./codes/quick-start.code.svelte?raw" title="quick start" />

<ActionUsageNotice action={data.package.id} />

<h2>Advanced Usage & Customization</h2>

<h3>Feature Demo</h3>
<Demo />
<CodeSwitch
  codes={Object.entries(codes.advancedUsage.demo).map(([lang, code]) => ({
    variant: capitalize(lang),
    code,
  }))}
  title="usage demo source. expand to see"
  class="max-h-[500px]"
/>

<h3>Limit the <code>clickoutside</code> Zone</h3>
<p>
  As seen in the demo above, the <code>limit.parent</code> option can be set to limit the zone that
  will trigger <code>on:clickoutside</code>. By default, there is no limit, and the event listener
  is attached to <code>document</code>.
</p>
<Code lang="svelte" code={codes.advancedUsage.limitParent} title="setting limit.parent" />

<h3>Event Type Customization</h3>
<p>
  By default, <code>clickoutside</code> is based on the <code>click</code> event. You can customize
  this with the <code>event</code> option.
</p>
<Code lang="svelte" code={codes.advancedUsage.eventType} title="overriding event type" />

<h3><code>AddEventListenerOptions</code></h3>
<p>
  Additional options can be passed to <ResourceLink key="addEventListener" /> should it be necessary.
</p>
<Code
  lang="svelte"
  code={codes.advancedUsage.addEventListenerOptions}
  title="providing AddEventListenerOptions"
/>

<h3>Excluding Other Events in the <code>clickoutside</code> Zone</h3>
<p>
  In the initial demo under the "Advanced Usage" section, notice the <code>stopPropagation</code>
  modifier was added to the click event. Without this, the button would also trigger an
  <code>on:clickoutside</code> event.
</p>
<Code lang="svelte" code={codes.advancedUsage.excludingEvents.default} title="excluding events" />
<p>
  Be aware to reflect the customization made to the event listener as mentioned in the last two
  sections. For example:
</p>
<Code
  lang="svelte"
  code={codes.advancedUsage.excludingEvents.custom}
  title="mousedown & capture"
  icon="warning"
/>

<h2>Typescript Support</h2>
<p>
  Ambient types for custom events should be available automatically where <code
    >{data.package.id}</code
  > is imported.
</p>
<Code
  lang="svelte"
  code={codes.typescriptSupport.auto}
  title="automatically typed - example source"
  expanded={false}
/>
<p>If the above is not working, fall back to this:</p>
<Code
  lang={typescript}
  code={codes.typescriptSupport.fallback}
  title="src/app.d.ts - fallback typescript support"
  expanded={false}
/>
