<script lang="ts">
  import typescript from 'svelte-highlight/languages/typescript';

  import ActionUsageNotice from '$client/components/ActionUsageNotice/ActionUsageNotice.svelte';
  import ApiReference from '$client/components/ApiReference/ApiReference.svelte';
  import Code from '$client/components/Code/Code.svelte';
  import Installation from '$client/components/Installation/Installation.svelte';
  import ResourceLink from '$client/components/ResourceLink/ResourceLink.svelte';
  import mousemoveImg from '$shared/assets/images/mousemove.webp';

  import type { PageData } from './$types';
  import { codes } from './codes';
  import Handle from './codes/handle.svelte';
  import Ignore from './codes/ignore.svelte';
  import LimitAncestor from './codes/limit.ancestor.svelte';
  import LimitDelta from './codes/limit.delta.svelte';
  import LimitScreen from './codes/limit.screen.svelte';
  import QuickStart from './codes/quickStart.svelte';

  export let data: PageData;
</script>

<Installation pkg={data.package.name} />

<ActionUsageNotice action={data.package.id} />

<section>
  <h2>Quick Start</h2>
  <Code code={codes.quickStart} title="quick start" />
  <fieldset class="not-prose grid place-items-center border-2 border-violet-500 p-4">
    <legend>Example</legend>
    <p class="text-center">Box below can be moved around</p>
    <QuickStart />
  </fieldset>
</section>

<section>
  <h2>Events</h2>
  <p>
    <code>movable</code> provide two <ResourceLink key="CustomEvent" />s,
    <code>movablestart</code> and <code>movableend,</code>
    with <code>event.detail</code> set to
    <ResourceLink
      href="https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/movable/api/docs/movable.movableeventdetails.md"
      >MovableEventDetails</ResourceLink
    >
    .
  </p>
  <Code code={codes.events} title="events" />
</section>

<section>
  <h2 data-toc-strategy="self">Setting Limit</h2>

  <p>
    By default, node that uses <code>movable</code> can be moved freely. The <code>limit</code> parameter
    can be set to limit the "movable" zone.
  </p>

  <section>
    <h3>Limit within Screen</h3>
    <p>
      Limit to the viewport by setting <code>limit.parent</code> to
      <code>'screen'</code>
    </p>
    <Code code={codes.limit.screen.instruction} title="limit to viewport" />
    <div class="not-prose grid place-items-center border-2 border-violet-500 p-4">
      <p class="text-center">Box below can be moved around, but only within viewport</p>
      <LimitScreen />
    </div>
    <Code code={codes.limit.screen.example} title="screen - example source" expanded={false} />
  </section>

  <section>
    <h3>Limit within an <code>HTMLElement</code> Ancestor</h3>
    <p>
      Limit to an ancestor by referencing <code>limit.parent</code> to that ancestor.
    </p>
    <Code code={codes.limit.ancestor.instruction} title="screen - example source" />
    <LimitAncestor />
    <Code
      code={codes.limit.ancestor.example}
      title="ancestor limit - example source"
      expanded={false}
    />
  </section>

  <section>
    <h3>Limit within <code>delta</code></h3>
    <p>
      Set <code>limit.delta</code> to limit <code>movable</code> to a certain travel distance. It
      takes a <code>number</code> with unit of <code>%</code> or <code>px</code> in one or both
      axes, and can be set in isolation or in combination with <code>limit.parent</code>.
    </p>
    <p>
      Check out the
      <ResourceLink
        href="https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/movable/api/docs/movable.movablelimitdelta.md"
      >
        API reference
      </ResourceLink>
      for delta to see detailed explanation and examples.
    </p>
    <Code code={codes.limit.delta.instruction} title="limit delta" />
    <div class="grid place-items-center border-2 border-violet-500 p-4">
      <p class="text-center">
        Box below can be moved around, but only within a delta of <code>±100%</code> (of box size).
      </p>
      <div class="p-20">
        <LimitDelta />
      </div>
    </div>
    <Code code={codes.limit.delta.example} title="delta limit - example source" expanded={false} />
  </section>
</section>

<section>
  <h2>Custom Handle</h2>
  <p>
    By default <code>mousedown</code> is registered on the node using <code>movable</code>. This can
    be set to another <code>HTMLElement</code> with the <code>handle</code> parameter.
  </p>
  <Code code={codes.handle.instruction} title="custom handle" />
  <div class="not-prose grid place-items-center border-2 border-violet-500 p-4">
    <p class="text-center">Move blue box by dragging the green box</p>
    <Handle />
  </div>
  <Code code={codes.handle.example} title="custom handle - example source" expanded={false} />
</section>

<section>
  <h2>Ignore Children Nodes from Triggering <code>movable</code> on Click</h2>
  <p>
    The <code>ignore</code> parameter takes one or more CSS selector strings and will exclude
    matching children of <code>handle</code> from trigger <code>movable</code>.
  </p>
  <Code code={codes.ignore.instruction} title="ignore" />
  <div class="not-prose grid place-items-center border-2 border-violet-500 p-4">
    <p class="text-center">
      <code>mousedown</code> on red box will not trigger <code>movable</code>
    </p>
    <Ignore />
  </div>
  <Code code={codes.ignore.example} title="ignore - example source" expanded={false} />
</section>

<section>
  <h2>Disabling Cursor Handling</h2>
  <p>
    By default, <code>movable</code> adds <code>cursor: grab</code> to <code>handle</code>, and
    <code>cursor: grabbing</code>
    on <code>mousedown</code> to both <code>handle</code> and <code>window.body</code>. This can be
    disabled by setting the <code>cursor</code> parameter to <code>false</code>.
  </p>
  <Code code={codes.cursor} title="disabling cursor" />
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
  src={mousemoveImg}
  alt="mouse click faster"
  width="260"
  height="194"
  loading="lazy"
  decoding="async"
/>

<p>Happy moving! 👨‍💻</p>
