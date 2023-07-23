<script lang="ts">
  import ActionUsageNotice from '$client/components/ActionUsageNotice/ActionUsageNotice.svelte';
  import Code from '$client/components/Code/Code.svelte';
  import Installation from '$client/components/Installation/Installation.svelte';
  import ResourceLink from '$client/components/ResourceLink/ResourceLink.svelte';
  import endImage from '$shared/assets/images/scroll-lock.webp';

  import type { PageData } from './$types';
  import { codes } from './_page/codes';
  import Events from './_page/codes/events.code.svelte';
  import QuickStart from './_page/codes/quickStart.code.svelte';
  import ScrollContainer from './_page/codes/scrollContainer.code.svelte';
  import StoreHelper from './_page/codes/store-helper.code.svelte';

  export let data: PageData;
</script>

<Installation pkg={data.package.name} />

<section>
  <h2 id="quick-start">Quick Start</h2>
  <fieldset class="border-2 border-violet-500 p-4">
    <legend>Example</legend>
    <QuickStart />
  </fieldset>
  <Code lang="svelte" code={codes.quickStart} title="apply scroll lock on the body element" />
</section>

<ActionUsageNotice action={data.package.id} />

<section>
  <h2>Locking any Scroll Container</h2>
  <p>
    In <ResourceLink id="quick-start">Quick Start</ResourceLink>, <code>lockscroll</code> is used on
    the <code>body</code> element. In reality, the scroll container might be set up differently; it
    can be a <code>div</code> instead, for example. For this reason, <code>lockscroll</code> works
    with any
    <ResourceLink href="https://developer.mozilla.org/en-US/docs/Glossary/Scroll_container"
      >Scroll container</ResourceLink
    >.
  </p>
  <fieldset class="border-2 border-violet-500 p-4">
    <legend>Example</legend>
    <ScrollContainer />
  </fieldset>
  <Code lang="svelte" code={codes.scrollContainer} title="works with any scroll container" />
</section>

<section>
  <h2>Helper <code>createLockScrollStore</code></h2>
  <p>
    The helper <code>createLockScrollStore</code> can be used to generate an idiomatic store, which
    is just a <code>{'Writable<boolean>'}</code> with a builtin <code>toggle</code> method. This is helpful
    if the scroll lock needs to be toggle in non-svelte files. For example, a global store can be created
    and reused across the site.
  </p>
  <fieldset class="border-2 border-violet-500 p-4">
    <legend>Example</legend>
    <StoreHelper />
  </fieldset>
  <Code lang="svelte" code={codes.storeHelper} title="createLockScrollStore helper" />
  <p class="c-callout-info">
    Here the store is passed directly to <code>lockscroll</code> without unpacking (<code
      >$store</code
    >).
    <code>lockscroll</code> conveniently accepts any <ResourceLink key="svelte store" /> with
    <code>boolean</code> value.
  </p>
</section>

<section>
  <h2>Event</h2>
  <p>
    A <code>lockscroll:toggle</code> event is fired when lock scroll state changes.
  </p>
  <Events />
  <Code lang="svelte" code={codes.events} title="on:lockscroll:toggle event" />
</section>

<img
  src={endImage}
  alt="mouse click faster"
  width="300"
  height="175"
  loading="lazy"
  decoding="async"
/>

<p>Happy locking scroll! 👨‍💻</p>
