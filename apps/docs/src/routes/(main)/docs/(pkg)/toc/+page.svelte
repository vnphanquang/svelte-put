<script lang="ts">
  import ActionUsageNotice from '$client/components/ActionUsageNotice/ActionUsageNotice.svelte';
  import ApiReference from '$client/components/ApiReference/ApiReference.svelte';
  import ApiUnitReference from '$client/components/ApiUnitReference/ApiUnitReference.svelte';
  import Code from '$client/components/Code/Code.svelte';
  import { ConnectedList, ConnectedListItem } from '$client/components/ConnectedList';
  import Installation from '$client/components/Installation/Installation.svelte';
  import ResourceLink from '$client/components/ResourceLink/ResourceLink.svelte';

  import type { PageData } from './$types';
  import { codes } from './_page/codes';

  export let data: PageData;
</script>

<Installation pkg={data.package.name} />

<section>
  <h2>Introduction</h2>
  <p>
    <code>@svelte-put/toc</code> operates at <strong>runtime</strong> and does the following:
  </p>
  <ConnectedList class="pl-4">
    <ConnectedListItem>
      <p>search for matching elements (default: <code>:where(h1, h2, h3, h4, h5, h6)</code>),</p>
    </ConnectedListItem>
    <ConnectedListItem>
      <p>
        generate <code>id</code> attribute from element content,
      </p>
    </ConnectedListItem>
    <ConnectedListItem>
      <p>add anchor tag to element,</p>
    </ConnectedListItem>
    <ConnectedListItem>
      <p>
        attach <ResourceLink key="IntersectionObserver" /> to each matching element to track its visibility
        on the screen,
      </p>
    </ConnectedListItem>
    <ConnectedListItem>
      <p>
        expose necessary pieces (action, component, and utilities) for building table of contents.
      </p>
    </ConnectedListItem>
  </ConnectedList>
  <p>
    It is recommended to use the complementary <ResourceLink key="@svelte-put/preprocess-auto-slug" /> for handling
    <span class="c-circle-number-primary">2</span>
    and
    <span class="c-circle-number-primary">3</span> at <strong>build time</strong>.
    <code>toc</code> will skip those operations if they are already handled by
    <code>preprocess-auto-slug</code>.
  </p>
  <p>
    Notice <code>toc</code> relies on <ResourceLink key="IntersectionObserver" /> and not
    <code>on:scroll</code> for better performance and predictability. See <ResourceLink
      href="https://itnext.io/1v1-scroll-listener-vs-intersection-observers-469a26ab9eb6"
    >
      this article
    </ResourceLink> for a performance comparison between <code>on:scroll</code> vs
    <code>IntersectionObserver</code>.
  </p>
</section>

<section>
  <h2 id="quick-start">Quick Start</h2>
  <p>Given the following svelte component and the default <code>toc</code> config</p>
  <Code code={codes.quickStart.input} title="quick start - input" />
  <p>Matching elements will be transformed after page load into</p>
  <Code code={codes.quickStart.output} title="quick start - output" />
</section>

<section>
  <h2>Toc Action</h2>

  <p>
    <code>use:toc</code> will search for matching elements only from descendants of the element
    where it is used. In the <ResourceLink id="quick-start">Quick Start</ResourceLink> example, that's the <code>main</code> element. To search
    from everything on the page, use <code>svelte:body</code>.
    <!-- add prop online:boolean to the Code component that renders a minimal box -->
    <Code code={`<svelte:body use:toc />`} />
  </p>

  <ActionUsageNotice action={data.package.id}>
    <h3 slot="heading" let:heading>{heading}</h3>
  </ActionUsageNotice>

  <section>
    <h3>Configuration</h3>
    <p>The following configuration (all optional) can be specified as action parameters.</p>
    <ApiUnitReference type="'parent' | 'self' | 'auto'" d="'auto'">
      <h4 slot="name"><code>strategy</code></h4>
      The default<code>strategy</code> for this run, can be overridden for each matching element
      using the <code>data-toc-strategy</code> attribute.
    </ApiUnitReference>
    <ApiUnitReference type="number" d="undefined">
      <h4 slot="name"><code>scrollMarginTop</code></h4>
      css<code>scroll-margin-top</code> - if provided will be applied to matching elements as inline
      style.
    </ApiUnitReference>
  </section>
</section>

<section>
  <h2>Toc Data Attributes</h2>

  <ApiUnitReference name="data-toc-strategy" type="'parent' | 'self' | 'auto'" d="'auto'">
    Override the <code>strategy</code> for this element
  </ApiUnitReference>

  <ApiUnitReference name="data-toc-ignore" type="boolean" d="false" />

  <ApiUnitReference name="data-toc-id" type="string" d="undefined" />
</section>

<section>
  <h2>Toc Component</h2>
</section>

<section>
  <h2>Utilities</h2>
</section>

<ApiReference href={data.package.apiUrl} />

<!-- <img src={avatarAangImg} alt="avatar?" width="300" height="168.6" loading="lazy" decoding="async" /> -->

<p>Happy making table of contents! 👨‍💻</p>
