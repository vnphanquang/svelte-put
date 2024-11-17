<script>
  import DemoQuickStart from './_page/examples/quick-start.svelte';

	import { SettingsContext } from '$lib/settings/context.svelte';
  const settings = SettingsContext.get();
</script>

## Introduction

This implementation of [Cloudflare Turnstile] utilizes [Svelte action]. If you are looking for a component-oriented solution, check out [ghostdevv/svelte-turnstile](https://github.com/ghostdevv/svelte-turnstile) instead.

## Installation

<enhanced-code-block group display="tabs" bind:title={settings.packageManager}>

```bash title=npm
npm install --save-dev @svelte-put/cloudflare-turnstile
```

```bash title=pnpm
pnpm add -D @svelte-put/cloudflare-turnstile
```

```bash title=yarn
yarn add -D @svelte-put/cloudflare-turnstile
```

</enhanced-code-block>

<div class="c-callout c-callout--success c-callout--megaphone">

  New to Svelte 5? See [Migration Guides](#migration-guides).

</div>

## Quick Start

<fieldset class="border-2 border-violet-500 py-4 grid place-items-center">
  <legend>Example</legend>
  <DemoQuickStart />
</fieldset>

<enhanced-code-block group display="files">

```svelte src=./_page/examples/quick-start.svelte title=quick-start.svelte
```

```bash title=.env
PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY="1x00000000000000000000AA"
```

</enhanced-code-block>

## Configuration Attributes

As seen in [Quick Start], `@svelte-put/cloudflare-turnstile` can be customized by adding `turnstile-*` attributes, where `*` are properties as described in [Cloudflare Turnstile's client configuration][turnstile.client.configurations] documentation, except for `*-callback` properties, which can be specified via Svelte event handler syntax `onturnstile*` (more in [Events]).

If you have Typescript language server set up correctly, you should get autocomplete / intellisense for these `turnstile*` attributes.

<div class="c-callout c-callout--info">

The `turnstile-sitekey` is the only mandatory property. In [Quick Start], it is set via environment variable `PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY`, assuming usage with [SvelteKit]. See more in [SvelteKit's docs on static public env](https://kit.svelte.dev/docs/modules#$env-static-public).

</div>

```svelte title=Configurations
<div
  use:turnstile
  :::highlight
  turnstile-sitekey="1x00000000000000000000AA"
  :::
  turnstile-theme="auto"
  turnstile-size="normal"
  turnstile-language="en"
  turnstile-response-field-name="turnstile"
  turnstile-response-field
  turnstile-action="customer-feedback"
  turnstile-cData="customer-id-123"
  turnstile-execution="render"
  turnstile-tabindex="0"
  turnstile-retry="auto"
  turnstile-retry-interval="8000"
  turnstile-refresh-expired="auto"
  turnstile-refresh-timeout="auto"
  turnstile-appearance="always"
  turnstile-feedback-enabled
></div>
```

Additionally, you may provide the `turnstile-script-src` attribute, which specifies the URL to load Turnstile script from. The default URL is shown in below code snippet.

```svelte title=turnstile-script-src
<div
  use:turnstile
  turnstile-sitekey="1x00000000000000000000AA"
  turnstile-script-src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
></div>
```

Finally, there are two `readonly` attributes that will be dynamically added by the `turnstile` at runtime: `turnstile-widget-id` is one returned from Cloudflare Turnstile API, and `turnstile-rendered` is added if the widget is successfully rendered.

```html
<div [...truncated...] turnstile-widget-id="..." turnstile-rendered></div>
```

## Events

As seen [Quick Start], `turnstile` is a [CustomEvent] invoked upon success of the challenge. The event detail contains a token that should be sent to backend for validation. other `turnstile*` [CustomEvents][CustomEvent] are mapped directly to those found in [Cloudflare Turnstile's documentation][turnstile.client.configurations], without space or hyphen.

```typescript title=TurnstileEventAttributes.d.ts
type TurnstileEventDetail<T extends Record<string, any> = Record<string, never>> = {
	widgetId: string;
	turnstile: Turnstile;
} & T;

type TurnstileEventAttributes = {
	'onturnstile'?: (event: CustomEvent<TurnstileEventDetail<{ token: string }>>) => void;
	'onturnstiletrror'?: (event: CustomEvent<TurnstileEventDetail<{ code: string }>>) => void;
	'onturnstiletxpired'?: (event: CustomEvent<TurnstileEventDetail>) => void;
	'onturnstileteforeinteractive'?: (event: CustomEvent<TurnstileEventDetail>) => void;
	'onturnstiletfterinteractive'?: (event: CustomEvent<TurnstileEventDetail>) => void;
	'onturnstiletnsupported'?: (event: CustomEvent<TurnstileEventDetail>) => void;
	'onturnstiletimeout'?: (event: CustomEvent<TurnstileEventDetail>) => void;
};
```

Notice the event detail provides access to `widgetId` and the `turnstile` object, which is helpful if you need to execute custom JS such as reset the widget or check if it is expired.

```svelte title=turnstile-event.svelte
<script lang="ts">
	import { turnstile } from '@svelte-put/cloudflare-turnstile';
	import type { TurnstileEventAttributes } from '@svelte-put/cloudflare-turnstile';

	const handleTurnstile: TurnstileEventAttributes['onturnstile'] = (e) => {
		const { token, turnstile, widgetId } = e.detail;
		// ...
	};
</script>

<div use:turnstile turnstile-sitekey="1x00000000000000000000AA" onturnstile={handleTurnstile}>
```

The `turnstile` object has the following interface:

```typescript title=Turnstile.d.ts
type Turnstile = {
	render: (element: string | HTMLElement, config: TurnstileConfig) => string;
	reset: (widgetId: string) => void;
	remove: (widgetId: string) => void;
	getResponse: (widgetId: string) => string | undefined;
	isExpired: (widgetId: string) => boolean;
	execute: (container: string | HTMLElement, config?: TurnstileConfig) => void;
};
```

## Backend Integration (with SvelteKit)

<div class="flex flex-col items-center text-center">
  <svg inline-src="blocks" height="200" width="655" class="text-bg-200 max-w-full h-auto"></svg>
  <p class="mt-10">
    Coming soon...
  </p>
</div>

## Migration Guides

### V0 -> V1 (Svelte 5 in Runes mode)

When migrating to V1, you just need to remove any colon `:` in event attributes:

```svelte title="Migration to v1 (Svelte 5)"
<div
  use:turnstile
  turnstile-sitekey="1x00000000000000000000AA"
  <!-- :::diff - -->
  on:turnstile={handleTurnstile}
  <!-- ::: -->
  <!-- :::diff + -->
  onturnstile={handleTurnstile}
  <!-- ::: -->
>
```

---

Happy turning in style! 👨‍💻

[Quick Start]: #quick-start
[Events]: #events

[Svelte action]: https://svelte.dev/docs/svelte-action
[SvelteKit]: https://kit.svelte.dev/
[CustomEvent]: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent
[Cloudflare Turnstile]: https://developers.cloudflare.com/turnstile/
[turnstile.client.configurations]: https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#configurations

