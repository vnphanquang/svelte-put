<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	export const metadata = defineDocPageMetadata({
		title: 'Usage',
	});
</script>

{markdown`
\`@svelte-put/cloudflare-turnstile\` can be customised by specifying \`turnstile-*\` attributes on
the element the action is used:

~~~svelte
<div use:turnstile turnstile-*="..."></div>
~~~

where \`*\` is one of the options listed at [Cloudflare Turnstile's client
configuration][turnstile.client.configuration], except for \`*-callback\` options, which can be
specified via event handlers (see [Events](#events)).

> [!SIDENOTE]
> If you have Typescript language server set up correctly, you should get autocomplete /
> intellisense for these turnstile* attributes.

~~~svelte
<div
	use:turnstile
	turnstile-sitekey="1x00000000000000000000AA"
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
~~~

> [!INFO]
> The \`turnstile-sitekey\` is mandatory. It is typically passed via an environment variable. If
> using [SvelteKit]

## Custom Turnstile Source

You may provide the \`turnstile-script-src\` attribute, which specifies the URL to load
Turnstile script from. The default URL is shown in below code snippet.

~~~svelte
<div
	use:turnstile
	turnstile-sitekey="..."
	turnstile-script-src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
></div>
~~~

## Readonly Attributes

There are two \`readonly\` attributes that will be dynamically added at runtime:
\`turnstile-widget-id\` is one returned from Cloudflare Turnstile API, and \`turnstile-rendered\` is
added if the widget is successfully rendered.

~~~svelte
<div [...truncated...] turnstile-widget-id="..." turnstile-rendered></div>
~~~

## Events

A \`turnstile\` [CustomEvent] is fired upon a successful challenge. The event detail contains a
token that should be sent to backend for validation:

~~~svelte #typehint
<script>
	import { turnstile } from '@svelte-put/cloudflare-turnstile';
</script>

<!-- ---cut--- -->
<div
	use:turnstile
	turnstile-sitekey="..."
	onturnstile={(e) => console.log('Sending to backend: ', e.detail.token)}
></div>
~~~

Other events are mapped directly to those listed in [Cloudflare Turnstile's
documentation][turnstile.client.configuration], without space or hyphen.

~~~typescript src="fs:../../../lib/types.public.d.ts#L62-L78"

~~~

Notice the event detail provides access to \`widgetId\` and the \`turnstile\` object, which is
helpful if you need to execute custom JS such as reset the widget or check if it is expired.

~~~svelte #typehint
<script lang="ts">
	import { turnstile } from '@svelte-put/cloudflare-turnstile';
	import type { TurnstileEventAttributes } from '@svelte-put/cloudflare-turnstile';

	const handleTurnstile: TurnstileEventAttributes['onturnstile'] = (e) => {
		const { token, turnstile, widgetId } = e.detail;
		// ...
	};
</script>

<div use:turnstile turnstile-sitekey="..." onturnstile={handleTurnstile}></div>
~~~

The \`turnstile\` object has the following interface:

~~~typescript src="fs:../../../lib/types.public.d.ts#L4-L11"

~~~

## Backend Validation

Comming soon...

[SvelteKit]: https://kit.svelte.dev/
[CustomEvent]: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent
[Cloudflare Turnstile]: https://developers.cloudflare.com/turnstile/
[turnstile.client.configuration]: https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/widget-configurations/#complete-configuration-reference
`}
