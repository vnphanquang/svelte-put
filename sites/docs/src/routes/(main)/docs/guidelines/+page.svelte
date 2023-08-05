<script lang="ts">
  import typescript from 'svelte-highlight/languages/typescript';

  import Code from '$client/components/Code/Code.svelte';
  import ResourceLink from '$client/components/ResourceLink/ResourceLink.svelte';

  import { codes } from './_page/codes';
</script>

<h1 class="font-fingerpaint">Guidelines</h1>

<p>
  This page includes common guidelines shared among packages in the <code>svelte-put</code> collections.
</p>

<section>
  <h2>Action as Element Directive</h2>

  <p>
    Any <ResourceLink key="svelte action" /> exported by a package should be used with
    <code>element</code> and not <code>component</code>.

    <Code
      lang="svelte"
      code={codes.actionUsage}
      title="use:action is an element directive"
      icon="warning"
    />
  </p>
</section>

<section>
  <h2>Action Event Typescript Support</h2>
  <p>
    If an action supports some <ResourceLink key="CustomEvent">CustomEvents</ResourceLink> but they are
    not picked up by your editor or some type error is displayed, you are probably still on an older
    version of Svelte or its eco toolings. It is recommended to
    <ResourceLink href="https://svelte.dev/docs/v4-migration-guide"
      >migrate to Svelte 4</ResourceLink
    > and upgrade to latest editor extension/plugin.
  </p>
  <Code lang="svelte" code={codes.actionEventTypingAuto} title="automatically typed action event" />
  <p>
    If the above option is not possible for your use case. Try declaring types for the events
    manually as follows.
  </p>
  <Code
    lang={typescript}
    code={codes.actionEventTypingFallback}
    title="src/app.d.ts - fallback typescript support"
  />
  <p class="c-callout-info">
    <code>event</code>, <code>package</code>, and <code>EventDetail</code> in code blocks above depend
    on the package you are importing from.
  </p>
</section>

<section>
  <h2>Svelte store reactive syntax</h2>
  <p>
    Note that <ResourceLink
      >the <code>$</code> syntax for unpacking reactive store value</ResourceLink
    > is only available in
    <code>.svelte</code>
    files and not in JS/TS. Use <code>.subscribe</code> instead in such cases.
  </p>
</section>
