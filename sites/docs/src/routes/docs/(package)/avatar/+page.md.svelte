<script>
  import { ConnectedList, ConnectedListItem } from '$lib/components/connected-list';
	import { SettingsContext } from '$lib/contexts/settings.svelte';

  import DirectUrl from './_page/examples/direct-url.svelte';
  import GravatarMinimal from './_page/examples/gravatar.minimal.svelte';
  import GravatarVerbose from './_page/examples/gravatar.verbose.svelte';
  import GravatarHelper from './_page/examples/gravatar.helper.svelte';
  import UIAvatarMinimal from './_page/examples/uiAvatar.minimal.svelte';
  import UIAvatarVerbose from './_page/examples/uiAvatar.verbose.svelte';
  import UIAvatarHelper from './_page/examples/uiAvatar.helper.svelte';
  import Multiple from './_page/examples/multiple.svelte';
  import CustomMarkup from './_page/examples/custom.markup.svelte';
  import CustomStyling from './_page/examples/custom.styling.svelte';
  import avatarAangImg from './_page/images/avatar-aang.gif';

  const settings = SettingsContext.get();

  let gravatarVariant = $state('Minimal');
  let uiAvatarVariant = $state('Minimal');
</script>

## Installation

<enhanced-code-block group display="tabs" bind:title={settings.packageManager}>

```bash title=npm
npm install --save-dev @svelte-put/avatar
```

```bash title=pnpm
pnpm add -D @svelte-put/avatar
```

```bash title=yarn
yarn add -D @svelte-put/avatar
```

</enhanced-code-block>

<div class="c-callout c-callout--success c-callout--megaphone">

New to Svelte 5? See [Migration Guides].

</div>

<h2 id="resolution-strategies">Resolution Strategies</h2>

`@svelte-put/avatar` provides several strategies for specifying image source, used in isolation or together to form a chain that will resolve to the first available source.

<ConnectedList>
  <ConnectedListItem>

`src` prop - highest priority, most helpful when used together with others

  </ConnectedListItem>
  <ConnectedListItem>

`gravatar` prop - [Gravatar]

  </ConnectedListItem>
  <ConnectedListItem>

`uiAvatar` prop - [UI Avatar]

  </ConnectedListItem>
  <ConnectedListItem>

`fallback` prop - custom fallback

  </ConnectedListItem>
  <ConnectedListItem>

[internal fallback](https://www.gravatar.com/avatar?d=mp), last resort

  </ConnectedListItem>
</ConnectedList>

For example:

1. `src` - you have a dedicated api & database for avatar,
2. `gravatar` - you also want to automatically fetch avatar from [Gravatar] with user's email if they have not uploaded their own avatar to your server,
3. `uiAvatar` - you also want to fallback to an [UI Avatar] with user's initials if their gravatar is not available,
4. `fallback` - you provide your own custom fallback (last resort) just in case [UI Avatar] is out of service all of the sudden.

```svelte title=MyAvatar.svelte
<script>
  import Avatar from '@svelte-put/avatar/Avatar.svelte';

  let { id, email, firstName, lastName } = $props();
</script>

<Avatar
  src="https://your.api/avatar/{id}"
  gravatar={email}
  uiAvatar="{firstName}+{lastName}"
  fallback="https://your.api/avatar/default"
/>
```

## Direct URL

<div class="flex items-start justify-between">

  Direct image source can be provided to the `src` prop. This is not much different than using a plain `img`, thus more helpful when used in conjunction with one/more solutions listed in the following sections.

<div class="not-prose shrink-0 p-5">
<DirectUrl />
</div>

</div>

```svelte src=./_page/examples/direct-url.svelte title=MyAvatar.svelte
```

## Gravatar

<div class="flex items-start justify-between">
<div>

Support for [Gravatar] is available through either:

1. the exported `Avatar` component with the `gravatar` prop, which takes either an email string or a verbose config object.
2. the exported `gravatar` helper, which generates a [Gravatar] URL and can be used either with the `Avatar` component or vanilla `img`.

</div>

<div class="not-prose shrink-0 p-5">

{#if gravatarVariant === 'Minimal'}
  <GravatarMinimal />
{:else if gravatarVariant === 'Verbose'}
  <GravatarVerbose />
{:else}
  <GravatarHelper />
{/if}

</div>
</div>

<enhanced-code-block group display="tabs" bind:title={gravatarVariant}>

```svelte title=Minimal src=./_page/examples/gravatar.minimal.svelte
```

```svelte title=Verbose src=./_page/examples/gravatar.verbose.svelte
```

```svelte title=Helper src=./_page/examples/gravatar.helper.svelte
```

</enhanced-code-block>

## UI Avatar

<div class="flex items-start justify-between">
<div>

Similar to `Gravatar`, Support for [UI Avatar] is available through either:

1. the exported `Avatar` component with the `uiAvatar` prop, which takes either an string of user name or a verbose config object.
2. the exported `uiAvatar` helper, which generates an [UI Avatar] URL and can be used either with the `Avatar` component or vanilla `img`.

</div>

<div class="not-prose shrink-0 p-5">

{#if uiAvatarVariant === 'Minimal'}
  <UIAvatarMinimal />
{:else if uiAvatarVariant === 'Verbose'}
  <UIAvatarVerbose />
{:else}
  <UIAvatarHelper />
{/if}

</div>
</div>

<enhanced-code-block group display="tabs" bind:title={uiAvatarVariant}>

```svelte title=Minimal src=./_page/examples/uiAvatar.minimal.svelte
```

```svelte title=Verbose src=./_page/examples/uiAvatar.verbose.svelte
```

```svelte title=Helper src=./_page/examples/uiAvatar.helper.svelte
```

</enhanced-code-block>

## Combining Multiple Sources

<div class="flex items-start justify-between">

Using only one of the strategy in previous sections is not that interesting. As mentioned in [Resolution Strategies], multiple sources can be provided to form a chain that resolves to the first available source.

<div class="not-prose shrink-0 p-5"><Multiple /></div>
</div>

```svelte src=./_page/examples/multiple.svelte title=MyAvatar.svelte
```

## Customization

### Markup

<div class="flex items-start justify-between">

The `Avatar` component provides the `img` snippet with all necessary values as parameters, allowing you to complete custom how the image is rendered.

<div class="not-prose shrink-0 p-5"> <CustomMarkup /></div>
</div>

```svelte src=./_page/examples/custom.markup.svelte title=MyAvatar.svelte
```

### Styling

<div class="flex items-start justify-between">

<div>

The `Avatar` component provides minimal global styles with zero css specificity. See [its source code](https://github.com/vnphanquang/svelte-put/blob/d00ff7ecb05dce2d01d41008f367cec44787f57c/packages/avatar/src/Avatar.svelte#L67-L69) for all the default styles applied to the component.

Since [Svelte style](https://svelte.dev/docs/svelte-components#style) are component-scoped by default, customization generally requires global overrides and/or [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties). The code example below shows a couple of ways to achieve this.

- The `rounded-full` class might come from a global styling system like [Tailwind CSS](https://tailwindcss.com/).
- The `custom-avatar` class is used with the `:global` modifier. See [Svelte docs](https://svelte.dev/docs/svelte-components#style) for more information.
- The `--border-color` CSS variable is set up to be used for `color` attribute, made possible with [Svelte --style-props](https://svelte.dev/docs/component-directives#style-props) sugar.

</div>

<div class="not-prose shrink-0 p-10"><CustomStyling /></div>

</div>

```svelte src=./_page/examples/custom.styling.svelte title=MyAvatar.svelte
```

<h2 id="migration-guides">Migration Guides</h2>

### V3 -> V4 (Svelte 5 in Runes mode)

When migrating to V4, everything stays the same with the exception that the `Avatar` component no longer support a default [Svelte slot](https://svelte.dev/docs/special-elements#slot). Instead, use the `img` snippet for [markup customization](#markup).

```svelte title="Migration to v4 (Svelte 5)"
<Avatar
  size={50} gravatar="billy.hargrove@domain.com" uiAvatar="Billy+Hargrove"
  <!-- :::diff - -->
  let:alt let:src let:size let:sources
  <!-- ::: -->
>
  <!-- :::diff + -->
	{#snippet img({ src, size, alt, sources })}
  <!-- ::: -->
  <img {src} {alt} width={size} height={size} data-sources={sources} />
  <!-- :::diff + -->
	{/snippet}
  <!-- ::: -->
</Avatar>
```

<img src={avatarAangImg} alt="Guess who is the Avatar?" width="300" height="168.6" loading="lazy" decoding="async" />

Happy bending!

[Migration Guides]: #migration-guides
[Resolution Strategies]: #resolution-strategies
[Gravatar]: https://docs.gravatar.com/
[UI Avatar]: https://ui-avatars.com/
