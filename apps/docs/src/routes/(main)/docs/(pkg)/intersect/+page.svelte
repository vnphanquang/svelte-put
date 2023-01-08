<script lang="ts">
  import typescript from 'svelte-highlight/languages/typescript';

  import ActionUsageNotice from '$client/components/ActionUsageNotice/ActionUsageNotice.svelte';
  import ApiReference from '$client/components/ApiReference/ApiReference.svelte';
  import Code from '$client/components/Code/Code.svelte';
  import Installation from '$client/components/Installation/Installation.svelte';
  import ResourceLink from '$client/components/ResourceLink/ResourceLink.svelte';
  import intersectionObserverImg from '$shared/assets/images/intersection-observer.webp';

  import type { PageData } from './$types';
  import { codes } from './_page/codes';
  import UsageEvents from './_page/codes/usage.events.code.svelte';
  import Once from './_page/codes/usage.once.code.svelte';

  export let data: PageData;
</script>

<section>
  <h2>Acknowledgement</h2>

  <p>
    This package employs <ResourceLink key="svelte action" /> strategy. If you are looking for a declarative
    & component-based solution, check out
    <ResourceLink href="https://github.com/metonym/svelte-intersection-observer">
      metonym's implementation
    </ResourceLink>.
  </p>
</section>

<Installation pkg={data.package.name} />

<ActionUsageNotice action={data.package.id} />

<section>
  <h2>Quick start</h2>
  <Code code={codes.quickStart} title="quick start" />
</section>

<section>
  <h2>Initialization Options</h2>

  <p>
    <code>intersect</code> take an object parameter that supports all options in
    <ResourceLink key="IntersectionObserver" /> constructor (
    <code>root</code>, <code>rootMargin</code>, <code>threshold</code>, ), and an additional
    <code>enabled</code> property for enabling/disabling the action.
  </p>
  <Code code={codes.usage.initialization} title="initialization" />
</section>

<section>
  <h2>Events</h2>

  <section>
    <h3><code>on:intersect</code></h3>
    <p>
      Essentially the same as callback as one passed to the
      <ResourceLink key="IntersectionObserver" /> constructor, but through the <ResourceLink
        key="CustomEvent"
      /> API
    </p>
    <p>
      <code>intersect</code> will attempt to detect the scrolling direction by keeping record of
      <code>boundingClientRect</code>. This is available through the <code>direction</code> property.
    </p>

    <fieldset class="block border-2 border-violet-500 p-4">
      <legend>Example</legend>
      <p class="text-center">Scroll down / up to see effect</p>
      <UsageEvents />
    </fieldset>
    <Code code={codes.usage.events} title="on:intersect - example source" expanded={false} />
  </section>

  <section>
    <h3><code>on:intersectonce</code></h3>
    <p>
      Same interface as <code>on:intersect</code>, but will only fire once on the first
      intersection.
    </p>
    <p>On possible use case is for fading-in animation on scroll, like in the example below.</p>
    <fieldset class="not-prose block border-2 border-violet-500">
      <legend>Example</legend>
      <p class="text-center">Scroll down!</p>
      <Once />
    </fieldset>
    <Code code={codes.usage.once} title="on:intersectonce - example source" expanded={false} />
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
  src={intersectionObserverImg}
  alt="intersect observer - ron swanson approves"
  width="300"
  height="170"
  loading="lazy"
  decoding="async"
/>

<p>Happy observing intersection! 👨‍💻</p>
