<script lang="ts">
  import typescript from 'svelte-highlight/languages/typescript';

  import Code from '$client/components/Code/Code.svelte';
  import { ConnectedList, ConnectedListItem } from '$client/components/ConnectedList';
  import Installation from '$client/components/Installation/Installation.svelte';
  import ResourceLink from '$client/components/ResourceLink/ResourceLink.svelte';
  import endImage from '$shared/assets/images/notification.webp';

  import type { PageData } from './$types';
  import { codes } from './_page/codes';
  import Await from './_page/codes/await.svelte';
  import CustomPortal from './_page/codes/customPortal.svelte';
  import Interactive from './_page/codes/interactive.svelte';
  import QuickStartPortal from './_page/codes/quickStart-portal.svelte';
  import QuickStartUsage from './_page/codes/quickStart-usage.svelte';

  export let data: PageData;

  const quickStartVariants = Object.keys(codes.quickStart);
  let quickStartVariant = quickStartVariants[0];
</script>

<Installation pkg={data.package.name} />

<section>
  <h2 id="comprehensive-example">Comprehensive Example</h2>
  <p>
    This section presents a working example of the package. You will notice that <code
      >@svelte-put/noti</code
    > only handles the core logics and leave UI up to you to configure. And for that reason, the setup
    can be a bit verbose. However, this enables flexibility. We will unpack each part of the library
    in later sections of the document to see how customization can be achieved.
  </p>
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
          : a component is set up to be rendered as notification,
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
        <code>NotificationStore</code>.
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
    <code>NotificationStore</code> is created with a builder pattern that provides type-safety for
    <code>push</code> invocations.
  </p>

  <section>
    <h3><code>store</code></h3>
    <Code lang={typescript} code={codes.store.builder} title="notification store builder pattern" />
    <p>
      The <code>store</code> function accepts an optional config object that will be merged to all
      notification instance config on <code>push</code>.
    </p>
    <Code
      lang={typescript}
      code={codes.store.commonConfig}
      title="simplified interfaces of store & NotificationCommonConfig"
    />
  </section>

  <section>
    <h3 id="store-variant"><code>variant</code></h3>
    <p>
      The <code>variant</code> method adds a predefined variant config that provides intellisense
      and reusability. It accepts a mandatory <code>variant</code> string, and either a Svelte
      component or a config object (see <ResourceLink
        id="comprehensive-example"
        on:click={() => (quickStartVariant = quickStartVariants[1])}
        >Comprehensive Example</ResourceLink
      >).
    </p>
    <Code
      lang={typescript}
      code={codes.store.variantConfig}
      title="simplified interfaces of variant & NotificationVariantConfig"
    />
  </section>

  <section>
    <h3 id="pushing">Pushing</h3>
    <p>
      New notifications can be pushed with the <code>NotificationStore.push</code> method. A
      <code>push</code>
      call can use either one of the predefined variant, as seen in the
      <ResourceLink
        id="comprehensive-example"
        on:click={() => (quickStartVariant = quickStartVariants[0])}
        >Comprehensive Example</ResourceLink
      > section, ...
    </p>
    <Code lang={typescript} code={codes.push.variant} title="push from predefined variant config" />
    <p>... or the <code>'custom'</code> variant, helpful for one-off notification for example.</p>
    <p class="c-callout-warning">
      Custom <code>push</code> must provide a component in its config.
    </p>
    <Code lang={typescript} code={codes.push.custom} title="push with custom config" />
    <p>
      If you find that the <code>push</code> interface is too verbose (it is), you can further create
      your own proxy utils.
    </p>
    <Code lang={typescript} code={codes.push.proxy} title="user-abstracted proxy push" />
    <p class="c-callout-info">
      The API is intentionally kept verbose to maintain a unified interface that works for all use
      cases. But if you think it can be further simplified, feedback & proposal are welcomed 🙇.
    </p>
  </section>

  <section>
    <h3 id="popping">Popping and Awaiting for Resolution</h3>
    <p>An active notification can be popped either:</p>
    <ul>
      <li>
        <p>
          from within the component (typically from user actions), by dispatching a <code
            >resolve</code
          >
          event (as seen in the <ResourceLink
            id="comprehensive-example"
            on:click={() => (quickStartVariant = quickStartVariants[3])}
            >Comprehensive Example</ResourceLink
          > section or demo below), or
        </p>
      </li>
      <li>
        <p>
          via the <code>pop</code> method of <code>NotificationStore</code>,
        </p>
        <Code lang={typescript} code={codes.pop.store} title="popping via NotificationStore" />
      </li>
    </ul>
    <p>
      Notification resolution can be awaited. The awaited value is inferred from either the argument
      provided to <code>NotificationStore.pop</code> or <code>CustomEvent.detail</code> of the
      <code>resolve</code>
      event. This is especially helpful for complex interactive notification; see
      <ResourceLink id="notification-component">Notification Component</ResourceLink> section for an
      example.
    </p>
    <Code lang={typescript} code={codes.pop.await} title="awaiting for resolution" />
    <fieldset class="border-2 border-violet-500 p-4">
      <legend>Example</legend>
      <Await />
    </fieldset>
    <Code lang="svelte" code={codes.pop.demo} title="demo: popping & awaiting" />
  </section>
</section>

<section>
  <h2>Notification Portal</h2>

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
    <p>
      When using the <code>portal</code> action, only one portal can be bound to a
      <code>NotificationStore</code>, and vice versa.
    </p>
    <Code lang="svelte" code={codes.portal.action} title="Portal action" />
    <p class="c-callout-info">
      Notification instances are rendered as direct children of the HTMLElement <code
        >use:portal</code
      > is attached to. Newest instance is the last child.
    </p>

    <section>
      <h3>Limitation</h3>
      <p>
        <code>use:portal</code> is helpful for reducing boilerplate and keeping everything connected.
        However, there are some known UI limitations:
      </p>
      <ul>
        <li>
          <ResourceLink href="https://svelte.dev/docs/element-directives#transition-fn"
            >transition</ResourceLink
          > for the notification component must be global (for example <code>in:fly|global</code>),
        </li>
        <li>
          outro transition (during unmount) will not run (but soon will be able to when <ResourceLink
            href="https://github.com/sveltejs/svelte/pull/9056">this PR</ResourceLink
          > is merged),
        </li>
        <li>
          <code>animate</code> is not available because it requires a keyed each block.
        </li>
      </ul>
      <p>
        The next section discusses how a custom portal can be built to overcome these limitations,
        should it be necessary.
      </p>
    </section>
  </section>

  <section>
    <h3 id="custom-portal">Custom Portal</h3>
    <p>
      Instead of <ResourceLink id="use-portal">use:portal</ResourceLink>, rendering of notifications
      can be manually handled by subscribing to the <code>notifications</code> array property of a <ResourceLink
        id="notification-store">NotificationStore</ResourceLink
      >.
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
    <Code lang="svelte" code={codes.portal.custom} title="custom portal demo" />
    <p class="c-callout-info">
      Notice the usage of <code>@svelte-put/noti/Notification.svelte</code> component above. It is
      just a small abstraction on top of <ResourceLink
        href="https://svelte.dev/docs/special-elements#svelte-component"
        >svelte:component</ResourceLink
      >
      to provide the same functionality that <ResourceLink id="use-portal">use:portal</ResourceLink>
      does.
      <br />
      You can even go more granular and omit it; just make sure to
      <ResourceLink
        href="https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/noti/src/Notification.svelte"
        >provide the necessary props</ResourceLink
      >.
    </p>
  </section>
</section>

<section>
  <h2>Notification Component</h2>
  <p>
    There is no limitation on the Svelte component to be used with <code>@svelte-put/noti</code>.
    However, this section lists some <strong>optional</strong> prop & event interfaces that helps build
    feature-rich notifications.
  </p>

  <section>
    <h3>Injected <code>notification</code> Prop</h3>
    <p>
      This is an optional prop that provides access to the corresponding <code
        >NotificationInstance</code
      >
      (element of notification stack from <code>NotificationStore</code>).
    </p>
    <Code
      lang={typescript}
      code={codes.component.instance}
      title="simplified NotificationInstance interface"
    />
    <p>
      This is helpful, for example, if you want access to the <code>id</code> or
      <code>variant</code> of the pushed notification.
    </p>
    <Code lang="svelte" code={codes.component.configExample} title="use case for config prop" />
  </section>
  <section>
    <h3><code>resolve</code> Event</h3>
    <p>
      If set up correctly, either automatically via <ResourceLink id="use-portal"
        >use:portal</ResourceLink
      > or manually in your <ResourceLink id="custom-portal">custom portal</ResourceLink>, a
      <code>resolve</code>
      action dispatched from the pushed instance will prompt <ResourceLink id="notification-store"
        >NotificationStore</ResourceLink
      >
      to remove it from the current notification stack.
    </p>
    <p>
      The detail of this <code>resolve</code>
      <ResourceLink key="CustomEvent" /> can be awaited, allowing us to receive user actions from complex
      interactive notifications such as the example below.
    </p>
    <fieldset class="border-2 border-violet-500 p-4">
      <legend>Example</legend>
      <Interactive />
    </fieldset>
    <Code lang="svelte" code={codes.component.interactive} title="interactive notification" />
  </section>
</section>

<img
  src={endImage}
  alt="mouse click faster"
  width="320"
  height="221"
  loading="lazy"
  decoding="async"
/>

<p>Happy notifying! 👨‍💻</p>
