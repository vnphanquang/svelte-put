<script lang="ts">
  import ActionUsageNotice from '$client/components/ActionUsageNotice/ActionUsageNotice.svelte';
  import ApiReference from '$client/components/ApiReference/ApiReference.svelte';
  import Code from '$client/components/Code/Code.svelte';
  import Installation from '$client/components/Installation/Installation.svelte';
  import ResourceLink from '$client/components/ResourceLink/ResourceLink.svelte';
  import monkeyClickingImg from '$shared/assets/images/monkey-clicking.gif';

  import type { PageData } from './$types';
  import { codes } from './codes';
  import CustomAxis from './codes/custom.axis.svelte';
  import LimitationSnapScroll from './codes/limitation.scroll-snap.svelte';
  import NoParameters from './codes/no-parameters.svelte';

  export let data: PageData;
</script>

<Installation pkg={data.package.name} />

<ActionUsageNotice action={data.package.id} />

<section>
  <h2>Quick Start</h2>
  <Code code={codes.quickStart.instruction} title="quick start" />
  <div class="not-prose border-2 border-violet-500 p-4">
    <p>Default, no parameters: drag to scroll horizontally</p>
    <NoParameters />
  </div>
  <Code code={codes.quickStart.demo} title="quick start demo" expanded={false} />
</section>

<section>
  <h2 data-toc-strategy="self">Customization</h2>

  <section>
    <h3>Specifying the Scroll Axis</h3>
    <p>
      <code>dragscroll</code> supports both axes. You can specifying the scrolling axis or both with
      the <code>axis</code> parameter. By default, <code>axis</code> is set to <code>x</code>.
    </p>
    <Code code={codes.custom.axis.instruction} title="scroll axis" />
    <div class="not-prose border-2 border-violet-500 p-4">
      <CustomAxis />
    </div>
    <Code code={codes.custom.axis.demo} title="scroll axis demo" expanded={false} />
  </section>

  <section>
    <h3><code>mouse</code> vs <code>pointer</code></h3>
    <p>
      By default, <code>dragscroll</code> assumes
      <ResourceLink href="https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent"
        >PointerEvent</ResourceLink
      >
      (
      <code>pointerup</code>, <code>pointerdown</code>, <code>pointermove</code>,
      <code>pointerleave</code>
      ). You can switch to
      <ResourceLink href="https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent"
        >MouseEvent</ResourceLink
      >
      equivalents by specifying the <code>event</code>
      parameter.
    </p>
    <Code code={codes.custom.event} title="mouse vs pointer" />
  </section>

  <section>
    <h3>Disabling Cursor Handling</h3>
    <p>
      By default, <code>dragscroll</code> adds <code>cursor: grab</code>, and
      <code>cursor: grabbing</code> on <code>mousedown</code>. This can be disabled by setting the
      <code>cursor</code>
      parameter to <code>false</code> (default to <code>true</code>).
    </p>
    <Code code={codes.custom.cursor} title="cursor parameter" />
  </section>
</section>

<section>
  <h2>Limitation</h2>
  <p>
    There is known issue when using
    <ResourceLink href="https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-align"
      >scroll-snap-align</ResourceLink
    >, where view tends to be unresponsive to <code>dragscroll</code> and requires a great
    <code>mousemove</code> length to snap to the next box.
  </p>
  <p>
    Below, try using scrollbar to confirm snap-align is working as expected. Then try dragging with
    mouse, notice that it only works when dragged over almost the entire width of the box.
  </p>
  <div class="not-prose border-2 border-violet-500 p-4">
    <div class="not-prose">
      <LimitationSnapScroll />
    </div>
  </div>
  <Code code={codes.limitationSnapScroll} title="Limitation with scroll-snap" expanded={false} />
  <p>
    Here is the <ResourceLink
      href="https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/dragscroll/src/dragscroll.action.ts"
      >source code</ResourceLink
    >
    for <code>dragscroll</code>. Feel free to open a PR if you've found a workaround for this.
    Thanks!
  </p>
</section>

<ApiReference href={data.package.apiUrl} />

<img src={monkeyClickingImg} alt="copy" width="300" height="217" loading="lazy" decoding="async" />

<p>Happy dragging! 👨‍💻</p>
