<script lang="ts">
  import { javascript } from 'svelte-highlight/languages';

  import ApiReference from '$client/components/ApiReference/ApiReference.svelte';
  import Code from '$client/components/Code/Code.svelte';
  import Installation from '$client/components/Installation/Installation.svelte';
  import ResourceLink from '$client/components/ResourceLink/ResourceLink.svelte';

  import type { PageData } from './$types';
  import { codes } from './_page/codes';
  import QuickStart from './_page/codes/quickStart.svelte';

  export let data: PageData;
</script>

<section>
  <h2>Introduction</h2>
  <p>
    Existing solutions for inlining SVGs in svelte land often rely on component, which proves
    painful when it comes to styling and event handling. This package attempts to achieve a minimal
    usage api using <ResourceLink key="svelte action" />.
  </p>
</section>

<section>
  <h2>Build Time Solution</h2>
  <p>
    For an alternative solution to statically inline SVG at build time, use <ResourceLink
      key="@svelte-put/preprocess-inline-svg"
    />.
  </p>
  <Code
    code={codes.preprocess}
    title="complementary preprocessor: no runtime logics"
    lang={javascript}
  />
  <Code code={`<svg inline-src="google/info"></svg>`} title="preprocess: usage example" />
  <p>
    See more examples & documentation at <ResourceLink key="@svelte-put/preprocess-inline-svg" />.
  </p>
</section>

<Installation pkg={data.package.name} />

<section>
  <h2>Quick Start</h2>
  <div class="flex items-start justify-between gap-10">
    <p>
      The Svelte logo SVG on the right is dynamically inlined on load.<br />
      Notice in the source code below, only <code>width</code> (or <code>height</code>) is needed;
      by default <code>inlineSvg</code> will calculate the other dimension to keep the aspect ratio.
    </p>
    <div class="shrink-0">
      <QuickStart />
    </div>
  </div>
  <Code code={codes.quickStart} title="Quick Start" />
</section>

<section>
  <h2>Attributes & Inner HTML</h2>
  <p>
    Attributes provided to the source <code>svg</code> element will be <strong>kept</strong> after build
    and override existed ones in the inlined SVG.
  </p>
  <Code
    code={`<svg use:inlineSvg={'...'} width="100" height="100" class="c-icon"></svg>`}
    title="merging attributes"
  />
  <p>
    InnerHTML of the source <code>svg</code> element will be <strong>replaced</strong> with the that
    from the inlined SVG.
  </p>
  <Code
    code={`<svg use:inlineSvg={'...'}>anything in here will be replaced</svg>`}
    title="merging attributes"
  />
  <p>
    If you have a use case where it is useful to append/prepend the innerHTML of inlined SVGs rather
    than replace it, please <ResourceLink key="issue">raise an issue over at github</ResourceLink>.
    For now, let's keep things simple.
  </p>
</section>

<section>
  <h2>Customization</h2>
  <p class="c-callout-warning">
    Note that <code>inlineSvg</code> should only be used on <code>svg</code> elements!<br />
  </p>

  <p>
    <code>inlineSvg</code> can take its parameter as either a string or a config object with the following
    options
  </p>

  <div class="not-prose c-gtable-2 max-w-full direct-children:p-4">
    <p>Option</p>
    <p>Description</p>

    <p><code>src</code></p>
    <p>
      <strong>(required)</strong> the remote URI to fetch SVG from<br />
      <strong>type</strong>: <code>string</code>
    </p>

    <p><code>autoDimensions</code></p>
    <p>
      whether to automatically calculate the missing dimension (width / height) to keep the aspect
      ratio<br />
      <strong>type</strong>: <code>boolean</code><br />
      <strong>default</strong>: <code>true</code>
    </p>

    <p><code>transform</code></p>
    <p>
      a function to transform the fetched SVG string before inlining<br />
      <strong>type</strong>: <code>(svg: string) => string</code><br />
      <strong>default</strong>: <code>(svg) => svg</code>
    </p>

    <p><code>cache</code></p>
    <p>
      cache policy for use in fetch request<br />
      <strong>type</strong>: <ResourceLink
        href="https://developer.mozilla.org/en-US/docs/Web/API/Request/cache"
        >Request.cache</ResourceLink
      > <br />
      <strong>default</strong>: <code>'no-cache'</code>
    </p>
  </div>
</section>

<ApiReference href={data.package.apiUrl} />
