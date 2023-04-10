<script lang="ts">
  import { javascript } from 'svelte-highlight/languages';

  import ApiReference from '$client/components/ApiReference/ApiReference.svelte';
  import Code from '$client/components/Code/Code.svelte';
  import Installation from '$client/components/Installation/Installation.svelte';
  import ResourceLink from '$client/components/ResourceLink/ResourceLink.svelte';

  import type { PageData } from './$types';
  import { codes } from './_page/codes';

  export let data: PageData;
</script>

<section>
  <h2>Introduction</h2>
  <p>
    Current solutions (that I know of) for inlining SVGs in Svelte land require either runtime
    logics or a component-oriented strategy. These solutions are acceptable in most cases but have
    been proven to be problematic when additional styling / attributes are needed for the inlined
    svg element.
  </p>
  <p>
    This package tries to achieve <strong>zero runtime footprint</strong> with
    <strong>no additional component</strong>. The idea is to enable this:
  </p>
  <Code code={`<svg inline-src="google/info"></svg>`} title="minimal usage api" />
  <p>
    which will automatically read from the source svg and inline it at build time. Additional
    styling and attributes can now be added idiomatically as with any other html element.
  </p>
</section>

<section>
  <h2>Prior Art</h2>
  <ul>
    <li>
      <ResourceLink href="https://github.com/robinscholz/svelte-inline-svg"
        >svelte-inline-svg</ResourceLink
      >: runs at runtime as Svelte component.
    </li>
    <li>
      <ResourceLink href="https://github.com/metafy-gg/vite-plugin-svelte-svg"
        >vite-plugin-svelte-svg</ResourceLink
      >: runs at build time as Svelte component; svg can be processed with <ResourceLink
        href="https://github.com/svg/svgo">svgo</ResourceLink
      >.
    </li>
    <li>
      <ResourceLink href="https://github.com/metonym/svg-to-svelte">svg-to-svelte</ResourceLink>:
      convert SVG files to svelte components.
    </li>
  </ul>
</section>

<section>
  <h2>Runtime Solution</h2>

  <p>
    This processor is best for static svgs like icons and pictograms. For dynamic svgs (i.e loaded
    from network), use <ResourceLink key="@svelte-put/inline-svg" /> - an action-based strategy with
    a similar api.
  </p>
  <Code
    code={`<svg use:inlineSrc={'https://example.com/icon.svg'}></svg>`}
    title="runtime alternative"
  />

  <p>
    This preprocessor package is also re-exported from <ResourceLink key="@svelte-put/inline-svg" />
    for convenience. If you find yourself needing both runtime & build time solutions, just install <ResourceLink
      key="@svelte-put/inline-svg"
    />.
  </p>
  <Code
    code={`import inlineSvg from '@svelte-put/inline-svg/preprocess'`}
    title="runtime alternative"
  />
</section>

<Installation pkg={data.package.name} />

<section>
  <h2>Quick Start</h2>
  <p>Given the following (<code>svelte.config.js</code>)</p>
  <Code code={codes.quickStart.config} title="quick start - config" lang={javascript} />
  <p>and the asset files as follow</p>
  <Code code={codes.quickStart.assets} title="quick start - assets" />
  <p>we can now do</p>
  <Code code={codes.quickStart.usage} title="quick start - usage" />

  <p class="c-callout-info">
    The <code>.svg</code> extension may be omitted from the path provided to
    <code>inline-src</code>.
  </p>
</section>

<section>
  <h2>Attributes & Inner HTML</h2>
  <p>
    Attributes provided to the source <code>svg</code> element will be <strong>kept</strong> after build
    and override the existed ones in the inlined SVG.
  </p>
  <Code
    code={`<svg inline-src="path/icon" width="100" height="100" class="c-icon"></svg>`}
    title="merging attributes"
  />
  <p>
    InnerHTML of the source <code>svg</code> element will be <strong>replaced</strong> with the that
    from the inlined SVG.
  </p>
  <Code
    code={`<svg inline-src="path/icon">anything in here will be replaced</svg>`}
    title="merging attributes"
  />
  <p>
    If you have a use case where it is useful to append/prepend the innerHTML of inlined SVGs rather
    than replace it, please <ResourceLink key="issue">raise an issue over at github</ResourceLink>.
    For now, let's keep things simple.
  </p>
</section>

<section>
  <h2>Limitations</h2>
  <p>
    <code>preprocess-inline-svg</code> only works in svelte markup, i.e in the template part of svelte
    source files. The following will not work
  </p>
  <Code code={codes.limitation.markup} title="only support svelte markup" />
  <p>
    <code>preprocess-inline-svg</code> does not support <code>inline-src</code> as a variable. I.e, the
    following will not work
  </p>
  <Code code={codes.limitation.variable} title="dynamic attribute is not support" />
  <p>
    This is because it is difficult for the preprocessor to analyze a variable to determine is
    immutability at build time, i.e a variable is meant to be changed. In these case, some
    workarounds are
  </p>
  <ul>
    <li>
      use <code>if-else</code> statements to switch between different <code>inline-src</code> as literal
      strings, or
    </li>
    <li>
      use <ResourceLink key="@svelte-put/inline-svg" /> as a runtime action-based strategy instead.
    </li>
  </ul>
  <p>
    If you have an idea for improvements, please <ResourceLink key="issue"
      >raise an issue over at github</ResourceLink
    >. Thanks!
  </p>
</section>

<section>
  <h2>Customization</h2>
  <p>
    All options are optional. By default <code>inline-svg</code> can be used with no config at all, in
    which case svg source paths are resolved relative to the svelte source file it is specified in.
  </p>
  <p class="c-callout-warning">
    Note that path alias is not supported in <code>inline-src</code>! For example,
    <code>"$lib/src/assets/..."</code> will not work.
  </p>
  <p>
    Alternatively, the <code>directories</code> option can be specified (as seen in the "Quick Start"
    section) to conveniently omit the need for verbose pathnames.
  </p>
  <hr />
  <p>
    Input to <code>inline-svg</code> can be provided as a single object, or an array of such (as seen
    in the "Quick Start" section), helpful for organization purposes or when different configurations
    are needed for different directories.
  </p>
  <p>When input is an array of configs, the following applies:</p>
  <p class="c-callout-warning">
    There can only be one config object without the <code>directories</code> option (<strong
      >default config</strong
    >).<br />
    If multiple are found, an error will be thrown at build. If none is provided, the internal default
    config is used.
  </p>
  <p>
    Each svg source will then be searched top down in the config until a match is found, or else an
    error will be thrown.
  </p>
  <p class="c-callout-info">
    Local svg (local to svelte source file) always has the highest priority and will use <strong
      >default config</strong
    > as described above.
  </p>
  <hr />
  <div class="not-prose c-gtable-2 max-w-full direct-children:p-4">
    <p>Option</p>
    <p>Description</p>

    <p><code>directories</code></p>
    <p>
      directories relative to which the svg source paths will be resolved.<br />
      <span class="inline-block pt-2 text-sm">
        <strong>type</strong>: <code>string[] | string</code><br />
        <strong>default</strong>: <code>[]</code>
      </span>
    </p>

    <p><code>attributes</code></p>
    <p>
      default attributes to add to the svg element, will override the attributes from the svg
      source, but be overridden by the attributes from the element itself (in svelte source)<br />
      <span class="inline-block pt-2 text-sm">
        <strong>type</strong>: <code>{'Record<string, string>'}</code><br />
        <strong>default</strong>: <code>{`{}`}</code>
      </span>
    </p>

    <p><code>serializeOptions</code></p>
    <p>
      options for <ResourceLink href="https://github.com/syntax-tree/hast-util-to-html#options"
        >hast-util-to-html</ResourceLink
      > during serialization<br />
      <span class="inline-block pt-2 text-sm">
        <strong>type</strong>: <code>Object</code><br />
        <strong>default</strong>: <code>{`{ space: 'svg', allowDangerousCharacters: true }`}</code>
      </span>
    </p>

    <p><code>inlineSrcAttributeName</code></p>
    <p>
      the attribute to get the svg source from<br />
      <span class="inline-block pt-2 text-sm">
        <strong>type</strong>: <code>string</code><br />
        <strong>default</strong>: <code>'inline-src'</code>
      </span>
    </p>
    <p><code>keepInlineSrcAttribute</code></p>
    <p>
      whether to keep the inline src attribute after build (for reference, for example)<br />
      <span class="inline-block pt-2 text-sm">
        <strong>type</strong>: <code>boolean</code><br />
        <strong>default</strong>: <code>false</code>
      </span>
    </p>
  </div>
  <p />
</section>

<section>
  <h2>Further Work</h2>
  <p>
    This package is kept minimal as it has served its purpose for all of my need. If you find this
    package to lack certain features that are essential to your use cases, please <ResourceLink
      key="issue">file an issue at github</ResourceLink
    > and let me know. Thank you!
  </p>
  <p>Some possibilities:</p>
  <ul>
    <li>Support for svgo?</li>
    <li>Support for fetching remote svg in <code>inline-src</code> at build time?</li>
    <li>
      Make this into a vite plugin and do these inline operation as part of the pre-rendering
      pipeline?
    </li>
  </ul>
</section>

<ApiReference href={data.package.apiUrl} shouldRecommendTypescript={false} />
