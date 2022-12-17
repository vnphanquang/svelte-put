<script lang="ts">
  import typescript from 'svelte-highlight/languages/typescript';

  import ActionUsageNotice from '$client/components/ActionUsageNotice/ActionUsageNotice.svelte';
  import ApiReference from '$client/components/ApiReference/ApiReference.svelte';
  import Code from '$client/components/Code/Code.svelte';
  import Installation from '$client/components/Installation/Installation.svelte';
  import ResourceLink from '$client/components/ResourceLink/ResourceLink.svelte';
  import mouseclickPng from '$shared/assets/images/mouseclick.png';

  import type { PageData } from './$types';
  import { codes } from './codes';
  import Demo from './codes/demo.code.svelte';
  import ExcludeEventDemo from './codes/exclude-events.svelte';

  export let data: PageData;

  const ADVANCED_USAGE_SECTION_ID = 'advanced-usage-and-customization';
</script>

<Installation pkg={data.package.name} />

<section>
  <h2>Quick Start</h2>
  <Code lang="svelte" code={codes.quickStart} />
</section>

<ActionUsageNotice action={data.package.id} />

<section>
  <h2 id={ADVANCED_USAGE_SECTION_ID} data-toc-strategy="self">Advanced Usage & Customization</h2>

  <section>
    <h3>Feature Demo</h3>
    <Demo />
    <Code code={codes.advancedUsage.demo} title="usage demo source. expand to see" />
  </section>

  <section>
    <h3>Limit the <code>clickoutside</code> Zone</h3>
    <p>
      As seen in the demo above, the <code>limit.parent</code> option can be set to limit the zone
      that will trigger <code>on:clickoutside</code>. By default, there is no limit, and the event
      listener is attached to <code>document</code>.
    </p>
    <Code lang="svelte" code={codes.advancedUsage.limitParent} title="setting limit.parent" />
  </section>

  <section>
    <h3>Event Type Customization</h3>
    <p>
      By default, <code>clickoutside</code> is based on the <code>click</code> event. You can
      customize this with the <code>event</code> option.
    </p>
    <Code lang="svelte" code={codes.advancedUsage.eventType} title="overriding event type" />
  </section>

  <section>
    <h3><code>AddEventListenerOptions</code></h3>
    <p>
      Additional options can be passed to <ResourceLink key="addEventListener" /> should it be necessary.
    </p>
    <Code
      lang="svelte"
      code={codes.advancedUsage.addEventListenerOptions}
      title="providing AddEventListenerOptions"
    />
  </section>

  <section>
    <h3>Excluding Other Events in the <code>clickoutside</code> Zone</h3>
    <p>
      In the
      <ResourceLink id={ADVANCED_USAGE_SECTION_ID}>
        initial demo under the "Advanced Usage"
      </ResourceLink>
      section, notice the <code>stopPropagation</code>
      modifier was added to the click event. Without this, the button would also trigger an
      <code>on:clickoutside</code> event.
    </p>
    <Code
      lang="svelte"
      code={codes.advancedUsage.excludingEvents.default}
      title="excluding events"
    />
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
    <p>
      Another typical use case for this is shown below, where the same callback is registered for
      both <code>on:clickoutside</code> and another click event.
    </p>
    <fieldset class="border-2 border-violet-500">
      <legend>Example</legend>
      <ExcludeEventDemo />
    </fieldset>
    <Code
      code={codes.advancedUsage.excludingEvents.demo}
      title="|stopPropagation example"
      expanded={false}
    />
  </section>
</section>

<section>
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
</section>

<ApiReference href={data.package.apiUrl} />

<img
  src={mouseclickPng}
  alt="mouse click faster"
  width="300"
  height="210"
  loading="lazy"
  decoding="async"
/>

<p>Happy clicking outside! 👨‍💻</p>
