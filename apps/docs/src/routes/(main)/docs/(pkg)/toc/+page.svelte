<script lang="ts">
  import ActionUsageNotice from '$client/components/ActionUsageNotice/ActionUsageNotice.svelte';
  import ApiReference from '$client/components/ApiReference/ApiReference.svelte';
  import { ConnectedList, ConnectedListItem } from '$client/components/ConnectedList';
  import Installation from '$client/components/Installation/Installation.svelte';
  import ResourceLink from '$client/components/ResourceLink/ResourceLink.svelte';

  import type { PageData } from './$types';

  export let data: PageData;
</script>

<Installation pkg={data.package.name} />

<section>
  <h2>Introduction</h2>
  <p>
    <code>@svelte-put/toc</code> operates at <strong>runtime</strong> and will do the following:
  </p>
  <ConnectedList class="pl-4">
    <ConnectedListItem>
      <p>search for matching elements (heading elements by default),</p>
    </ConnectedListItem>
    <ConnectedListItem>
      <p>
        generate <code>id</code> attribute from element content,
      </p>
    </ConnectedListItem>
    <ConnectedListItem>
      <p>adding anchor tag to element,</p>
    </ConnectedListItem>
    <ConnectedListItem>
      <p>
        attach <ResourceLink key="IntersectionObserver" /> to each matching element to track its visibility
        on the screen,
      </p>
    </ConnectedListItem>
    <ConnectedListItem>
      <p>provide svelte action, component, and utilities for building table of contents.</p>
    </ConnectedListItem>
  </ConnectedList>
  <p>
    It is recommended to use <ResourceLink key="@svelte-put/preprocess-auto-slug" /> for handling
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
    </ResourceLink> for performance comparison of <code>on:scroll</code> vs
    <code>IntersectionObserver</code>.
  </p>
</section>

<section>
  <h2>Quick Start</h2>
</section>

<section>
  <h2>Toc Action</h2>

  <ActionUsageNotice action={data.package.id}>
    <h3 slot="heading" let:heading>{heading}</h3>
  </ActionUsageNotice>
</section>

<section>
  <h2>Toc Data Attributes</h2>

  <section>
    <h3><code>data-toc-strategy</code></h3>
    <div class="pl-6 prose-p:m-0">
      <p>
        <strong>Type</strong>: <code>'parent' | 'self' | 'auto'</code>
      </p>
      <p>
        <strong>Default</strong>: <code>'auto'</code>
      </p>
    </div>
  </section>

  <section>
    <h3><code>data-toc-disabled</code></h3>
    <div class="pl-6 prose-p:m-0">
      <p>
        <strong>Type</strong>: <code>boolean</code>
      </p>
      <p>
        <strong>Default</strong>: <code>false</code>
      </p>
    </div>
  </section>

  <section>
    <h3><code>data-toc-id</code></h3>
    <div class="pl-6 prose-p:m-0">
      <p>
        <strong>Type</strong>: <code>string</code>
      </p>
      <p>
        <strong>Default</strong>: <code>''</code>
      </p>
    </div>
  </section>
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
