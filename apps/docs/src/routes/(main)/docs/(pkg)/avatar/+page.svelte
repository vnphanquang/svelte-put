<script lang="ts">
  import ApiReference from '$client/components/ApiReference/ApiReference.svelte';
  import Code from '$client/components/Code/Code.svelte';
  import { ConnectedList, ConnectedListItem } from '$client/components/ConnectedList';
  import Installation from '$client/components/Installation/Installation.svelte';
  import ResourceLink from '$client/components/ResourceLink/ResourceLink.svelte';
  import avatarAangImg from '$shared/assets/images/avatar-aang.jpeg';

  import type { PageData } from './$types';
  import { codes } from './_page/codes';
  import AvatarCustomMarkup from './_page/codes/custom.markup.svelte';
  import AvatarCustomStyling from './_page/codes/custom.styling.svelte';
  import AvatarDirect from './_page/codes/direct.svelte';
  import AvatarGravatarHelper from './_page/codes/gravatar.helper.svelte';
  import AvatarGravatarMinimal from './_page/codes/gravatar.minimal.svelte';
  import AvatarGravatarVerbose from './_page/codes/gravatar.verbose.svelte';
  import AvatarMultiple from './_page/codes/multiple.svelte';
  import AvatarUiAvatarHelper from './_page/codes/uiAvatar.helper.svelte';
  import AvatarUiAvatarMinimal from './_page/codes/uiAvatar.minimal.svelte';
  import AvatarUiAvatarVerbose from './_page/codes/uiAvatar.verbose.svelte';
  import AvatarUsageSectionLayout from './_page/components/AvatarUsageSectionLayout.svelte';

  export let data: PageData;

  let gravatarVariant: keyof typeof codes.usage.gravatar;
  let uiAvatarVariant: keyof typeof codes.usage.uiAvatar;

  const RESOLUTION_STRATEGY_SECTION_ID = 'resolution-strategy';
</script>

<Installation pkg={data.package.name} />

<section>
  <h2 id={RESOLUTION_STRATEGY_SECTION_ID}>Resolution Strategies</h2>
  <p>
    <code>@svelte-put/avatar</code> provides several strategies for specifying image source, used in
    isolation or together to form a chain that will resolve to the first available source.
  </p>

  <div class="pl-4">
    <ConnectedList>
      <ConnectedListItem>
        <p class="mb-4">
          <code>src</code> prop - highest priority, most helpful when used together with others
        </p>
      </ConnectedListItem>
      <ConnectedListItem>
        <p class="mb-4">
          <code>gravatar</code> prop - <ResourceLink key="Gravatar" class="c-link-primary" />
        </p>
      </ConnectedListItem>
      <ConnectedListItem>
        <p class="mb-4">
          <code>uiAvatar</code> prop - <ResourceLink key="UI Avatar" class="c-link-primary" />
        </p>
      </ConnectedListItem>
      <ConnectedListItem>
        <p class="mb-4"><code>fallback</code> prop - custom fallback</p>
      </ConnectedListItem>
      <ConnectedListItem>
        <p>
          <ResourceLink href="https://www.gravatar.com/avatar?d=mp" class="c-link-primary"
            >internal fallback</ResourceLink
          >, last resort
        </p>
      </ConnectedListItem>
    </ConnectedList>
  </div>

  <p>For example:</p>
  <ol>
    <li>
      (<code>src</code>) you have a dedicated api & database for avatar,
    </li>
    <li>
      (<code>gravatar</code>) you also want to automatically fetch avatar from
      <ResourceLink key="Gravatar" /> with user's email if they have not uploaded their own avatar,
    </li>
    <li>
      (<code>uiAvatar</code>) you also want to fallback to an <ResourceLink key="UI Avatar" />
      with user's initials if their gravatar has not been set up,
    </li>
    <li>
      (<code>fallback</code>) you provide your own custom fallback (last resort) just in case <ResourceLink
        key="UI Avatar"
      />
      is out of service all of the sudden.
    </li>
  </ol>

  <Code code={codes.priority} title="Resolution Strategies" />
</section>

<section>
  <h2 data-toc-strategy="self">Usage</h2>

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
    <h3 data-toc-strategy="self">Customization</h3>

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

<img src={avatarAangImg} alt="avatar?" width="300" height="168.6" loading="lazy" decoding="async" />

<p>Happy bending! 👨‍💻</p>
