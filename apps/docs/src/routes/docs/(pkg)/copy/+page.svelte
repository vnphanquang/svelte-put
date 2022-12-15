<script lang="ts">
  import typescript from 'svelte-highlight/languages/typescript';

  import copyImg from '$assets/images/copy-meme.webp';
  import ActionUsageNotice from '$client/components/ActionUsageNotice/ActionUsageNotice.svelte';
  import ApiReference from '$client/components/ApiReference/ApiReference.svelte';
  import Code from '$client/components/Code/Code.svelte';
  import Installation from '$client/components/Installation/Installation.svelte';
  import ResourceLink from '$client/components/ResourceLink/ResourceLink.svelte';
  import Copy from '$client/components/icons/material/Copy.svelte';

  import type { PageData } from './$types';
  import { codes } from './codes';
  import CustomText from './codes/custom.text.code.svelte';
  import CustomTrigger from './codes/custom.trigger.code.svelte';
  import NoParameters from './codes/no-parameters.code.svelte';

  export let data: PageData;
</script>

<Installation pkg={data.package.name} />

<ActionUsageNotice action={data.package.id} />

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
    <p class="c-callout">
      The <Copy class="inline text-primary" height="16" width="16" /> button seen in all code blocks
      on this site is powered by this very action.
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
        The <code>TextResolver</code> callback also receive an input that contains the forwarded
        event and references to <code>node</code> (action is used on) and <code>trigger</code> (event
        is attached to).
      </p>
      <fieldset class="w-full border-2 border-violet-500 p-4">
        <legend>Example</legend>
        <CustomText />
      </fieldset>
      <Code code={codes.usage.customTextCallback} title="custom text - callback" expanded={false} />
    </section>
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
      You can skip the action and use this utility to build your own custom solution that fits your
      need.
    </p>
    <Code code={codes.usage.helper} title="copyToClipboard" />
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

<img src={copyImg} alt="copy" width="300" height="217" loading="lazy" decoding="async" />

<p>Happy copying! 👨‍💻</p>
