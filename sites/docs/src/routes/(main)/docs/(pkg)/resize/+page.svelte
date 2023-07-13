<script lang="ts">
  import typescript from 'svelte-highlight/languages/typescript';

  import ActionUsageNotice from '$client/components/ActionUsageNotice/ActionUsageNotice.svelte';
  import Code from '$client/components/Code/Code.svelte';
  import Installation from '$client/components/Installation/Installation.svelte';
  import ResourceLink from '$client/components/ResourceLink/ResourceLink.svelte';

  import type { PageData } from './$types';
  import { codes } from './_page/codes';
  import Example from './_page/codes/example.code.svelte';

  export let data: PageData;
</script>

<section>
  <h2>Prior Art</h2>
  <ul>
    <li>
      <ResourceLink href="https://github.com/Gennnji/svelte-actions-resize"
        >svelte-actions-resize</ResourceLink
      >: very minimal, no typescript support
    </li>
    <li>
      <ResourceLink href="https://github.com/jnruel/svelte-observe-resize"
        >svelte-observer-resize</ResourceLink
      >: very similar to this implementation, but no typescript & ssr support
    </li>
    <li>
      <ResourceLink href="https://github.com/andrelmlins/svelte-resize-observer"
        >svelte-resize-observer</ResourceLink
      >: component-based strategy, provides <ResourceLink
        href="https://www.npmjs.com/package/resize-observer-polyfill"
        >resize-observer-polyfill</ResourceLink
      > by default
    </li>
  </ul>
</section>

<Installation pkg={data.package.name} />

<section>
  <h2>Quick start</h2>
  <p>
    Use the <code>resized</code> event (named so to avoid conflict with window's <code>resize</code>
    event) as the callback for <code>ResizeObserver</code>
  </p>
  <Code code={codes.quickStart} title="quick start" />
</section>

<section>
  <h2>Example</h2>
  <p>
    This example is ported from
    <ResourceLink
      href="https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry/contentBoxSize#examples"
      >MDN Docs</ResourceLink
    >, where <code>border-radius</code> will scale in proportion to the size of the box.
  </p>
  <fieldset class="not-prose grid place-items-center border-2 border-violet-500 p-10">
    <legend>Example</legend>
    <Example />
  </fieldset>
  <Code code={codes.example} title="on:resize - example source" />
</section>

<ActionUsageNotice action={data.package.id} />

<section>
  <h2>Browser Support & Polyfill</h2>
  <p>
    As seen on <ResourceLink href="https://caniuse.com/resizeobserver">caniuse</ResourceLink>,
    <code>ResizeObserver</code> is supported by all major browsers, but not IE11.
  </p>
  <p>
    <code>resize</code> stays minimal with no polyfill. If one is needed, use
    <ResourceLink href="https://www.npmjs.com/package/resize-observer-polyfill"
      >resize-observer-polyfill</ResourceLink
    >
  </p>
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

<p>Happy resizing! 👨‍💻</p>
