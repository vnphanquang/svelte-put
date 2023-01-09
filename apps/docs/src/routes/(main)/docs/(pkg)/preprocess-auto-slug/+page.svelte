<script lang="ts">
  import Code from '$client/components/Code/Code.svelte';
  import { ConnectedList, ConnectedListItem } from '$client/components/ConnectedList';
  import Installation from '$client/components/Installation/Installation.svelte';
  import ResourceLink from '$client/components/ResourceLink/ResourceLink.svelte';
  import suspiciousLinksImg from '$shared/assets/images/suspicious-links.webp';

  import type { PageData } from './$types';
  import { codes } from './_page/codes';

  export let data: PageData;
</script>

<section>
  <h2>Introduction</h2>
  <p>
    This package is heavily inspired by
    <ResourceLink href="https://github.com/rehypejs/rehype-slug">rehype-slug</ResourceLink>
    and
    <ResourceLink href="https://github.com/rehypejs/rehype-autolink-headings">
      rehype-autolink-headings
    </ResourceLink>. If you are already using
    <ResourceLink key="MDsveX" /> with some other <code>rehype</code> plugins,
    <code>rehype-slug</code>
    and <code>rehype-autolink-headings</code> should already work well.
  </p>
  <p>
    <code>preprocess-auto-slug</code> operates at <strong>build time</strong> and does the following:
  </p>
  <ConnectedList>
    <ConnectedListItem>
      <p>Search for matching elements (heading elements by default),</p>
    </ConnectedListItem>
    <ConnectedListItem>
      <p>Generate <code>id</code> attributes from element content,</p>
    </ConnectedListItem>
    <ConnectedListItem>
      <p>add anchor tag to element.</p>
    </ConnectedListItem>
  </ConnectedList>
  <p>
    <code>preprocess-auto-slug</code> alone is not that interesting. When coupled with
    <ResourceLink key="@svelte-put/toc" /> (<strong>runtime</strong> logics), however, it provides a
    minimal & efficient solution for generating table of contents.
  </p>
  <p />
</section>

<Installation pkg={data.package.name} />

<section>
  <h2>Quick Start</h2>
  <p>Given the following input</p>
  <Code code={codes.quickStart.input} title="quick start - input" />
  <p>And the default config</p>
  <Code code={codes.quickStart.instruction} title="svelte.config.js" />
  <p><code>preprocess-auto-slug</code> will generate the output below</p>
  <Code code={codes.quickStart.output} title="quick start - output" />
</section>

<section>
  <h2>Customization</h2>
  <p>
    Almost every aspect of <code>preprocess-auto-slug</code> can be customized, including which tags
    to process, how <code>id</code> and <code>href</code> is generated, or the placement of the anchor
    tag.
  </p>
  <p>
    For more details, inspect in-code documentation, read the
    <ResourceLink
      href="https://github.com/vnphanquang/svelte-put/blob/main/packages/preprocessors/auto-slug/api/docs/preprocess-auto-slug.autoslugoptions.md"
      >API Reference</ResourceLink
    >, and check out the
    <ResourceLink
      href="https://github.com/vnphanquang/svelte-put/blob/vercel/packages/preprocessors/auto-slug/src/auto-slug.constants.ts"
      >default options</ResourceLink
    >.
  </p>
  <p>
    This documentation site uses this very package. Most <code>id</code>
    and link tag for headings are auto-generated during build. See <ResourceLink
      href="https://github.com/vnphanquang/svelte-put/blob/vercel/apps/docs/svelte.config.js"
      >svelte.config.js</ResourceLink
    >
    as an example for a more complex use case.
  </p>
</section>

<section>
  <h2>Limitation</h2>
  <p>
    <code>preprocess-auto-slug</code> will generate duplicated <code>id</code> for matching nodes
    rendered inside <code>each</code> block. In such cases it is recommended to manually specify
    <code>id</code> for the node.
  </p>
  <Code code={codes.limitation.input} title="each block - input" />
  <Code code={codes.limitation.output} title="each block - output" />
</section>

<img
  src={suspiciousLinksImg}
  alt="mouse click faster"
  width="300"
  height="168"
  loading="lazy"
  decoding="async"
/>

<p>Happy slugging! 👨‍💻</p>
