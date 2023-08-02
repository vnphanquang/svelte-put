<script lang="ts">
  import typescript from 'svelte-highlight/languages/typescript';

  import ActionUsageNotice from '$client/components/ActionUsageNotice/ActionUsageNotice.svelte';
  import Code from '$client/components/Code/Code.svelte';
  import { ConnectedList, ConnectedListItem } from '$client/components/ConnectedList';
  import Installation from '$client/components/Installation/Installation.svelte';
  import ResourceLink from '$client/components/ResourceLink/ResourceLink.svelte';
  // import endImage from '$shared/assets/images/tooltip.webp';

  import type { PageData } from './$types';
  import { codes } from './_page/codes';
  import CustomPortal from './_page/codes/customPortal.svelte';
  import QuickStartPortal from './_page/codes/quickStart-portal.svelte';
  import QuickStartUsage from './_page/codes/quickStart-usage.svelte';

  export let data: PageData;

  const quickStartVariants = Object.keys(codes.quickStart);
  let quickStartVariant = quickStartVariants[0];
</script>

<Installation pkg={data.package.name} />

<section>
  <h2 id="comprehensive-example">Comprehensive Example</h2>
  <fieldset class="border-2 border-violet-500 p-4">
    <legend>Example</legend>
    <p class="mt-0">Click to push toast notification</p>
    <QuickStartPortal />
    <QuickStartUsage />
  </fieldset>
  <div>
    <ConnectedList>
      <ConnectedListItem>
        <p class="mb-4">
          <button class="inline c-link" on:click={() => (quickStartVariant = quickStartVariants[3])}
            >Component Setup</button
          >
          : a component is set up to be rendered as notification
        </p>
      </ConnectedListItem>
      <ConnectedListItem>
        <p class="mb-4">
          <button class="inline c-link" on:click={() => (quickStartVariant = quickStartVariants[1])}
            >Store Setup</button
          >
          : a <code>NotificationStore</code> is created with (optionally) predefined notification variants,
        </p>
      </ConnectedListItem>
      <ConnectedListItem>
        <p class="mb-4">
          <button class="inline c-link" on:click={() => (quickStartVariant = quickStartVariants[2])}
            >Portal Setup</button
          >
          : a "notification portal" is registered with <code>use:portal</code>, for rendering
          notifications,
        </p>
      </ConnectedListItem>
      <ConnectedListItem>
        <button class="inline c-link" on:click={() => (quickStartVariant = quickStartVariants[0])}
          >Usage</button
        >
        : notification is "<code>pushed</code>" using the previously created
        <code>NotificationStore</code>
      </ConnectedListItem>
    </ConnectedList>
  </div>
  <Code
    lang="svelte"
    code={codes.quickStart}
    title="a comprehensive example"
    bind:variant={quickStartVariant}
  />
</section>

<section>
  <h2 id="notification-store"><code>NotificationStore</code></h2>
  <p>
    The <code>NotificationStore</code> is the key part of <code>@svelte-put/not</code>. It holds all
    internal logics and is used for the <code>push</code> & <code>pop</code> mechanism. As shown in
    the <ResourceLink
      id="comprehensive-example"
      on:click={() => (quickStartVariant = quickStartVariants[1])}
      >Comprehensive Example</ResourceLink
    > section,
    <code>NotificationStore</code> is created via a builder pattern to provide type-safety for
    <code>push</code> invocations.
  </p>
  <Code lang={typescript} code={codes.store.builder} title="notification store builder pattern" />
  <p>
    The <code>store</code> function accepts an optional config object that will be merged to all notification
    instance config.
  </p>
  <Code
    lang={typescript}
    code={codes.store.commonConfig}
    title="simplified interfaces of store & NotificationCommonConfig"
  />
  <p>
    The <code>variant</code> method adds a predefined variant config that provides intellisense and
    reusability. It accepts a mandatory <code>variant</code> string, and either a Svelte component or
    a config object.
  </p>
  <Code
    lang={typescript}
    code={codes.store.variantConfig}
    title="simplified interfaces of variant & NotificationVariantConfig"
  />

  <section>
    <h3>Push & Pop Mechanism</h3>
    <p>
      New notifications can be pushed with the <code>push</code> method on a<code
        >NotificationStore</code
      >. A <code>push</code> call can use either one of the predefined variant, as seen in the
      <ResourceLink
        id="comprehensive-example"
        on:click={() => (quickStartVariant = quickStartVariants[0])}
        >Comprehensive Example</ResourceLink
      > section, ...
    </p>
    <Code lang={typescript} code={codes.push.variant} title="push from predefined variant config" />
    <p>... or the <code>'custom'</code> variant, helpful for one-off notification for example.</p>
    <Code lang={typescript} code={codes.push.custom} title="push with custom config" />
    <p class="c-callout-warning">
      Custom <code>push</code> must provide a component in its config.
    </p>
  </section>

  <section>
    <h3>Await for Notification Resolution</h3>
  </section>
</section>

<section>
  <h2>The Notification Portal</h2>

  <section>
    <h3 id="use-portal"><code>use:portal</code></h3>
    <p>
      The accompanying <code>portal</code>
      <ResourceLink key="svelte action" /> provides a quick & minimal solution to set any
      <code>HTMLElement</code>
      as the rendering portal for a <ResourceLink id="notification-store"
        >NotificationStore</ResourceLink
      >.
    </p>
    <Code lang="svelte" code={codes.portalAction} title="Portal action" />
    <ActionUsageNotice action="portal">
      <h3 let:heading slot="heading">{heading}</h3>
    </ActionUsageNotice>
  </section>

  <section>
    <h3>Custom Portal</h3>
    <p>
      Instead of <ResourceLink id="use-portal">use:portal</ResourceLink>, rendering of notifications
      can be manually handled by subscribing to the <code>notifications</code> array property of a <ResourceLink
        id="notification-store">NotificationStore</ResourceLink
      >.
    </p>
    <p class="c-callout-warning">
      <ResourceLink id="use-portal">use:portal</ResourceLink> is recommended
    </p>
    <p>
      This is helpful when more granular control over rendering is necessary. For example, to
      coordinate and animate smoothly the positions of the notifications, as done in the following
      demo.
    </p>
    <fieldset class="border-2 border-violet-500 p-4">
      <legend>Example</legend>
      <p class="mt-0">Click to push toast notification</p>
      <CustomPortal />
    </fieldset>
    <Code lang="svelte" code={codes.customPortal} title="quick start" />
  </section>
</section>

<section>
  <h2>Caveats & Limitation</h2>
  <ul>
    <li>
      transition must be global using <code>|global</code> when <code>use:portal</code> is used
    </li>
    <li>
      outro does not run (yet, until this is released: https://github.com/sveltejs/svelte/pull/9056)
    </li>
  </ul>
</section>
