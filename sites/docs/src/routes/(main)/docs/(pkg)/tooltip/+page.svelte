<script lang="ts">
  import typescript from 'svelte-highlight/languages/typescript';

  import ActionUsageNotice from '$client/components/ActionUsageNotice/ActionUsageNotice.svelte';
  import Code from '$client/components/Code/Code.svelte';
  import Installation from '$client/components/Installation/Installation.svelte';
  import ResourceLink from '$client/components/ResourceLink/ResourceLink.svelte';
  import endImage from '$shared/assets/images/tooltip.webp';

  import type { PageData } from './$types';
  import { codes } from './_page/codes';
  import Prepare from './_page/codes/prepare.code.svelte';
  import QuickStart from './_page/codes/quickStart.code.svelte';

  export let data: PageData;
  let prepareCodeVariant = Object.keys(codes.prepare.example)[0];
</script>

<p>
  This library is not a typical one with a pre-built component. It has a rather 'lower-level' api
  that helps setup composable tooltips, utilizing <ResourceLink key="svelte action" />.
</p>

<Installation pkg={data.package.name} />

<section>
  <h2 id="quick-start">Quick Start</h2>
  <fieldset class="border-2 border-violet-500 p-4">
    <legend>Example</legend>
    <p class="mt-0">Hover or tab into focus to trigger tooltip</p>
    <QuickStart />
  </fieldset>
  <p class="c-callout-info">
    CSS code for <code>c-tooltip</code> is omitted for conciseness, but will be discussed in a later
    section.
  </p>
  <Code lang="svelte" code={codes.quickStart} title="out-of-the-box tooltip action" />
</section>

<ActionUsageNotice action={data.package.id} />

<section>
  <h2>Design Decisions</h2>
  <p>
    <code>@svelte-put/tooltip</code> adopts a headless approach. By default, it will take care of:
  </p>
  <ul>
    <li>creating a container element,</li>
    <li>handling logics for inserting elements & events for changing visibility state,</li>
    <li>managing <code>pointer-events</code> style on tooltip container element,</li>
    <li>
      managing <code>role</code>, <code>id</code>, and <code>aria-describedby</code> accessibility attributes,
    </li>
  </ul>
  <p>
    and leave <strong>tooltip UI </strong> and <strong>positioning</strong> to be determined by
    users. Thanks to this, <code>@svelte-put/tooltip</code> can be configured to use in a lot of different
    sites and applications.
  </p>
  <p>
    For the same reason, however, the out-of-the-box <code>use:tooltip</code> action does not do
    much. As seen in <ResourceLink id="quick-start">Quick Start</ResourceLink>, the styling is
    provided through the <code>c-tooltip</code> class, and positioning logics is provided by paring
    with <ResourceLink href="https://floating-ui.com/">@floating-ui</ResourceLink> in the
    <code>compute</code> callback.
  </p>
</section>

<section>
  <h2>Preparing Your Own Tooltip Action</h2>
  <section>
    <h3>The <code>prepare</code> API</h3>
    <Code code={codes.prepare.quick} lang={typescript} title="prepare a reusable tooltip action" />
    <p>
      The same interface is used for both the builtin <code>tooltip</code> action &
      <code>prepare</code> helper.
    </p>
    <Code lang={typescript} code={codes.prepare.interface} title="simplified parameter interface" />
  </section>

  <section>
    <h3 id="prepare-example">Example</h3>
    <p>
      This section provides a comprehensive example for building a custom tooltip action. If you
      feel overwhelmed, don't get too caught up with the code; more information is provided in the
      next sections.
    </p>
    <p class="c-callout-info">
      There are four parts of code for this demo:
      <button
        class="inline c-link"
        on:click={() => (prepareCodeVariant = Object.keys(codes.prepare.example)[0])}>Usage</button
      >,
      <button
        class="inline c-link"
        on:click={() => (prepareCodeVariant = Object.keys(codes.prepare.example)[1])}
        >UI Setup</button
      >,
      <button
        class="inline c-link"
        on:click={() => (prepareCodeVariant = Object.keys(codes.prepare.example)[2])}
        >CSS Setup</button
      >,
      <button
        class="inline c-link"
        on:click={() => (prepareCodeVariant = Object.keys(codes.prepare.example)[3])}
        >Action Setup</button
      >. Select corresponding tab to see each.
    </p>
    <fieldset class="border-2 border-violet-500 p-4">
      <legend>Example</legend>
      <p class="mt-0">Hover or tab into focus to trigger tooltip</p>
      <Prepare />
    </fieldset>
    <Code
      lang="svelte"
      code={codes.prepare.example}
      title="using prepared action"
      bind:variant={prepareCodeVariant}
    />
  </section>
</section>

<section>
  <h2>Tooltip Content</h2>
  <p>
    This is the only <strong>required</strong> field for both the out-of-the-box
    <code>tooltip</code>
    action and the <code>prepare</code> function. Besides setting the default content, it also helps
    generate type inference for the parameter of the prepared action.
  </p>

  <p>
    Content can be provided as either a <code>string</code> (inserted as <code>innerHTML</code> to the
    tooltip container), ...
  </p>
  <Code lang="svelte" code={codes.content.examples.string} title="content as string" />

  <p>... or as any Svelte component, ...</p>
  <Code lang="svelte" code={codes.content.examples.component} title="content as component" />

  <p>... and optionally with default props.</p>
  <p class="c-callout-warning">
    Note that if a component has required props and no default props are provided, you will get
    warning in browser console (and language server error if set up), and potentially runtime error
    if internal component logics depends on such props.
  </p>
  <Code
    lang="svelte"
    code={codes.content.examples.componentWithProps}
    title="content as component with default props"
  />

  <p>
    There is no restriction on Svelte component for tooltip content. You can optionally declare a <code
      >visible</code
    >
    prop which will be injected at runtime for you by
    <code>@svelte-put/tooltip</code>.
  </p>
  <Code
    lang="svelte"
    code={codes.prepare.example['UI Setup']}
    title="Svelte component as tooltip content"
  />
</section>

<section>
  <h2>Tooltip Container</h2>
  <p>
    The tooltip container is rendered by <code>@svelte-put/tooltip</code>. The following
    customization properties is available.
  </p>
  <Code lang={typescript} code={codes.container.interface} title="container interface" />

  <p>
    Typically, you should specify a class name with enough css depending on your rendering &
    positioning strategy. See <ResourceLink
      id="prepare-example"
      on:click={() => (prepareCodeVariant = Object.keys(codes.prepare.example)[2])}
      >CSS Setup from example above</ResourceLink
    >.
  </p>
</section>

<section>
  <h2>Tooltip Compute</h2>
  <p>
    The positioning logics is not handled by the library but left up to you via the <code
      >compute</code
    > method. This is to avoid complicating the public api of the library, which otherwise would often
    try to do either too much or not enough in my personal experience.
  </p>
  <Code lang={typescript} code={codes.compute.interface} title="simplified compute interface" />
  <p>
    In <ResourceLink
      id="prepare-example"
      on:click={() => (prepareCodeVariant = Object.keys(codes.prepare.example)[3])}
      >Action Setup from example above</ResourceLink
    >,
    <ResourceLink href="https://floating-ui.com/">@floating-ui</ResourceLink> (previously
    <code>popperjs</code>) is used to handle the positioning logics. It's a minimal & extensible
    library that pairs well with
    <code>@svelte-put/tooltip</code>. I recommend giving it a try.
  </p>
</section>

<section>
  <h2>To tooltip or not to tooltip?</h2>
  <p>
    Although this library opens a lot of door for composing UI by accepting any Svelte component,
    tooltip should be kept minimal.
    <ResourceLink href="https://www.nngroup.com/articles/tooltip-guidelines/"
      >Nielsen Norman Group's article on tooltip</ResourceLink
    > is a recommended read. To quote <ResourceLink
      href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tooltip_role"
      >MDN docs on tooltip</ResourceLink
    >:
  </p>
  <p class="c-callout-info">
    "If the information is important enough for a tooltip, isn't it important enough to always be
    visible?"
  </p>
</section>

<img
  src={endImage}
  alt="mouse click faster"
  width="300"
  height="200"
  loading="lazy"
  decoding="async"
/>

<p>Happy tooling & tipping! 👨‍💻</p>
