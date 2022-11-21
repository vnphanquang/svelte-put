<script lang="ts">
  import suspiciousLinksImg from '$lib/assets/images/suspicious-links.webp';
  import Code from '$lib/ui/components/Code/Code.svelte';
  import Installation from '$lib/ui/components/Installation/Installation.svelte';
  import ResourceLink from '$lib/ui/components/ResourceLink/ResourceLink.svelte';

  import type { PageData } from './$types';
  import { codes } from './codes';

  export let data: PageData;
</script>

<section>
  <h2>Acknowledgement</h2>
  <p>
    This package is heavily inspired by
    <ResourceLink href="https://github.com/rehypejs/rehype-slug">rehype-slug</ResourceLink>
    and
    <ResourceLink href="https://github.com/rehypejs/rehype-autolink-headings">
      rehype-autolink-headings
    </ResourceLink>.
  </p>
</section>

<Installation pkg={data.package.name} />

<section>
  <h2>Quick Start</h2>
  <Code lang="svelte" code={codes.quickStart} title="svelte.config.js" />
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
    <ResourceLink href={data.package.apiUrl}>API Reference</ResourceLink>, and check out the
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

<img
  src={suspiciousLinksImg}
  alt="mouse click faster"
  width="300"
  height="168"
  loading="lazy"
  decoding="async"
/>

<p>Happy slugging! 👨‍💻</p>
