<script lang="ts">
  import avatarAangImg from '$lib/assets/images/avatar-aang.jpeg';
  import ApiReference from '$lib/ui/components/ApiReference/ApiReference.svelte';
  import Code from '$lib/ui/components/Code/Code.svelte';
  import Installation from '$lib/ui/components/Installation/Installation.svelte';
  import ResourceLink from '$lib/ui/components/ResourceLink/ResourceLink.svelte';

  import type { PageData } from './$types';
  import { codes } from './codes';
  import AvatarCustomMarkup from './codes/custom.markup.svelte';
  import AvatarCustomStyling from './codes/custom.styling.svelte';
  import AvatarDirect from './codes/direct.svelte';
  import AvatarGravatarHelper from './codes/gravatar.helper.svelte';
  import AvatarGravatarMinimal from './codes/gravatar.minimal.svelte';
  import AvatarGravatarVerbose from './codes/gravatar.verbose.svelte';
  import AvatarMultiple from './codes/multiple.svelte';
  import AvatarUiAvatarHelper from './codes/uiAvatar.helper.svelte';
  import AvatarUiAvatarMinimal from './codes/uiAvatar.minimal.svelte';
  import AvatarUiAvatarVerbose from './codes/uiAvatar.verbose.svelte';
  import AvatarUsageSectionLayout from './components/AvatarUsageSectionLayout.svelte';

  export let data: PageData;

  let gravatarVariant: keyof typeof codes.usage.gravatar;
  let uiAvatarVariant: keyof typeof codes.usage.uiAvatar;

  const RESOLUTION_STRATEGY_SECTION_ID = 'resolution-strategy';
</script>

<Installation pkg={data.package.name} />

<section>
  <h2 id={RESOLUTION_STRATEGY_SECTION_ID}>Resolution Strategies</h2>
  <p>
    <code>@svelte-put/avatar</code> provides several resolution strategies for image source that can
    be used in isolation or together.
  </p>
</section>

<section>
  <h2>Usage</h2>

  <section>
    <h3>Direct URL</h3>
    <AvatarUsageSectionLayout>
      <p>
        Direct image source can be provided to the <code>src</code> prop. This is not much different
        than using a plain <code>img</code>, thus more helpful when used in conjunction with
        one/more solutions listed in the following sections.
      </p>
      <svelte:fragment slot="avatar">
        <AvatarDirect />
      </svelte:fragment>
      <svelte:fragment slot="code">
        <Code code={codes.usage.direct} title="Direct URL" expanded={false} />
      </svelte:fragment>
    </AvatarUsageSectionLayout>
  </section>

  <section>
    <h3>Gravatar</h3>
    <AvatarUsageSectionLayout>
      <p>
        Support for <ResourceLink key="Gravatar" /> is available through:
      </p>
      <ol>
        <li>
          <code class="mt-0">Avatar</code> component with the <code class="mt-0">gravatar</code>
          prop:
          <button class="c-btn-text-secondary" on:click={() => (gravatarVariant = 'Minimal')}>
            email string
          </button>
          or
          <button class="c-btn-text-secondary" on:click={() => (gravatarVariant = 'Verbose')}
            >config object</button
          >,
        </li>
        <li>
          <button class="c-btn-text-secondary" on:click={() => (gravatarVariant = 'Helper')}>
            <code class="mt-0">gravatar</code>
            URL helper
          </button>
          with the <code>src</code> prop.
        </li>
      </ol>
      <svelte:fragment slot="avatar">
        {#if gravatarVariant === 'Minimal'}
          <AvatarGravatarMinimal />
        {:else if gravatarVariant === 'Verbose'}
          <AvatarGravatarVerbose />
        {:else}
          <AvatarGravatarHelper />
        {/if}
      </svelte:fragment>
      <svelte:fragment slot="code">
        <Code
          code={codes.usage.gravatar}
          title="Gravatar"
          bind:variant={gravatarVariant}
          expanded={false}
        />
      </svelte:fragment>
    </AvatarUsageSectionLayout>
  </section>

  <section>
    <h3>UI Avatar</h3>
    <AvatarUsageSectionLayout>
      <p>
        Similar to <code>gravatar</code>, support for <ResourceLink key="UI Avatar" /> is available through:
      </p>
      <ol>
        <li>
          <code class="mt-0">Avatar</code> component with the <code class="mt-0">gravatar</code>
          prop:
          <button class="c-btn-text-secondary" on:click={() => (uiAvatarVariant = 'Minimal')}>
            name string separated with <code class="mt-0">+</code>
          </button>
          or
          <button class="c-btn-text-secondary" on:click={() => (uiAvatarVariant = 'Verbose')}>
            config object
          </button>,
        </li>
        <li>
          <button class="c-btn-text-secondary" on:click={() => (uiAvatarVariant = 'Helper')}>
            <code class="mt-0">uiAvatar</code> URL helper
          </button>
          with the <code>src</code> prop.
        </li>
      </ol>
      <svelte:fragment slot="avatar">
        {#if uiAvatarVariant === 'Minimal'}
          <AvatarUiAvatarMinimal />
        {:else if uiAvatarVariant === 'Verbose'}
          <AvatarUiAvatarVerbose />
        {:else}
          <AvatarUiAvatarHelper />
        {/if}
      </svelte:fragment>
      <svelte:fragment slot="code">
        <Code
          code={codes.usage.uiAvatar}
          title="UI Avatar"
          bind:variant={uiAvatarVariant}
          expanded={false}
        />
      </svelte:fragment>
    </AvatarUsageSectionLayout>
  </section>

  <section>
    <h3>Combining Multiple Sources</h3>
    <AvatarUsageSectionLayout>
      <p>
        As mentioned in
        <ResourceLink id={RESOLUTION_STRATEGY_SECTION_ID}>Resolution Strategies</ResourceLink>,
        multiple sources can be provided to form a chain that resolves to the first available image
        source.
      </p>
      <svelte:fragment slot="avatar">
        <AvatarMultiple />
      </svelte:fragment>
      <svelte:fragment slot="code">
        <Code code={codes.usage.multiple} title="Multiple sources" expanded={false} />
      </svelte:fragment>
    </AvatarUsageSectionLayout>
  </section>

  <section>
    <h3>Customization</h3>

    <section>
      <h4>Markup</h4>
      <AvatarUsageSectionLayout>
        <p>
          The <code>Avatar</code> component provides
          <ResourceLink key="svelte slot">a default slot</ResourceLink>
          with all necessary values available with the <code>let</code> directive.
        </p>
        <p>
          See <ResourceLink id={RESOLUTION_STRATEGY_SECTION_ID}>Resolution Strategies</ResourceLink>
          details on how each value is resolved.
        </p>
        <svelte:fragment slot="avatar">
          <AvatarCustomMarkup />
        </svelte:fragment>
        <svelte:fragment slot="code">
          <Code code={codes.usage.custom.markup} title="Overriding default slot" expanded={false} />
        </svelte:fragment>
      </AvatarUsageSectionLayout>
    </section>

    <section>
      <h4>Styling</h4>
      <AvatarUsageSectionLayout>
        <p>
          The <code>Avatar</code> component provides minimal global styles with 0 css specificity.
          See
          <ResourceLink
            href="https://github.com/vnphanquang/svelte-put/blob/9e958812ee37988c5f6f2e0ddab659aff7c0e5ec/packages/misc/avatar/src/lib/Avatar.svelte#L64-L66"
          >
            source code here
          </ResourceLink>
          for all default styles applied to the component.
        </p>
        <p>
          Since <ResourceLink key="svelte style" /> are component-scoped, customization generally requires
          global styles and css custom properties. The code example below shows a couple of ways to achieve
          this.
        </p>
        <ul>
          <li>
            <code>rounded-full</code> class from a global styling system like
            <ResourceLink key="TailwindCSS" />,
          </li>
          <li>
            <code>custom-avatar</code> class with <code>:global</code> modifier,
          </li>
          <li>
            <code>--border-color</code> css variable bound to the <code>color</code> prop, made
            possible with <ResourceLink key="svelte --style-props" />.
          </li>
        </ul>
        <svelte:fragment slot="avatar">
          <AvatarCustomStyling />
        </svelte:fragment>
        <svelte:fragment slot="code">
          <Code code={codes.usage.custom.styling} title="Custom styles" expanded={false} />
        </svelte:fragment>
      </AvatarUsageSectionLayout>
    </section>
  </section>
</section>

<ApiReference href={data.package.apiUrl} />

<img src={avatarAangImg} alt="avatar?" width="300" height="168.6" />

<p>Happy bending! 👨‍💻</p>
