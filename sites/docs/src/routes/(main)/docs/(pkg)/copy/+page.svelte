<script lang="ts">
  import Code from '$client/components/Code/Code.svelte';
  import Installation from '$client/components/Installation/Installation.svelte';
  import ResourceLink from '$client/components/ResourceLink/ResourceLink.svelte';
  import endImg from '$shared/assets/images/copy-meme.webp';

  import type { PageData } from './$types';
  import { codes } from './_page/codes';
  import CustomText from './_page/codes/custom.text.code.svelte';
  import CustomTrigger from './_page/codes/custom.trigger.code.svelte';
  import NoParameters from './_page/codes/no-parameters.code.svelte';
  import Synthetic from './_page/codes/synthetic.code.svelte';

  export let data: PageData;
</script>

<Installation pkg={data.package.name} />

<section>
  <h2>Usage</h2>

  <p>
    By default, <code>copy</code> will register a <code>click</code>
    <sup class="c-footnote-red">1</sup>
    event listener on the same node <sup class="c-footnote-red">2</sup> it is used on. The triggered
    listener will then copy the <code>innerText</code> <sup class="c-footnote-red">3</sup> of the node
    to the default clipboard.
  </p>
  <fieldset class="border-2 border-violet-500 p-4">
    <legend>Example</legend>
    <NoParameters />
  </fieldset>
  <Code code={codes.usage.noParameters} title="default, no parameters" />
  <p>
    The following sections show how
    <span class="c-footnote-red">1</span>,
    <span class="c-footnote-red">2</span>,
    <span class="c-footnote-red">3</span>
    can be customized.
  </p>

  <section>
    <h3><sup class="c-footnote-red">1</sup> Customizing the Event Types</h3>
    <p>Pass one or more event types to the <code>event</code> parameter.</p>
    <Code code={codes.usage.customEvent} title="specifying events" />
  </section>

  <section>
    <h3><sup class="c-footnote-red">2</sup> Customizing the Trigger</h3>
    <p class="c-callout-info">
      The <svg
        inline-src="google/content-copy"
        class="inline text-primary"
        height="16"
        width="16"
      /> button seen in all code blocks on this site is powered by this very action.
    </p>
    <p>A typical use case is clicking on a node to copy the text of some other node.</p>
    <fieldset class="w-full border-2 border-violet-500 p-4">
      <legend>Example</legend>
      <CustomTrigger />
    </fieldset>
    <Code code={codes.usage.customTrigger} title="custom trigger" expanded={false} />
  </section>

  <section>
    <h3><sup class="c-footnote-red">3</sup> Customizing How Text is Copied</h3>
    <p>
      The <code>text</code> parameter can receive a string or a sync/async function that returns a
      string, which if provided will be used for copying instead of the default
      <code>innerText</code> of the node.
    </p>

    <section>
      <h4>Literal</h4>
      <Code code={codes.usage.customTextLiteral} title="custom text - literal" />
    </section>

    <section>
      <h4>Callback</h4>
      <p>
        Here, <code>text</code> is a callback with the input containing information about the
        forwarded event, reference to <code>node</code> (on which action is used), and the
        <code>trigger</code> (to which event is attached).
      </p>
      <fieldset class="w-full border-2 border-violet-500 p-4">
        <legend>Example</legend>
        <CustomText />
      </fieldset>
      <Code code={codes.usage.customTextCallback} title="custom text - callback" expanded={false} />
    </section>
  </section>

  <section>
    <h3>Simulating the <code>copy</code> event</h3>
    <p>
      If <code>synthetic</code> is set to <code>true</code>, a "fake" <code>copy</code> event will
      be dispatched alongside <code>copied</code>, should that be of any use.
    </p>
    <p class="c-callout-warning">
      Note that since this synthetic <code>copy</code> event is not "real", and operations on
      <code>clipboardData</code> will have no effect on the actual copied text.
    </p>
    <fieldset class="w-full border-2 border-violet-500 p-4">
      <legend>Example</legend>
      <Synthetic />
    </fieldset>
    <Code code={codes.usage.synthetic} title="synthetic copy event" expanded={false} />
  </section>

  <section>
    <h3>Using the <code>copyToClipboard</code> helper</h3>
    <p>
      Behind the scene, <code>copy</code> uses a <code>copyToClipboard</code> helper. (You can see
      its
      <ResourceLink
        href="https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/copy/src/copy.helpers.ts"
      >
        source code here
      </ResourceLink>).
    </p>
    <p>
      You may skip the action and use this utility to build your own custom solution that fits your
      need.
    </p>
    <Code code={codes.usage.helper} title="copyToClipboard" />
  </section>
</section>

<img src={endImg} alt="copy" width="300" height="217" loading="lazy" decoding="async" />

<p>Happy copying! 👨‍💻</p>
