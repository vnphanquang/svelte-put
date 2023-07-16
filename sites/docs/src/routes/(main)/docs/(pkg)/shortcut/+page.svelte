<script lang="ts">
  import typescript from 'svelte-highlight/languages/typescript';

  import ActionUsageNotice from '$client/components/ActionUsageNotice/ActionUsageNotice.svelte';
  import Code from '$client/components/Code/Code.svelte';
  import Installation from '$client/components/Installation/Installation.svelte';
  import ResourceLink from '$client/components/ResourceLink/ResourceLink.svelte';
  import endImg from '$shared/assets/images/keyboard-shortcut.webp';

  import type { PageData } from './$types';
  import { codes } from './_page/codes';

  export let data: PageData;
</script>

<Installation pkg={data.package.name} />

<section>
  <h2>Quick Start</h2>
  <Code lang="svelte" code={codes.quickStart} title="quick start" />
</section>

<ActionUsageNotice action={data.package.id} tag="svelte:window" />

<section>
  <h2>Key Combination</h2>
  <p>
    In each <code>use:shortcut</code>, one or an array of <code>ShortcutTrigger</code> can be
    provided to the <code>trigger</code> parameter.
  </p>
  <Code code={codes.keys} title="key" />
  <p>
    One or multiple modifiers (
    <code>ctrl</code>,
    <code>meta</code>,
    <code>alt</code>,
    <code>shift</code>
    ) can be provided to <code>trigger.modifier</code> in both <code>and</code> & <code>or</code>
    fashions.
  </p>
  <Code code={codes.modifiers} title="modifier" />
</section>

<section>
  <h2>Event vs Callback</h2>
  <p>In cases where multiple key combinations are registered. You can either:</p>
  <ol>
    <li>
      provide a callback for each combination via <code>trigger.callback</code>, or
    </li>
    <li>
      use the <code>on:shortcut</code>
      <ResourceLink key="CustomEvent" />, in which case it is recommended to give each trigger a
      unique <code>id</code>
      for easier identification in the event handler.
    </li>
  </ol>
  <Code code={codes.eventsVsCallback} title="event vs callback" />
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

<img
  src={endImg}
  alt="mouse click faster"
  width="300"
  height="245"
  loading="lazy"
  decoding="async"
/>

<p>Happy making shortcuts! 👨‍💻</p>
